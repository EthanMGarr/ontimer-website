import { NextRequest, NextResponse } from "next/server";
import { guardPaidApiRequest } from "@/lib/api-cost-guard";
import {
  isValidMapboxSessionToken,
  requestMapboxSuggestions,
  retrieveMapboxPlace,
} from "@/lib/mapbox-location";
import { isMapboxPilotActive } from "@/lib/mapbox-pilot";

const MAPBOX_SEARCH_RATE_LIMIT = {
  name: "mapbox-search",
  perIpLimit: 40,
  perIpWindowMs: 10 * 60 * 1000,
  globalLimit: 4_000,
  globalWindowMs: 24 * 60 * 60 * 1000,
};

function unavailable() {
  return NextResponse.json({ error: "Mapbox pilot is unavailable" }, { status: 503 });
}

export async function POST(request: NextRequest) {
  const guard = guardPaidApiRequest(request, MAPBOX_SEARCH_RATE_LIMIT);
  if (!guard.allowed) {
    return NextResponse.json(
      { error: guard.reason },
      {
        status: guard.reason === "rate_limited" ? 429 : 403,
        headers: guard.retryAfterSeconds
          ? { "Retry-After": String(guard.retryAfterSeconds) }
          : undefined,
      }
    );
  }

  if (!isMapboxPilotActive()) return unavailable();
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  if (!accessToken) return unavailable();

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const action = typeof body.action === "string" ? body.action : "";
  const sessionToken = typeof body.sessionToken === "string" ? body.sessionToken : "";
  const language = body.language === "es" ? "es" : "en";
  if (!isValidMapboxSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Invalid search session" }, { status: 400 });
  }

  try {
    if (action === "suggest") {
      const input = typeof body.input === "string" ? body.input.trim() : "";
      if (input.length < 4 || input.length > 200) {
        return NextResponse.json({ error: "Invalid search input" }, { status: 400 });
      }
      const predictions = await requestMapboxSuggestions(
        input,
        sessionToken,
        language,
        accessToken
      );
      return NextResponse.json({ predictions });
    }

    if (action === "retrieve") {
      const placeId = typeof body.placeId === "string" ? body.placeId.trim() : "";
      if (!placeId || placeId.length > 500) {
        return NextResponse.json({ error: "Invalid place selection" }, { status: 400 });
      }
      const place = await retrieveMapboxPlace(
        placeId,
        sessionToken,
        language,
        accessToken
      );
      return NextResponse.json({ place });
    }

    return NextResponse.json({ error: "Invalid search action" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mapbox Search Box failed";
    console.error("[mapbox-search] upstream_failed", JSON.stringify({ action, message }));
    return NextResponse.json({ error: "Location suggestions are temporarily unavailable" }, { status: 502 });
  }
}
