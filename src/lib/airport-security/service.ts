import { extractAirportCode, predictSecurity } from "./model";
import type {
  AirportSecurityIntelligence,
  ObservedSecurityWait,
  SecurityEstimate,
  SecurityRequest,
  WaitProvider,
} from "./types";

interface CacheEntry {
  value: ObservedSecurityWait | null;
  expiresAt: number;
}

interface ProviderAttempt {
  providerId: string;
  cacheHit: boolean;
  durationMs: number;
  outcome: "accepted" | "stale" | "no-data";
}

export interface SecurityService {
  estimate(request: SecurityRequest): Promise<SecurityEstimate>;
}

export function createAirportSecurityService(options: {
  providers: WaitProvider[];
  now?: () => Date;
  positiveTtlMs?: number;
  negativeTtlMs?: number;
  maxCacheEntries?: number;
  log?: (event: Record<string, unknown>) => void;
}): SecurityService {
  const now = options.now ?? (() => new Date());
  const positiveTtlMs = options.positiveTtlMs ?? 5 * 60_000;
  const negativeTtlMs = options.negativeTtlMs ?? 60_000;
  const maxCacheEntries = options.maxCacheEntries ?? 250;
  const cache = new Map<string, CacheEntry>();
  const inFlight = new Map<string, Promise<ObservedSecurityWait | null>>();

  async function cachedFetch(provider: WaitProvider, airportCode: string) {
    const startedAt = performance.now();
    const key = `${provider.metadata.id}:${airportCode}`;
    const current = cache.get(key);
    const currentTime = now().getTime();
    if (current && current.expiresAt > currentTime) {
      return {
        value: current.value,
        cacheHit: true,
        durationMs: Math.round(performance.now() - startedAt),
      };
    }
    if (current) cache.delete(key);
    const existing = inFlight.get(key);
    if (existing) {
      return {
        value: await existing,
        cacheHit: true,
        durationMs: Math.round(performance.now() - startedAt),
      };
    }

    const request = provider.fetchCurrentWait(airportCode).catch(() => null);
    inFlight.set(key, request);
    try {
      const value = await request;
      cache.set(key, {
        value,
        expiresAt: currentTime + (value ? positiveTtlMs : negativeTtlMs),
      });
      while (cache.size > maxCacheEntries) {
        const oldestKey = cache.keys().next().value as string | undefined;
        if (!oldestKey) break;
        cache.delete(oldestKey);
      }
      return {
        value,
        cacheHit: false,
        durationMs: Math.round(performance.now() - startedAt),
      };
    } finally {
      inFlight.delete(key);
    }
  }

  return {
    async estimate(request) {
      const generatedAt = now();
      const airportCode = extractAirportCode(request.airportInput);
      const hoursUntilDeparture = (request.departure.getTime() - generatedAt.getTime()) / 3_600_000;
      let evidence: ObservedSecurityWait | null = null;
      let providerCacheHit = false;
      const providerAttempts: ProviderAttempt[] = [];
      let fallbackReason: string | null = null;

      if (request.jurisdiction === "us" && airportCode && hoursUntilDeparture <= 6) {
        for (const provider of options.providers) {
          const result = await cachedFetch(provider, airportCode);
          providerCacheHit ||= result.cacheHit;
          const candidate = result.value
            ? refreshEvidenceFreshness(result.value, generatedAt)
            : null;
          const outcome = !candidate
            ? "no-data"
            : candidate.freshness === "stale" ? "stale" : "accepted";
          providerAttempts.push({
            providerId: provider.metadata.id,
            cacheHit: result.cacheHit,
            durationMs: result.durationMs,
            outcome,
          });
          if (candidate && candidate.freshness !== "stale") {
            evidence = candidate;
            break;
          }
        }
        if (!evidence) fallbackReason = options.providers.length === 0
          ? "providers-disabled"
          : "provider-unavailable-invalid-or-stale";
      } else if (request.jurisdiction === "international") {
        fallbackReason = "international-jurisdiction";
      } else if (!airportCode) {
        fallbackReason = "airport-code-unavailable";
      } else {
        fallbackReason = "outside-live-window";
      }

      const prediction = predictSecurity(request, evidence, generatedAt);
      const inferredLane = prediction.lane !== "general" && evidence?.laneType !== prediction.lane;
      const source = request.jurisdiction === "international"
        ? "official-guidance"
        : evidence
          ? "live"
          : hoursUntilDeparture <= 24 ? "historical" : "fallback";
      const evidenceKind = inferredLane
        ? "inferred"
        : evidence?.valueKind ?? (source === "fallback" || source === "official-guidance" ? "fallback" : "historical");
      const sourcePath = [
        ...(evidence ? [evidence.provider.id] : []),
        prediction.method === "conservative-fallback" ? "ontimer-conservative-fallback" : "ontimer-arrival-time-pattern-v1",
        ...(inferredLane ? [`ontimer-${prediction.lane}-inference-v1`] : []),
        "ontimer-conservative-allowance-v1",
      ];

      const intelligence: AirportSecurityIntelligence = {
        airportCode,
        expectedSecurityArrivalAt: prediction.arrivalAt.toISOString(),
        observedWait: evidence,
        predictedWaitAtArrival: {
          minutes: prediction.predictedMinutes,
          range: prediction.range,
          predictedFor: prediction.arrivalAt.toISOString(),
          laneType: prediction.lane,
          valueKind: "predicted",
          confidence: prediction.confidence,
          method: prediction.method,
          evidenceKind,
        },
        recommendedSecurityAllowance: {
          minutes: prediction.recommendation,
          valueKind: "recommended",
          policy: "conservative-rounded-v1",
          confidence: prediction.confidence,
        },
        sourcePath,
        generatedAt: generatedAt.toISOString(),
        providerCacheHit,
      };

      options.log?.({
        event: "airport_security_estimate",
        airportCode,
        source,
        sourcePath,
        providerCacheHit,
        providerFreshness: evidence?.freshness ?? null,
        confidence: prediction.confidence,
        fallbackReason,
        providerAttempts,
      });

      const airportLabel = airportCode ?? "your airport";
      const context = request.jurisdiction === "international"
        ? `Estimated time for airport security at ${airportLabel}; check the airport for current queues`
        : evidence
          ? `Current security estimate for ${airportLabel}, adjusted for your expected arrival time`
          : source === "historical"
            ? `Estimated security time for ${airportLabel} when you are expected to arrive`
            : `Conservative airport security estimate for ${airportLabel}`;

      return {
        min: prediction.range.min,
        avg: prediction.recommendation,
        max: Math.max(prediction.range.max, prediction.recommendation),
        source,
        context,
        intelligence,
      };
    },
  };
}

function refreshEvidenceFreshness(
  evidence: ObservedSecurityWait,
  currentTime: Date
): ObservedSecurityWait {
  if (!evidence.observedAt) return evidence;
  const observedAt = new Date(evidence.observedAt);
  if (isNaN(observedAt.getTime())) {
    return { ...evidence, observedAt: null, freshness: "unknown", confidence: "low" };
  }
  const ageMinutes = (currentTime.getTime() - observedAt.getTime()) / 60_000;
  const freshness = ageMinutes < -5 || ageMinutes > 30
    ? "stale"
    : ageMinutes <= 10 ? "fresh" : "aging";
  return {
    ...evidence,
    freshness,
    confidence: freshness === "fresh" ? evidence.confidence : "low",
  };
}
