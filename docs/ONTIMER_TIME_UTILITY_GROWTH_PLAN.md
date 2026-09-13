# OnTimer Time Utility Growth Plan

Status: Phase 1 complete; Phase 2 in progress
Working owner: repository maintainers and Codex
Last updated: 2026-09-13

> Provenance note: the supplied MHTML archive preserved the source conversation, the
> artifact name, and the execution requirements, but not the downloadable Markdown
> payload. This repository copy reconstructs the plan from those preserved requirements
> and records verified repository and market findings below.

## Objective

Build a measured portfolio of time utilities that attracts search demand and creates a
natural path to OnTimer: help someone decide or identify a time, make that result
actionable in their calendar, and show how automatic calendar alarms keep them on time.

The operating principle is **research to prioritize, not research to prove**. Cheap,
reversible experiments with low SEO risk should ship with measurement rather than wait
for false keyword-volume precision.

## Guardrails

- BrandOS remains the strategic source of truth.
- Prefer tools that produce a time or date a person can act on.
- Distinguish traffic tools (for example, a holiday countdown) from higher-intent action
  tools (for example, a leave-time calculation).
- Do not publish large sets of thin, near-duplicate pages. Start with a curated set whose
  intent and copy are genuinely distinct, then expand only from evidence.
- Do not buy a paid API to learn whether users want a calculator. Prove discovery and use
  with the least expensive credible version first.
- Instrument calculator start, completion, calendar handoff, App Store click, and the
  existing downstream acquisition funnel.

## Phase 1 — Time-boxed review and validation (complete)

Time limit: two hours maximum. Actual working-session outcome: completed inside the
limit on 2026-09-13 and moved directly into Phase 2.

### Repository findings

- The site is Next.js 15 App Router with an established tool-page system, shared
  analytics helpers, calendar-link utilities, sitemap generation, and a calculator
  directory. A new no-API calculator family is a low-cost additive change.
- OnTimer already has strong action-tool territory: general, airport, cruise, and wake-up
  leave-time calculators plus three medication scheduler audiences. Medication is an
  optimization/expansion family, not a new growth bet.
- GA4 already captures `calculator_started`, `calculator_completed`,
  `calendar_handoff_opened`, and App Store outbound events with a persistent attribution
  token. The Until MVP can reuse this schema without a new analytics vendor.
- The sitemap and `/time-calculators` directory are explicit, so every launched page must
  be added deliberately. This is preferable to silently generating hundreds of URLs.
- The locked design system defines tool pages as task-first workbenches and requires
  server-rendered meaningful content, mobile usability, consent-aware analytics, and
  unchanged shared site chrome.

### Lightweight market findings

- Current search results validate recurring demand surfaces for “days until,” “weeks
  until,” “months until,” and “hours until,” including event-specific pages.
- Strong competitors already provide live counts, multiple unit breakdowns, rollover,
  weekday labels, and explanatory copy. A bare countdown is not differentiated.
- Calendar action is inconsistent across reviewed results. The most OnTimer-aligned test
  is a clear answer plus “put this on your calendar,” with optional planning milestones.
- Calendar-month math varies across competitors. The MVP should label months as an
  average-duration estimate rather than imply complete calendar months.
- Search results are crowded and include recently published calculator networks. Launch
  a small quality set first; do not treat programmatic page count as an advantage.
- Search Console data was not available in the repository/session. It remains the first
  source for selecting later variants and optimizing existing airport pages.

### Phase 1 decisions

1. **Go:** build the Until engine as the first cheap traffic-family experiment.
2. **Scope:** generic `/days-until` plus five curated event pages in the initial batch.
3. **Differentiation:** answer-first countdown, honest unit breakdown, event-specific
   calendar handoff, optional milestone bundle, and explicit OnTimer bridge.
4. **Defer:** weeks/months/hours landing pages until query or engagement evidence supports
   separate intent; the first UI still reports all units.
5. **Next action family:** airport pickup, after the Until MVP is reviewable.

## Phase 2 — Ship Batch 1 (in progress)

### 2A. Until engine MVP

- [x] Create shared target-event definitions and date calculations.
- [x] Create `/days-until` generic calculator.
- [x] Create curated event routes for Christmas, New Year's Day, Halloween,
  Thanksgiving, and the first day of summer.
- [x] Show the primary days answer plus a simple weeks, days, and total-hours breakdown.
- [x] Add event-specific Google Calendar handoff and downloadable `.ics` bundle with
  optional 30-day, 10-day, and 1-day milestones.
- [x] Reuse consent-aware GA4 calculator and calendar-handoff events.
- [x] Add server-rendered metadata, canonical URLs, structured data, sitemap entries,
  and calculator-directory discovery.
- [x] Add deterministic unit coverage for recurring dates and countdown math.
- [x] Complete local visual/mobile review and production build verification.
- [x] Deploy and verify canonical production URLs.

Verification note (2026-09-13): `npm run build`, `npm run test:until`, rendered-route
checks, accessibility-tree inspection, and 320/375/414/768 px overflow checks passed.
The production deployment reached `READY`, canonical route checks returned HTTP 200,
and the post-deployment `npm run audit:site` checked 213 sitemap URLs with zero issues.

### 2B. Measurement scorecard

Record at launch: date, family, URLs, build effort, API cost, and hypothesis. Review at
approximately 30/60/90 days: indexed URLs, impressions/day, clicks/day, CTR, average
position, ranking-query count, countries, calculator completions, calendar actions, App
Store clicks, and attributable trials/paid users.

Decision states:

- **Kill:** no impressions, weak use, and no useful query emergence.
- **Keep:** modest traffic with negligible maintenance.
- **Optimize:** meaningful impressions or rankings in positions 5–20.
- **Expand:** traffic plus engagement and OnTimer acquisition.

### 2A.1. First live-review iteration (implemented 2026-09-13)

- Added original event artwork to the generic calculator and all five initial event pages.
- Replaced the free-text event field with a researched, grouped 50-event selector.
- Kept only five dedicated indexable event pages; selector inclusion does not automatically
  create a thin landing page.
- Simplified the result detail to weeks, days, and hours and removed the confusing average
  months value.
- Renamed “Target date” to “When is it?”, removed the midnight implementation note, and
  made event copy warmer while retaining countdown and calendar intent.
- Corrected Google and ICS titles to use `OnTimer - [event]!` and milestone titles such as
  `OnTimer - 10 days until Christmas`.
- Increased spacing between milestone choices, calendar actions, and final planning copy.

Release verification: production deployment `dpl_73o78sgynJdKb3GX4bysFW13sEU5`
reached `READY` and was aliased to `www.ontimer.app`. Canonical live HTML contained
the warmer Christmas copy, event artwork, dropdown, and “When is it?” label. The
post-deployment site audit checked 213 sitemap URLs and reported zero issues.

Research basis: current countdown products consistently foreground Christmas/New Year,
birthdays, weddings, vacations, anniversaries, graduations, due dates, and retirement;
event directories add major U.S. holidays, shopping dates, seasons, and globally observed
holidays. The first 50-option catalog balances those demonstrated use cases. Moving
lunar/religious dates such as Hanukkah, Diwali, and Lunar New Year ask the user for the
date instead of relying on brittle hard-coded annual data.

### 2A.2. Calendar-to-OnTimer conversion iteration (implemented 2026-09-13)

- Moved the calendar action into the countdown result panel so the answer and next action
  appear as one continuous task instead of separate page sections.
- Reframed the primary action around the desired outcome: add the event plus the selected
  countdown reminders. The `.ics` file mechanism is explained below the action rather than
  used as the button label.
- Kept the direct Google path as an explicit secondary action because it opens Google
  Calendar and adds only the main event; a provider-neutral label would overpromise.
- Added a post-handoff OnTimer offer after either calendar action: “Add free alarms,” the
  automatic-calendar-alarm explanation, and a “Get OnTimer free” App Store action.
- Preserved truthful handoff language. The page says Google Calendar opened or the calendar
  file is ready; it does not claim an event was saved before the user completes the import.
- Standardized the notes on the main event and every reminder to “Calculated by OnTimer”
  followed by the plain OnTimer App Store URL.
- Added compact action labels below 375 px so every clickable label remains on one line.

Verification note: Until tests, TypeScript, and the optimized 239-route build passed. The
calendar-plus-reminders action revealed the OnTimer acquisition step in a browser, and
rendered checks at 320, 375, 414, and 768 px found no error overlay or horizontal overflow.
Production deployment `dpl_9tqscrDzzAjwS7enrMtQCpDJWEPZ` reached `READY` and was
aliased to `www.ontimer.app`; a live 390 px interaction check confirmed both calendar
choices and the post-handoff OnTimer offer. The production audit reported zero issues
across 213 sitemap URLs and 214 internal URLs.

Calendar-notes follow-up: deployment `dpl_62vanDr88TuR28e3u96TXcmGzXFo` reached
`READY`; live inspection confirmed the exact two-line OnTimer/App Store notes in the
Google Calendar payload, and the same shared description is covered by the `.ics`
calendar-link regression test.

### 2A.3. Answer-first fold and search-result iteration (implemented 2026-09-13)

- Reordered dedicated event pages around the acquisition sequence: exact answer first,
  calendar action second, secondary unit detail third, and event/date adjustment last.
- Compressed the event hero and artwork so the exact answer and primary calendar action
  are visible in the first mobile viewport instead of forcing visitors through a large
  introductory composition and form.
- Kept the generic `/days-until` calculator input-first, while dedicated event pages
  start with the server-rendered answer and place “Change event or date” in a disclosure.
- Reframed the primary action as “Add [event] + reminders”; reminder customization and
  file-format explanation remain available without competing with the initial action.
- Added hourly revalidation and a dynamic snippet candidate that combines the current
  day count and full target date with OnTimer's differentiated benefit: adding the event
  plus 30-day, 10-day, and 1-day calendar reminders for free.
- Added the recurring-answer rule to the permanent SEO checklist so future pages do not
  ship stale answer snippets or compete solely on information Google may answer directly.

Verification note: Until tests, TypeScript, the optimized 239-route build, and rendered
checks at 320, 375, 390, 414, 768, and 1280 px passed without overflow or an error
overlay. Deployment `dpl_5qdGVCzXpBfPrz9VpKQcWXDzJVQv` reached `READY` and was
aliased to `www.ontimer.app`. Live metadata contained the current 103-day answer and the
calendar-reminder differentiator; the primary CTA ended at 714 px in the live 390×844
viewport; and the production audit reported zero issues across 213 sitemap URLs and 214
internal URLs.

### 2A.4. Initial-HTML and cluster-strengthening iteration (implemented 2026-09-13)

- Confirmed with a Googlebot user agent that the current production response already
  contains the numeric answer and target date before JavaScript runs; the reported dash
  reflected an older release rather than the current server-rendered implementation.
- Added a build-artifact regression that fails if any published event page ships a dash
  instead of a number, omits its target date or supporting units, inherits generic social
  metadata, uses a noncanonical Open Graph URL, or omits its breadcrumb markup.
- Changed the supporting unit display to full weeks, extra days, and approximate hours so
  all three values have a clear meaning and are present in the initial HTML.
- Added concise, task-relevant hub guidance covering inclusion of today, calculation
  rules, recurring-date rollover, time zones, and calendar milestones.
- Kept the 50-item idea catalog non-programmatic: only the five published countdowns are
  crawlable links, while unpublished ideas remain plain text.
- Added event-specific date rules, planning-reminder guidance, visible breadcrumbs, and a
  small set of links to real sibling pages. No placeholder Christmas Eve or Black Friday
  pages were created.
- Corrected the Time Calculators title-template duplication and added page-specific Open
  Graph URLs plus Open Graph and Twitter descriptions to the event family.

Verification note: Until unit tests, TypeScript, the optimized 239-route build, the
generated-HTML regression, and mobile browser checks passed. Deployment
`dpl_GuUq8Yh6K1icjArnuars1Mu9PxF2` reached `READY` and was aliased to
`www.ontimer.app`. The live Googlebot response contained the numeric 103-day answer,
target date, all three secondary units, synchronized social metadata, and BreadcrumbList.
The production audit reported zero issues across 213 sitemap URLs and 214 internal URLs.

### 2A.5. Post-calendar focal-state correction (implemented 2026-09-13)

- Matched the successful airport-calculator hierarchy: once either calendar action is
  used, the OnTimer acquisition offer replaces the calendar-choice panel and becomes the
  focused next step.
- Removed provider/file status narration and reduced the conversion message to an
  event-specific outcome, one automatic-alarm benefit sentence, and the App Store CTA.
- Corrected the desktop grid placement that had forced the offer into a narrow left-side
  column and made it look like an overlay.
- Added focus-and-scroll behavior for the reminder download and for the return from the
  Google Calendar tab, with reduced-motion support.

Verification note: Until tests, TypeScript, the optimized 239-route build, desktop and
mobile screenshots, and both calendar-action paths passed. Deployment
`dpl_24utWCwdELVYzaGtbPv6CnkGSoeg` reached `READY` and was aliased to
`www.ontimer.app`; the live reminder-bundle path produced the intended 434px-wide focal
panel without an overlay. The production audit reported zero issues across 213 sitemap
URLs and 214 internal URLs.

### 2C. Airport pickup MVP

- Reviewed the existing airport-page signal strategy and preserved the evidence gate for
  destination expansion rather than manufacturing ten thin pickup variants.
- Built the generic “when should I leave to pick someone up?” calculator without paid
  flight data. It models scheduled arrival, airport-exit time, driving, and parking or
  meeting time, then hands the leave time to the proven calendar-to-OnTimer funnel.
- Test approximately ten deliberately selected global airports only after the generic UX
  is proven.
- Require API economics and usage evidence before adding live flight lookup.

Current next step: establish baseline calculator-completion, calendar-action, and App
Store-outbound behavior on the generic page before selecting airport-specific pickup
pages from Search Console evidence.

## Phase 3 — Continuous two-week shipping cycles

- Batch 1: Until MVP, airport-pickup MVP, and the ten airport pages with the best latent
  opportunity.
- Batch 2: expand the strongest early family and test one additional actionable timing
  family.
- Batch 3: expand only where Search Console queries or conversion events show a reason.

SEO measurement windows remain longer than shipping cycles. Continue planting tests
while earlier batches accumulate data.

## Phase 4 — Acquisition and revenue closure

- Preserve landing query/source through calculator completion, calendar action, and App
  Store outbound click.
- Connect install, trial, and paid-subscription attribution where app-side systems allow.
- Judge families on paid OnTimer acquisition potential, not traffic alone.
- Use the portfolio to decide where content, internal links, UX work, or paid data can
  create incremental return.

## Open evidence requests

- Export Search Console query/page/country/device data for the latest 3, 6, and 12 months.
- Confirm app-side attribution coverage from App Store click through subscription.
- After launch, record actual Until page indexation and GA4 event counts in this file.
