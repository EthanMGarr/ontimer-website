import { NextRequest, NextResponse } from "next/server";

/// Server-side proxy to Google Maps Distance Matrix API with TTL caching.
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
const CACHE_REVALIDATE_S = 45 * 60;    // Next.js Data Cache TTL (seconds)
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

interface DistanceMatrixElement {
  status: string;
  duration?: { value: number };
  duration_in_traffic?: { value: number };
}

interface DistanceMatrixResponse {
  status: string;
  error_message?: string;
  rows?: { elements: DistanceMatrixElement[] }[];
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

// ─── Google Maps call ─────────────────────────────────────────────────────────

async function callDistanceMatrix(
  origin: string,
  destination: string,
  bucketedTime: number,
  apiKey: string
): Promise<TravelResult> {
  const params = new URLSearchParams({
    origins: origin,
    destinations: destination,
    mode: "driving",
    departure_time: bucketedTime.toString(),
    key: apiKey,
  });

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`;

  // Next.js Data Cache: revalidate every 45 min.
  // URL is deterministic (normalized + bucketed) so identical routes share
  // the same cache entry across all serverless instances on Vercel.
  const res = await fetch(url, { next: { revalidate: CACHE_REVALIDATE_S } });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data: DistanceMatrixResponse = await res.json();

  if (data.status !== "OK") {
    throw new Error(`Maps status=${data.status}${data.error_message ? ` msg=${data.error_message}` : ""}`);
  }

  const element = data.rows?.[0]?.elements?.[0];
  if (!element || element.status !== "OK") {
    throw new Error(`Element status=${element?.status ?? "missing"}`);
  }

  const durationSeconds =
    element.duration_in_traffic?.value ?? element.duration?.value ?? 0;

  return {
    durationMinutes: Math.ceil(durationSeconds / 60),
    hasTrafficData: !!element.duration_in_traffic,
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

  // ── Layer 3: Google Maps call (with Next.js Data Cache as backup) ─────────
  const promise = callDistanceMatrix(origin, destination, bucket, apiKey);
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
      { error: "Could not estimate drive time", cacheHit: false },
      { status: 502 }
    );
  } finally {
    inflight.delete(key);
  }
}
