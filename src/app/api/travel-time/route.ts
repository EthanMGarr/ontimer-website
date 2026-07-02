import { NextRequest, NextResponse } from "next/server";

/// Server-side proxy for travel-time estimation with TTL caching.
///
/// ## Purpose
/// Keeps GOOGLE_MAPS_API_KEY server-only. Caches results to minimise upstream
/// API calls. Only called on explicit user submit — never on keystrokes or
/// page load.
///
/// ## API strategy (in order of preference)
/// 1. Google Routes API (routes.googleapis.com) — newer, richer traffic data.
///    Requires "Routes API" to be enabled in Google Cloud Console.
/// 2. Google Directions API (maps.googleapis.com) — older but lives on the same
///    domain as the Places API, so it is almost always already enabled when
///    autocomplete works. Used as a fallback if the Routes API is not enabled.
///
/// ## Cache design
/// Two-layer:
///   1. In-memory TTL cache (CACHE_TTL_MS) — per-instance, gives accurate
///      hit/miss detection for logging.
///   2. Next.js Data Cache (fetch revalidate) — cross-instance on Vercel,
///      transparent backup layer.
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface TravelResult {
  durationMinutes: number;
  hasTrafficData: boolean;
  trafficBasis: "live" | "predicted" | "scheduled" | "none";
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

// Directions API (legacy, maps.googleapis.com — same domain as Places API)
interface DirectionsApiLeg {
  duration?: { value: number };           // base drive time in seconds
  duration_in_traffic?: { value: number }; // traffic-aware drive time in seconds
}

interface DirectionsApiResponse {
  routes?: Array<{ legs?: DirectionsApiLeg[] }>;
  status?: string;       // "OK", "ZERO_RESULTS", "NOT_FOUND", etc.
  error_message?: string;
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

function cacheKey(origin: string, dest: string, bucket: number, mode: string): string {
  return `${normalize(origin)}|${normalize(dest)}|${bucket}|${mode}`;
}

/**
 * If a string looks like a bare IATA/ICAO airport code (2–4 letters, nothing
 * else), append "airport" so the Routes API geocoder resolves it correctly.
 * "EWR" → "EWR airport", "KEWR" → "KEWR airport", "Newark" → unchanged.
 */
function expandAirportCode(s: string): string {
  return /^[a-zA-Z]{2,4}$/.test(s.trim()) ? `${s.trim()} airport` : s;
}

function broaderOriginCandidate(origin: string): string | null {
  const parts = origin.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) return parts.slice(1).join(", ");

  const streetSuffix =
    /\b(?:street|st|avenue|ave|road|rd|lane|ln|drive|dr|court|ct|place|pl|way|boulevard|blvd)\b\.?/i;
  const match = origin.match(streetSuffix);
  if (!match || match.index === undefined) return null;

  const afterStreet = origin.slice(match.index + match[0].length).trim();
  return afterStreet.length >= 3 ? afterStreet : null;
}

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
  travelMode: string,
  useTraffic = true
): Promise<TravelResult> {
  // Routes API requires departureTime >= now (RFC3339 UTC).
  // Clamp so a bucketed time that fell into the past is still accepted.
  const nowUnix = Math.floor(Date.now() / 1000);
  const safeDepartureUnix = Math.max(bucketedTime, nowUnix + 60);
  const departureTime = new Date(safeDepartureUnix * 1000).toISOString();

  const body: Record<string, unknown> = {
    origin: { address: expandAirportCode(origin) },
    destination: { address: expandAirportCode(destination) },
    travelMode,
  };

  if (travelMode === "DRIVE" && useTraffic) {
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
    trafficBasis: travelMode === "DRIVE" && !useTraffic
      ? "none"
      : trafficBasisFor(bucketedTime, travelMode),
  };
}

// ─── Google Maps Directions API call (fallback) ───────────────────────────────
// Uses maps.googleapis.com — same domain as the Places API, so it is almost
// always already enabled when autocomplete is working. Serves as a reliable
// fallback when the Routes API (routes.googleapis.com) is not enabled.

async function callDirectionsApi(
  origin: string,
  destination: string,
  bucketedTime: number,
  apiKey: string
): Promise<TravelResult> {
  const nowUnix = Math.floor(Date.now() / 1000);
  const safeDepartureUnix = Math.max(bucketedTime, nowUnix + 60);

  const params = new URLSearchParams({
    origin: expandAirportCode(origin),
    destination: expandAirportCode(destination),
    key: apiKey,
    mode: "driving",
    departure_time: safeDepartureUnix.toString(),
    traffic_model: "best_guess",
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?${params}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data: DirectionsApiResponse = await res.json();

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(
      `Directions API: ${data.status ?? "unknown"}${data.error_message ? ` — ${data.error_message}` : ""}`
    );
  }

  const leg = data.routes?.[0]?.legs?.[0];
  if (!leg) throw new Error("Directions API returned no routes");

  const baseSec = leg.duration?.value ?? 0;
  const trafficSec = leg.duration_in_traffic?.value ?? baseSec;
  const hasTraffic = trafficSec !== baseSec;

  const hoursUntil = (safeDepartureUnix * 1000 - Date.now()) / (1000 * 60 * 60);
  const trafficBasis: TravelResult["trafficBasis"] = hasTraffic
    ? hoursUntil <= 6 ? "live" : "predicted"
    : "none";

  return {
    durationMinutes: Math.ceil(trafficSec / 60),
    hasTrafficData: hasTraffic,
    trafficBasis,
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const rawOrigin = searchParams.get("origin") ?? "";
  const rawDest = searchParams.get("destination") ?? "";
  const rawTime = searchParams.get("departureTime") ?? "";
  const rawMode = searchParams.get("travelMode") ?? "DRIVE";
  const travelMode = ["DRIVE", "WALK", "TRANSIT"].includes(rawMode) ? rawMode : "DRIVE";

  if (!rawOrigin.trim() || !rawDest.trim()) {
    return NextResponse.json(
      { error: "Missing required params: origin, destination" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
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
  const key = cacheKey(origin, destination, bucket, travelMode);

  // ── Layer 1: in-memory TTL cache ──────────────────────────────────────────
  const cached = cacheGet(key);
  if (cached) {
    console.log(`[travel-time] cache_hit key="${key}"`);
    return NextResponse.json({ ...cached, cacheHit: true });
  }
  console.log(`[travel-time] cache_miss key="${key}"`);

  // ── Layer 2: in-flight deduplication ─────────────────────────────────────
  const pending = inflight.get(key);
  if (pending) {
    console.log(`[travel-time] dedup_hit key="${key}"`);
    try {
      const result = await pending;
      return NextResponse.json({ ...result, cacheHit: false });
    } catch {
      // Pending request failed — fall through to a fresh attempt
    }
  }

  // ── Layer 3: Google Maps Routes API call ─────────────────────────────────
  const promise = callRoutesApi(origin, destination, bucket, apiKey, travelMode);
  inflight.set(key, promise);

  try {
    const result = await promise;
    cacheSet(key, result);
    console.log(
      `[travel-time] routes_api_called origin="${origin}" dest="${destination}" ` +
      `bucket=${bucket} mode=${travelMode} duration=${result.durationMinutes}min traffic=${result.hasTrafficData}`
    );
    return NextResponse.json({ ...result, cacheHit: false });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[travel-time] routes_api_failed key="${key}" err="${msg}"`);

    if (travelMode === "DRIVE") {
      try {
        console.warn(`[travel-time] retrying_without_traffic key="${key}"`);
        const fallbackResult = await callRoutesApi(
          origin,
          destination,
          bucket,
          apiKey,
          travelMode,
          false
        );
        cacheSet(key, fallbackResult);
        console.log(
          `[travel-time] routes_api_fallback_called origin="${origin}" dest="${destination}" ` +
          `bucket=${bucket} mode=${travelMode} duration=${fallbackResult.durationMinutes}min`
        );
        return NextResponse.json({
          ...fallbackResult,
          cacheHit: false,
          degraded: true,
        });
      } catch (fallbackErr) {
        const fallbackMsg = fallbackErr instanceof Error
          ? fallbackErr.message
          : String(fallbackErr);
        console.error(
          `[travel-time] routes_api_fallback_failed key="${key}" err="${fallbackMsg}"`
        );
      }

      const broaderOrigin = broaderOriginCandidate(origin);
      if (broaderOrigin && broaderOrigin !== origin) {
        try {
          console.warn(
            `[travel-time] retrying_with_broader_origin key="${key}" origin="${broaderOrigin}"`
          );
          const broaderResult = await callRoutesApi(
            broaderOrigin,
            destination,
            bucket,
            apiKey,
            travelMode,
            false
          );
          const degradedResult: TravelResult = {
            ...broaderResult,
            hasTrafficData: false,
            trafficBasis: "none",
          };
          cacheSet(key, degradedResult);
          console.log(
            `[travel-time] routes_api_broader_origin_called origin="${broaderOrigin}" dest="${destination}" ` +
            `bucket=${bucket} mode=${travelMode} duration=${degradedResult.durationMinutes}min`
          );
          return NextResponse.json({
            ...degradedResult,
            cacheHit: false,
            degraded: true,
          });
        } catch (broaderErr) {
          const broaderMsg = broaderErr instanceof Error
            ? broaderErr.message
            : String(broaderErr);
          console.error(
            `[travel-time] routes_api_broader_origin_failed key="${key}" err="${broaderMsg}"`
          );
        }
      }

      // ── Layer 4: Directions API (maps.googleapis.com) ─────────────────────
      // The Directions API lives on the same domain as the Places API, so it is
      // almost always already enabled when autocomplete is working — unlike the
      // Routes API which requires separate enablement in Google Cloud Console.
      try {
        console.warn(`[travel-time] retrying_with_directions_api key="${key}"`);
        const directionsResult = await callDirectionsApi(
          origin,
          destination,
          bucket,
          apiKey
        );
        cacheSet(key, directionsResult);
        console.log(
          `[travel-time] directions_api_called origin="${origin}" dest="${destination}" ` +
          `bucket=${bucket} duration=${directionsResult.durationMinutes}min traffic=${directionsResult.hasTrafficData}`
        );
        return NextResponse.json({
          ...directionsResult,
          cacheHit: false,
        });
      } catch (directionsErr) {
        const directionsMsg = directionsErr instanceof Error
          ? directionsErr.message
          : String(directionsErr);
        console.error(
          `[travel-time] directions_api_failed key="${key}" err="${directionsMsg}"`
        );
      }
    }

    return NextResponse.json(
      { error: msg, cacheHit: false },
      { status: 502 }
    );
  } finally {
    inflight.delete(key);
  }
}
