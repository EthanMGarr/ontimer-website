interface HeaderReader {
  get(name: string): string | null;
}

interface GuardedRequest {
  headers: HeaderReader;
  nextUrl: { hostname: string };
}

export interface RateLimitPolicy {
  name: string;
  perIpLimit: number;
  perIpWindowMs: number;
  globalLimit: number;
  globalWindowMs: number;
}

interface Counter {
  count: number;
  resetAt: number;
}

export interface ApiCostGuardResult {
  allowed: boolean;
  reason?: "untrusted_source" | "rate_limited";
  retryAfterSeconds?: number;
}

const counters = new Map<string, Counter>();
const MAX_COUNTERS = 5_000;

function requestIp(headers: HeaderReader): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || headers.get("x-real-ip")?.trim()
    || "unknown";
}

export function isTrustedBrowserRequest(
  request: GuardedRequest,
  production = process.env.NODE_ENV === "production"
): boolean {
  if (!production) return true;

  if (request.headers.get("sec-fetch-site") === "same-origin") return true;

  const referer = request.headers.get("referer");
  if (!referer) return false;

  try {
    const hostname = new URL(referer).hostname;
    return hostname === request.nextUrl.hostname
      || (hostname === "ontimer.app" && request.nextUrl.hostname === "www.ontimer.app");
  } catch {
    return false;
  }
}

function consumeCounter(key: string, limit: number, windowMs: number, now: number) {
  const existing = counters.get(key);
  if (!existing || now >= existing.resetAt) {
    counters.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1_000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function guardGoogleApiRequest(
  request: GuardedRequest,
  policy: RateLimitPolicy,
  now = Date.now(),
  production = process.env.NODE_ENV === "production"
): ApiCostGuardResult {
  if (!isTrustedBrowserRequest(request, production)) {
    return { allowed: false, reason: "untrusted_source" };
  }

  if (counters.size > MAX_COUNTERS) counters.clear();

  const globalResult = consumeCounter(
    `${policy.name}:global`,
    policy.globalLimit,
    policy.globalWindowMs,
    now
  );
  if (!globalResult.allowed) {
    return {
      allowed: false,
      reason: "rate_limited",
      retryAfterSeconds: globalResult.retryAfterSeconds,
    };
  }

  const ipResult = consumeCounter(
    `${policy.name}:ip:${requestIp(request.headers)}`,
    policy.perIpLimit,
    policy.perIpWindowMs,
    now
  );
  if (!ipResult.allowed) {
    return {
      allowed: false,
      reason: "rate_limited",
      retryAfterSeconds: ipResult.retryAfterSeconds,
    };
  }

  return { allowed: true };
}

export function resetApiCostGuardForTests() {
  counters.clear();
}
