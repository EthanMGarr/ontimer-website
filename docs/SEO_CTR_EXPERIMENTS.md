# Search CTR Experiment Register

Use this register for title and description tests. Change one cohort at a time, preserve a
control cohort, and judge query-level CTR only against queries in comparable average-position
bands. Pagewide CTR is a secondary diagnostic because new long-tail impressions can lower it
even when established queries improve.

## Current airport-page treatment

On 2026-09-19 the airport and cruise destination-page templates moved to an explicit utility
promise after rendered LAX review showed that the title, H1 and intro still read more like an
answer page than a free calculator. Airport names now follow natural search usage—for example,
`LAX` but `Newark Airport (EWR)`—and descriptions repeat “free calculator” once so the utility
remains clear when Google truncates or rewrites either metadata field. The generic airport and
airport-pickup calculators received the same treatment; the wake-up and general leave-time
calculators already used explicit free-calculator language and remain comparison pages. Narrowly
identified generic passages retain supported `data-nosnippet` controls.

## Cohorts

1. Airport destination-page treatment: all `/airport-time-to-leave/[slug]` pages, with LAX,
   EWR, LGA, ORD and ATL as the primary reporting cohort
2. Generic airport treatment: `/airport-time-to-leave-calculator`
3. Cruise destination-page treatment: all `/cruise-time-to-leave/[slug]` pages
4. Airport-pickup treatment: `/airport-pickup-time-calculator`
5. Unchanged comparisons: `/wake-up-time-calculator` and `/what-time-should-i-leave`

## Measurement

- Compare the 28 days after a settled recrawl with the preceding 28 days.
- Export query + page + device data from Search Console.
- Evaluate mobile separately from desktop.
- Group queries by average-position bands: 1–2, >2–4, >4–6, >6–10, and >10.
- Compare CTR within the same position band and intent cluster; do not credit a copy change for
  CTR movement caused primarily by a ranking change.
- Record clicks, impressions, CTR, average position, changed copy, deployment date, first known
  recrawl date, and the chosen control pages.
- Keep a treatment only when it improves qualified clicks without materially weakening ranking
  or replacing calculator language with generic advice.

## Airport destination-page hypothesis

Make both the task and the free tool explicit while promising a concrete result:

> Calculate exactly when to leave for LAX. This free calculator uses your flight, starting point,
> traffic, security, baggage and parking to give you a specific leave time.

The shared treatment applies to all airport destination pages because their metadata and hero are
generated from one template. Evaluate LAX, EWR, LGA, ORD and ATL as the primary reporting cohort;
use the unchanged wake-up and general leave-time calculators only as directional comparisons
rather than strict controls because their intent and result-page composition differ. Report the
cruise and airport-pickup cohorts separately rather than pooling them with flight-departure pages.

## Recurring countdown-page treatment

Beginning 2026-09-20, the five published `/days-until/[slug]` pages lead their title and description
with the natural `{event} countdown` phrase while preserving the current numeric days-until answer,
full target date, and calendar-reminder benefit. The same phrase appears in the visible H1,
structured-data name, breadcrumb, and internal-link anchors so search engines and answer engines see
one consistent task identity rather than metadata-only keyword placement.

Measure the Thanksgiving, Christmas, Halloween, New Year’s Day, and Summer queries separately over
the settled 28-day post-recrawl window. Use each page’s preceding 28-day period within the same
query/device/position bands as its primary baseline; use the unchanged generic `/days-until` page
and other calculator queries only as directional controls because their intent is broader. Record
whether qualified clicks improve without losing impressions for the core `days until` variants.
