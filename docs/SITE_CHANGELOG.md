# OnTimer Website Changelog

This changelog records meaningful website fixes, improvements, and maintenance outcomes. It complements Git history without duplicating implementation details. Brand strategy and positioning changes belong in BrandOS instead.

## Unreleased

### 2026-08-09

- Moved alternate-calendar import help beneath the post-download OnTimer offer, replacing the oversized `.ics` instruction card with a compact, truthful download confirmation and an expandable help section so the App Store call to action remains immediately visible.
- Simplified the calendar next-step panel across Airport, Cruise, General Leave Time, and Wake-Up, and replaced generic post-calendar conversion copy with outcome-specific promises for catching a flight, boarding a cruise, reaching a destination, or leaving for an appointment.
- Replaced the airport calculator's generic post-calendar OnTimer pitch with flight-specific action copy and simplified the alternate-calendar link so the result funnel stays focused on catching the flight.
- Made calendar destinations explicit across the timing calculators: Google Calendar is now labeled as such, while Apple Calendar, Outlook, and other calendar users receive a standards-based `.ics` option with provider-accurate handoff instructions.
- Verification: calendar-link and leave-time regression tests and the optimized production build passed; the Google and `.ics` choices, alternate-calendar state transition, generated download metadata, console, and 320 px result layout were checked interactively.
- Standardized the Airport, Cruise, General Leave Time, and Wake-Up result journeys around a progressive calendar handoff: save the useful event first, then elevate OnTimer as the automatic persistent-alarm layer. Wake-Up saves the underlying arrival appointment rather than misrepresenting a calendar event as a wake-up alarm, while Airport Theory continues to route risky results through the safe calculator first.
- Added shared Google Calendar event construction, accurate “calendar opened” states, retry actions, and funnel analytics for calendar handoffs and post-calendar App Store prompts. Medication tooling was intentionally left unchanged.
- Verification: calendar-link, autocomplete, and leave-time regression tests passed; the optimized production build passed; calendar payloads and pre/post-handoff states were exercised for General Leave Time, Wake-Up, and Cruise; Airport, Cruise, General, Wake-Up, and Airport Theory showed no horizontal overflow at 320, 375, 414, or 768 px and emitted no console errors.
- Refocused the generic airport calculator result flow around one clear next step: add the recommended leave time to Google Calendar, then promote OnTimer as the automatic persistent-alarm layer after the calendar handoff opens.
- Added local airport-catalog autocomplete for short IATA-code input such as BWI while preserving the four-character minimum for paid Google Places requests.
- Verification: autocomplete regression tests and optimized production build passed; the BWI match, pre/post-calendar conversion states, console, and horizontal overflow were checked at 320, 375, 414, and 768 px.

### 2026-08-07

- Documented the medication generator's permanent UX, calendar-import, next-occurrence, timezone, alert, conversion, and regression-testing contracts in `CLAUDE.md` and `README.md`.
- Restored “Add to Calendar” as the medication generator's primary export CTA while retaining the concise iPhone confirmation instruction beneath it.
- Replaced the medication generator's OnTimer handoff with the concise dose-specific message “Don't miss your doses. Get OnTimer free and turn this schedule into alarms.”
- Corrected the iPhone calendar-import handoff so the site no longer implies that opening an ICS preview saved the schedule: the primary action now says “Continue to Calendar,” explicitly instructs users to tap Apple’s “Add To Calendar” confirmation, and reports only that the import screen opened. Calendar events now include an at-time alert instead of the “Alert: None” shown in Apple’s preview. Replaced the exhaustive timezone picker with Local (when needed), ET, CT, MT, PT, AZ, AK, HI, and UTC. Verified against the supplied iPhone screenshots, medication export tests, production build, and browser interaction.
- Calendar exports now start each recurring dose series at its next future occurrence, so a same-day dose time that has already passed begins tomorrow while later doses still begin today. Overnight dose offsets are preserved without creating extra calendar series. Tightened the OnTimer handoff around persistent alarms and active dismissal. Verified with deterministic timezone-aware calendar export tests.
- Simplified the medication generator's conversion state: removed the long explanatory pitch, introduced a compact automatic-alarm benefit, and made OnTimer the primary next step after calendar export while retaining a quiet download-again action. Verified with medication schedule tests, a production build, and responsive browser checks.
- Reframed the medication page around its free calendar-schedule generator, replacing the long article-led hero and "Direct Answer" box with a concise outcome-led headline and an above-the-fold workbench layout.
- Kept the supporting SEO/GEO article, FAQ schema, safety language, and related guides below the tool while updating page metadata to describe the generator directly.
- Prevented desktop reloads from restoring a stale mid-article scroll position while preserving ordinary history navigation behavior.
- Verification: medication schedule tests, optimized production build, reload behavior, and responsive review at 320, 375, 414, 768, and 1280 px.

### 2026-08-06

- Added an explicit time-zone selection and an overnight-dose notice to the medication schedule generator so calendar exports do not silently create surprising late-night reminders.
- Kept dose times editable, clarified midnight labeling, and preserved evenly spaced defaults without interpreting or changing prescribed timing.
- Moved the detected time zone beside the first-dose time, shortened frequency controls, added four-times-daily and custom-time schedules, and reduced the overnight warning to a compact notice before the calendar action.
- Compressed first-dose time and its detected zone into one inline control, using short labels such as ET and PT, and removed repeated timezone guidance from the form and results.
- Verification: medication-schedule regression tests and the optimized production build passed.

### 2026-08-03

- Added canonical calculator-start, calculator-completion, automatic-alert CTA impression/click, and App Store outbound-click events to the general and airport leave-time funnels.
- Added durable first-party attribution context (landing page, source, available search term, calculator type, CTA variant, and anonymous attribution token) to GA4 conversion events without mislabeling outbound clicks as installs.
- Verification: TypeScript checks, leave-time tests, and the optimized production build passed.

### 2026-07-31

- Added the remaining 24 airports in the planned 50-airport international collection, with locally specific terminal, road, rail, bus, transfer and inside-airport guidance for each destination.
- Added a catalog regression guard requiring four substantial airport-specific planning facts per international page and rejecting exact reuse of those contextual facts across airports.
- Verification: leave-time tests and the optimized production build passed; all 24 new routes were statically generated; the destination-texture guard passed; Barcelona, Lima, Bangkok and Nairobi were reviewed locally with no console errors or horizontal overflow at 320, 375, 414 and 768 px.

### 2026-07-28

- Added 25 indexable international airport time-to-leave calculators across Europe, the Middle East, Asia-Pacific, India, Canada and the Philippines, each with airport-specific terminal, road, rail and final-transfer guidance.
- Generalized the international security-planning path so non-U.S. airports use conservative airport-security estimates and never expose TSA PreCheck/CLEAR controls or imply live TSA data.
- Added permanent release checks for source depth, international security language and representative responsive review of large destination catalogs.
- Verification: leave-time tests and the optimized production build passed; all 25 routes were statically generated; Changi, Mumbai, Toronto Pearson and Melbourne were reviewed locally with no console errors or horizontal overflow at 320, 375, 414 and 768 px.
- Rewrote the Heathrow airport guide and shared airport-page guidance in direct traveler language, replacing publisher-facing and template-like phrasing with clear actions around terminals, routes, transfers, check-in deadlines and day-of-travel checks.
- Added permanent human-readability checks for programmatic destination pages to the SEO release checklist.
- Verification: production build and leave-time tests passed; Heathrow copy was reviewed from hero through FAQ for consumer clarity.
- Hardened the Google Places and Routes proxy endpoints against unauthenticated direct use and request bursts with same-origin enforcement, input bounds, per-IP limits, and global per-instance safety limits.
- Reduced autocomplete request volume by requiring four characters, increasing debounce time to 600 ms, and cancelling stale browser requests.
- Removed paid travel-time retry fan-out so one calculator submission can make at most one upstream Routes API request; failures now use the existing manual-entry fallback.
- Bounded the warm-instance travel cache and corrected documentation that had incorrectly described it as cross-instance caching.
- Added automated API cost-guard tests and a permanent paid-API cost-safety checklist.
- Verification: API cost-guard, autocomplete, and leave-time tests passed; the optimized production build passed; deployed direct calls return 403 and invalid same-origin requests stop before paid upstream calls.
- Confirmed from Google Cloud Billing that the incident was concentrated in the `ontimer-timetofly-calculator` project: the Places API SKU `Autocomplete without Places Details - Per Session` recorded 9,173 requests and $8.77 in charges. The July 1–28 billing overview showed $13.57 gross cost, $4.54 savings, and $9.03 net cost.
- Verification: reviewed billing by project, service, and SKU. Places API (New) still exposed autocomplete limits of 1,500 requests/day and 600 requests/minute; provider-side quota reduction remains required.

## 2026-07-27

- Corrected cruise-terminal URLs that had been emitted under the airport route. Misclassified legacy URLs now permanently redirect to their canonical cruise pages.
- Restricted the airport calculator directory to airport destinations, preventing future airport/cruise route mismatches.
- Added missing canonical tags across indexable marketing pages, the blog, blog posts, and static legal pages.
- Added 11 eligible supporting content pages to the sitemap.
- Replaced internal links that unnecessarily passed through redirects with direct canonical links.
- Shortened privacy and terms redirects by sending them directly to the canonical `www` hostname.
- Added a repeatable production SEO audit and release checklist.
- Verified production with a complete crawl: 114 sitemap URLs, 115 discovered internal URLs, zero broken links, zero avoidable internal redirects, zero canonical issues, zero erroneous `noindex` pages, and zero destination-route mismatches.
