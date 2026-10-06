# Calculator Conversion UX Checklist

This is the release contract for OnTimer calculators. It protects the required input → answer → action conversion sequence and the app-primary measured rollout.

## Required sequence

1. The searcher immediately understands what the calculator answers.
2. The primary editable input is visible in the first practical mobile viewport.
3. The calculator returns one clear primary answer.
4. The answer and the app-primary action are visible together without additional scrolling.
5. Both OnTimer and the one-result calendar handoff remain available before calendar use; OnTimer is primary for eligible iPhone acquisition traffic.
6. After the calendar action, the OnTimer action moves into the focal slot.

## Entry-state rules

- Use compact task context: one short eyebrow, one outcome-oriented heading, and only the date/time/location needed to plan.
- Keep breadcrumbs out of the visual mobile task path.
- Do not place detail grids, repeated metadata, full disclaimers, provider explanations, promotional panels, or supporting SEO copy before the primary input.
- Keep the first field label and editable control visible at 320, 375, and 414 px widths in a representative phone-height viewport, including normal site chrome.
- When a route starts from the visitor, keep the shared “Use my current location” control directly with the starting-location field; use its coordinates for routing while retaining a readable display label.
- When current external data adds trust before calculation, keep it to one compact status line in existing calculator chrome. Show it only for destinations the provider supports and only when current evidence is available; it must not become a card, push the first editable input below the practical mobile viewport, or imply that a third-party estimate is an official measurement.
- When a reviewed destination page exists for a selected airport, expose at most one quiet contextual link beside that selection. Keep it subordinate to the input and calculate action; do not add a destination card or directory to the mobile task path.

## Result-state rules

- Generic calculators must begin with a neutral prompt rather than a fabricated selection or answer. If a curated selector cannot cover every valid use case, include a clearly labeled “Something else” choice that reveals a text field for the visitor's own value.

- Move focus or scroll to the result after calculation.
- Show the answer, date/context, and no more than one compact summary row before the assigned primary action.
- Do not put a timeline, itemized assumptions, provider details, warning cards, or educational copy before the conversion actions.
- Put optional calculation detail in a disclosure after the conversion handoff.
- Put provider attribution, current-status detail, and alerts after the calendar and OnTimer handoff; changing live values must not appear in search-result snippets. Translate raw provider or operations codes into concise customer language, and reserve warning colors for conditions that require a clear user action.
- The calendar action must have a 44 px minimum target and an unwrapped primary label.
- During the `calculator_app_primary_v1` measured rollout, non-Android visitors see OnTimer as the primary result action with calendar retained as a clearly labeled secondary one-result action. Never hide the calculated answer or either path.
- Use the benefit-led CTA “Get Automatic Alarms” before calendar use and state plainly, “OnTimer is free.” Never qualify the claim as “free to download,” and do not repeat “free” in the supporting line. Use that line for product proof instead: “Works with Google Calendar, Apple Calendar, and Microsoft 365.”

## Rollout rules

- Use the app-primary experience for all non-Android calculator visitors; analytics consent controls measurement, not the user experience. Android visitors retain the established calendar/affiliate experience.
- For measurable visits, fire `experiment_assignment` once per browser-tab session and attach `experiment_id`, `experiment_variant=app_primary`, and `assignment_method=full_rollout` to subsequent calculator events.
- Keep the development-only control override available for regression review, but never enable query overrides in production.
- Use distinct App Store campaign tokens for treatment clicks. Report GA4 outbound intent and App Store Connect campaign outcomes separately; never label an outbound click as an install.
- Change one primary variable at a time. The first test changes action hierarchy only; calendar collapsing or result gating requires a later experiment.

## Calendar-return rules

- Opening or downloading a calendar event changes the handoff slot to the OnTimer acquisition state.
- The OnTimer action stays in the same visible focal area; it must not appear beneath calculation details.
- When the browser regains focus or visibility after the calendar handoff, move focus and scroll to the replacement acquisition action. On iOS this is OnTimer; on Android this is the configured Travelpayouts offer.
- Retain an understated way to reopen Google Calendar or download another calendar format.

## Verification

- Run the calculator-specific source regression.
- Exercise the complete path at 320, 375, 414, and 768 px: entry → calculate → calendar action → return.
- Confirm no horizontal overflow, no browser console errors, 44 px controls, readable focus states, and no hidden required content.
- Record the verification in `docs/SITE_CHANGELOG.md`.

## Calendar-capable calculator inventory

The shared handoff covers general Time To Leave, Airport Time To Leave, Cruise Time To Leave, Wake Up Time, Airport Pickup, and event-specific Time To Leave. Days Until has a purpose-built calendar handoff and must follow the same secondary-acquisition rule.

Run `npm run test:calendar-conversion:ux` whenever any of these result experiences changes.

For event calculators, run `npm run test:event-calculator:ux` in addition to the event calculation tests.
