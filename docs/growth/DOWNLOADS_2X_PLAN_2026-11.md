# Website downloads 2× plan (Oct 30 – Nov 27, 2026)

Goal: double website-driven App Store click-throughs within four weeks, then confirm the
download lift in App Store Connect (Sources → Web Referrer `ontimer.app`, plus campaign
tokens).

## Baseline (pulled 2026-10-30)

Search Console, last 28 days (to Oct 28):

| Metric | Value |
| --- | --- |
| Clicks | 6,420 |
| Impressions | 693K |
| Average CTR | 0.9% |
| Average position | 5.2 |
| Mobile share of clicks | 82% (5,238 mobile / 1,105 desktop) |

GA4 `OnTimer — PRODUCTION`, Oct 2–29:

| Event | Users |
| --- | --- |
| `calculator_completed` | 3,964 |
| `app_store_click` (website) | 274 |
| `qr_code_visible` (desktop page loads with QR) | 1,980 |
| `qr_code_click` | 6 |
| `first_open` (all install sources) | 589 |

**Target:** 550+ `app_store_click` users per 28 days by Nov 27, with App Store Connect
web-referrer downloads moving in the same direction.

## Where the traffic is (28 days)

| Page | Clicks | Impr. | CTR | Pos. | Read |
| --- | --- | --- | --- | --- | --- |
| `/what-time-should-i-leave` | 2,995 | 269K | 1.1% | 4.1 | Wins its core queries at 50–67% CTR; volume is already here |
| `/airport-time-to-leave-calculator` | 1,421 | 163K | 0.9% | 5.2 | Same: conversion lever, not CTR |
| Airport destination pages (top 10) | ~700 | ~70K | ~1% | 5–6 | Same template |
| `/wake-up-time-calculator` | 316 | 67.6K | 0.5% | 5.4 | 98% of impressions are anonymized long-tail; visible ones are “wake me up at 6:15”, “what time should I set my alarm” |
| `/calendar-notifications-not-working` | 68 | 15.9K | 0.4% | 6.1 | Highest-intent problem audience; 90-day: 50.4K impr. Top queries say “**iPhone** calendar **alerts** not working” |
| `/what-to-say-when-late-to-meeting` | 35 | 14.4K | 0.2% | 5.8 | Low intent; cheap snippet test later |
| `/es/calculadora-a-que-hora-salir` | 26 | 9.4K | 0.3% | 6.0 | Spanish snippet alignment (see geographic review) |
| `/turn-calendar-events-into-alarms` | 70 | 1.7K | 4.2% | 3.9 | 90-day: 221 / 4.9K / 4.5% / 5.2. Exact product intent (“how to set alarm on calendar”, “add alarm to google calendar”) |
| `/best-calendar-alarm-app` | 45 | 1.1K | 4.2% | 5.3 | Product intent |
| `/why-calendar-notifications-fail` | 4 | 705 | 0.6% | 7.1 | Small search page, but it is the **Learn** nav destination |

## Priorities, ranked by expected downloads

### 1. Calculator result → install (biggest lever: ~4,000 result users / 28 days) — first change shipped Oct 30

Calculators bring about 85% of search clicks. The app-primary rollout (Oct 6) already puts
“Get Automatic Alarms” next to the answer. The September baseline was about 1% of
result users clicking through to OnTimer. Moving that to 4–5% alone roughly doubles
total website click-throughs.

- **Week 1 (done Oct 30):** Registered the event parameter `button_location` as the
  event-scoped GA4 custom dimension “Button location”, so `app_store_click` can be
  split by placement (it only populates from Oct 30 onward; earlier events are not
  backfilled).
- **Week 1–2:** Show the product in the result offer: add the full-screen alarm screenshot
  beside “Get Automatic Alarms”, and make the line specific to the result (“OnTimer can
  ring at 7:42 when it's time to leave”), stated as the Pro Time To Leave/Time To Fly
  capability it is. Keep the guardrail order (answer → evidence → adjust → action).
- **Week 2:** Airport results: lead with Time To Fly (“finds flights in your calendar
  and sets the leave-time alarm automatically”). Initial estimate is free.

### 2. `/calendar-notifications-not-working` CTR + conversion (shipped Oct 30)

- Title/H1 now match the dominant query wording: “iPhone Calendar Alerts Not Working?
  10 Fixes That Work”.
- The first screen now answers: the three settings behind most failures, each with its
  exact Settings path.
- Added a “working but still missed?” path to the OnTimer section and a real alarm
  screenshot there.
- Expectation: at position ~5–6, CTR 0.4% → 1.5–2% is realistic once recrawled.
  That's ~250–400 extra clicks per 28 days from the most problem-aware audience.

### 3. `/turn-calendar-events-into-alarms` conversion (shipped Oct 30)

Already ~4.5% CTR at position ~4–5; the page was text-only and claimed free multi-calendar
support. Rebuilt with: answer-first hero with the alarm screenshot and install button in
the first viewport; an honest “can you add an alarm to a calendar event?” answer per
calendar (it can't, without a Clock alarm per meeting); three steps with real
screens; an explicit Free vs Pro block; and an Android waitlist path. Many queries are
Google Calendar/Android, and those visitors can't install.

### 4. `/why-calendar-notifications-fail` (Learn) rewrite (shipped Oct 30)

The headline treated a tech-support search as a behavior lecture. The page now opens
with two clearly separated problems: “alerts don't show up” (links to the settings fix)
and “they show up and I'm still late” (the case for alarms). Title changed to
“Why You Miss Calendar Reminders (Even When They Work)” so it stops competing with the
troubleshooting page.

### 5. `/wake-up-time-calculator` CTR (title shipped Oct 30; feature in week 2–3)

- Title now leads with the question people ask: “What Time Should I Set My Alarm?”
  The description now promises the specific output.
- Week 2–3 candidate: a “wake me up at …” answer block (the most common visible query
  family) and a sleep-cycle mode. Competing results answer bedtime/sleep-cycle math that
  this calculator doesn't. Validate with the query export before building.

### 6. Desktop QR handoff (1,980 desktop users / 28 days) — campaign tokens shipped Oct 30

The QR goes straight to the App Store, so scans can't be counted. Point the QR at an
Apple campaign link (`ct=web_qr_<location>`) so App Store Connect attributes those
downloads, and add one line under it (“Scan with your iPhone camera”).

### 7. Cheap snippet tests (week 3)

- `/what-to-say-when-late-to-meeting` (14.4K impr., 0.2%).
- Spanish calculators. Follow the Oct 26 geographic review: fix intent alignment
  before creating country pages.

## Measurement cadence

- Weekly (Mondays): GA4 `app_store_click` users by `location`; `calculator_completed`
  users; Search Console page metrics for the five changed pages.
- Judge CTR changes only after a recrawl, by query and position band (see
  `docs/SEO_CTR_EXPERIMENTS.md`).
- Week 4: App Store Connect web-referrer and campaign downloads vs the prior 28 days.

## Risks

- Search CTR changes need 1–3 weeks of recrawl before they move clicks. Most of the
  four-week lift has to come from conversion on traffic we already have (priority 1).
- Calculator changes must keep the release guardrails passing
  (`npm run test:calculator-release-guardrails`).
