# Calculator Conversion UX Checklist

This is the release contract for OnTimer calculators. It protects the required input → answer → calendar → OnTimer conversion sequence.

## Required sequence

1. The searcher immediately understands what the calculator answers.
2. The primary editable input is visible in the first practical mobile viewport.
3. The calculator returns one clear primary answer.
4. The answer and primary calendar action are visible together without additional scrolling.
5. A restrained secondary OnTimer action remains available before calendar use for people who do not want the calendar handoff.
6. After the calendar action, the OnTimer action moves into the focal slot.

## Entry-state rules

- Use compact task context: one short eyebrow, one outcome-oriented heading, and only the date/time/location needed to plan.
- Keep breadcrumbs out of the visual mobile task path.
- Do not place detail grids, repeated metadata, full disclaimers, provider explanations, promotional panels, or supporting SEO copy before the primary input.
- Keep the first field label and editable control visible at 320, 375, and 414 px widths in a representative phone-height viewport, including normal site chrome.

## Result-state rules

- Move focus or scroll to the result after calculation.
- Show the answer, date/context, and no more than one compact summary row before the calendar handoff.
- Do not put a timeline, itemized assumptions, provider details, warning cards, or educational copy before the calendar action.
- Put optional calculation detail in a disclosure after the conversion handoff.
- The calendar action must have a 44 px minimum target and an unwrapped primary label.
- Every calendar-capable result must include a secondary OnTimer path before calendar use. Keep it visually subordinate to the calendar action and below the answer/handoff so it does not compete with the user's requested task.
- Use the benefit-led CTA “Get Automatic Alarms” before calendar use and state plainly, “OnTimer is free.” Never qualify the claim as “free to download,” and do not repeat “free” in the supporting line. Use that line for product proof instead: “Works with Google Calendar, Apple Calendar, and Microsoft 365.”

## Calendar-return rules

- Opening or downloading a calendar event changes the handoff slot to the OnTimer acquisition state.
- The OnTimer action stays in the same visible focal area; it must not appear beneath calculation details.
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
