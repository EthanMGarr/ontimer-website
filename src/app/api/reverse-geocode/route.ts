import { NextRequest, NextResponse } from "next/server";
import { guardGoogleApiRequest } from "@/lib/api-cost-guard";
import {
  isValidCoordinatePair,
  requestNearestAddress,
} from "@/lib/reverse-geocode";

const REVERSE_GEOCODE_RATE_LIMIT = {
  name: "reverse-geocode",
  perIpLimit: 20,
  perIpWindowMs: 60 * 60 * 1000,
  globalLimit: 500,
  globalWindowMs: 60 * 60 * 1000,
};

function response(address: string | null, status = 200) {
  return NextResponse.json(
    { address },
    { status, headers: { "Cache-Control": "private, no-store" } }
  );
}

export async function POST(request: NextRequest) {
  const guard = guardGoogleApiRequest(request, REVERSE_GEOCODE_RATE_LIMIT);
  if (!guard.allowed) {
    return NextResponse.json(
      { address: null, error: guard.reason },
      {
        status: guard.reason === "rate_limited" ? 429 : 403,
        headers: {
          "Cache-Control": "private, no-store",
          ...(guard.retryAfterSeconds
            ? { "Retry-After": String(guard.retryAfterSeconds) }
            : {}),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return response(null, 400);
  }

  const latitude = typeof body === "object" && body !== null
    ? Number((body as Record<string, unknown>).latitude)
    : Number.NaN;
  const longitude = typeof body === "object" && body !== null
    ? Number((body as Record<string, unknown>).longitude)
    : Number.NaN;
  const requestedLanguage = typeof body === "object" && body !== null
    ? (body as Record<string, unknown>).language
    : undefined;
  const language = requestedLanguage === "es" ? "es" : "en";

  if (!isValidCoordinatePair(latitude, longitude)) {
    return response(null, 400);
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("[reverse-geocode] GOOGLE_MAPS_API_KEY not set");
    return response(null, 503);
  }

  const address = await requestNearestAddress(
    latitude,
    longitude,
    language,
    apiKey,
    fetch,
    (health) => {
      const record = JSON.stringify({
        event: "reverse_geocode_upstream",
        quotaUnits: 1,
        ...health,
      });
      if (health.outcome === "failed") {
        console.error("[reverse-geocode] request_failed", record);
      } else {
        console.info("[reverse-geocode] request_completed", record);
      }
    }
  );

  return response(address);
}
