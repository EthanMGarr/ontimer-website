# Generic Airport Calculator Rollout

This rollout is intentionally limited to `/airport-time-to-leave-calculator`. Airport-specific landing pages and the generic point-to-point calculator remain unchanged until the generic airport experience is reviewed.

## Phase 1 — Mechanical UX and copy

Recommended model/effort for similar follow-up work: Terra or Sol, light effort.

- Relabel the flight input to “Flight departs at.”
- Keep the calculated result labeled “Leave by.”
- Add a persistent calendar-date explanation for Today that is visually separate from selection state.
- Replace the post-calendar headline with “Don’t be late. Turn this into an alarm.”
- Airport-name/code H1 de-duplication is not part of this generic-page test because the generic H1 does not contain an airport name or code.

## Phase 2 — Data and handoff behavior

Recommended model/effort for similar follow-up work: Sol, medium/high effort.

- Replace the generic airport field’s paid live airport lookup with static type-ahead options generated from OnTimer’s published airport catalog.
- Preserve raw typed text as a fallback when no static airport is selected.
- Preview the calendar event title, leave-by time and location before calendar handoff.
- Use the full airport name, IATA code and city in Google Calendar and `.ics` location fields.
- The existing generic page already renders the calculator before its complete SEO/GEO guidance, so no content was removed, shortened, hidden or reordered.
- Compact schedule-link encoding is not applicable: this calculator has no raw-JSON share link. Google Calendar uses ordinary event parameters, and `.ics` remains a client-generated calendar file with no server storage.

## Expansion gate

Review the generic page on mobile and desktop before extending these changes to airport-specific pages. Confirm airport-search accuracy, calendar geocoding, calendar-preview clarity, calculator completion, calendar handoff and App Store CTA behavior. Preserve existing metadata, schema, crawlable guidance and URL structure during any expansion.
