import { NextRequest, NextResponse } from "next/server";
import { guardPaidApiRequest } from "@/lib/api-cost-guard";
import {
  parseRouteCoordinates,
  requestMapboxRoute,
  type RouteCoordinates,
} from "@/lib/mapbox-routing";
import { buildRoutesWaypoint } from "@/lib/routes-waypoint";
import { isMapboxPilotActive } from "@/lib/mapbox-pilot";

/// Server-side proxy for travel-time estimation with bounded, best-effort caching.
///
/// ## Purpose
/// Keeps GOOGLE_MAPS_API_KEY server-only. Caches results to minimise upstream
/// API calls. Only called on explicit user submit — never on keystrokes or
/// page load.
///
/// ## API strategy
/// Google Routes API (routes.googleapis.com) provides traffic-aware estimates.
///    Requires "Routes API" to be enabled in Google Cloud Console.
/// Each user calculation is allowed at most one upstream request. If Google
/// rejects it, the client falls back to manual travel-time entry rather than
/// multiplying billable requests through automatic retries.
///
/// ## Cache design
/// The in-memory TTL cache is per serverless instance. It reduces repeat calls
/// on warm instances but is not treated as a cross-instance cost control.
/// Request provenance, rate limits, and Google Cloud quotas provide the
/// cost-safety layers.
///
/// Cache key = normalizedOrigin|normalizedDestination|timeBucket
/// Time bucket rounds departure to nearest BUCKET_MINUTES to reuse estimates
/// across similar departure times (traffic doesn't change meaningfully within
/// that window).
///
/// ## Include
/// - Normalization, bucketing, TTL cache, in-flight dedup, logging
///
/// ## Don't Include
/// - Auth, user state, UI concerns

// ─── Config ───────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 45 * 60 * 1000;   // 45 minutes
const BUCKET_MINUTES = 30;             // Round departure time to this window
const MAX_CACHE_ENTRIES = 500;
const TRAVEL_RATE_LIMIT = {
  name: "travel-time",
  perIpLimit: 12,
  perIpWindowMs: 60 * 60 * 1000,
  globalLimit: 300,
  globalWindowMs: 24 * 60 * 60 * 1000,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface TravelResult {
  durationMinutes: number;
  hasTrafficData: boolean;
  trafficBasis: "live" | "predicted" | "scheduled" | "none";
  provider: "google" | "mapbox";
}

interface CacheEntry {
  value: TravelResult;
  expiresAt: number;
}

interface RoutesApiRoute {
  duration?: string;       // traffic-aware, e.g. "1200s"
  staticDuration?: string; // baseline without traffic, e.g. "1050s"
}

interface RoutesApiResponse {
  routes?: RoutesApiRoute[];
  error?: { code: number; message: string; status: string };
}

// ─── In-memory TTL cache ──────────────────────────────────────────────────────
// Per-serverless-instance. Cross-instance coverage handled by Next.js Data Cache.

const cache = new Map<string, CacheEntry>();

function cacheGet(key: string): TravelResult | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

function cacheSet(key: string, value: TravelResult): void {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }
  cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
}

// ─── In-flight deduplication ──────────────────────────────────────────────────
// Prevents concurrent identical requests from making multiple upstream calls
// within the same serverless instance.

const inflight = new Map<string, Promise<TravelResult>>();

// ─── Normalization ────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Round Unix seconds to nearest BUCKET_MINUTES to maximise cache reuse. */
function bucketTime(unixSeconds: number): number {
  const bucketSec = BUCKET_MINUTES * 60;
  return Math.round(unixSeconds / bucketSec) * bucketSec;
}

function cacheKey(origin: string, dest: string, bucket: number, mode: string, provider: string): string {
  return `${provider}|${normalize(origin)}|${normalize(dest)}|${bucket}|${mode}`;
}

/**
 * If a string looks like a bare IATA/ICAO airport code (2–4 letters, nothing
 * else), append "airport" so the Routes API geocoder resolves it correctly.
 * "EWR" → "EWR airport", "KEWR" → "KEWR airport", "Newark" → unchanged.
 */
function trafficBasisFor(bucketedTime: number, travelMode: string): TravelResult["trafficBasis"] {
  if (travelMode === "WALK") return "none";
  if (travelMode === "TRANSIT") return "scheduled";
  const hoursUntil = (bucketedTime * 1000 - Date.now()) / (1000 * 60 * 60);
  return hoursUntil <= 6 ? "live" : "predicted";
}

// ─── Google Maps Routes API call ──────────────────────────────────────────────

/** Parse a duration string like "1200s" → seconds as number. */
function parseDurationSeconds(s: string | undefined): number {
  if (!s) return 0;
  return parseInt(s.replace("s", ""), 10) || 0;
}

async function callRoutesApi(
  origin: string,
  destination: string,
  bucketedTime: number,
  apiKey: string,
  travelMode: string
): Promise<TravelResult> {
  // Routes API requires departureTime >= now (RFC3339 UTC).
  // Clamp so a bucketed time that fell into the past is still accepted.
  const nowUnix = Math.floor(Date.now() / 1000);
  const safeDepartureUnix = Math.max(bucketedTime, nowUnix + 60);
  const departureTime = new Date(safeDepartureUnix * 1000).toISOString();

  const body: Record<string, unknown> = {
    origin: buildRoutesWaypoint(origin),
    destination: buildRoutesWaypoint(destination),
    travelMode,
  };

  if (travelMode === "DRIVE") {
    body.routingPreference = "TRAFFIC_AWARE";
    body.departureTime = departureTime;
  } else if (travelMode === "TRANSIT") {
    body.departureTime = departureTime;
  }
  // WALK: no departureTime or routingPreference

  const res = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        // Only request the fields we need — minimises response size and billing
        "X-Goog-FieldMask": "routes.duration,routes.staticDuration",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data: RoutesApiResponse = await res.json();

  if (data.error) {
    throw new Error(`Routes API error ${data.error.code}: ${data.error.message} (${data.error.status})`);
  }

  const route = data.routes?.[0];
  if (!route) throw new Error("Routes API returned no routes");

  const durationSec = parseDurationSeconds(route.duration);
  const staticSec = parseDurationSeconds(route.staticDuration);

  return {
    durationMinutes: Math.ceil(durationSec / 60),
    // hasTrafficData only meaningful for DRIVE; WALK/TRANSIT don't use traffic routing
    hasTrafficData: travelMode === "DRIVE" && durationSec !== staticSec,
    trafficBasis: trafficBasisFor(bucketedTime, travelMode),
    provider: "google",
  };
}

async function callMapboxDirectionsApi(
  origin: RouteCoordinates,
  destination: RouteCoordinates,
  bucketedTime: number,
  accessToken: string,
  travelMode: "DRIVE" | "WALK"
): Promise<TravelResult> {
  const route = await requestMapboxRoute(
    origin,
    destination,
    bucketedTime,
    travelMode,
    accessToken
  );
  return {
    ...route,
    trafficBasis: trafficBasisFor(bucketedTime, travelMode),
    provider: "mapbox",
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────

async function handleTravelTimeRequest(request: NextRequest, searchParams: URLSearchParams) {
  const guard = guardPaidApiRequest(request, TRAVEL_RATE_LIMIT);
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

  const rawOrigin = searchParams.get("origin") ?? "";
  const rawDest = searchParams.get("destination") ?? "";
  const rawTime = searchParams.get("departureTime") ?? "";
  const rawMode = searchParams.get("travelMode") ?? "DRIVE";
  const travelMode = ["DRIVE", "WALK", "TRANSIT"].includes(rawMode) ? rawMode : "DRIVE";
  const requestedProvider = searchParams.get("provider") === "mapbox" ? "mapbox" : "google";
  const originCoordinates = parseRouteCoordinates(
    searchParams.get("originLatitude"),
    searchParams.get("originLongitude")
  );
  const destinationCoordinates = parseRouteCoordinates(
    searchParams.get("destinationLatitude"),
    searchParams.get("destinationLongitude")
  );

  if (!rawOrigin.trim() || !rawDest.trim()) {
    return NextResponse.json(
      { error: "Missing required params: origin, destination" },
      { status: 400 }
    );
  }

  if (rawOrigin.length > 200 || rawDest.length > 200) {
    return NextResponse.json({ error: "Route input is too long" }, { status: 400 });
  }

  const mapboxEnabled = isMapboxPilotActive();
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
  const useMapbox = requestedProvider === "mapbox"
    && mapboxEnabled
    && Boolean(mapboxToken)
    && travelMode !== "TRANSIT"
    && originCoordinates !== null
    && destinationCoordinates !== null;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!useMapbox && !apiKey) {
    console.error("[travel-time] GOOGLE_MAPS_API_KEY not configured");
    return NextResponse.json(
      { error: "Travel time service not configured" },
      { status: 503 }
    );
  }

  const origin = normalize(rawOrigin);
  const destination = normalize(rawDest);
  const rawUnix = parseInt(rawTime, 10);
  const departureUnix = !isNaN(rawUnix) && rawUnix > 0
    ? rawUnix
    : Math.floor(Date.now() / 1000);
  const bucket = bucketTime(departureUnix);
  const provider = useMapbox ? "mapbox" : "google";
  const routingOrigin = useMapbox
    ? `${originCoordinates.latitude},${originCoordinates.longitude}`
    : origin;
  const routingDestination = useMapbox
    ? `${destinationCoordinates.latitude},${destinationCoordinates.longitude}`
    : destination;
  const key = cacheKey(routingOrigin, routingDestination, bucket, travelMode, provider);

  // ── In-memory TTL cache ──────────────────────────────────────────────────
  const cached = cacheGet(key);
  if (cached) {
    console.log("[travel-time] cache_hit", JSON.stringify({ provider, travelMode }));
    return NextResponse.json({ ...cached, cacheHit: true });
  }
  console.log("[travel-time] cache_miss", JSON.stringify({ provider, travelMode }));

  // ── In-flight deduplication ──────────────────────────────────────────────
  const pending = inflight.get(key);
  if (pending) {
    console.log("[travel-time] dedup_hit", JSON.stringify({ provider, travelMode }));
    try {
      const result = await pending;
      return NextResponse.json({ ...result, cacheHit: false });
    } catch {
      // Pending request failed — fall through to a fresh attempt
    }
  }

  // ── Single provider routing call ──────────────────────────────────────────
  // Never retry one paid provider with another. A provider failure returns the
  // existing manual-entry fallback instead of creating a second billable call.
  const promise = useMapbox
    ? callMapboxDirectionsApi(
      originCoordinates,
      destinationCoordinates,
      bucket,
      mapboxToken as string,
      travelMode as "DRIVE" | "WALK"
    )
    : callRoutesApi(origin, destination, bucket, apiKey as string, travelMode);
  inflight.set(key, promise);

  try {
    const result = await promise;
    cacheSet(key, result);
    console.log(
      "[travel-time] routes_api_called",
      JSON.stringify({
        provider: result.provider,
        travelMode,
        durationMinutes: result.durationMinutes,
        hasTrafficData: result.hasTrafficData,
      })
    );
    return NextResponse.json({ ...result, cacheHit: false });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[travel-time] routes_api_failed", JSON.stringify({ provider, travelMode, message: msg }));

    return NextResponse.json(
      { error: msg, cacheHit: false },
      { status: 502 }
    );
  } finally {
    inflight.delete(key);
  }
}

export async function GET(request: NextRequest) {
  return handleTravelTimeRequest(request, request.nextUrl.searchParams);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const allowedKeys = [
    "origin",
    "destination",
    "departureTime",
    "travelMode",
    "provider",
    "originLatitude",
    "originLongitude",
    "destinationLatitude",
    "destinationLongitude",
  ];
  const searchParams = new URLSearchParams();
  for (const key of allowedKeys) {
    if (typeof body[key] === "string") searchParams.set(key, body[key]);
  }
  return handleTravelTimeRequest(request, searchParams);
}
