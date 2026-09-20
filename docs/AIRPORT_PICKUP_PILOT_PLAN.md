# Airport Pickup Intent Pilot Plan

**Status:** Approved for implementation
**Prepared:** September 20, 2026
**Pilot size:** Six airport-specific pickup calculators

## 1. Decision summary

OnTimer should test airport-specific pickup intent with a small, fully reviewed pilot before expanding the pattern across the airport catalog.

The pilot will add these indexable pages:

| Airport | Pilot URL |
| --- | --- |
| Los Angeles International (LAX) | `/airport-pickup/los-angeles-lax` |
| John F. Kennedy International (JFK) | `/airport-pickup/jfk` |
| Newark Liberty International (EWR) | `/airport-pickup/newark-ewr` |
| LaGuardia Airport (LGA) | `/airport-pickup/laguardia-lga` |
| Chicago O'Hare International (ORD) | `/airport-pickup/chicago-ohare-ord` |
| Hartsfield-Jackson Atlanta International (ATL) | `/airport-pickup/atlanta-atl` |

Each page will answer a pickup-specific question, preselect and lock the airport, calculate when the driver should leave, and preserve the existing calendar-to-OnTimer conversion sequence.

The pilot will **not** create a separate airport-drop-off URL family. Drop-off is close enough to the existing airport departure task that it should be exposed as a state of the current airport departure calculator first. This avoids splitting authority between two pages that solve nearly the same problem.

The production header and footer already contain exactly one generic **Airport Pickup Time Calculator** link in their existing calculator lists. The pilot will preserve those links and will **not** add airport-specific links or a new top-level navigation item. Individual pilot pages will be discovered through contextual, crawlable links on the generic pickup calculator, the airport calculator directory, and participating airport pages.

## 2. Goals

- Capture specific searches such as “when should I leave to pick someone up at LAX?” with a page that directly completes that task.
- Improve usefulness over a generic calculator with airport-specific pickup rules, waiting guidance, terminal considerations, and reviewed official sources.
- Preserve the mobile hierarchy: understand the tool, enter information, get the answer, add it to a calendar, then see the OnTimer offer.
- Reuse the existing airport identity and destination architecture without copying departure-oriented content into pickup pages.
- Establish search and conversion evidence before expanding beyond the pilot.
- Support flying, pickup, and drop-off intent without making the hero or global navigation busier.

## 3. Non-goals

- Live flight status, flight-number lookup, gate changes, or delay monitoring.
- Launching pickup pages for every airport in the current directory.
- Launching separate pages for partner, parent, friend, rideshare, or other relationship variants.
- Launching a separate `/airport-dropoff/` URL family.
- Redesigning the site header, footer, or primary navigation.
- Adding a paid travel or flight-data API.
- Publishing thin, placeholder, or partially reviewed airport pages.

## 4. Search-intent and URL architecture

| Intent | Destination | Canonical rule | Indexing rule |
| --- | --- | --- | --- |
| Flying to the airport | Existing `/airport-time-to-leave/{slug}` page | Existing page is self-canonical | Keep indexed |
| Picking someone up at a pilot airport | New `/airport-pickup/{slug}` page | New page is self-canonical | Index only after content and UX review |
| Picking someone up at a non-pilot airport | Generic `/airport-pickup-time-calculator` with the airport preselected when possible | Canonical remains the generic pickup URL | Do not create a destination placeholder |
| Dropping someone off | Existing `/airport-time-to-leave/{slug}?intent=dropoff#calculator` state | Canonical remains the base airport departure URL | Do not index a separate query-state URL |

Unknown `/airport-pickup/{slug}` routes must return a true 404. Internal links must never point to an unsupported pickup slug.

The pickup pages must target pickup language naturally in the title, H1, direct answer, and supporting content. They should not dilute the existing airport departure pages by retargeting those pages' primary metadata away from the flying/departure task.

## 5. Experience architecture

### Intent selector

Add a shared three-option control:

- **Flying**
- **Picking up**
- **Dropping off**

Place it at the top of the calculator area, not in the hero and not in global navigation. This gives users a clear correction path without pushing the calculator down or making the page's primary promise ambiguous.

Behavior for a pilot airport:

- **Flying** opens the existing airport departure page.
- **Picking up** opens the airport-specific pickup page.
- **Dropping off** opens the existing departure page in its drop-off state.

Behavior for a non-pilot airport:

- **Picking up** opens the generic pickup calculator with the airport preselected when possible.
- The interface must not imply that an airport-specific page exists when it does not.

The selector must remain a single row at 320 CSS pixels, retain at least 44-by-44 CSS pixel targets, expose the selected state accessibly, and avoid horizontal scrolling.

### Mobile page order

The required order is:

1. Compact site header.
2. Compact page promise: airport-specific pickup calculator and what it calculates.
3. Calculator card, beginning no lower than the current approved calculator baseline.
4. Intent selector as the first row inside the task area.
5. Scheduled landing and pickup inputs.
6. Result with a clear **Add to calendar** action.
7. Calendar handoff and return to OnTimer.
8. OnTimer free-download action, or the approved Android affiliate treatment.
9. Airport-specific guidance, FAQs, sources, and related links.

The fixed airport should be displayed as context rather than as an editable form field on a destination page. Removing that redundant input saves vertical space and prevents accidental mismatches between the URL and calculation.

The first useful form input should be visible in the initial mobile viewport whenever normal browser chrome permits it. No feature grid, long explanation, breadcrumb, or airport guide content may appear between the hero and calculator.

### Calculator inputs

Reuse the generic pickup calculator's planning model:

- Scheduled landing date and time.
- Driver starting location or manual drive time.
- Checked-bag status.
- Domestic or international arrival.
- Curbside pickup or meeting inside.
- Optional person name for the calendar event.

Label the time clearly as the airline's **scheduled landing time**. Include a compact disclosure that the calculator estimates when a traveler may be ready and does not monitor live flight delays.

### Result and conversion flow

Preserve the existing task-specific sequence:

- Show the recommended leave time prominently.
- Explain the timeline from leaving, to landing, to estimated ready-for-pickup time.
- Make **Add to calendar** the immediate next action.
- After the calendar handoff, return the user to the task and show the task-specific OnTimer message: **Get an alarm when it's time to leave.**
- Explain: **OnTimer turns this pickup into an automatic calendar alarm.**

Do not place the app promotion before the calculation result or calendar action.

## 6. Airport pickup content model

Create a pickup-specific supplement keyed to the existing airport slug. Continue using the existing airport record for shared identity, airport code, coordinates, and naming.

Suggested `AirportPickupProfile` fields:

```ts
type AirportPickupProfile = {
  slug: string;
  directAnswer: string;
  readyTimeGuidance: {
    domesticNoCheckedBag: string;
    domesticCheckedBag: string;
    international: string;
  };
  pickupRules: string[];
  waitingOptions: string[];
  terminalConsiderations: string[];
  groundAccessNotes: string[];
  faqs: Array<{ question: string; answer: string }>;
  reviewedOn: string;
  sources: Array<{ label: string; url: string }>;
};
```

Requirements for every profile:

- At least two authoritative sources, preferably official airport and ground-transport pages.
- A visible review date.
- Airport-specific pickup rules and waiting guidance, not generic text with the airport name substituted.
- Clear separation between sourced airport facts and OnTimer's planning assumptions.
- No invented queue, walking, immigration, or baggage timing claims presented as airport facts.
- Content review from top to bottom before indexing.

## 7. Page content structure

Each pickup page should use this order:

1. H1 framed as the airport-specific pickup question.
2. One concise sentence explaining the calculator's answer.
3. Calculator and intent selector.
4. Direct airport-specific answer.
5. How long after landing the traveler may be ready.
6. Where to wait and where pickup is allowed.
7. Domestic, checked-bag, and international considerations.
8. What to do when the flight is delayed, without implying live tracking.
9. Airport-specific FAQs.
10. Sources and reviewed date.
11. A small set of relevant airport calculator links.

The direct answer and FAQs should be independently useful to search engines and answer engines, but the calculator remains the primary experience.

## 8. Header, footer, and site discovery

### Global header

- Preserve the existing **Airport Pickup Time Calculator** entry in the desktop and mobile Time Calculators lists.
- Do not add a new top-level Pickup item.
- Do not add the six pilot airports to any global menu.
- Do not replace the generic link with a pickup hub until a useful, indexed hub exists and has a clearer navigation role than the calculator itself.

### Global footer

- Preserve the existing generic **Airport Pickup Time Calculator** link in the Tools group.
- Do not list the pilot airports in the footer.
- Do not add a new pickup column or expand the footer solely for this pilot.

No global-navigation code change is needed for the pilot. The current production chrome already provides the desired generic discovery without turning the header or footer into an SEO link directory.

### Contextual discovery changes

- Add a compact **Popular airport pickup calculators** section to the generic pickup calculator below the calculator and primary conversion content.
- Add an **Airport pickup calculators** section to the airport calculator directory with crawlable links to the six pilot pages. Keep it subordinate to the directory's primary task and avoid placing it above the main calculator discovery content.
- Keep the generic pickup card on the main Time Calculators directory.
- Add the shared intent selector to the six participating airport departure pages.
- Add up to four related-airport pickup links near the bottom of each pickup page. Use genuinely relevant nearby or high-demand alternatives rather than the same repeated list everywhere.
- Do not add links to pickup pages from unrelated calculator categories.

Add a regression check confirming that the desktop header menu, mobile header menu, and footer Tools group each expose exactly one generic pickup entry and contain no airport-specific pickup links.

## 9. Implementation map

### Create

- `src/lib/airport-pickup-profiles.ts` for the six reviewed supplements and validation.
- `src/app/airport-pickup/[slug]/page.tsx` for static destination routes.
- `src/components/airport/AirportIntentNav.tsx` for the shared intent selector.
- A pickup destination page component if needed to keep route files thin.
- `src/lib/__tests__/airport-pickup-profiles.test.ts` for profile completeness, uniqueness, route support, sources, and review dates.
- A route-level UX audit covering metadata, canonicals, content uniqueness, links, and mobile structure.

### Modify

- `src/app/airport-pickup-time-calculator/AirportPickupCalculator.tsx` to accept a fixed/preselected airport and analytics context.
- Pickup calculator styles to support the selector and compact fixed-airport context.
- The airport departure page/template so the selector appears for pilot airports and supports the drop-off state without changing the canonical.
- The generic pickup page to link to the pilot pages.
- The airport calculator directory to surface the pickup pilot.
- Header and footer regression coverage to preserve their single generic pickup link.
- Sitemap and destination-routing logic to include only reviewed pilot slugs.
- Analytics helpers and calls to attach low-cardinality intent and airport context.
- SEO experiment tracking only if the launch includes an intentional metadata test.

### Do not modify for the pilot

- Global header or footer structure beyond inserting the single generic pickup link in each existing calculator list.
- Existing airport profile slugs or canonical URLs.
- The default generic pickup planning assumptions without separate product review.

## 10. Analytics and measurement

Use the existing funnel events and add consistent context:

- `calculator_started`
- `calculator_completed`
- `calendar_handoff_opened`
- `automatic_alert_cta_viewed`
- `app_store_outbound_click`
- New: `airport_intent_selected`

Recommended event parameters:

- `airport_code`
- `page_type` (`generic_pickup`, `airport_pickup`, or `airport_departure`)
- `planning_intent` (`flying`, `pickup`, or `dropoff`)
- `source_page_type` when the user switches intent

Do not send addresses, person names, arbitrary search text, or other high-cardinality user input to analytics.

### Baseline before launch

Capture the prior 28 days of GA4 and Search Console data for:

- The generic airport pickup calculator.
- The six existing airport departure pages.
- The airport calculator directory.
- Pickup, drop-off, and flying/departure query clusters.

Record impressions, clicks, CTR, average position, calculator starts, completions, calendar handoffs, and App Store outbound clicks. Segment by device where the sample supports it.

### Post-launch review

Review after pages are indexed and have had a settled 28-day comparison window. Avoid conclusions from very small samples; flag directional results until a page reaches roughly 300 impressions or 30 calculator starts.

Evaluate:

- Index coverage and canonical selection.
- Qualified pickup-query impressions and clicks.
- CTR within comparable position bands.
- Calculator start and completion rates.
- Calendar-handoff and App Store outbound rates.
- Whether pickup additions changed traffic or engagement on the corresponding departure page.
- Selector use, especially attempts to select pickup for unsupported airports.

### Expansion decision

- **Expand:** At least three of six pages earn qualified pickup demand, and their task funnel is not materially worse than the generic pickup experience.
- **Refine:** Pages earn impressions but have weak CTR or completion, suggesting a snippet, promise, or UX mismatch.
- **Consolidate or noindex:** A page shows no distinct query or engagement value after indexing has settled and technical issues have been ruled out.

Any second cohort should be selected from Search Console demand and observed unsupported-airport selector use. DFW, MIA, SFO, BOS, and SEA are candidates, not commitments.

## 11. Delivery phases

### Phase A — Baseline and specification

1. Export the GA4 and Search Console baseline.
2. Confirm current generic pickup and six departure-page performance.
3. Document the current mobile calculator-start position at 320, 375, 390/414, and 768 CSS pixels.
4. Record that the current production header and footer already expose exactly one generic pickup link.

### Phase B — Shared architecture

1. Add the pickup profile type and validator.
2. Add fixed-airport and analytics props to the generic calculator.
3. Build the accessible intent selector.
4. Add route, canonical, and sitemap support for an allowlist of reviewed profiles only.
5. Add drop-off state handling to the existing departure experience.

### Phase C — Two-page internal proof

Build LAX and EWR first because their pickup logistics create meaningfully different content and provide a useful test of the model. Verify content, route behavior, mobile density, result flow, and analytics before completing the cohort.

### Phase D — Complete the six-page cohort

Add JFK, LGA, ORD, and ATL only after the two-page proof passes. Every page must be fully sourced and reviewed before it enters the sitemap.

### Phase E — Discovery and measurement

1. Add the generic pickup-page and airport-directory link sections.
2. Enable selectors on the six corresponding departure pages.
3. Verify the existing single generic pickup link in both desktop/mobile header navigation and the footer Tools group.
4. Validate analytics parameters without capturing user-entered locations.

### Phase F — QA and production release

1. Run unit, route, build, and site-audit checks.
2. Inspect all six pages top to bottom.
3. Perform mobile checks at 320, 375, 414, and 768 CSS pixels.
4. Test the result-to-calendar-to-OnTimer flow.
5. Deploy with the repository's pinned Vercel workflow.
6. Wait for the production deployment to report Ready.
7. Verify the canonical production URLs, sitemap, headers, footer, and analytics behavior.
8. Update `docs/SITE_CHANGELOG.md` in the same implementation commit and update `docs/SEO_CHECKLIST.md` only if the operating procedure changes.

### Phase G — Indexing and follow-up

1. Submit or inspect the updated sitemap in Search Console.
2. Request indexing for the six new URLs after production verification.
3. Check coverage and canonical selection during the first week.
4. Run the settled 28-day review and record the expand, refine, or consolidate decision.

## 12. Acceptance criteria

### User experience

- The page is immediately recognizable as a calculator for when to leave to pick someone up at the named airport.
- The calculator starts no lower than the current approved mobile baseline.
- The first useful input is visible in the initial mobile viewport where browser chrome permits.
- The intent selector fits without overflow at 320, 375, 414, and 768 CSS pixels.
- All interactive targets meet the 44-by-44 CSS pixel minimum.
- The airport cannot accidentally differ from the page's airport.
- The result leads directly to a calendar action, then to the correct OnTimer or Android offer.
- No copy implies live flight tracking.

### SEO and GEO

- Each page has unique title, description, H1, direct answer, FAQs, canonical, and social metadata.
- Structured data reflects only visible content and the actual page type.
- Every indexed page has at least two authoritative sources and a visible review date.
- Only the six reviewed pages appear in the sitemap.
- Unsupported pickup slugs return 404; unsupported selector choices use the generic calculator.
- All pilot pages are crawlable from a relevant directory or calculator page.
- Existing airport departure canonicals and primary intent remain intact.

### Navigation

- The global header includes one generic airport pickup entry in both its desktop and mobile calculator menus and no pilot-airport links.
- The global footer includes one generic airport pickup entry and no pilot-airport links.
- No new top-level navigation item is added.
- Contextual discovery links appear only after the primary calculator/action hierarchy.

### Engineering and cost

- Pickup profiles reuse existing airport identity data instead of duplicating it.
- Page payloads do not serialize the full airport profile catalog to every client.
- Analytics contain no entered address or personal-name values.
- A normal calculation introduces no new paid API dependency beyond the current route/distance behavior.
- Unit tests, production build, route checks, and `npm run audit:site` pass.

## 13. Drop-off expansion gate

The selector gives drop-off users a clearly labeled path now, but a distinct drop-off URL family should be reconsidered only if Search Console shows sustained, separable airport drop-off demand and the existing departure page cannot serve that intent without becoming ambiguous. Until then, keeping drop-off as a state of the existing airport departure page protects the authority and clarity of the successful pages already in market.
