import { NextRequest, NextResponse } from "next/server";

/// Server-side proxy to Google Maps Routes API (computeRoutes) with TTL caching.
///
/// ## Purpose
/// Keeps GOOGLE_MAPS_API_KEY server-only. Caches results to minimise upstream
/// API calls. Only called on explicit user submit — never on keystrokes or
/// page load.
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

function cacheKey(origin: string, dest: string, bucket: number): string {
  return `${normalize(origin)}|${normalize(dest)}|${bucket}`;
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
  apiKey: string
): Promise<TravelResult> {
  // Routes API requires departureTime >= now (RFC3339 UTC).
  // Clamp so a bucketed time that fell into the past is still accepted.
  const nowUnix = Math.floor(Date.now() / 1000);
  const safeDepartureUnix = Math.max(bucketedTime, nowUnix + 60);
  const departureTime = new Date(safeDepartureUnix * 1000).toISOString();

  const body = {
    origin: { address: origin },
    destination: { address: destination },
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    departureTime,
  };

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
    // hasTrafficData is true when the traffic-aware duration differs from static
    hasTrafficData: durationSec !== staticSec,
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const rawOrigin = searchParams.get("origin") ?? "";
  const rawDest = searchParams.get("destination") ?? "";
  const rawTime = searchParams.get("departureTime") ?? "";

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
  const key = cacheKey(origin, destination, bucket);

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
  const promise = callRoutesApi(origin, destination, bucket, apiKey);
  inflight.set(key, promise);

  try {
    const result = await promise;
    cacheSet(key, result);
    console.log(
      `[travel-time] routes_api_called origin="${origin}" dest="${destination}" ` +
      `bucket=${bucket} duration=${result.durationMinutes}min traffic=${result.hasTrafficData}`
    );
    return NextResponse.json({ ...result, cacheHit: false });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[travel-time] routes_api_failed key="${key}" err="${msg}"`);
    return NextResponse.json(
      { error: msg, cacheHit: false },
      { status: 502 }
    );
  } finally {
    inflight.delete(key);
  }
}
