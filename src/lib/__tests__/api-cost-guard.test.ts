import {
  guardGoogleApiRequest,
  isTrustedBrowserRequest,
  resetApiCostGuardForTests,
} from "../api-cost-guard";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function request(headers: Record<string, string> = {}) {
  const normalized = new Map(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])
  );
  return {
    headers: { get: (name: string) => normalized.get(name.toLowerCase()) ?? null },
    nextUrl: { hostname: "www.ontimer.app" },
  };
}

const policy = {
  name: "test-api",
  perIpLimit: 2,
  perIpWindowMs: 1_000,
  globalLimit: 10,
  globalWindowMs: 1_000,
};

assert(
  isTrustedBrowserRequest(request({ "sec-fetch-site": "same-origin" }), true),
  "same-origin browser requests should be trusted"
);
assert(
  isTrustedBrowserRequest(request({ referer: "https://www.ontimer.app/calculator" }), true),
  "canonical referers should be trusted"
);
assert(
  !isTrustedBrowserRequest(request({ referer: "https://attacker.example/" }), true),
  "cross-site referers should be rejected"
);
assert(
  !isTrustedBrowserRequest(request(), true),
  "direct production requests without browser provenance should be rejected"
);

resetApiCostGuardForTests();
const browserRequest = request({
  "sec-fetch-site": "same-origin",
  "x-forwarded-for": "203.0.113.4",
});
assert(guardGoogleApiRequest(browserRequest, policy, 0, true).allowed, "first request should pass");
assert(guardGoogleApiRequest(browserRequest, policy, 1, true).allowed, "second request should pass");
const limited = guardGoogleApiRequest(browserRequest, policy, 2, true);
assert(!limited.allowed && limited.reason === "rate_limited", "third request should be rate limited");
assert(guardGoogleApiRequest(browserRequest, policy, 1_001, true).allowed, "limit should reset");

resetApiCostGuardForTests();
const blocked = guardGoogleApiRequest(request(), policy, 0, true);
assert(!blocked.allowed && blocked.reason === "untrusted_source", "untrusted request should be blocked");

console.log("api-cost-guard tests passed");
