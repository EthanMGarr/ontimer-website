import assert from "node:assert/strict";
import { extractAirportCode, predictSecurity } from "../model";
import { createAirportSecurityService } from "../service";
import type { ObservedSecurityWait, SecurityRequest, WaitProvider } from "../types";
import { parseTsaWaitTimesResponse } from "../providers/tsa-wait-times";

function baseRequest(overrides: Partial<SecurityRequest> = {}): SecurityRequest {
  return {
    airportInput: "LaGuardia Airport (LGA)",
    departure: new Date(2026, 8, 4, 13, 0),
    flightType: "domestic",
    jurisdiction: "us",
    hasPreCheck: false,
    hasClear: false,
    hasCheckedBag: false,
    arrivalMode: "parking",
    ...overrides,
  };
}

function providerEvidence(
  now: Date,
  overrides: Partial<ObservedSecurityWait> = {}
): ObservedSecurityWait {
  return {
    minutes: 40,
    airportCode: "LGA",
    terminal: null,
    checkpoint: null,
    laneType: "general",
    valueKind: "provider-estimate",
    provider: { id: "test-provider", name: "Test provider", official: false },
    observedAt: now.toISOString(),
    fetchedAt: now.toISOString(),
    freshness: "fresh",
    confidence: "medium",
    ...overrides,
  };
}

function testProviderParsing() {
  const now = new Date("2026-09-04T12:00:00.000Z");
  const direct = parseTsaWaitTimesResponse({ average_wait: 18, updated_at: now.toISOString() }, now);
  assert.equal(direct?.minutes, 18);
  assert.equal(direct?.freshness, "fresh");

  const nested = parseTsaWaitTimesResponse({ checkpoints: [
    { wait_time_minutes: 10 },
    { current_wait: 20 },
  ] }, now);
  assert.equal(nested?.minutes, 15);
  assert.equal(nested?.freshness, "unknown");

  const stale = parseTsaWaitTimesResponse({ current_wait: 12, timestamp: "2026-09-04T11:00:00.000Z" }, now);
  assert.equal(stale?.freshness, "stale");
  const epochString = parseTsaWaitTimesResponse({
    current_wait: 12,
    timestamp: String(Math.floor(now.getTime() / 1000)),
  }, now);
  assert.equal(epochString?.freshness, "fresh");
  assert.equal(parseTsaWaitTimesResponse({ average_wait: 999 }, now), null);
  assert.equal(parseTsaWaitTimesResponse({ checkpoints: [{ wait_time: "fast" }] }, now), null);
}

function testSpecificAirportNameWinsOverMetroFallback() {
  assert.equal(extractAirportCode("LaGuardia Airport, Queens, New York"), "LGA");
  assert.equal(extractAirportCode("John F Kennedy International Airport, New York"), "JFK");
}

function testArrivalTimePattern() {
  const now = new Date(2026, 8, 4, 8, 0);
  const result = predictSecurity(baseRequest(), null, now);
  // Parking + domestic fallback puts first-pass security arrival at 10:45.
  assert.equal(result.arrivalAt.getHours(), 10);
  assert.equal(result.predictedMinutes, 27);
  assert.equal(result.method, "arrival-time-pattern");
  assert.ok(result.recommendation >= result.predictedMinutes);
}

function testFreshEvidenceDominatesAndStaleEvidenceDoesNot() {
  const now = new Date(2026, 8, 4, 10, 0);
  const request = baseRequest({ departure: new Date(2026, 8, 4, 12, 15) });
  const baseline = predictSecurity(request, null, now);
  const fresh = predictSecurity(request, providerEvidence(now, { minutes: 50 }), now);
  const stale = predictSecurity(request, providerEvidence(now, { minutes: 50, freshness: "stale" }), now);
  assert.ok(fresh.predictedMinutes > baseline.predictedMinutes + 10);
  assert.equal(stale.predictedMinutes, baseline.predictedMinutes);
  assert.equal(fresh.method, "current-adjusted-pattern");
}

function testTrustedTravelerFactorsAreConservative() {
  const now = new Date(2026, 8, 4, 8, 0);
  const general = predictSecurity(baseRequest(), null, now);
  const precheck = predictSecurity(baseRequest({ hasPreCheck: true }), null, now);
  const clear = predictSecurity(baseRequest({ hasClear: true }), null, now);
  const both = predictSecurity(baseRequest({ hasPreCheck: true, hasClear: true }), null, now);
  assert.ok(precheck.recommendation < general.recommendation);
  assert.ok(clear.recommendation < general.recommendation);
  assert.ok(clear.recommendation >= both.recommendation);
}

async function testCacheAndInFlightDeduplication() {
  const now = new Date(2026, 8, 4, 10, 0);
  let calls = 0;
  let release: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  const provider: WaitProvider = {
    metadata: { id: "test-provider", name: "Test provider", official: false },
    async fetchCurrentWait() {
      calls += 1;
      await gate;
      return providerEvidence(now);
    },
  };
  const service = createAirportSecurityService({ providers: [provider], now: () => now });
  const request = baseRequest({ departure: new Date(2026, 8, 4, 13, 0) });
  const first = service.estimate(request);
  const second = service.estimate(request);
  release?.();
  const [a, b] = await Promise.all([first, second]);
  assert.equal(calls, 1);
  assert.equal(a.intelligence.providerCacheHit, false);
  assert.equal(b.intelligence.providerCacheHit, true);
  assert.equal((await service.estimate(request)).intelligence.providerCacheHit, true);
  assert.equal(calls, 1);
}

async function testSourceSemanticsAndFallbacks() {
  const now = new Date(2026, 8, 4, 10, 0);
  let calls = 0;
  const provider: WaitProvider = {
    metadata: { id: "test-provider", name: "Test provider", official: false },
    async fetchCurrentWait() {
      calls += 1;
      return providerEvidence(now);
    },
  };
  const service = createAirportSecurityService({ providers: [provider], now: () => now });
  const precheck = await service.estimate(baseRequest({
    departure: new Date(2026, 8, 4, 13, 0),
    hasPreCheck: true,
  }));
  assert.equal(precheck.source, "live");
  assert.equal(precheck.intelligence.observedWait?.valueKind, "provider-estimate");
  assert.equal(precheck.intelligence.predictedWaitAtArrival.evidenceKind, "inferred");
  assert.equal(precheck.avg, precheck.intelligence.recommendedSecurityAllowance.minutes);

  const international = await service.estimate(baseRequest({
    airportInput: "Heathrow Airport (LHR)",
    jurisdiction: "international",
    flightType: "international",
  }));
  assert.equal(international.source, "official-guidance");
  assert.equal(international.intelligence.observedWait, null);
  assert.equal(calls, 1);

  const farFuture = await service.estimate(baseRequest({
    departure: new Date(2026, 8, 6, 13, 0),
  }));
  assert.equal(farFuture.source, "fallback");
  assert.equal(farFuture.intelligence.observedWait, null);
  assert.equal(calls, 1);
}

async function testMalformedProviderGracefullyFallsBack() {
  const now = new Date(2026, 8, 4, 10, 0);
  const provider: WaitProvider = {
    metadata: { id: "broken", name: "Broken", official: false },
    async fetchCurrentWait() { throw new Error("provider unavailable"); },
  };
  const service = createAirportSecurityService({ providers: [provider], now: () => now });
  const estimate = await service.estimate(baseRequest({ departure: new Date(2026, 8, 4, 13, 0) }));
  assert.equal(estimate.source, "historical");
  assert.equal(estimate.intelligence.observedWait, null);
  assert.ok(estimate.avg > 0);
}

async function testCachedEvidenceFreshnessAndDiagnostics() {
  const now = new Date(2026, 8, 4, 10, 0);
  const logs: Array<Record<string, unknown>> = [];
  const provider: WaitProvider = {
    metadata: { id: "stale-provider", name: "Stale", official: false },
    async fetchCurrentWait() {
      return providerEvidence(now, {
        observedAt: new Date(now.getTime() - 31 * 60_000).toISOString(),
        freshness: "fresh",
      });
    },
  };
  const service = createAirportSecurityService({
    providers: [provider],
    now: () => now,
    log: (event) => logs.push(event),
  });
  const estimate = await service.estimate(baseRequest({
    departure: new Date(2026, 8, 4, 13, 0),
  }));
  assert.equal(estimate.source, "historical");
  assert.equal(estimate.intelligence.observedWait, null);
  assert.equal(logs[0]?.fallbackReason, "provider-unavailable-invalid-or-stale");
  assert.deepEqual(
    (logs[0]?.providerAttempts as Array<{ outcome: string }>).map((attempt) => attempt.outcome),
    ["stale"]
  );
}

async function testCacheIsBounded() {
  const now = new Date(2026, 8, 4, 10, 0);
  let calls = 0;
  const provider: WaitProvider = {
    metadata: { id: "bounded-provider", name: "Bounded", official: false },
    async fetchCurrentWait(airportCode) {
      calls += 1;
      return providerEvidence(now, { airportCode });
    },
  };
  const service = createAirportSecurityService({
    providers: [provider],
    now: () => now,
    maxCacheEntries: 1,
  });
  const nearDeparture = new Date(2026, 8, 4, 13, 0);
  await service.estimate(baseRequest({ airportInput: "LGA", departure: nearDeparture }));
  await service.estimate(baseRequest({ airportInput: "JFK", departure: nearDeparture }));
  await service.estimate(baseRequest({ airportInput: "LGA", departure: nearDeparture }));
  assert.equal(calls, 3);
}

async function main() {
  testProviderParsing();
  testSpecificAirportNameWinsOverMetroFallback();
  testArrivalTimePattern();
  testFreshEvidenceDominatesAndStaleEvidenceDoesNot();
  testTrustedTravelerFactorsAreConservative();
  await testCacheAndInFlightDeduplication();
  await testSourceSemanticsAndFallbacks();
  await testMalformedProviderGracefullyFallsBack();
  await testCachedEvidenceFreshnessAndDiagnostics();
  await testCacheIsBounded();
  console.log("airport security tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
