# OnTimer Website Changelog

This changelog records meaningful website fixes, improvements, and maintenance outcomes. It complements Git history without duplicating implementation details. Brand strategy and positioning changes belong in BrandOS instead.

## Unreleased

### 2026-08-14

- Connected the production website to a dedicated GA4 web stream and replaced the fragile inline analytics initializer with a consent-aware command queue, preventing page views and early calculator interactions from being silently discarded before Google’s library finishes loading. Linked the canonical Search Console property to that stream and registered the calculator, intent, airport, calendar-provider and CTA event dimensions needed for comparable 7- and 28-day airport-answer reporting.
- Verification: production build passed; the live bundle contained the dedicated web-stream ID and consent-aware command queue, Google accepted a synthetic validation event, and the post-deployment audit passed all 165 URLs with zero issues.

### 2026-08-13

- Extended the airport answer-intent strategy across the full search cluster: all airport-specific metadata, application schema, directory messaging, navigation and internal-link anchors now lead with “when should I leave” rather than the calculator format. Added a source-backed planning caveat and review date, removed a repetitive conversion section, and instrumented personalized answer generation, timing-option interest and breakdown engagement with intent/location context through the calendar-to-alarm funnel.
- Verification: airport answer-intent, leave-time, departure-status and calendar-link regression tests passed; the optimized production build passed its type and lint checks; the generic calculator, generated answer, Newark page and airport directory were reviewed at 320, 375, 414, 768 and 1280 px with no horizontal overflow or browser console errors. Production deployment `dpl_CGCKtz1sscjpnmcdypQ69ZBmfAEP` reached Ready, the primary alias served the answer-led titles, canonicals and trust copy, the Vercel error scan was clean, and the live audit passed all 165 URLs with zero issues.

- Reframed the airport leave-time experience around the traveler’s actual question—what time they need to leave to make their flight—while keeping the calculator as the first task. The completed flow now moves from a circumstance-specific result to saving that leave time on the calendar and only then to OnTimer’s persistent-alarm handoff. Removed a duplicated generic keyword section and documented the calculator-first SEO/GEO rule.
- Verification: leave-time, departure-status and calendar-link regression tests passed; the optimized production build passed; the question-to-calculator first screen and result-to-calendar-to-alarm sequence were reviewed at 320, 375, 414, 768 and 1280 px with no horizontal overflow.

- Added concise “Free. No account required.” reassurance inside the Medication Schedule Generator card without changing its hero or workflow. Standardized the existing green eyebrows on the Airport Leave Time, Departure Time, and Wake-Up Time calculators as “Free [calculator description] · No sign-up required,” preserving their H1s, metadata, structured data, layouts, and functionality.
- Verification: optimized production build passed; all four affected pages were checked at 320, 375, 414, 768, and 1280 px with no clipping, horizontal overflow, excessive eyebrow height, or console errors.
- Standardized production releases behind `npm run deploy:prod` using a repository-pinned Vercel CLI and the existing linked project, eliminating repeated `npx @latest` downloads, global npm-cache failures and inconsistent deployment commands. Updated the permanent README and repository guidance.
- Verification: the pinned local CLI reports version 58.11.0; the optimized production build passed before the workflow change.
- Refocused the Medication Schedule Generator hero on the user outcome (“Never miss another dose”) while preserving medication-schedule and calendar-event relevance in the supporting copy. Added a concise crawlable explanation of the free generator to the existing calendar-system section; metadata, canonical, breadcrumb, and structured data remain unchanged.
- Corrected the airport calculator result status so a recommended leave time in the past explicitly says how long ago the user should have left, near-term departures show urgency, and future results show a live countdown instead of a misleading buffer-only “plenty of time” message. Changed the default flight departure from two hours to four hours ahead so the initial domestic planning scenario usually remains actionable after drive, parking, security and terminal time are included.
- Verification: added regression coverage for past, urgent, comfortable and risky departure states; leave-time tests and the optimized production build passed.
- Reduced paid address-autocomplete traffic without changing the four-character threshold or removing Google-quality results: lookups now wait 900 ms, run only while a field is focused and actively edited, and give pasted complete addresses a 1.4-second pause.
- Reused the local destination catalog for Airport Theory and cruise-terminal searches before falling back to Google, and tightened autocomplete abuse protection to 60 requests per IP per hour while preserving unrestricted manual address entry.
- Verification: autocomplete and API cost-guard regression tests passed; optimized production build passed; production returned local BWI and PortMiami suggestions while rejecting a direct untrusted autocomplete request with HTTP 403.

### 2026-08-12

- Aligned the patient-facing private medication-link result with the established medication scheduler workbench, including the same review hierarchy, “Your next step” calendar action, responsive post-export ordering, OnTimer alarm handoff, and calendar-import help. Removed the OnTimer promotion from the provider workbench and moved it into a short provider education section beneath the tool.
- Verification: medication and private-link regression tests and the optimized production build passed.
- Restored one clear patient calendar action that downloads the complete medication schedule—including every recurring dose time—in a single cross-calendar file, removing the confusing per-dose Google Calendar buttons without adding OAuth.
- Added a desktop-only, dismissible post-download dialog with concrete Apple Calendar, Outlook, and Google Calendar import steps. Closing the instructions now moves visual and keyboard focus to the OnTimer alarm handoff; mobile retains the compact native calendar-file flow.
- Verification: calendar-link and medication-schedule regression tests and the optimized production build passed.

### 2026-08-11

- Replaced the provider medication attachment handoff with a private schedule-link flow: schedule data is encoded only in a URL fragment, never sent in the page request, and is removed from the address bar after the patient page validates it. Patients can review dose details and add the resulting recurring `.ics` schedule to their calendar without an account. Analytics is disabled on the patient import route so schedule fragments and imported values cannot be captured.
- Verification: added round-trip and invalid-payload link tests; medication regression tests and the optimized production build passed.
- Added a geo-targeted cookie consent gate for Google Analytics: Edge Middleware (`src/middleware.ts`) classifies visitors as regulated (EU/EEA, UK, Switzerland) or not via `x-vercel-ip-country`, and `GoogleAnalytics.tsx` only loads GA for regulated visitors after they accept a new banner (`CookieConsentBanner.tsx`). Non-regulated visitors (including the US) see no banner and GA continues to load immediately, unchanged from prior behavior.
- Verification: production build passed; middleware cookie classification confirmed via direct requests with `DE`, `US`, and no `x-vercel-ip-country` header (including confirming a client-supplied `x-vercel-ip-country` header is stripped by Vercel's edge and cannot be spoofed against production); consent-gating logic (`src/lib/consent.ts`) unit-verified for regulated+no-consent (blocked), regulated+granted (allowed), and non-regulated (allowed by default) states; homepage checked in-browser with no banner shown for the default non-regulated case.
- Discovered `/privacy` and `/terms` redirect to static files (`public/OnTimer_Privacy_Policy.html`, `public/OnTimer_Terms_of_Service.html`) rather than the Next.js pages at those routes, so those static files — not `src/app/privacy/page.tsx` — are the policy actually served to visitors and referenced by the Footer. Added a named Google Analytics disclosure and a description of the new UK/EU/EEA/Switzerland cookie-consent gate to the live `OnTimer_Privacy_Policy.html` (Sections 2.5 and 5.7) and bumped its Last Updated date. Pointed the new consent banner's Privacy Policy link directly at the canonical static URL to avoid the redirect hop. The corresponding `src/app/privacy/page.tsx` / `src/app/terms/page.tsx` Next.js pages remain unreachable, stale duplicates by explicit choice — left alone for now.

### 2026-08-10

- Added a privacy-first provider medication calendar handoff tool that reuses the existing medication scheduler's frequency, time-slot, duration, validation, and calendar-file patterns, plus provider instructions and an explicit download-then-email workflow. The form excludes patient identifiers and analytics field values.
- Verification: provider recurrence and escaping regression coverage, the medication test suite, and the optimized production build passed; the calendar-download CTA was shortened for narrow layouts with its filename retained as supporting text.
- Promoted OnTimer to the first mobile action after a medication calendar export, moving the compact import confirmation and troubleshooting beneath the App Store offer while preserving the desktop action-rail sequence where both steps remain visible together.
- Verification: after export, the OnTimer offer rendered before the calendar confirmation at 375 px and the original confirmation-first sequence remained at 1280 px; neither layout produced horizontal overflow. Medication regression tests and the optimized production build passed.
- Connected overnight-dose guidance to the dose time that triggered it: affected time fields and their readable labels now share the warning panel's amber treatment and reference the guidance for assistive technology without incorrectly marking an intentional overnight time as invalid.
- Verification: a three-dose schedule highlighted only its midnight field at 375 px, exposed the warning relationship to assistive technology, and produced no horizontal overflow; medication schedule and calendar-export tests and the optimized production build passed.
- Corrected the medication scheduler's custom-duration field so mobile users can clear and replace the default value without an injected `1` corrupting the next entry; the field now accepts a temporary empty editing state, opens a numeric keyboard, and normalizes to the supported 1–365 day range only after editing. Simplified the OnTimer benefit copy to emphasize automatic schedule-to-alarm conversion.
- Verification: on a 375 px mobile viewport, the 60-day default was replaced directly with 5 and generated a five-day schedule without overflow; medication schedule and calendar-export tests and the optimized production build passed.
- Reworked the medication scheduler result into a review-and-action workbench: completed setup fields now collapse after generation, dose times and safety guidance remain visible, and calendar export plus OnTimer are presented together as the next two actions. After export, technical calendar-import help moves into a collapsed disclosure beneath the OnTimer offer.
- Verification: medication schedule and calendar-export regression tests and the optimized production build passed; generated and post-export states were checked at 320, 375, 414, 768, and 1280 px with no horizontal overflow or console errors.

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
