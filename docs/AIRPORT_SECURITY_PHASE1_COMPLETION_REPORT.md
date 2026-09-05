# Airport Intelligence Phase 1 Completion Report

Completed: 2026-09-04.  
Scope: security-wait engine only.  
Status: implemented and verified locally; not deployed by this change.

## 1. What changed

- Replaced route-local provider and blending logic with a provider-neutral TypeScript service.
- Preserved the legacy min, avg, max, source, and context response fields and added a normalized intelligence object.
- Separated current provider evidence, predicted wait at expected security arrival, and recommended security allowance.
- Replaced the fixed 50/30/20 blend with time-decaying evidence. Fresh near-term evidence can dominate; stale evidence is rejected; distant trips use the internal model.
- Moved the internal hourly pattern from flight departure hour to estimated security-arrival hour and added a small, explicit day-of-week heuristic.
- Centralized conservative PreCheck/CLEAR inference. CLEAR alone is no longer assumed to reduce the whole screening process by 60%.
- Added response validation, a four-second timeout, a 256 KB response cap, five-minute positive cache, one-minute negative cache, and in-flight request deduplication by provider and airport.
- Added structured, itinerary-free diagnostics and a provider kill switch.
- Changed the calculation-factor source label from “TSA estimate” to “airport security estimate.”
- Passed authoritative destination-page IATA codes to the security route and prioritized specific airport names over metro fallbacks, preventing LaGuardia from being mislabeled or requested as JFK.

## 2. What did not change

- No layout, page hierarchy, required input, result treatment, calendar flow, CTA flow, traffic integration, flight lookup, weather, parking, title, metadata, structured data, or airport page content changed.
- Security remains a background estimate with silent fallback.
- Google Routes behavior and costs are unchanged.
- No airport-operated page was scraped or integrated.
- No deployment was performed.

## 3. Current provider hierarchy

1. Licensed official/airport-operated adapter: architecture supports this, but none is enabled pending rights.
2. TSAWaitTimes.com legacy continuity adapter for U.S. trips within six hours.
3. OnTimer arrival-time hourly/day heuristic.
4. Conservative OnTimer fallback, including international jurisdictions and distant departures.

Every response records sourcePath. The legacy top-level source value “live” is retained for compatibility, while normalized evidence identifies TSAWaitTimes.com as a non-official provider estimate, not a TSA observation.

## 4. Direct/official sources discovered

- LGA, JFK, and EWR: official Port Authority sites publish real-time terminal/checkpoint tables, including General and PreCheck values where available. No documented public production API or reuse license was found. Sources: [Port Authority announcement](https://www.panynj.gov/port-authority/en/press-room/press-release-archives/2026-press-releases/port-authority-launches-new-websites-for-its-commercial-airports.html), [LGA terminals](https://www.laguardiaairport.com/explore-lga/terminals), [JFK](https://www.jfkairport.com/), and [EWR](https://www.newarkairport.com/).
- Other promising official public displays: [ATL](https://www.atl.com/times/), [LAX](https://www.flylax.com/wait-times), [DEN](https://www.flydenver.com/security/), [SEA](https://pre.flysea.org/page/live-estimated-checkpoint-wait-times), [DFW](https://www.dfwairport.com/security/), [PHX](https://www.skyharbor.com/), and [MIA](https://www.miami-airport.com/airport-security.asp).
- Explicit official APIs found outside the immediate U.S. network include [Swedavia](https://apideveloper.swedavia.se/) and [Schiphol](https://www.schiphol.nl/en/developer-center/explore-all-schiphols-apis-in-the-developer-center/).

## 5. Licensing questions requiring human verification

- Confirm that OnTimer is authorized to use the undocumented TSAWaitTimes.com legacy endpoint in a commercial acquisition funnel. The documented API requires a key and its commercial plan is currently $49.95/month; review its [API documentation](https://www.tsawaittimes.com/api/v1/main) and [terms](https://www.tsawaittimes.com/terms) before migration.
- Ask PANYNJ for a documented feed or partner access plus written commercial display, caching, freshness, and attribution terms for LGA/JFK/EWR.
- Obtain equivalent written terms before using any other airport’s public webpage data. Public visibility is not permission to scrape or republish.

## 6. Observed vs predicted vs recommended model

- Observed/current evidence: what a provider reports now, with provider identity, official status, timestamp, freshness, airport, terminal/checkpoint, lane, evidence type, and confidence. Today the continuity provider is explicitly classified as a provider estimate.
- Predicted wait at arrival: deterministic OnTimer estimate for the first-pass security-arrival time. It uses the arrival-time pattern plus a decaying current-condition deviation when usable evidence exists. Lane reductions without lane-specific evidence are marked inferred.
- Recommended allowance: the value used by the calculator. It adds a confidence-sensitive safety margin, rounds up to five minutes, applies conservative floors, and caps extreme output.

## 7. Caching behavior

- Evidence is keyed by provider and IATA code, never by address or itinerary. The in-process cache is bounded to 250 entries by default.
- Positive results cache for five minutes; provider failures/no-data cache for one minute.
- Concurrent misses for the same provider/airport share one promise.
- The cache is in-process and best-effort across serverless instances. Add a durable cache only if diagnostics justify it and licensing permits.

## 8. Tests added

The focused suite covers direct and checkpoint parsing, invalid/extreme/malformed responses, timestamps and cached-staleness re-evaluation, specific-airport/metro code precedence, arrival-hour modeling, current-evidence influence and decay, conservative PreCheck/CLEAR inference, hierarchy semantics, diagnostics, international and distant-departure fallback, provider exceptions, bounded positive caching, and concurrent-request deduplication.

## 9. Test results

- npm run test:airport-security — passed.
- npm run test:leave-time — passed.
- npm run test:airport-answer-seo — passed.
- npm run build — passed; all 223 routes generated.
- git diff --check — passed.
- Local browser verification — LGA loaded with meaningful content, correct LGA security labeling, no JFK mislabel, no framework overlay, and no console warnings/errors in a clean tab.
- Local route smoke test — returned a valid normalized LGA response and demonstrated negative-cache reuse on the second request.

The build emitted the repository’s existing warning that caniuse-lite data is seven months old; it did not affect the build.

## 10. Environment variables and credentials

- No new credential is required.
- Optional kill switch: AIRPORT_SECURITY_TSAWAITTIMES_ENABLED=false disables upstream TSAWaitTimes.com requests and uses the OnTimer model/fallback only.

## 11. Ongoing costs

- Incremental Phase 1 cost: $0.
- No paid API was added and no paid call frequency changed.
- A future migration to TSAWaitTimes.com’s documented commercial API is currently listed at $49.95/month and requires approval.

## 12. Remaining risks

- The continuity endpoint is undocumented and its authorization needs review.
- Provider responses may omit an observation timestamp, so those values receive low confidence and reduced influence.
- The hourly/day model is a transparent planning heuristic, not calibrated airport history. Observe production distributions before claiming predictive accuracy.
- The cache is per runtime rather than globally shared.
- Terminal/checkpoint fields are modeled but unavailable from the current adapter.
- Phase 1 changes allowances; monitor recommendation deltas and fallback rates after rollout even though the UX contract is unchanged.

## 13. Exact files changed

- docs/AIRPORT_INTELLIGENCE_PROJECT_PLAN.md
- docs/AIRPORT_SECURITY_PHASE1_COMPLETION_REPORT.md
- docs/SITE_CHANGELOG.md
- package.json
- src/app/api/security-wait/route.ts
- src/app/airport-time-to-leave-calculator/AirportCalculator.tsx
- src/lib/airport-security/index.ts
- src/lib/airport-security/model.ts
- src/lib/airport-security/service.ts
- src/lib/airport-security/types.ts
- src/lib/airport-security/providers/tsa-wait-times.ts
- src/lib/airport-security/__tests__/airport-security.test.ts

The pre-existing untracked .hallmark/log.json was not changed as part of the implementation.

## 14. Recommended Phase 2 plan for LGA

1. Secure a licensed LGA terminal/checkpoint feed and document freshness, lane definitions, caching, display, and attribution rules.
2. Establish a 28-day LGA baseline for impressions, clicks, starts, completions, result views, calendar handoffs, CTA views/clicks, performance, provider coverage, and fallback rate.
3. Add the official adapter behind provider and LGA capability flags; shadow-log normalized values before displaying them.
4. Validate terminal coverage and decide whether an airport-wide conservative aggregate is safe without a new input. Do not add a required terminal selector.
5. Add privacy-safe assignment and a result-view event; run A/A for at least seven days.
6. Design one compact result-adjacent explanation showing predicted wait at arrival and recommended allowance, with current evidence/source/time as subordinate context. Keep leave time and Add to Calendar dominant.
7. QA mobile breakpoints, provider failure/stale/malformed fixtures, calendar handoff, CTA sequence, and no-provider fallback.
8. Roll out treatment to 10% for 48 hours, then 50% if error, latency, completion, and handoff guardrails hold. Run at least 28 days.
9. Stop for misleading stale data, a funnel-breaking error, more than 100 ms attributable p75 LCP regression, more than one percentage-point absolute fatal-error increase, or more than 10% relative handoff degradation. Review at the -5% non-inferiority boundary.
10. Expand only after LGA is non-inferior on completion/calendar handoff and directionally positive on App Store/economic outcomes.
