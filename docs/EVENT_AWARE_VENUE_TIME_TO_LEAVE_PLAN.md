# OnTimer Event-Aware Venue Time-to-Leave
## MVP Product + SEO + Data Plan for Codex

**Status:** The five-venue experiment is implemented as of 2026-09-20 for MetLife Stadium, Yankee Stadium, Madison Square Garden, Barclays Center, and Citi Field. All five venue hubs are indexable and in the sitemap; usable provider events are crawlable from those hubs. Future events use venue-local dates in URLs, retired or non-actionable events are excluded from indexing, and sanitized provider health logs record success, failure, latency, and available quota headers. Provider-account quota review and legal follow-up remain operating requirements.
**Primary goal:** Build and test event-aware venue Time-to-Leave pages using Ticketmaster Discovery API through a provider-neutral event model, with reviewed official fixtures as the providerless fallback.

**Repository role:** Working implementation plan. Instructions in the original proposal have been converted into project gates and milestones; this document does not itself authorize deployment, provider enrollment, legal publication, or production data use.

## Review decision — 2026-09-20

The product direction is approved. It extends OnTimer's existing Time To Leave proof into concerts, sports, and other calendar events, keeps the user's calendar as the source of truth, and preserves the result → calendar → automatic-alarm conversion path.

Implementation should proceed with the following changes:

1. **Provider-use decision recorded.** The project owner approved Ticketmaster usage for this MVP on 2026-09-20. Before pages become indexable or enter the production sitemap, record the production account owner, applicable commercial/affiliate terms, permitted storage/refresh behavior, attribution requirements, provider quotas, and the 24-hour removal process without storing credentials here.
2. **Build provider-neutral and fixture-first.** The first vertical slice may use reviewed fixtures behind an `EventProvider` interface. This allows the calculator, page, calendar handoff, structured data, analytics, and stale-data behavior to be tested without making unapproved production API use a launch dependency.
3. **Start with one venue and one route family.** Prove an event page plus its venue hub for one venue before building the generic event search. A generic event search adds autocomplete, ambiguity, and a second discovery surface before the core event-page hypothesis is proven.
4. **Indexing decision recorded.** On 2026-09-20 the project owner explicitly opened indexing for the MetLife venue hub and event calculators with precise usable times. Reviewed fixture routes enter the sitemap; live provider events are discoverable through normal links from the hub. TBD/TBA and unusable events remain excluded.
5. **Require precise, usable event time.** Events with TBD/TBA dates, TBA times, or `noSpecificTime` must not produce an indexable calculator page or a precise leave-time recommendation. Show a safe unavailable state or omit them until the source provides a usable zoned start time.
6. **Use authority-ranked venue sources.** Every indexable venue profile needs a review date and at least two authoritative sources, consistent with `docs/SEO_CHECKLIST.md`. Separate curated venue facts from provider event facts and retain provenance for each.
7. **Treat event retirement as an SEO decision.** Do not automatically redirect every expired event to a venue hub. Remove it from the sitemap after the event; then retain, `noindex`, return `410`, or redirect only when the destination is genuinely equivalent and supported by traffic/link evidence.
8. **Make legal review a launch gate, not an implementation blocker.** Codex may identify affected legal/privacy surfaces and draft a review checklist, but user-approved legal counsel/content review is required before publishing substantive Terms or Privacy changes.

### Verified assumptions

- The Discovery API supports venue-filtered event search and has a documented default daily quota of 5,000 requests. Ticketmaster's own pages currently disagree on the per-second limit (2 vs. 5), so implementation must obey response headers and use the lower documented rate until the account confirms otherwise.
- The current codebase already has reusable server-side Google Routes support for drive, transit, and walk; a shared calendar-to-OnTimer handoff; analytics helpers; dynamic metadata/page patterns; and sitemap infrastructure.
- The repository does not currently have a general event store or production scheduler. Storage, refresh execution, idempotency, deletion, monitoring, and ownership must therefore be selected explicitly rather than assumed.
- Existing Terms are published through more than one route/static artifact. Legal changes require identifying the canonical source and preventing those copies from drifting.

### Phase 0 exit decision — 2026-09-20

The selected MVP path is Ticketmaster Discovery API with reviewed official-source fixtures as a providerless fallback. The production credential, provider-side quota checks, source attribution, kill switch, fixture fallback, page QA, and initial lifecycle rules were verified before the project owner opened the indexing gate on 2026-09-20.

The available data paths remain:

- approved Ticketmaster API/affiliate/partner use;
- another provider with documented rights for this use; or
- a manually curated, limited pilot based on official venue/organizer sources.

If the approved provider path becomes unavailable, keep the slice fixture-backed and non-indexable; do not silently relax the gate.

### Provider account and terms review — 2026-09-20

- Production credential owner: the OnTimer project owner, stored as a protected server-side Vercel Production variable; no credential value is recorded in this repository.
- Ticketmaster's current FAQ documents a default allowance of 5,000 requests per day and 2 requests per second, while the Discovery API reference still states 5 requests per second. OnTimer continues to use the safer 2-request-per-second ceiling.
- Ticketmaster's General Terms of Use were last reviewed for this project on 2026-09-20. The documented removal, caching, privacy, termination, and commercial-use considerations remain operating/legal follow-up items even though the project owner subsequently approved indexing the pilot.
- The application now has a server-side `TICKETMASTER_EVENTS_ENABLED` kill switch. Disabling it stops both venue-list and event-detail requests and leaves the reviewed fixture fallback available.
- Existing Terms surfaces are `src/app/terms/page.tsx`, `public/legal/terms.html`, and the generated `dist/legal/terms.html`. No event-specific legal language has been published; the canonical and static copies require explicit legal/content review together.

---

# 1. Product thesis

OnTimer's airport Time-to-Leave calculators work because they answer a high-anxiety, non-obvious question:

> **What time do I actually need to leave?**

The next test should apply that model to concerts, sports, and live events.

The opportunity is not simply:

> What time should I leave for MetLife Stadium?

The stronger opportunity is:

> What time should I leave for AC/DC at MetLife Stadium tonight?

or:

> What time should I leave for the Yankees game tonight?

To answer that well, OnTimer should combine:

- actual upcoming event name
- actual venue
- event date
- scheduled event start time
- venue-specific arrival guidance
- travel time
- traffic / route assumptions where available
- parking / walking / transit buffers
- user starting location

Then produce a clear recommendation:

> **Leave by 4:21 PM**

The page should naturally lead to:

1. Add the event to Calendar
2. Download OnTimer
3. Let OnTimer turn calendar events into persistent alarms

## Non-negotiable calculator experience

The event page follows the same conversion contract as the primary When To Leave calculator:

1. compact event context establishes relevance;
2. the starting-location input appears in the first practical mobile viewport;
3. calculation moves the user directly to a compact leave-time answer;
4. the answer and Add to Calendar action appear together without another scroll;
5. after the calendar action, the same focal slot becomes the OnTimer download action; and
6. route timelines, itemized assumptions, provider notes, warnings, sources, and venue education follow the handoff or live in an optional disclosure.

The permanent release checklist is `docs/CALCULATOR_CONVERSION_UX_CHECKLIST.md`, and `npm run test:event-calculator:ux` protects the event implementation's required source order.

---

# 2. MVP data strategy

## Evaluate Ticketmaster Discovery API as the preferred initial event source

For this experiment, use Ticketmaster Discovery API as the primary source for:

- event name
- event ID
- event date
- event start time
- venue name
- venue ID
- performer/team where available
- event URL
- event status where available

Ticketmaster supports event discovery by venue and documents a default quota of 5,000 requests per day. Production use remains subject to the provider-use gate above.

The proposed five-venue experiment should use only a small fraction of that daily quota, but quota is not the same as permission to store, index, or commercially use the content.

### Important implementation principle

After provider approval, do **not** make Ticketmaster calls on every page view.

Instead:

1. periodically fetch upcoming events for supported venues
2. normalize and store only the fields needed for OnTimer's calculator
3. use stored data to render venue/event pages
4. refresh periodically to catch changes

This keeps load low and makes page rendering independent of Ticketmaster availability. Stored records must still comply with the approved retention period, requested-removal process, and provider termination behavior.

---

# 3. Refresh strategy

We do not need real-time event data.

Start simple.

### Initial recommendation

For upcoming events more than 14 days away:

- refresh once per week

For events 2–14 days away:

- refresh once per day

For events within 48 hours:

- refresh every 6–12 hours

This is still an extremely small number of calls.

If implementation simplicity matters more than efficiency, daily refresh for all supported venues is acceptable for the MVP.

Do not over-engineer differential scheduling until event volume requires it.

---

# 4. Ticketmaster usage guardrails

Use only the event data necessary to power the calculator.

Prefer:

- name
- date/time
- venue
- performer/team
- source URL
- status
- Ticketmaster source ID

Avoid pulling or reproducing unnecessary Ticketmaster content such as:

- long descriptions
- promotional copy
- ticket inventory
- pricing
- images
- editorial content

The majority of every OnTimer page must be original OnTimer utility and content:

- departure calculation
- venue-specific timing logic
- traffic / parking / transit guidance
- arrival recommendation
- calendar workflow
- OnTimer CTA

Store the Ticketmaster source ID and source URL with every event.

Make it possible to delete/update an event record quickly.

---

# 5. Event-data disclaimer and user-protection requirement

This is mandatory.

OnTimer must never imply that event schedules, travel times, traffic conditions, or the calculated departure recommendation are guaranteed.

## Primary disclaimer

Display this near the event timing and calculator result:

> **Event times can change.** Always confirm the event date, start time, venue, and entry information with the event organizer or venue before you leave.

This should be visible without requiring the user to open Terms or a tooltip.

## Calculation disclaimer

Near the calculated departure time, include concise language such as:

> **Leave-time estimates are guidance, not a guarantee.** Traffic, transit delays, parking, security lines, weather, schedule changes, and other conditions can affect your arrival time.

## Source/freshness treatment

Where practical, show:

> Event schedule last checked: [date/time]

and:

> Event information source: Ticketmaster

with a link to the source event page where available.

### Important legal/product principle

Do not use language such as:

- “You will arrive by…”
- “Guaranteed to get you there on time”
- “This ensures you won’t miss the event”
- “Safe departure time”

Prefer:

- “Recommended leave time”
- “We recommend leaving by…”
- “Estimated travel time”
- “Suggested arrival time”
- “Plan to leave by…”

---

# 6. Terms of Service requirement

Before broad launch, review and update OnTimer's Terms of Service to cover this feature.

Codex should identify the existing Terms implementation/location but should **not invent legal language and silently publish it without review**.

The Terms should be reviewed for provisions covering, at minimum:

- third-party event information may be inaccurate, incomplete, delayed, changed, or canceled
- event schedules are controlled by organizers/venues, not OnTimer
- route, traffic, travel, parking, transit, weather, and arrival estimates are estimates only
- users are responsible for confirming event details independently
- OnTimer does not guarantee timely arrival
- limitation of liability for missed events, tickets, travel costs, parking costs, transportation costs, accommodations, lost opportunities, or other consequential losses
- third-party data/service availability
- no warranty of accuracy or continuous availability

This is a risk-reduction layer, not a substitute for good UX and fresh data.

---

# 7. Venue strategy

Build one reusable framework and launch with a small number of venues.

## Initial candidate set

Start by auditing these:

1. MetLife Stadium
2. Yankee Stadium
3. Madison Square Garden
4. Barclays Center
5. Citi Field
6. Prudential Center
7. Wells Fargo Center
8. TD Garden
9. Fenway Park
10. Gillette Stadium

Pick the first **5** based on:

- event volume
- Ticketmaster API coverage
- quality of event timestamps
- search opportunity
- timing complexity
- ease of creating useful venue-specific guidance

Prefer quality over breadth.

## Local venue catalog decision — 2026-09-20

Known venues must resolve from a curated local catalog before any paid Google destination lookup. Each catalog record stores the canonical name, aliases, full address, coordinates, time zone, review date, and authoritative sources. The route request uses the stored latitude/longitude waypoint, so searches such as `MetLife`, `Met Life Stadium`, `Meadowlands Stadium`, or `East Rutherford stadium` do not require Google Places or destination geocoding.

This optimization does not eliminate the one Google Routes request needed to estimate a visitor's actual trip. Expand the catalog on demand with reviewed venues rather than importing an unverified bulk list; venue names, entrances, coordinates, and operating status can change.

---

# 8. Page types

The intended system has three page types, but the MVP build order is: event-specific page, venue hub, then generic event calculator. Do not block the vertical-slice test on generic event search.

A venue route should not create an unnecessary choice screen: redirect directly to the calculator when exactly one supported upcoming event is available, show the event chooser when two or more are available, and retain the explicit unavailable state when none have a usable scheduled time.

## A. Generic event calculator

Example:

`/time-to-leave/event`

H1:

> What time should I leave for my concert, game, or event?

Inputs:

- event / venue search
- event date/time if manually entered
- starting location
- travel mode
- arrival preference

---

## B. Venue hub

Example:

`/venues/metlife-stadium/time-to-leave`

Purpose:

- evergreen search landing page
- venue-specific guidance
- upcoming events
- gateway into event-specific calculations

Example H1:

> What time should I leave for MetLife Stadium?

Include:

- venue location
- typical arrival guidance
- parking/transit information
- venue-specific timing considerations
- upcoming events
- calculator

---

## C. Event-specific page

Example:

`/events/acdc-metlife-stadium-september-25-2026/when-to-leave`

Example H1:

> What time should I leave for AC/DC at MetLife Stadium?

Above the fold:

- event name
- venue
- date
- scheduled start time
- freshness/source indicator
- event schedule disclaimer
- starting-location field
- calculate CTA

Example:

> **AC/DC — Power Up Tour**
> MetLife Stadium
> Friday, September 25, 2026
> Scheduled start: 7:00 PM

Then:

> **Event times can change. Always confirm the event date, start time, venue, and entry information with the organizer or venue before you leave.**

Then:

> Where are you leaving from?

---

# 9. Event ingestion model

Create normalized event records.

```ts
Event {
  id
  slug

  title
  eventType
  classification

  venueId
  sourceVenueId

  startDateTime
  timezone
  dateTBD
  timeTBA
  noSpecificTime

  performers[]

  source
  sourceEventId
  sourceUrl

  status

  lastFetchedAt
  lastVerifiedAt
  sourceUpdatedAt?
  sourcePayloadHash
  updatedAt
}
```

Venue:

```ts
Venue {
  id
  slug

  name
  address
  city
  state
  country

  latitude
  longitude
  timezone

  ticketmasterVenueId

  profile
}
```

---

# 10. Event change handling

Schedule changes are a core product concern.

Every refresh should compare new source data with stored data.

Ingestion must be idempotent on `(source, sourceEventId)`, validate the event timezone, retain a hash or equivalent change marker, and record enough provenance to explain which source supplied the displayed fact. Never log API keys or full raw provider responses by default.

Detect:

- changed start time
- changed date
- changed venue
- cancellation
- postponement
- changed event name/status

If a material change occurs:

1. update the page immediately
2. update structured data
3. update the calculator
4. visually flag the changed status if appropriate
5. update `lastVerifiedAt`

Do not continue displaying a known stale time.

---

# 11. Venue intelligence

The event feed alone does not make the page useful.

Each venue must have original OnTimer guidance.

Create a `VenueProfile`.

```ts
VenueProfile {
  defaultArrivalBufferMinutes

  sportsArrivalBufferMinutes?
  concertArrivalBufferMinutes?

  parkingBufferMinutes
  transitBufferMinutes
  securityBufferMinutes

  trafficNotes[]
  parkingNotes[]
  transitNotes[]
  rideshareNotes[]
  entryNotes[]

  sourceUrls[]

  reviewedAt
}
```

Each launch venue should have at least **3–5 genuinely useful, venue-specific insights**.

Examples:

- common traffic approaches
- parking entrance / walking considerations
- nearby transit stations
- event-day transit quirks
- rideshare staging
- security/entry friction
- typical stadium-vs-arena arrival behavior

Do not generate generic filler merely to make pages unique.

---

# 12. Leave-time calculation

The calculator should answer:

> **When should I leave?**

Basic model:

```text
recommended_leave_time =
event_start_time
- recommended_arrival_buffer
- parking_or_last_mile_buffer
- estimated_travel_time
- uncertainty_buffer
```

The displayed result should explain itself.

Example:

> ## Leave by **4:21 PM**

To comfortably make the 7:00 PM event:

- Recommended arrival: 5:45 PM
- Estimated drive: 54 min
- Event traffic buffer: 25 min
- Parking + walk: 20 min
- Entry buffer included

Then display:

> **Leave-time estimates are guidance, not a guarantee. Traffic, transit delays, parking, security lines, weather, schedule changes, and other conditions can affect your arrival time.**

---

# 13. Arrival preferences

Offer simple choices:

### Just in time

Smaller buffer.

### Comfortable

Default recommendation.

### Extra early

Larger buffer.

Do not imply that any option guarantees timely arrival.

---

# 14. Event-specific enrichment

Do not block MVP on scraping venue sites.

Ticketmaster should supply the initial event identity + schedule.

Later, selectively add event-specific official information when practical, such as:

- doors open
- gates open
- parking lots open
- unusual transit guidance
- road closures
- special entry rules

Only add automated enrichment sources after checking that their use is appropriate.

Manual/curated venue guidance is acceptable for MVP.

---

# 15. SEO strategy

The pages should answer natural-language queries.

Target concepts such as:

- what time should I leave for [event]
- when should I leave for [event]
- what time should I leave for [team] game tonight
- when should I arrive at [venue]
- how early should I get to [venue]
- when should I arrive for [artist] concert
- traffic to [venue] tonight
- when should I leave for [venue]

## Event page title

> What Time Should I Leave for [Event] at [Venue]? | OnTimer

## Meta description

> Going to [Event] at [Venue] on [Date]? Estimate when to leave using travel time, parking, venue arrival guidance, and timing buffers.

Avoid promising guaranteed arrival.

---

# 16. LLM / answer-engine formatting

Make the factual answer highly extractable.

Near the top:

> **[Event] at [Venue] is currently scheduled for [time] on [date]. OnTimer recommends arriving around [time/range]. Enter your starting location to calculate when to leave.**

Immediately below:

> Event times are subject to change. Confirm the current schedule with the venue or organizer before leaving.

Render a factual block:

```text
Event: AC/DC — Power Up Tour
Venue: MetLife Stadium
Date: September 25, 2026
Scheduled start: 7:00 PM
Event data last checked: September 24, 2026
```

Keep “scheduled” and “currently scheduled” language where appropriate.

---

# 17. Structured data

Evaluate and implement appropriate Schema.org:

- `Event`
- `Place`
- `BreadcrumbList`

Use the current stored event schedule.

If an event is canceled/postponed/rescheduled, update `eventStatus` appropriately.

Do not include fabricated data.

---

# 18. Calendar flow

The calendar action is central.

CTA:

> **Add this event to my calendar**

Include:

- event name
- venue
- venue address
- scheduled event start
- useful notes

In the calendar notes, consider including:

> Event schedules can change. Confirm the current date and time with the venue or organizer.

Do not make an external Ticketmaster-derived schedule appear guaranteed simply because it has been written to the user's calendar.

---

# 19. OnTimer conversion moment

Immediately following a successful calendar add:

> **Don’t be late. Turn this into an alarm.**
> OnTimer sets automatic alarms for all your calendar events.

CTA:

> **Get OnTimer Free**

Lead with the user benefit, not calendar connection mechanics.

---

# 20. Event page lifecycle

Create event pages early enough for search engines to discover them.

## When an event is discovered

- create event page
- link from venue page
- add to active event sitemap
- index normally

## Leading up to event

- refresh according to schedule
- update changed information
- keep freshness visible

## After event

Avoid accumulating thousands of stale pages.

Initial policy:

- keep live for up to 7 days after event
- remove from active event sitemap
- if no meaningful traffic/backlinks, noindex and later return `410 Gone` or remove after a defined retention window
- redirect to a venue hub only when it is a genuinely equivalent destination and the redirect is supported by traffic/link evidence
- preserve only pages that have continued value

Automate this lifecycle.

---

# 21. Analytics

Track:

- venue page view
- event page view
- event selection
- origin entered
- calculation completed
- leave-time result shown
- Add to Calendar click
- successful calendar action where measurable
- OnTimer CTA impression
- OnTimer CTA click
- App Store outbound click

Also capture:

- venue
- event
- event category
- days before event
- organic landing page
- query performance via Search Console

Primary funnel:

```text
Search landing
→ Calculate
→ Add to Calendar
→ Get OnTimer
→ App Store
```

---

# 22. MVP success criteria

Do not judge solely on app installs.

First look for evidence of search demand.

### Search indicators

- venue pages indexed
- event pages indexed
- event-specific impressions
- queries containing event/team/artist names
- impressions for leave/arrival intent
- pages receiving impressions before event day

### Product indicators

- calculator completion
- Add to Calendar rate
- OnTimer CTA CTR
- App Store outbound rate

Compare these with airport calculator performance where useful.

---

# 23. Phase 0 — Audit, but do not stall

Timebox to **2–4 hours maximum**.

Codex should:

1. inspect existing airport Time-to-Leave architecture
2. identify reusable calculator components
3. identify current travel-time implementation
4. identify current Add to Calendar flow
5. identify existing analytics
6. identify SEO/page-generation patterns
7. identify the event storage, refresh scheduler, deletion path, credential owner, monitoring, and kill switch
8. resolve the provider-use gate before any public or production API-backed launch
9. if approved credentials are already available, test event retrieval for the 10 candidate venues without exposing the key; otherwise use representative fixtures
10. inspect data quality, including TBD/TBA flags, timezone behavior, cancellations/postponements, duplicates, coverage gaps, and source-platform differences
11. select the strongest first venue and provisional next four venues
12. update this document with dated findings and decisions

Then continue with the fixture-backed first vertical slice unless the user changes scope. Do not publish or deploy provider-backed pages until all launch gates pass.

Do not stop with a research report.

## Dated Phase 0 findings — 2026-09-20

- Reused the existing server-side Google Routes endpoint, place input, analytics helpers, calendar export, and calendar-to-OnTimer handoff.
- Selected MetLife Stadium as the first venue and AC/DC's September 25, 2026 Power Up Tour date as the reviewed event fixture.
- Added a provider-neutral event and venue model plus a Ticketmaster adapter that is inactive without the server-only `TICKETMASTER_API_KEY`.
- Applied the lower documented Ticketmaster rate of two requests per second, cached venue discovery for 24 hours and event data for six hours, retained provider source IDs/URLs, and omitted events without precise times.
- Verified the approved Consumer Key against the live Discovery API. MetLife returned 25 upcoming provider events; the app's venue chooser and a provider-backed Jets calculator both rendered successfully.
- Added the `TICKETMASTER_EVENTS_ENABLED` operational kill switch and reviewed-fixture fallback. Provider failures remain isolated to server logs without exposing credentials or raw payloads.
- Added reviewed/provider duplicate reconciliation so the curated AC/DC record wins over Ticketmaster's differently punctuated `AC/DC - POWER UP TOUR 2026` listing instead of showing two choices for the same event.
- Added a static MetLife catalog entry with common aliases and coordinates so the destination requires no Google Places or geocoding request.
- Kept both new route families out of the sitemap and `noindex, follow` while production credential, quota, lifecycle, legal/content, and indexing gates remain open.
- Selected Yankee Stadium, Madison Square Garden, Barclays Center, and Citi Field as the next four venues after live coverage and timestamp-quality review with the approved credential.

---

# 24. Phase 1 — First working vertical slice

Build one complete event flow first.

Target outcome:

> A real upcoming event at a real venue appears on an OnTimer page, knows its current scheduled event time, accepts a starting location, calculates a recommended leave time, explains the calculation, includes the safety/disclaimer language, adds the event to a calendar, and presents the OnTimer download CTA.

This proves the concept.

Recommended first reference venue:

**MetLife Stadium**, assuming Ticketmaster event coverage is good.

---

# 25. Phase 2 — Generalize

Once the first event works:

- normalize the event ingestion layer
- build venue profiles
- generate venue hubs
- generate event pages
- implement sitemap
- implement refresh/update logic
- implement event lifecycle logic

Expand to first 5 venues.

## Phase 2 launch implementation — 2026-09-20

- Generalized the venue hub into one reviewed, data-driven route and launched the first five venue profiles: MetLife Stadium, Yankee Stadium, Madison Square Garden, Barclays Center, and Citi Field.
- Added an indexable directory linking all five hubs and added every venue hub to the sitemap.
- Confirmed live Ticketmaster coverage across all five venues. Pre-launch browser QA found and removed ancillary inventory such as premium seating, season-ticket memberships, parking products, VIP packages, and venue tours from the event choices.
- Event slugs now use the venue-local calendar date instead of the UTC date. A provider-backed request using an older UTC-date slug permanently redirects to the current canonical local-date URL.
- Future, scheduled events with precise times remain `index, follow`. Past, cancelled, postponed, rescheduled, TBA, TBD, and otherwise unusable event records are retained only as needed for a safe explanatory state and are `noindex, follow`; they do not enter venue event lists or the sitemap.
- Ticketmaster requests emit sanitized structured health logs for success/failure, endpoint class, latency, one quota unit per upstream attempt, and any quota headers returned by the provider. No keys, query strings, user locations, or raw provider payloads are logged.
- The implementation continues to use six-hour event revalidation and 24-hour venue revalidation rather than requesting provider data on every visitor page view. A durable event database and differential scheduler remain unnecessary for this five-venue measurement phase unless cache behavior, provider availability, or page volume shows a need.

---

# 26. Phase 3 — Measure before scaling

Do not immediately build 500 venue pages.

Launch the first 5 venues and watch:

- Search Console impressions
- indexed pages
- queries
- calculator engagement
- calendar adds
- OnTimer CTA performance

If Google starts testing the pages for relevant event/venue queries, expand to 10–20 venues.

---

# 27. Phase 4 — Scale selectively

Prioritize venues using:

```text
event volume
× search opportunity
× timing anxiety
× Ticketmaster coverage
× venue-specific timing complexity
× observed conversion
```

Scale only where the data supports it.

---

# 28. Do not overbuild

Do not make MVP depend on:

- real-time Ticketmaster polling
- every event provider
- 500 venues
- real-time crowd density
- live parking inventory
- complicated venue scraping
- ticket sales
- user accounts
- AI-generated unsupported venue facts

The MVP is:

> **Known event + known venue + useful venue intelligence + travel estimate + timing buffer = a trustworthy recommendation for when to leave.**

---

# 29. Required UX copy

These strings should be treated as product requirements unless a clearly better equivalent is proposed.

### Event timing warning

> **Event times can change.** Always confirm the event date, start time, venue, and entry information with the event organizer or venue before you leave.

### Calculation warning

> **Leave-time estimates are guidance, not a guarantee.** Traffic, transit delays, parking, security lines, weather, schedule changes, and other conditions can affect your arrival time.

### Result wording

> **We recommend leaving by [TIME].**

Not:

> You must leave by [TIME].

Not:

> Leave at [TIME] and you will arrive on time.

### OnTimer CTA

> **Don’t be late. Turn this into an alarm.**
> OnTimer sets automatic alarms for all your calendar events.

> **Get OnTimer Free**

---

# 30. Execution protocol

This section describes the intended implementation sequence after review. It is not an instruction embedded in an attached document and does not independently authorize external account creation, legal publication, production deployment, or paid API use.

Timebox initial investigation to 2–4 hours maximum. Update this file with concrete findings, implementation decisions, approved-provider or fixture observations, and the first venue plus the provisional next four.

Then continue directly into implementation.

Do not stop after:

- research
- an architecture document
- a revised plan
- a list of recommendations

Reuse the existing airport calculator architecture and conversion flow wherever possible.

Build the smallest end-to-end vertical slice first.

The first milestone is not:

> “Ticketmaster integration complete.”

It is:

> **A user can land on a page for a real upcoming event, enter where they are coming from, get a clearly qualified recommended departure time, add the event to their calendar, and be shown the OnTimer alarm CTA.**

Once that works, generalize.

## Launch gates

Before an event page becomes indexable or enters the production sitemap, verify all of the following:

- provider rights/terms and any required attribution are recorded and approved for this use;
- API credentials are server-only, scoped, monitored, rate-limited, and covered by a kill switch;
- removal requests can be honored within 24 hours and provider termination can purge or disable affected content;
- precise event date/time and timezone are available, with TBA/TBD and status behavior tested;
- the venue profile has a review date, at least two authoritative sources, and genuinely venue-specific guidance;
- stale, canceled, postponed, rescheduled, provider-failure, and deleted-event paths are tested;
- metadata, canonical, Open Graph, Event/Place/Breadcrumb schema, internal links, and sitemap behavior pass the SEO checklist;
- the page is usable at 320, 375, 414, and 768 pixels and the result → calendar → OnTimer handoff remains dominant;
- paid Google Routes calls follow `docs/API_COST_CHECKLIST.md`, including request guards, quotas, failure fallback, and regression coverage;
- Terms/Privacy changes, if required, have completed explicit legal/content review;
- the change and verification are recorded in `docs/SITE_CHANGELOG.md` before release.

## External references checked during review

- Ticketmaster Discovery API v2: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
- Ticketmaster Developer Terms of Use: https://developer.ticketmaster.com/support/terms-of-use/
- Ticketmaster Developer FAQ: https://developer.ticketmaster.com/support/faq/

Re-check these sources before implementation and launch because quotas and terms can change.
