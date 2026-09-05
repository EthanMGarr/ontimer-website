# Airport Intelligence Project Plan

Status: Phase 1 implemented and verified locally; Phases 2–7 are planning only.  
Prepared: 2026-09-04.  
Owner: OnTimer.  
Economic north star: new MRR per 1,000 Google Search impressions.

## Executive decision

Build an airport-intelligence layer behind the existing calculator, not an airport-information portal in front of it. Keep the user-visible sequence unchanged: answer a small set of questions, show one dominant leave time, make Add to Calendar the next action, then present OnTimer. New signals earn a place only when they improve the recommendation, explain it, build justified trust, improve organic acquisition, or improve conversion.

Phase 1 strengthens security-wait semantics, prediction, provider isolation, caching, diagnostics, and tests without changing layout, required inputs, metadata, structured data, calendar handoff, traffic behavior, or CTA order. The official Port Authority pages for LGA, JFK, and EWR are promising but must not be integrated until commercial reuse and caching rights are confirmed in writing.

## Baseline and business case

Current approximate daily funnel supplied by the business:

| Metric | Daily baseline |
| --- | ---: |
| Google impressions | 16,000 |
| Search clicks / landing visits | 200 |
| App downloads | 20 |
| Paying users from downloads | about 1 |
| New MRR | about $6 |

Derived baselines: 1.25% search CTR, about 10% visit-to-download, about 5% download-to-paid, and **$0.375 new MRR per 1,000 impressions**. These are directional until Search Console, GA4, App Store Connect, and subscription revenue are joined on a consistent date and attribution basis.

## 1. Current-state audit

### Route and component inventory

- Generic airport calculator: `src/app/airport-time-to-leave-calculator/page.tsx` and `AirportCalculator.tsx`.
- Airport-specific pages: `src/app/airport-time-to-leave/[slug]/page.tsx`, statically generated from the indexable airport catalog.
- Shared airport destination-page definition: `src/core/leave-time/plugins/airports/website.tsx`.
- Shared destination page shell: `src/components/destination-pages/DestinationPageTemplate.tsx`.
- Airport domain calculation: `src/core/leave-time/plugins/airports/AirportPlugin.ts` and `types.ts`.
- Airport data: `src/lib/travel-locations.ts` plus `src/lib/international-airports.ts`. Records contain IATA code, canonical calculator destination, coordinates, terminals, domestic/international defaults, reviewed date, airport-specific modules/examples, popularity, related pages, and authoritative content sources.
- Supporting directory: `src/app/airport-time-calculators/page.tsx`.
- Adjacent but separate experiment: `src/app/airport-theory-calculator/*`; it does not use the security API.
- Relevant APIs: `src/app/api/security-wait/route.ts`, `src/app/api/travel-time/route.ts`, and Places/autocomplete routes.

### Concise architecture map

```text
Static airport catalog
  -> dynamic route generateStaticParams / metadata / page model
  -> DestinationPageTemplate
  -> AirportCalculator (client)
       -> security-wait route (reactive, debounced)
       -> travel-time route (explicit Calculate only)
       -> leaveTimePlanner + AirportPlugin
       -> dominant leave-time result
       -> Google Calendar or .ics handoff
       -> OnTimer App Store CTA (Android affiliate exception)
       -> GA4 events
```

### Current journey and calculation

1. The airport-specific route arrives with the airport prefilled; the generic route asks for it.
2. Required task inputs are flight date/time, flight type, origin, and airport. Refinements are optional and collapsed: PreCheck/CLEAR, checked bag, arrival mode, manual route time, arrival-buffer override, and security override.
3. The security route is called 500 ms after airport, date/time, flight type, or trusted-traveler selections change. An airport-specific page therefore makes a security request after hydration even before Calculate. It is not a paid call, but it is not currently shared or cached.
4. Google Routes is called only after explicit Calculate. It is server-side, same-origin guarded, rate-limited, time-bucketed, in-flight deduplicated, and cached best-effort for 45 minutes per serverless instance.
5. `AirportPlugin` calculates `leaveAt = departure - airport buffer - security - travel`. Its base buffer is 90 minutes domestic or 135 minutes international, plus 15 for a checked bag and 5/15/20 depending on drop-off/rideshare, transit, or parking. Security defaults are 25 domestic and 45 international.
6. The result keeps “Leave by” dominant, then Add to Calendar. The OnTimer CTA appears after the calendar handoff in the protected single-primary-action flow. Calendar events contain the computed leave time and full airport location.

### Current security implementation

- U.S. trips within six hours call `https://www.tsawaittimes.com/api/airports/{IATA}` with a four-second timeout and `no-store`.
- The parser accepts several undocumented shapes and collapses checkpoint values into one arithmetic airport average. It does not retain terminal, checkpoint, lane, provider timestamp, or freshness.
- When a positive current value is present, the route labels the result `live`; otherwise it uses a generic hourly pattern for trips up to 24 hours away and a fallback source after 24 hours.
- The 24-value hourly curve represents a typical U.S. domestic wait by hour. International flight values multiply that curve by 1.8. Critically, the current code indexes the curve by **flight departure hour**, not expected security-arrival hour.
- A fixed blend weights live 50%, hourly pattern 30%, and fallback 20%. Without live data it weights hourly pattern 60% and fallback 40%.
- Domestic fallback range is 15/25/45 minutes; international is 30/45/75.
- PreCheck multiplies the calculated average by 0.60 and range by 0.65. CLEAR takes precedence and multiplies average by 0.40 and range by 0.50. Neither is based on a lane observation, and both are currently presented without internal inferred/observed provenance.
- Non-U.S. airports never call the provider and use conservative internal estimates with an `official-guidance` source label.
- Provider failure is silent to users and always returns a 200 estimate. That graceful behavior is correct and must remain.
- There is no staleness check, response-size/content-type guard, airport-level cache, in-flight deduplication, structured diagnostic event, or security-engine test suite.
- `Live TSA wait estimate` and `TSA estimate` are misleading because TSAWaitTimes.com is an independent company and its own documentation describes a blend of government, traveler, historical, and proprietary inputs. OnTimer should say `TSAWaitTimes.com estimate` internally and, if exposed later, `Current security estimate` with source attribution.

### Analytics audit

Existing GA4 coverage includes page views, `calculator_started`, `calculator_completed`, `airport_leave_time_answer_generated`, calendar handoff opened by provider, automatic-alert CTA viewed/clicked, App Store outbound click, QR events, adjustment/breakdown opens, route calls/fallbacks, and Android affiliate actions. Events carry a first-party random attribution token, landing page, traffic source, UTM term when supplied, calculator type, and airport code where available.

Gaps: no explicit result-view impression separate from answer generation, no confirmed calendar-save event (a browser handoff cannot prove save), no security source/freshness/confidence dimensions, no experiment assignment event, and no repository-visible join from attribution token to App Store install, trial, paid conversion, or MRR. Search impressions/clicks live in Search Console and are not joined to GA4 at the individual-query level.

### SEO and structured data audit

- Airport pages have static, unique metadata, self-referencing canonicals, Open Graph/Twitter metadata, crawlable airport-specific guidance, internal links, reviewed dates, sources, and sitemap inclusion.
- Pages emit `SoftwareApplication`, `FAQPage`, and `BreadcrumbList` JSON-LD. `SoftwareApplication` remains a Google-supported type and `TravelApplication` is a supported category. FAQ rich results are generally restricted to authoritative government and health sites, so FAQ markup should not be treated as a growth lever for OnTimer.
- The calculator is client-hydrated, while the explanatory airport content and schema are server-rendered/static. This is a sound acquisition boundary: essential evergreen content is crawlable without waiting for live providers.
- No Phase 1 SEO changes are warranted. Dynamic conditions should not be added to titles, descriptions, `dateModified`, or static page copy merely to imply freshness.

### Current providers and visible costs

- Travel time: Google Routes `TRAFFIC_AWARE`, server-side `GOOGLE_MAPS_API_KEY`. The request likely qualifies as Compute Routes Pro; current public pricing lists a 5,000 monthly free cap and $10/1,000 requests at the first paid tier. Billing/SKU must be verified in the actual Google Cloud project.
- Address suggestions: Google Places through existing protected routes; not changed by this initiative.
- Security: an unauthenticated legacy TSAWaitTimes.com endpoint. The vendor’s current documented API requires a key and paid subscription at $49.95/month, permits commercial API use subject to terms, and encourages caching. The legacy endpoint’s commercial status and continued availability are not established.
- Analytics: GA4; no direct per-event cost visible.
- Hosting/cache: Vercel/server memory. In-memory caches are instance-local and must not be represented as durable cost controls.

## 2. Product principles

1. Preserve speed and simplicity; keep the answer path shorter than the explanation path.
2. Answer “When should I leave?” before presenting supporting intelligence.
3. No airport-dashboard creep. A signal belongs only when it changes the recommendation, confidence, search differentiation, or conversion.
4. Add no required input unless evidence shows a material improvement that exceeds its completion cost.
5. Live data must alter or validate the answer, not decorate the page.
6. Keep observed, provider-estimated, OnTimer-predicted, and OnTimer-recommended values distinct in data and copy.
7. Bias recommendations conservatively because missing a flight has asymmetric cost.
8. Graceful degradation is mandatory. A provider outage must never prevent an answer.
9. Keep a useful static/server-rendered shell and internal estimates when JavaScript or providers fail where practical.
10. Mobile-first: one dominant answer, one primary action, optional explanation below it.
11. Never imply a third-party estimate is TSA.gov or airport-operated data.
12. Preserve the calendar-to-OnTimer conversion contract and existing analytics during every experiment.

## 3. Phased rollout

### Phase 1 — Security-wait foundation and accuracy

- Objective: create honest, testable security intelligence with provider isolation and conservative fallbacks.
- User value: a better allowance with fewer misleading assumptions, while the experience remains familiar.
- Technical scope: normalized types; provider adapters; source hierarchy; arrival-time prediction; freshness/confidence; caching; deduplication; timeouts; diagnostics; tests; backward-compatible response.
- Dependencies: current TSAWaitTimes endpoint for continuity; no new direct-airport source until rights are approved.
- UX: no layout or input changes; only correct internal source labels.
- SEO/GEO: none outwardly; documentation establishes future attribution semantics.
- Analytics: server diagnostics only in Phase 1; no new GA4 behavioral event needed.
- Risks: undocumented legacy provider shape/rights; model changes alter allowances; sparse evidence.
- Complexity: medium, about 4–7 engineering days including research/tests/review.
- Ongoing cost: $0 incremental in the implemented configuration. A compliant TSAWaitTimes account would be $49.95/month at current public pricing.
- Rollout criteria: contract tests pass; stale/malformed/provider-failure cases return a safe estimate; result/calendar/CTA regressions pass; no paid call added.
- Success: 100% valid responses, zero funnel-breaking provider errors, source path observable in logs, model output within defined safety bounds.
- Rollback: feature flag or restore the prior route; client contract remains compatible.

### Phase 2 — LGA airport-intelligence pilot

- Objective: validate the smallest useful “Why this time?” treatment and the live/predicted/recommended distinction.
- User value: understand why the leave time is trustworthy without scanning a dashboard.
- Technical scope: LGA capability flag; licensed Port Authority adapter or approved vendor; normalized terminal/checkpoint values; server aggregate endpoint; experiment assignment.
- Dependencies: written Port Authority/API permission or paid licensed provider; reliable terminal mapping. LGA is preferred because it is high-value, operationally variable, and already has official terminal-level General/PreCheck values. Use another airport only if baseline traffic or licensing makes it decisively better.
- UX: under the dominant result, one compact explanation: route duration/traffic impact, predicted security at arrival, recommended allowance, and freshness/source disclosure. No new required field; terminal remains absent until flight lookup or a lightweight optional selector proves worthwhile.
- SEO/GEO: keep live content supplemental and accurately timestamped; do not change titles or static review dates.
- Analytics: random stable assignment; impression, explanation open, adjustment open, calendar click, post-calendar CTA, App Store click, plus downstream attribution.
- Risks: explanation competes with calendar CTA; airport-wide aggregate is mistaken for the user’s terminal; volatile values reduce trust.
- Complexity: medium–high, 2–4 weeks including provider/legal and experiment QA.
- Ongoing cost: $0–$100/month depending on licensed source and monitoring.
- Rollout criteria: source rights, 95%+ fresh-data availability during checkpoint hours, no Core Web Vitals regression, successful A/A instrumentation.
- Success: non-inferior calculator completion and calendar handoff (guardrail no worse than -5% relative); directional lift in App Store click and trust interaction; no increase in error rate.
- Rollback: disable `airportIntelligenceLga` flag; retain Phase 1 internal model.

### Phase 3 — Traffic and personalized arrival intelligence

- Objective: make route conditions affect the actual recommendation and explain the delta from free-flow travel.
- User value: know the traffic-adjusted leave time, not merely a generic drive duration.
- Technical scope: preserve explicit-submit Google Routes call; retain static and traffic-aware durations; compute `trafficImpactMinutes`; pass calculated airport-arrival time into security prediction; avoid request waterfalls with parallel work where possible.
- Dependencies: Google Routes quotas/billing; clear handling for transit schedules and current-location coordinates.
- UX: one supporting fact such as “Traffic adds 18 min” only when the delta is meaningful; no map by default.
- SEO/GEO: evergreen explanation remains server-rendered; no user-specific route data indexed.
- Analytics: route success/fallback, traffic-delta band, recommendation change, completion and downstream funnel.
- Risks: privacy, cost, forecast uncertainty, route API outage.
- Complexity: medium, 1–3 weeks.
- Ongoing cost: current usage likely within the 5,000 Pro free cap; roughly $10 at 6,000, $100 at 15,000, and $250 at 30,000 uncached monthly requests before discounts.
- Rollout criteria: quota kill switch, manual fallback, no more than one paid request per Calculate, cost alerts verified.
- Success: higher calendar conversion with no completion loss; lower manual fallback; cost per incremental download within target CAC.
- Rollback: disable traffic-delta explanation and revert to current duration consumption; manual travel remains.

### Phase 4 — Optional flight-number intelligence

- Objective: reduce manual ambiguity by deriving airline, terminal, scheduled departure, delay state, and domestic/international context.
- User value: fewer inputs and a more specific recommendation.
- Technical scope: optional carrier+flight lookup after explicit action; normalize flight identity/status/terminal; never make lookup mandatory; cache shared flight records by flight/date; preserve manual overrides.
- Dependencies: FlightAware AeroAPI, Cirium, or another provider with explicit B2C display/storage terms; airline/terminal mapping.
- UX: optional “Add flight number” shortcut, progressive disclosure, editable derived fields, clear “last updated.”
- SEO/GEO: no itinerary-specific indexable URLs; exclude flight details from static schema.
- Analytics: offer view/use/success/failure, fields avoided, completion, downstream funnel, lookup cost.
- Risks: codeshares, reused flight numbers, terminal changes, licensing, personal itinerary sensitivity.
- Complexity: high, 3–6 weeks.
- Ongoing cost: FlightAware commercial B2C use currently implies at least its Standard tier ($100/month minimum plus query charges); Cirium is usage/contract based and requires quote/terms review.
- Rollout criteria: 95%+ lookup success for pilot carriers, editable results, privacy review, spend cap, no blocking failure.
- Success: reduced completion time or higher completion with neutral downstream conversion; positive net value after data cost.
- Rollback: hide optional lookup and retain manual workflow.

### Phase 5 — Operational intelligence

- Objective: apply only airport/weather/parking/transit disruptions that materially change leave time or confidence.
- User value: receive an earlier recommendation when an actual operational risk warrants it.
- Technical scope: FAA NAS events; NWS alerts/forecast; licensed airport alerts/parking/transit feeds; deterministic impact rules with caps and provenance.
- Dependencies: FAA/NWS availability, airport-specific permissions, operational rule review.
- UX: only show exceptional signals with action impact; no permanent status dashboard.
- SEO/GEO: current-condition blocks must include source and timestamp; static content must not claim a live condition.
- Analytics: signal present/applied/dismissed, recommendation delta, conversion guardrails.
- Risks: double-counting delay, false urgency, noisy alerts, inconsistent coverage.
- Complexity: high, 4–8 weeks incrementally.
- Ongoing cost: FAA/NWS are free public services; airport parking/alert feeds may require contracts; monitoring/storage likely low tens of dollars monthly at current scale.
- Rollout criteria: documented materiality threshold and false-positive review on historical samples.
- Success: signals change recommendations rarely but appropriately; no conversion harm; low stale/false-positive rate.
- Rollback: disable each signal independently.

### Phase 6 — SEO/GEO scaling

- Objective: expand proven intelligence/content patterns across the highest-value airport pages.
- User value: locally specific answers with transparent sources and current context.
- Technical scope: airport capability catalog; shared server-rendered answer format; source/update metadata; scalable QA; expansion ordered by Search Console value.
- Dependencies: Phase 2–5 evidence; rights by airport/provider; content review capacity.
- UX: reuse the validated compact result hierarchy, not a page-by-page feature accretion.
- SEO/GEO: unique titles/descriptions remain stable unless tested; crawlable airport-specific facts; genuine `dateModified` only for substantive updates; source links; no unsupported schema invention; remove/retain FAQ markup based on maintenance value, not expected rich results.
- Analytics: airport cohort, impression-weighted economic output, indexation, CTR, Core Web Vitals.
- Risks: programmatic thinness, duplicated text, fake freshness, crawl load, inconsistent data coverage.
- Complexity: high, 4–10 weeks in batches.
- Ongoing cost: driven by provider coverage, not page count, if airport-level calls are cached.
- Rollout criteria: top-airport QA, Search Console monitoring, no title/canonical/schema regression, content uniqueness validator.
- Success: improved CTR and new MRR/1,000 impressions with stable rankings, speed, and conversion.
- Rollback: airport capability flags and batch-level content reversion.

### Phase 7 — Optimization and monetization

- Objective: maximize qualified acquisition economics without weakening the task flow.
- User value: a clearer path from one-time answer to automatic future alarms.
- Technical scope: joined reporting; experiment platform; landing/result/CTA variants; attribution improvements.
- Dependencies: App Store and subscription attribution, sufficient sample size, privacy-safe event design.
- UX: test copy and sequencing within the protected hierarchy; do not add monetization before the answer/calendar action.
- SEO/GEO: separate SEO tests from product/CTA tests when possible to identify causality.
- Analytics: full funnel and north star.
- Risks: low daily conversions make tests slow; multiple simultaneous changes confound results.
- Complexity: ongoing.
- Ongoing cost: analytics warehouse/ETL may be $0–$100/month initially.
- Rollout criteria: preregister hypothesis, primary metric, guardrails, minimum runtime/sample, and stopping rule.
- Success: statistically and economically credible lift in new MRR/1,000 impressions.
- Rollback: revert losing variant; retain event definitions.

## 4. Technical architecture

### Boundary

The UI consumes one provider-neutral `AirportSecurityIntelligence` result. Providers return normalized current evidence only. The deterministic engine predicts wait at the planned airport-arrival time and turns that prediction into a conservative allowance. Provider code never imports React or calculator components.

```text
SecurityProvider[]
  -> fetch current evidence (timeout)
  -> validate and normalize
  -> airport cache + in-flight dedup
  -> source hierarchy / first acceptable evidence
  -> deterministic prediction at planned arrival
  -> trusted-traveler inference if lane observation absent
  -> conservative recommended allowance
  -> backward-compatible route response
```

### Recommended TypeScript model

```ts
type SecurityLaneType = "general" | "precheck" | "clear" | "unknown";
type EvidenceKind = "observed" | "provider-estimate" | "inferred" | "historical" | "fallback";
type Freshness = "fresh" | "aging" | "stale" | "unknown";
type Confidence = "high" | "medium" | "low";

interface SecurityWaitEvidence {
  airportCode: string;
  terminal?: string;
  checkpoint?: string;
  laneType: SecurityLaneType;
  minutes: number;
  valueKind: EvidenceKind;
  provider: { id: string; name: string; official: boolean };
  observedAt?: string;
  fetchedAt: string;
  freshness: Freshness;
  confidence: Confidence;
}

interface PredictedSecurityWait {
  minutes: number;
  range: { min: number; max: number };
  forArrivalAt: string;
  method: "current-plus-temporal-delta" | "historical-pattern" | "fallback";
  confidence: Confidence;
  inputs: string[];
}

interface RecommendedSecurityAllowance {
  minutes: number;
  rationale: string;
  confidence: Confidence;
}

interface AirportSecurityIntelligence {
  observedWait: SecurityWaitEvidence | null;
  predictedWaitAtArrival: PredictedSecurityWait;
  recommendedSecurityAllowance: RecommendedSecurityAllowance;
  sourcePath: string[];
  generatedAt: string;
}
```

### Provider adapter contract

Each adapter declares provider identity, whether it is official, covered airports, optional lane/terminal capability, timeout, and `fetchCurrentWait`. Provider results must be bounded, timestamped when the source supplies a time, and explicitly classified. Adapters may be added/removed without changing route or UI code.

### Capabilities and flags

Extend the airport catalog or maintain a parallel server-only capability registry with: `securityProviders`, `terminalGranularity`, `laneTypes`, `rightsStatus`, `pilotEnabled`, and `maxFreshnessMinutes`. Client-visible flags should reveal capability, not provider credentials. Initial flags: global engine on; official adapters off; LGA enhanced UX off.

### Prediction and recommendation policy

- Predict for estimated security-entry/airport-arrival time, not flight departure hour.
- A fresh current value is evidence, not the future answer. Adjust it by the change between historical conditions now and at arrival, with influence that decays as arrival moves away.
- Never use a fixed 50/50 dilution. Fresh evidence can dominate near-term predictions; stale or far-away evidence contributes little or nothing.
- Use genuine lane-specific evidence when available. Otherwise apply reviewed PreCheck/CLEAR factors and mark the result inferred.
- Recommended allowance rounds conservatively and includes an uncertainty margin. It may exceed prediction.
- Clamp all stages to documented safety bounds and always provide a fallback.

### Caching and resilience

- Airport/provider/lane evidence key; no user origin or flight details in shared cache.
- Suggested positive TTL: 5 minutes for timestamped official observations, 10 minutes for provider estimates; short negative cache (60 seconds) to prevent failure storms.
- Stale-if-error: an expired but previously valid observation may be used only within a bounded grace period and must be marked stale/low-confidence; Phase 1 can instead fall back immediately if durable stale storage is unavailable.
- In-flight deduplication per serverless instance.
- Provider timeout 2.5–4 seconds; total route budget under 4.5 seconds; no automatic retry in the user request.
- Bounded response/body validation, no thrown user-facing provider errors, structured source-path logs without origin/itinerary data.

## 5. Data-source strategy

All prices and product terms are a 2026-09-04 research snapshot and require confirmation before purchase. “Public page” does not mean “licensed API.”

| Category | Provider / status | Interface, auth, freshness/granularity | Pricing/quota | Reliability, license, and OnTimer value |
| --- | --- | --- | --- | --- |
| Security | Port Authority official LGA/JFK/EWR sites | Public Next/AEM experience; real-time terminal General and PreCheck tables with timestamps; no documented public API/auth discovered | No public API price | High operational value and excellent pilot fit. Endpoint/feed and commercial caching/display rights require written PANYNJ approval. Do not scrape for production. |
| Security | TSAWaitTimes.com | Current documented REST API uses API key; airport-wide current estimate, hourly estimates, checkpoint/PreCheck availability; source combines government, traveler, historical and proprietary data | $49.95/month self-service; high-volume/custom licensing possible | Broad U.S. fallback, but not TSA.gov and not a pure observation. Commercial API use is allowed under vendor terms, with restrictions; legacy unauthenticated endpoint used today needs review/migration. |
| Security | MyTSA | Official TSA app; historical busy patterns and crowd-sourced waits. TSA is developing internal real-time-wait ingestion and public sharing, but no current supported public production API was confirmed | Free app/public service | Authoritative identity but crowd-sourced wait accuracy and unsupported legacy web-service risk make it unsuitable as a new direct production dependency today. Re-evaluate when TSA publishes a supported API. |
| Security | Airport-operated sources (ATL, LAX, DEN, SEA, DFW, PHX, MIA) | Official pages expose checkpoint/terminal values or predicted bands; General/PreCheck varies; cadence often minutes | Usually public display, no public API price | Strong future adapters after operator permission. Confirm feed, caching, display, attribution, and commercial terms airport by airport. |
| Security | Swedavia WaitTime | Official subscription-key REST API for Swedavia airports; checkpoint-level current waits; developer portal advertises 99.9% availability and 500k calls/day platform capacity | Account/key; pricing/terms to confirm | Best example of an explicit official airport API; relevant only when Swedish airports enter scope. |
| Security | Schiphol Developer Center | Official APIs including predicted wait times; access request and commercial discussion | Quote/access controlled | Useful for AMS later; rights are clearer than scraping but contract review is required. |
| Routing | Google Routes | REST `computeRoutes`, API key/OAuth, live/predicted traffic, route-specific | `TRAFFIC_AWARE` is Pro: 5k free monthly then $10/1k at first tier | Already integrated and high recommendation value. Keep explicit-submit only, one call, quotas, rate limits, cache, and manual fallback. Confirm actual billed SKU. |
| Routing | Mapbox Directions / TomTom Routing | REST key/token; traffic and route ETA vary by plan/region | Usage-based; current quote/pricing review required | Potential fallback or negotiating leverage, but switching risks ETA quality. Benchmark before use. |
| Flight status / terminal | FlightAware AeroAPI | REST `x-apikey`; flight identity, schedule/status, terminal/gate where reported | B2C commercial Standard currently shows $100/month minimum plus per-query fees; Premium $1,000 minimum/SLA | Strong coverage and explicit B2C license path. Only query after optional flight-number action; cache by flight/date. |
| Flight status / terminal | Cirium Sky / FlightStats | REST/JSON/XML; flight status, schedules, FIDS, delay index; evaluation then commercial/contract | Usage/contract pricing; quote required | Strong aviation data; evaluation terms restrict caching. Commercial caching/display terms must be negotiated before architecture is finalized. |
| Airport operations | FAA NAS Status | Official public web/XML feed for ground stops, ground delays, closures and arrival programs; near real time | Free/public; reasonable use | High value for exceptional U.S. disruptions. Cache airport-level data; do not interpret every event as a departure delay. |
| Weather | NOAA/NWS API | Official JSON-LD REST API for observations, forecasts and alerts; user-agent requested; cache-friendly | Free; unpublished reasonable rate limits | Use only severe/relevant conditions. Cache by airport/grid; timeout/fallback. International airports need local official services or licensed global provider. |
| Parking | Individual airport operators / parking contractors | Public availability/reservation pages; APIs rarely documented | Usually no public API price | Only valuable when scarcity or shuttle transfer changes leave time. Seek permission/API; do not scrape booking pages or send user itinerary unnecessarily. |

Primary research references: [PANYNJ airport-site launch](https://www.panynj.gov/port-authority/en/press-room/press-release-archives/2026-press-releases/port-authority-launches-new-websites-for-its-commercial-airports.html), [JFK official live table](https://www.jfkairport.com/), [TSAWaitTimes API documentation and pricing](https://www.tsawaittimes.com/api/v1/main), [TSAWaitTimes terms](https://www.tsawaittimes.com/terms), [MyTSA](https://www.tsa.gov/mobile), [TSA real-time wait-time collection notice](https://public-inspection.federalregister.gov/2026-04443.pdf), [ATL waits](https://www.atl.com/times/), [LAX waits](https://www.flylax.com/wait-times), [DEN security](https://www.flydenver.com/security/), [SEA waits](https://pre.flysea.org/page/live-estimated-checkpoint-wait-times), [DFW security](https://www.dfwairport.com/security/), [PHX](https://www.skyharbor.com/), [MIA security](https://www.miami-airport.com/airport-security.asp), [Swedavia API](https://apideveloper.swedavia.se/), [Schiphol APIs](https://www.schiphol.nl/en/developer-center/explore-all-schiphols-apis-in-the-developer-center/), [Google Routes pricing](https://developers.google.com/maps/billing-and-pricing/pricing), [FlightAware pricing/licensing](https://www.flightaware.com/commercial/aeroapi/), [Cirium getting started](https://developer.flightstats.com/getting-started/), [FAA NAS Status](https://nasstatus.faa.gov/), and [NWS API](https://www.weather.gov/documentation/services-web-api).

## 6. Cost model

### Assumptions

- 30-day month; visits scale with impressions at the current 1.25% CTR.
- 50% of landing visits complete a calculation (must be replaced with measured GA4 rate).
- One Google Routes request per completion before cache savings.
- Security endpoint requests can happen on airport-specific hydration and input changes, but upstream evidence is airport-level and cached. Model one client request per visit and 20% upstream misses as a conservative early estimate; actual miss rate depends on airport distribution and serverless instance churn.
- Future optional flight lookup adoption is 30% of completions and one query per lookup.
- Weather/FAA are shared airport-level cached calls, never pageview-paid calls.

| Scale | Impressions/day | Visits/month | Completions / max Routes calls | Security client requests / modeled upstream | Optional flight lookups |
| --- | ---: | ---: | ---: | ---: | ---: |
| Current | 16,000 | 6,000 | 3,000 | 6,000 / 1,200 | 900 |
| 2x | 32,000 | 12,000 | 6,000 | 12,000 / 2,400 | 1,800 |
| 5x | 80,000 | 30,000 | 15,000 | 30,000 / 6,000 | 4,500 |
| 10x | 160,000 | 60,000 | 30,000 | 60,000 / 12,000 | 9,000 |

| Cost center | Current | 2x | 5x | 10x | Materiality point |
| --- | ---: | ---: | ---: | ---: | --- |
| Google Routes Pro, conservative uncached estimate | $0 | ~$10/mo | ~$100/mo | ~$250/mo | Above 5,000 requests/month; verify SKU and cache hit rate. |
| Phase 1 security legacy adapter | $0 incremental | $0 | $0 | $0 | Availability/licensing, not compute cost, is the concern. |
| Compliant TSAWaitTimes documented API | $49.95/mo | $49.95 | $49.95 or high-use quote | quote risk | Material relative to current ~$180/month new MRR; approve only with reliability evidence. |
| FAA + NWS | $0 | $0 | $0 | $0 | Rate limits/availability require caching even though price is zero. |
| Flight data | not enabled | likely $100+ minimum | $100+ | $100+ | Commercial minimum dominates at current scale; query fees and terms must be modeled from chosen endpoint. |
| Persistent cache/monitoring | $0–$20 | $0–$20 | $10–$50 | $20–$100 | Add only when multi-instance miss rate or observability warrants it. |

Do not fire paid calls on page load. Security, FAA, weather, and parking should be airport-level shared calls; route and flight lookup are user-specific/on-demand. Apply cache keys that exclude raw addresses. Costs become material when total incremental monthly data spend approaches the incremental new MRR or an agreed CAC/payback threshold; current baseline new MRR is roughly $180 per 30-day month, so a $100/month provider needs clear causal lift.

## 7. UX/UI strategy

The current result hierarchy is directionally correct and should be preserved:

1. Flight context.
2. Dominant “Leave by [time].”
3. One short calculation summary and “Adjust assumptions.”
4. Primary Add to Calendar action.
5. After handoff, OnTimer alarm CTA.
6. Optional detailed calculation.

Phase 2’s least-complicated enhancement is a compact, collapsed-by-default explanation attached to the result, not a new panel above it. Suggested semantic order:

- `Security reported now: 18 min` — only for true airport/provider current evidence, with source and timestamp.
- `Expected when you arrive: about 23 min` — OnTimer deterministic prediction.
- `Security time included: 30 min` — conservative allowance used in the answer.

Do not use all three lines when evidence is weak; show prediction and recommendation only. “Why this time?” should reuse the existing calculation disclosure if possible rather than creating a competing control. Traffic impact should appear only when the traffic-aware minus static duration is material. Flight status should appear only after a successful optional lookup. The calendar CTA and post-calendar OnTimer CTA retain their current location and primary-action exclusivity.

Hallmark audit note: this project is intentionally not a redesign. The current page has substantial supporting content below the calculator, but the calculator remains first and the result dominates. The main risk is future nested-card/dashboard accretion inside the already card-heavy calculator. Phase 2 should reduce semantic ambiguity without adding a grid of status tiles.

## 8. SEO strategy

- Preserve current URLs, canonicals, metadata, H1s, sitemap, internal links, static airport-specific content, and page speed during Phases 1–2.
- Keep the evergreen answer and airport-specific planning context server-rendered/static. Live user-specific intelligence may hydrate after interaction; do not make it the only indexable answer.
- Use “current” or “live” only next to a genuine timestamped current source. Never insert continuously changing words into static titles/descriptions.
- `dateModified` changes only after substantive editorial/product content updates, never because a live value refreshed.
- Maintain unique airport content tied to an actual timing consequence. Do not mass-produce generic security/weather paragraphs.
- Keep `SoftwareApplication` and `BreadcrumbList` accurate and visible-content-aligned. Do not add speculative `Dataset`, `ClaimReview`, `QAPage`, or other markup solely for ranking. FAQ schema has little expected rich-result benefit for a non-government/non-health site; audit its maintenance value separately rather than changing it in Phase 1.
- Test structured data with Google’s Rich Results Test and rendered HTML in URL Inspection after any later schema change.
- Protect Core Web Vitals by avoiding render-blocking live calls, client waterfalls, large maps, and layout shift.

References: [Google SoftwareApplication documentation](https://developers.google.com/search/docs/appearance/structured-data/software-app), [FAQ rich-result limits](https://developers.google.com/search/blog/2023/08/howto-faq-changes), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), and [people-first/freshness guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## 9. GEO / LLM strategy

Create a machine- and human-readable evidence chain in the visible result explanation and, later, a server-rendered airport conditions summary where justified:

```text
Entity: LaGuardia Airport (LGA), Terminal B
Observed/provider estimate: 18 minutes, General lane
Source: Port Authority of New York and New Jersey
Source updated: timestamp
OnTimer prediction for arrival: 23 minutes
OnTimer recommended allowance used: 30 minutes
Recommendation effect: leave at 2:42 PM
```

The proprietary value is the interpretation from evidence to arrival-time prediction to conservative leave-time recommendation. Use stable entity names/IATA codes, source URLs, timestamps, lane/terminal scope, and explicit verbs (“reported,” “predicts,” “includes”). Never call a third-party number “TSA data” without evidence that TSA is the source of that specific value. Do not expose user origin, flight number, or itinerary in crawlable URLs or server-rendered public condition pages.

## 10. Analytics and experiment design

### Measurement specification

| Funnel stage | System/event | Requirement |
| --- | --- | --- |
| Search impressions/clicks/CTR | Search Console page+query export | Daily airport page cohort; preserve query privacy thresholds. |
| Landing session | GA4 page view/session | Airport code, landing page, device, source, experiment assignment. |
| Calculator started | existing `calculator_started` | Fire once per task attempt; keep intent/airport dimensions. |
| Calculator completed | existing `calculator_completed` | Successful route/manual result generation, not button press alone. |
| Result viewed | add `airport_result_viewed` | Intersection-based once per result signature; source path/confidence bands, not raw itinerary. |
| Add to Calendar clicked | existing `calendar_handoff_opened` | Provider and variant. Rename only in reporting, not code, unless migration planned. |
| Calendar successfully added | unavailable from web handoff | Do not claim success; measure “handoff opened.” Consider optional return confirmation only if honest and low friction. |
| OnTimer CTA viewed | existing `automatic_alert_cta_viewed` | Confirm post-calendar and result variants fire on actual visibility. |
| App Store clicked | existing outbound events | Preserve attribution token and airport/experiment context. |
| Install/download | App Store Connect / campaign link | Adopt product-page/custom campaign tokens or privacy-safe attribution provider; document limitations. |
| Trial/paid/MRR | subscription backend | Join an install/referral token where platform rules permit; otherwise use cohort-level incrementality. |

### Measurement-readiness audit and fixes (2026-09-05)

A code-level audit (not a doc-claims review) found that the airport calculator's own funnel events fired through a second, local tracking helper in `AirportCalculator.tsx` that never attached `attribution_token`, `landing_page`, or `traffic_source` — only the shared cross-calculator events (App Store clicks, calendar handoff, etc.) carried those dimensions. This meant the richest funnel-depth signals (`airport_leave_time_answer_generated`, breakdown/adjustments opens, quota fallback) could not be joined to acquisition source, which would have silently undermined any Phase 2 experiment analysis. Fixed: the local helper now delegates to the centralized `fireEvent()` in `src/lib/analytics.ts`, so every airport event inherits the same acquisition dimensions going forward. No saved GA4 Explorations or dashboards depended on the old shape (confirmed with Ethan before changing it).

Also while fixing this:
- Removed the redundant `calculator_used` event, which fired immediately before `calculator_completed` on the same code path with a strict subset of its properties and a hardcoded `trigger: "manual"` value that carried no information.
- Added security-intelligence dimensions to `airport_leave_time_answer_generated`: `security_source_path` (`intelligence.sourcePath` joined with `|`), `security_evidence_kind` (from `predictedWaitAtArrival.evidenceKind`), `security_freshness` (from `observedWait.freshness`, `"unknown"` when there is no observed evidence), and `security_confidence` (from `recommendedSecurityAllowance.confidence`). These fields existed on the Phase 1 `AirportSecurityIntelligence` type but were never forwarded to analytics before this change.

Confirmed still missing, to be added only once there is an actual experiment/result-view need to attach them to (no event should be added speculatively):
- No experiment-assignment event exists anywhere in the codebase. `HomeHeroExperiment.tsx`'s variant constant is a compile-time swap with no randomization, persistence, or analytics dimension — Phase 2's LGA A/B test needs to build this from scratch, not extend it.
- No result-view/impression event distinct from `airport_leave_time_answer_generated` exists; that event fires at compute time (deduplicated by a result signature), not on confirmed viewport visibility.
- No repository-visible join from `attribution_token` to App Store install/trial/paid/MRR — this would need to live server-side or in the app project, not this repo.

### Event schemas for Phase 2 (defined now, not yet fired)

These are documented contracts only — do not fire them until Phase 2's LGA experiment actually needs them, to avoid speculative instrumentation with no consumer.

**`experiment_assignment`** — fired once per session/device on first assignment, before any variant-dependent UI renders:
- `experiment_id` (string, e.g. `"lga_security_explanation_v1"`)
- `variant` (string, e.g. `"control"` / `"treatment"`)
- `assignment_method` (`"server"` | `"stable_cookie"`)
- plus the standard acquisition dimensions via `fireEvent()` (attribution_token, landing_page, traffic_source, search_query)

**`airport_result_viewed`** — fired once per distinct result signature, gated on confirmed viewport visibility (IntersectionObserver, not compute completion):
- `location_code`, `flight_type`, `arrival_mode` (existing conventions)
- `security_source_path`, `security_evidence_kind`, `security_freshness`, `security_confidence` (reuse the same fields just added to `airport_leave_time_answer_generated` — do not invent parallel names)
- `experiment_id` / `variant` when an experiment is active for that session, omitted otherwise

### North star and supporting metrics

North star: `new MRR / Search Console impressions * 1,000`, reported by airport cohort and 28-day/56-day windows to absorb conversion lag. Supporting: SERP CTR, landing-to-start, start-to-complete, result view, calendar handoff/result, App Store click/result, install/click, trial/install, paid/trial, median leave-time delta, provider coverage/freshness, fallback rate, p75 LCP/INP, error rate, and API cost per completion/download/new-MRR dollar.

### LGA experiment

Run an A/A test first to validate stable assignment and event parity. Then compare control (existing result) with treatment (same result plus concise evidence/prediction/recommendation explanation). Assign on the server or with a first-party stable cookie; emit assignment once and attach it to all funnel events. Primary product metric: calendar handoff per completed calculation. Primary economic metric: App Store click and, when attribution is ready, new MRR/1,000 LGA impressions. Guardrails: completion, result latency, errors, CTA visibility, and search traffic/CTR.

With roughly 200 clicks and one new payer per day across the entire network, LGA alone will likely be underpowered for paid conversion. Use a minimum 28-day run and make calendar handoff the nearer-term decision metric; do not declare a winner from a handful of payers. Expand a winning pattern to a small airport cohort for economic confirmation before network rollout. Predefine a non-inferiority bound of -5% relative for calculator completion and calendar handoff, plus a stricter no-regression requirement for fatal errors and page speed.

## 11. Performance and reliability requirements

- No paid or user-specific API on page load.
- Security provider fetch p95 timeout no more than four seconds; route always returns a fallback.
- Cache airport evidence separately from user prediction; prediction is cheap and deterministic.
- Use parallel calls after explicit Calculate when dependencies allow; avoid security -> traffic -> flight waterfalls.
- Prefer stale-while-revalidate for shared airport conditions only when licensing permits and staleness is visible internally.
- Validate status, content type, body size, timestamps, number ranges, lane enum, and airport identity.
- Treat zero as a valid wait only when the provider semantics support it; reject impossible negatives/non-finite/extreme values.
- Log structured provider outcome, latency, cache state, freshness, source path, and fallback reason. Never log origin address or flight number by default.
- Feature flags at engine, provider, airport, and UI-pilot levels; every provider independently disableable.
- Monitor availability/freshness/fallback rate and alert on sustained degradation, not a single failure.
- Keep existing manual route and security overrides.

## 12. Security and privacy

- Current route calls send origin and destination to Google only after explicit Calculate. Current-location coordinates are sent when the user chooses that feature. The server should not log raw origin or coordinates; existing travel logging currently includes normalized origin/destination and should be reviewed before Phase 3 privacy work.
- Airport-level security requests need only IATA code and coarse timing; do not attach address, IP-derived location, or itinerary.
- Optional flight lookup will send flight number/date to a provider. Treat it as itinerary data: disclose the provider purpose, retain only as long as needed for cache/diagnostics, hash/redact logs, and avoid analytics values.
- Weather/FAA calls use airport coordinates/code, not user location.
- Parking should use airport/facility identifiers, not plate, reservation, or itinerary unless a later explicit booking flow is approved.
- Before Phases 3–5, review the privacy policy for Google route processing, optional flight-provider processing, retention, international transfer, and analytics attribution. Phase 1 introduces no new user data or third party.

## 13. Rollout plan

1. Phase 1 ships globally behind a server environment flag if operational caution is desired; because the response remains compatible, start at 100% after automated/local checks. Monitor source/fallback distributions for seven days.
2. Obtain written source rights and baseline LGA volume before Phase 2. If LGA has too few completions or permission is blocked, choose the highest-value licensed airport from Search Console data.
3. Internal/staging test: provider fixtures, stale/failure simulation, time-zone edges, PreCheck/CLEAR semantics, mobile 320/375/414/768, calendar and CTA path, no JS/provider fallback.
4. Production A/A at 50/50 for at least seven days or until event parity is established.
5. LGA A/B: 10% treatment for 48 hours, then 50% if errors, latency, completion, and handoff guardrails hold. Run at least 28 days.
6. Stop treatment immediately for any funnel-breaking error, >100 ms p75 LCP regression attributable to the feature, >1 percentage-point absolute fatal API/UI error increase, stale data represented as current, or >10% relative calendar-handoff degradation after a meaningful sample. Pause/review at the -5% non-inferiority boundary.
7. Expand by airport value: highest search clicks × current conversion × provider coverage first. Suggested operational cohort after NYC: ATL, LAX, DEN, SEA, DFW, PHX, MIA, subject to rights and actual OnTimer traffic.
8. Roll back with provider/airport/UI flags; never require an application redeploy to disable a failing paid provider once the platform matures.

## 14. Ordered project backlog

### Required

**Epic A — Phase 1 security engine**

- A1. Define normalized evidence, prediction, recommendation, provenance, confidence, and freshness types. Acceptance: no provider-specific type reaches the calculator.
- A2. Extract TSAWaitTimes adapter with timeout and defensive validation. Acceptance: malformed, empty, zero, extreme, and failure fixtures are covered.
- A3. Add airport-level TTL cache, negative cache, and in-flight dedup. Acceptance: concurrent identical requests make one upstream call in tests; no user data enters key/value.
- A4. Predict at estimated airport-arrival time with time-distance decay, then calculate conservative allowance. Acceptance: deterministic tests cover near/far/stale/no-evidence/day/hour transitions.
- A5. Preserve legacy `min/avg/max/source/context` while adding normalized intelligence. Acceptance: existing client compiles and uses recommended allowance through `avg`.
- A6. Add structured redacted diagnostics. Acceptance: logs identify source path/cache/fallback without origin or itinerary.
- A7. Regression verification and changelog. Acceptance: security tests, leave-time tests, calendar tests, airport SEO tests, build, and diff review pass.

**Epic B — Measurement readiness**

- B1. Validate existing GA4 events against actual UI visibility and uniqueness.
- B2. Define experiment-assignment and result-view schemas with privacy exclusions.
- B3. Build daily Search Console + GA4 + App Store/subscription cohort report.

**Epic C — Provider rights**

- C1. Ask PANYNJ (LGA/JFK/EWR) and the ATL/LAX/DEN/SEA/DFW/PHX/MIA airport authorities for API/feed access and written B2C display/cache/attribution rights. In progress 2026-09-05.
- ~~C2. Ask TSAWaitTimes whether the legacy endpoint is covered; obtain documented API credentials or approve retirement.~~ Resolved 2026-09-05: declined the paid subscription (see Decision log and "Ethan decisions" above). The free legacy endpoint continues as-is; retirement is deferred until an official source lands or the endpoint's availability changes.
- C3. Maintain provider rights register with permitted fields, retention/cache limits, attribution, and termination requirements.

### Recommended

**Epic D — LGA pilot**

- D1. Baseline LGA funnel, traffic, device mix, performance, and security fallback rate.
- D2. Implement approved official/provider adapter behind LGA flag.
- D3. Prototype one compact “Why this time?” treatment in the existing result disclosure.
- D4. Run A/A, then guarded A/B; weekly decision review.

**Epic E — Traffic interpretation**

- E1. Retain static and traffic-aware route duration and calculate traffic delta.
- E2. Feed actual calculated airport-arrival time back to security prediction without extra paid calls.
- E3. Verify Google quota, SKU, billing alerts, and logs using `docs/API_COST_CHECKLIST.md`.

**Epic F — Reliability/operations**

- F1. Provider health dashboard and alerts.
- F2. Durable shared cache only if serverless miss rate justifies it.
- F3. Automated synthetic checks for top airports and stale/fallback semantics.

### Later / nice-to-have

- Optional flight-number lookup and terminal derivation.
- FAA/NWS material-disruption rules.
- Licensed parking/transit disruption inputs.
- Network content/schema iteration after pilot evidence.
- Multi-provider scoring, shadow comparison, and calibration dataset.
- ML only after deterministic residuals and sufficient labeled outcomes show a clear need.

### Ethan decisions and external actions

- **Decided 2026-09-05: no TSAWaitTimes subscription.** Ethan declined the $49.95/month documented API. Rationale: the paid tier is the same blended estimate as the free legacy endpoint, not better data — it buys ToS compliance, not accuracy, and OnTimer's internal historical-pattern model already carries most of the recommendation quality when live evidence is weak or absent. The free legacy adapter remains in place as a continuity source ($0, unchanged); the `AIRPORT_SECURITY_TSAWAITTIMES_ENABLED=false` kill switch remains available if its authorization status becomes a concern. Effort is redirected to official-source outreach below, which is the only path to a genuine data-quality upgrade.
- **PANYNJ and airport-operator outreach (in progress):** requesting official LGA/JFK/EWR feed access and written reuse/caching/attribution terms from the Port Authority, plus the same ask sent broadly to ATL, LAX, DEN, SEA, DFW, PHX, and MIA so Phase 2 can pick whichever authority responds first with usable terms. See the outreach email and contact list Ethan is sending; log responses in Epic C's provider rights register (`docs/AIRPORT_INTELLIGENCE_PROJECT_PLAN.md` section 14, Epic C) as they arrive.
- **Paid service approval:** approve Google Routes budget/quota thresholds; later choose FlightAware vs Cirium only after a scoped quote and license comparison.
- **UX decision:** approve Phase 2’s exact three-level terminology and whether the evidence line is always visible or inside the existing calculation disclosure.
- **Privacy/legal:** review policy updates before flight-number processing or expanded location retention; no update is required for Phase 1 as designed.
- **Analytics access:** provide or authorize Search Console, GA4, App Store Connect, and subscription cohort exports needed to establish airport-level baselines and LGA sample size.

## Detailed Phase 1 implementation plan

### Deliverable and non-goals

Deliver a modular security-wait engine with honest semantics and a backward-compatible route. Do not implement direct airport scraping, terminal UI, flight lookup, new traffic behavior, weather, parking, SEO changes, or a redesigned result.

### Work sequence

1. Add provider-neutral types and configuration.
2. Extract and harden the TSAWaitTimes legacy adapter; identify it as third-party/provider-estimated rather than TSA-observed.
3. Add bounded airport-level cache and in-flight deduplication.
4. Implement historical model at estimated arrival time, current-evidence adjustment with time decay, inferred trusted-traveler handling, confidence, prediction range, and conservative rounded allowance.
5. Make the route validate inputs, select the hierarchy, return additive intelligence plus legacy fields, and always fall back.
6. Update the client to pass existing arrival-mode/bag context and consume `recommendedSecurityAllowance.minutes` while preserving `avg` fallback.
7. Replace visible internal factor source text `TSA estimate` with neutral `security estimate`; do not redesign or add copy blocks.
8. Add deterministic unit tests for parsing, caching/dedup, timing windows, arrival-hour use, live influence decay, staleness, lane inference, international fallback, malformed provider responses, and compatibility.
9. Run targeted regressions and production build; update changelog.

### Phase 1 acceptance criteria

- Existing calculator inputs, layout, result prominence, calendar flow, and CTA flow are unchanged.
- API always returns valid bounded `min/avg/max`, with `avg` equal to the recommended allowance used by the calculator.
- `observedWait`, `predictedWaitAtArrival`, and `recommendedSecurityAllowance` are independently represented.
- Fresh evidence influences near-term prediction more than generic baseline; influence decays with time.
- Historical pattern uses expected airport-arrival time, including day-of-week adjustment, not flight departure time.
- PreCheck/CLEAR values are inferred unless lane-specific provider evidence exists.
- Invalid/stale/failing providers cannot break the route or masquerade as current.
- Upstream calls are cached/deduplicated by airport only.
- No new credential, paid service, user-data transmission, or ongoing cost is introduced. The optional `AIRPORT_SECURITY_TSAWAITTIMES_ENABLED=false` kill switch disables the continuity provider and falls back to OnTimer's model.
- Tests and build pass; changelog records implementation and verification.

## Decision log for this initiative

- Implement Phase 1 with the existing provider only as a continuity adapter, not as an endorsement of its licensing or “TSA” provenance.
- Do not integrate PANYNJ or any airport page until written rights are confirmed.
- Keep the legacy response contract and add normalized fields, enabling later UI work without coupling.
- Use deterministic rules first. Collect calibration evidence before considering machine learning.
- Keep the result/calendar/OnTimer hierarchy unchanged through Phase 1.
- 2026-09-05: Declined the TSAWaitTimes $49.95/month documented API. Its data is the same third-party blended estimate as the free legacy endpoint — paying buys ToS compliance, not accuracy or granularity — and OnTimer's internal historical-pattern model already absorbs most of the recommendation quality when live evidence is weak. Continue the free legacy adapter unchanged; pursue official airport-operator sources (PANYNJ plus ATL/LAX/DEN/SEA/DFW/PHX/MIA) as the actual data-quality upgrade path instead of a paid subscription to the same-tier vendor.
