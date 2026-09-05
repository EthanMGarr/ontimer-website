import type {
  Confidence,
  Freshness,
  ObservedSecurityWait,
  WaitProvider,
} from "../types";

type FetchLike = typeof fetch;

interface CheckpointPayload {
  wait_time_minutes?: unknown;
  wait_time?: unknown;
  current_wait?: unknown;
  average_wait?: unknown;
}

interface AirportPayload extends CheckpointPayload {
  checkpoints?: unknown;
  wait_times?: unknown;
  waittimes?: unknown;
  updated_at?: unknown;
  last_updated?: unknown;
  timestamp?: unknown;
}

export interface ParsedProviderWait {
  minutes: number;
  observedAt: Date | null;
  freshness: Freshness;
  confidence: Confidence;
}

function boundedMinutes(value: unknown): number | null {
  return typeof value === "number" && isFinite(value) && value >= 0 && value <= 180
    ? value
    : null;
}

function parseTimestamp(value: unknown): Date | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const numericString = typeof value === "string" && /^\d+$/.test(value)
    ? Number.parseInt(value, 10)
    : null;
  const timestamp = numericString ?? value;
  const numeric = typeof timestamp === "number"
    ? (timestamp < 10_000_000_000 ? timestamp * 1000 : timestamp)
    : timestamp;
  const date = new Date(numeric);
  return isNaN(date.getTime()) ? null : date;
}

function classifyFreshness(observedAt: Date | null, now: Date): Freshness {
  if (!observedAt) return "unknown";
  const ageMinutes = (now.getTime() - observedAt.getTime()) / 60_000;
  if (ageMinutes < -5 || ageMinutes > 30) return "stale";
  if (ageMinutes <= 10) return "fresh";
  return "aging";
}

export function parseTsaWaitTimesResponse(data: unknown, now = new Date()): ParsedProviderWait | null {
  const candidate = Array.isArray(data) ? data[0] : data;
  if (!candidate || typeof candidate !== "object") return null;
  const airport = candidate as AirportPayload;
  const direct = boundedMinutes(airport.average_wait) ?? boundedMinutes(airport.current_wait);
  let minutes = direct;

  if (minutes === null) {
    const checkpoints = airport.checkpoints ?? airport.wait_times ?? airport.waittimes;
    if (!Array.isArray(checkpoints) || checkpoints.length === 0) return null;
    const waits = checkpoints.flatMap((raw) => {
      if (!raw || typeof raw !== "object") return [];
      const checkpoint = raw as CheckpointPayload;
      const wait = boundedMinutes(checkpoint.wait_time_minutes)
        ?? boundedMinutes(checkpoint.wait_time)
        ?? boundedMinutes(checkpoint.current_wait)
        ?? boundedMinutes(checkpoint.average_wait);
      return wait === null ? [] : [wait];
    });
    if (waits.length === 0) return null;
    minutes = Math.round(waits.reduce((sum, wait) => sum + wait, 0) / waits.length);
  }

  const observedAt = parseTimestamp(airport.updated_at ?? airport.last_updated ?? airport.timestamp);
  const freshness = classifyFreshness(observedAt, now);
  return {
    minutes,
    observedAt,
    freshness,
    confidence: freshness === "fresh" ? "medium" : "low",
  };
}

export function createTsaWaitTimesProvider(options: {
  fetchImpl?: FetchLike;
  now?: () => Date;
  timeoutMs?: number;
} = {}): WaitProvider {
  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? (() => new Date());
  const timeoutMs = options.timeoutMs ?? 4000;

  return {
    metadata: {
      id: "tsawaittimes-legacy",
      name: "TSAWaitTimes.com",
      official: false,
    },
    async fetchCurrentWait(airportCode) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetchImpl(
          `https://www.tsawaittimes.com/api/airports/${encodeURIComponent(airportCode.toUpperCase())}`,
          { signal: controller.signal, cache: "no-store" }
        );
        if (!response.ok) return null;
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType && !contentType.includes("json")) return null;
        const contentLength = Number.parseInt(response.headers.get("content-length") ?? "0", 10);
        if (contentLength > 256_000) return null;
        const body = await response.text();
        if (body.length > 256_000) return null;
        const parsed = parseTsaWaitTimesResponse(JSON.parse(body), now());
        if (!parsed) return null;
        return {
          minutes: parsed.minutes,
          airportCode,
          terminal: null,
          checkpoint: null,
          laneType: "general",
          valueKind: "provider-estimate",
          provider: this.metadata,
          observedAt: parsed.observedAt?.toISOString() ?? null,
          fetchedAt: now().toISOString(),
          freshness: parsed.freshness,
          confidence: parsed.confidence,
        } satisfies ObservedSecurityWait;
      } catch {
        return null;
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}
