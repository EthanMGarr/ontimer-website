import { NextRequest } from "next/server";
import { guardPaidApiRequest } from "@/lib/api-cost-guard";
import { WEBSITE_GA_MEASUREMENT_ID } from "@/lib/analytics-config";
import {
  measurementProtocolPayload,
  parseFirstPartyAnalyticsEvent,
} from "@/lib/analytics-measurement-protocol";

const ANALYTICS_RATE_LIMIT = {
  name: "first-party-analytics",
  perIpLimit: 1_000,
  perIpWindowMs: 60 * 60 * 1_000,
  globalLimit: 250_000,
  globalWindowMs: 24 * 60 * 60 * 1_000,
};

const MAX_REQUEST_BYTES = 8_192;

export async function POST(request: NextRequest) {
  const guard = guardPaidApiRequest(request, ANALYTICS_RATE_LIMIT);
  if (!guard.allowed) {
    return Response.json(
      { error: guard.reason },
      {
        status: guard.reason === "rate_limited" ? 429 : 403,
        headers: guard.retryAfterSeconds
          ? { "Retry-After": String(guard.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "request_too_large" }, { status: 413 });
  }

  let rawEvent: unknown;
  try {
    rawEvent = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const event = parseFirstPartyAnalyticsEvent(rawEvent);
  if (!event) {
    return Response.json({ error: "invalid_event" }, { status: 400 });
  }

  const apiSecret = process.env.GA4_MEASUREMENT_PROTOCOL_API_SECRET;
  if (!apiSecret) {
    console.error("[analytics] GA4 Measurement Protocol secret is not configured");
    return Response.json({ error: "analytics_not_configured" }, { status: 503 });
  }

  const endpoint = new URL("https://www.google-analytics.com/mp/collect");
  endpoint.searchParams.set("measurement_id", WEBSITE_GA_MEASUREMENT_ID);
  endpoint.searchParams.set("api_secret", apiSecret);

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(measurementProtocolPayload(event)),
    });
    if (!upstream.ok) {
      console.error("[analytics] GA4 Measurement Protocol rejected an event", {
        eventName: event.event_name,
        status: upstream.status,
      });
      return Response.json({ error: "analytics_upstream_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("[analytics] GA4 Measurement Protocol request failed", {
      eventName: event.event_name,
      reason: error instanceof Error ? error.name : "unknown",
    });
    return Response.json({ error: "analytics_upstream_failed" }, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
