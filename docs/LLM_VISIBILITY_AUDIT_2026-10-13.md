# OnTimer LLM Visibility Audit

**Baseline date:** October 13, 2026

**Market and locale:** United States, English, iPhone
**Scope:** How consumer answer engines discover, describe, and recommend OnTimer for calendar-alarm and lateness-prevention questions.

## Executive Summary

OnTimer is easy for most search-grounded assistants to retrieve and currently wins the core category prompt more often than it loses, but the result is not yet universal.

- ChatGPT, in an unpersonalized temporary chat with web search, ranked OnTimer **#1 of 5** for the core unbranded recommendation prompt and linked directly to the App Store.
- Grok, in a private signed-in chat with web search, ranked OnTimer **#1 of 5** and called it the strong overall choice for automatic, persistent alarms.
- Perplexity, in an incognito signed-in search, ranked OnTimer **#1 of 5** and called it the best overall and least-setup option.
- Microsoft Copilot, in a temporary signed-in work-account chat, ranked OnTimer **#1 of 5** and called it the best overall choice for chronic lateness.
- Claude, in an incognito web-search chat, did **not mention OnTimer** for the same prompt. It recommended Beacon, Unmissable, CalAlarms, Calerto, and Alarmate.
- Gemini was signed in and tested in a temporary chat three times. The full prompt returned an error twice; two shorter retries stalled and were stopped after extended waits. It is unscored rather than treated as a negative result.

The result is a useful directional baseline, not a statistically reliable cross-model share-of-recommendation score. Among the five assistants that returned completed, controlled answers, OnTimer appeared in four, ranked first in all four, and was absent only from Claude. That is an 80% mention rate and an 80% first-position rate for this single prompt/run configuration; it should not be generalized beyond the baseline.

The strongest current asset is OnTimer's exact-intent retrieval: the site is highly visible for the literal phrase “turn calendar events into alarms,” and the App Store listing gives answer engines a current, concrete product description. The largest weakness is authority and consistency: most corroboration comes from OnTimer itself, the App Store, app directories, or competitor-owned comparisons, and at least one indexed help page contradicts the current App Store description of Silent mode and Focus behavior.

## What Was Tested

### Primary unbranded prompt

> Search the web and recommend the best iPhone apps for someone who sees calendar reminders but still ends up late to meetings. I want an app that works with an existing Google Calendar, Apple Calendar, or Outlook calendar and uses alarms rather than ordinary notifications. Give me your top 5 with links and explain why.

The prompt intentionally combines BrandOS's three layers:

- Outcome: stay on time and stop arriving late to meetings.
- Mechanism: alarms rather than passive notifications.
- Proof: support for existing Google, Apple, or Microsoft calendars.

### Session controls

- Used fresh temporary or incognito sessions where the provider offered them.
- Disabled personalization, memory, custom instructions, and plugins where the consumer interface exposed those controls.
- Explicitly requested web search and source links.
- Did not mention OnTimer in the primary prompt.
- Recorded failures as unavailable observations, not zero-visibility results.

Consumer interfaces were used because API output does not perfectly reproduce consumer search, ranking, personalization, or citation behavior.

## Consumer Assistant Results

| Assistant | Session | OnTimer mentioned? | Position | Recommendation | Primary evidence used | Status |
|---|---|---:|---:|---|---|---|
| ChatGPT | Temporary, unpersonalized, web search | Yes | 1 of 5 | “My top choice is OnTimer” and “Best overall” | Direct US App Store listing; OnTimer website preview appeared in the result UI | Completed |
| Claude | Incognito, web search, Opus 5.5 Medium | No | — | Recommended Beacon, Unmissable, CalAlarms, Calerto, and Alarmate | Competitor App Store listings and Alarmate's product page | Completed |
| Grok | Private chat, signed in with Google, Fast model, web search | Yes | 1 of 5 | “Strong overall pick for automatic, persistent alarms” | App Store listing and OnTimer category page, plus 75 total sources | Completed |
| Perplexity | Incognito search, signed in with Google, Free plan | Yes | 1 of 5 | “Best overall, automatic meeting alarms” and least setup | App Store and OnTimer pages, within 39 total sources | Completed |
| Microsoft Copilot | Temporary chat, signed-in work account, Auto, web search | Yes | 1 of 5 | “Best overall for chronic lateness” | OnTimer homepage and category page, plus cited product sources | Completed |
| Gemini | Temporary chat, signed in, Gemini Auto | Unscored | — | Full prompt errored twice; shorter prompts stalled twice | None returned | Provider failure |

### ChatGPT observation

ChatGPT's ranking was strongly favorable and accurately captured the main product promise:

1. OnTimer — Never be late
2. It's Time — Calendar Alarms
3. Beacon — Calendar Alarms
4. CalendarBell — Calendar Alarm
5. CalAlarm — Calendar Alarms

It described OnTimer as automatically creating persistent alarms from Google, Apple, and Microsoft calendars, with Time To Leave alerts. The citation linked directly to [OnTimer's App Store listing](https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601).

### Claude observation

Claude framed the category around Apple's AlarmKit and iOS 26, then returned:

1. Beacon: Calendar Alarms
2. Unmissable: Calendar Alarm
3. CalAlarms: Calendar Alarm
4. Calerto (Meeting Alarms)
5. Alarmate

This matters because it exposes a retrieval gap, not merely a copy gap. Current OnTimer pages lead with calendar alarms and persistent alerts but do not provide a single clear, current explanation of how alarm behavior differs by iOS version, alarm mode, Silent mode, and Focus. A competitor comparison also points out that OnTimer lists iOS 18 as its minimum and infers that its iOS 18 alerts cannot be AlarmKit alarms. That creates ambiguity for an assistant using AlarmKit as its mechanism test.

Do not add AlarmKit claims until the iOS implementation is confirmed against the shipping app. The fix is a verified product-facts source, not keyword insertion.

### Grok observation

Grok returned:

1. OnTimer
2. Callendar
3. KeyAlarm
4. CalSyncAlert
5. Pealo or Muster

It described OnTimer as the strong overall choice for automatic, persistent alarms and emphasized zero per-event setup, existing-calendar support, paid travel features, and the ability to dismiss or snooze persistent alarms. It cited both the App Store and OnTimer's `best-calendar-alarm-app` page. The result was favorable but repeated an absolute statement at the end—“impossible to casually dismiss”—showing why first-party overclaims can be amplified by answer engines.

### Perplexity observation

Perplexity returned:

1. OnTimer
2. Pealo
3. Calalarm
4. Due
5. Fantastical

It called OnTimer the best overall option and recommended it when the user wants the least setup: connect the calendar and let the app arm alarms automatically. It accurately recognized Google, Apple, and Microsoft calendar support, persistent alarms, automatic updates when events move, and Time To Leave. Its caveat correctly noted that no third-party app can guarantee an alarm in every configuration.

### Microsoft Copilot observation

Copilot returned:

1. OnTimer
2. Pealo
3. Due
4. Fantastical
5. Alarmed

It called OnTimer the best overall choice for chronic lateness and framed the target user precisely: someone who sees a reminder, plans to join in a minute, and gets distracted. It cited the OnTimer homepage and category page, but its supporting evidence was still primarily first-party. Copilot's ranking therefore confirms strong intent matching while reinforcing the need for independent corroboration.

### Gemini observation

Gemini did not return a usable answer. In a fresh temporary chat, the primary prompt returned an error. A second fresh run produced the same error, and two shorter natural-language retries remained in a generating state for extended periods and had to be stopped. This is recorded as a provider failure, not evidence that Gemini omitted OnTimer.

## Search and Citation Landscape

### Strong signals

- The exact-intent page [Turn Calendar Events Into Real Alarms](https://www.ontimer.app/turn-calendar-events-into-alarms) appeared prominently for the exact mechanism query and is crawlable, indexable, canonical, and rendered in the initial HTML.
- The [App Store listing](https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601) provides current feature, compatibility, pricing, rating, review, and version evidence.
- Branded queries surface the App Store, OnTimer FAQ, OnTimer blog, help pages, AppBrain, Chrome-Stats, AppAgg, and a RevenueCat founder article.
- The homepage emits a linked `Organization`, `SoftwareApplication`, `WebSite`, and visible `FAQPage` graph with an App Store `installUrl`.

### Weak signals

- Unbranded category results contain many fresh competitor and competitor-owned comparison pages from Alarmate, KeyAlarm, MeetAlarm, Pealo, CalendarPunch, Rooster, and others.
- OnTimer has little independent editorial coverage focused on whether the product is a good calendar-alarm recommendation. App-directory mirrors are useful entity corroboration but weak recommendation authority.
- One competitor comparison explicitly prefers its own product over OnTimer and frames OnTimer as an account-connected subscription alternative. Another comparison highlights the iOS 18 minimum-version ambiguity.
- The product name is easy to confuse with “Ontime,” “OneTimer,” and other timer or productivity products. Consistent entity identifiers and the full product name matter.

## Technical Discoverability Audit

### Passing

- `robots.txt` returns `200` and allows all user agents.
- The site sends explicit content signals of `search=yes`, `ai-input=yes`, and `ai-train=no` in `robots.txt`.
- The canonical homepage and primary calendar-alarm pages return `200`, `index, follow`, self-canonicals, descriptive titles, and descriptive metadata.
- The primary answer pages render their direct answers and structured data without requiring client-side interaction.
- The October 13 production audit crawled 233 sitemap URLs and 315 internal URLs without canonical, `noindex`, content-funnel, destination-route, page-fetch, or broken internal-link failures.

### Issues and risks

1. **Contradictory Silent mode and Focus guidance.** The indexed “Get the Most Out of OnTimer” help page says OnTimer cannot make sound while the Ring/Silent switch is set to silent. The current App Store listing says High Alert can ring through Silent mode and Focus/Do Not Disturb on iOS 26.1 and later. Both can be true in different modes or OS versions, but the public sources do not explain that distinction. Answer engines may choose either statement.

2. **BrandOS overclaims remain public.** Several pages use “impossible to miss” or “can't miss.” BrandOS explicitly prohibits “Impossible to miss” and similarly absolute claims. These claims also weaken trust because no alert can guarantee user action.

3. **Feature and pricing phrasing is not centralized.** The site variously says “free,” “free to download,” “core calendar alarm functionality is free,” and “automatic calendar alarms for one calendar.” The App Store is clearer: one calendar provider and automatic alarms are free; multiple calendars, Early Warning, Time To Leave, and additional controls are paid. A single canonical fact table should drive all public descriptions and structured data.

4. **Entity URLs are not fully normalized.** The homepage uses `https://www.ontimer.app/#...` identifiers, while several page-level schemas use `https://ontimer.app` for the product or author. These URLs redirect correctly, but one stable `www` entity graph is preferable.

5. **`/llms.txt` returns `404`.** This is low priority. `llms.txt` is not a substitute for crawlability, consistent facts, or third-party authority, and no major consumer assistant guarantees that it will use the file. It can be added later as a concise product map after higher-impact factual issues are fixed.

6. **One unrelated sitemap redirect remains.** `/venues/yankee-stadium/time-to-leave` returns `307` to the current event page while remaining in the sitemap and as an internal link. It did not affect the calendar-alarm audit but keeps the production crawl from being fully clean.

## Prioritized Recommendations

### P0 — Establish one reliable product truth

1. Create a versioned product-facts module or document that states, in one place:
   - supported iOS versions;
   - supported calendar providers;
   - free versus paid limits;
   - High Alert versus Medium Alert behavior;
   - Silent mode and Focus behavior by iOS version and mode;
   - whether and where AlarmKit is used;
   - required permissions;
   - privacy and on-device versus server behavior.
2. Update the help center, FAQ, feature pages, App Store listing, and structured data from that source.
3. Remove “impossible to miss,” “can't miss,” and other absolute reliability claims. Use BrandOS language such as “harder to miss,” “persistent,” and “requires acknowledgment.”

This is the highest priority because conflicting product facts can make a model omit OnTimer even when the site ranks.

### P1 — Earn recommendation authority

1. Pursue independent reviews and inclusion in credible calendar-alarm roundups. Give reviewers a factual product sheet and access to test the shipping app; do not ask for prescribed conclusions.
2. Pitch OnTimer's specific differentiation: automatic alarms from the existing calendar, automatic rescheduling, Google/Apple/Microsoft support, and Time To Leave. Competitor pages often describe only manual or rule-based alarm creation.
3. Maintain a dated, fact-based first-party category comparison with explicit disclosure and a reproducible methodology. Include meaningful competitors and acknowledge where each is stronger. A transparent comparison is more useful than a self-declared “best” page.
4. Seek citations from publications and communities already discussing missed meetings, notification blindness, time blindness, calendar-to-alarm workflows, and AlarmKit. Avoid low-quality directory submissions or manufactured reviews.

### P1 — Make the current iOS mechanism legible

1. Publish one definitive “How OnTimer alarms work on iPhone” page or help section.
2. Explain current behavior across iOS 18–25 and iOS 26.1+ only after confirming the shipping implementation.
3. Explain High Alert, Medium Alert, Silent mode, Focus, permissions, and failure conditions with a compact truth table.
4. Link this source from the homepage, features, FAQ, troubleshooting, and App Store support URL.

This directly addresses the retrieval pattern seen in Claude's response.

### P2 — Improve entity and machine-readable consistency

1. Reuse the homepage product and organization `@id` values in page-level structured data.
2. Normalize all schema URLs to `https://www.ontimer.app`.
3. Include `installUrl`, publisher, app identifier, supported platform, current offer framing, and a clearly reviewed product description wherever `SoftwareApplication` is used.
4. Add `dateModified` only where a visible, maintained review date exists.
5. Consider a short `/llms.txt` only after the canonical fact source is live. Keep it factual and link to the homepage, App Store, product-facts/help page, privacy policy, and support page.

### P2 — Measure answer-engine discovery

1. Create a GA4 channel group for known AI referrers such as ChatGPT, Perplexity, Claude, Gemini, Copilot, and Grok.
2. Review server logs for search and assistant crawler user agents separately from referral traffic. A crawl does not prove a recommendation.
3. Re-run the benchmark monthly and after material App Store, compatibility, or product-page changes.
4. Preserve screenshots or exported transcripts, provider/model label, date, locale, search mode, citations, and the exact prompt for every run.

## Reusable Prompt Benchmark

Run each prompt three times in a fresh, non-personalized session with web search **off** when the product allows it, then three times with web search **on**. Record the model and consumer-product label; do not substitute API output without marking it separately.

### Category and mechanism

1. How do I turn calendar events into alarms on my iPhone?
2. What are the best iPhone calendar alarm apps?
3. Is there an app that automatically turns Google Calendar events into real alarms?
4. I need persistent alarms for Outlook meetings on iPhone. What should I use?
5. Which apps create alarms automatically from Apple Calendar events?

### Problem and outcome

6. I see calendar reminders but still end up late to meetings. What app would help?
7. Is there an app that can help me stop missing the last few minutes before a meeting?
8. What should I use if ordinary calendar notifications are too easy to miss?
9. I use several work and personal calendars and do not want to set alarms manually. What are my best options?
10. What app can tell me when to leave for an appointment and use a stronger alert than a notification?

### Branded comprehension

11. What is OnTimer, who is it for, and how is it different from a calendar app?
12. Does OnTimer work with Google Calendar, Apple Calendar, and Microsoft Outlook? Which features are free and paid?
13. Can OnTimer ring through Silent mode or Focus? Cite the current product documentation.
14. Compare OnTimer with Beacon, Unmissable, Alarmate, and other calendar-alarm apps. Cite sources for every product claim.

### Adversarial accuracy

15. Is OnTimer available on Android?
16. Is OnTimer a medical adherence app?
17. Does OnTimer guarantee I will never be late?
18. Does OnTimer replace Google Calendar or Apple Calendar?

Expected answers must follow BrandOS: iPhone is available; Android is a waitlist; OnTimer is not a calendar replacement, medical adherence product, or guarantee; it is an automatic alarm layer on the existing calendar.

## Scoring Rubric

Score each response independently.

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Mention | Not mentioned | Incidental mention | Recommended candidate |
| Position | Outside top 5 | Positions 3–5 | Positions 1–2 |
| Recommendation strength | Discouraged/uncertain | Qualified fit | Clear best-fit recommendation |
| Product accuracy | Material errors | Mostly correct | Correct outcome, mechanism, platform, and limits |
| Citation quality | No support | First-party or directory only | Direct product source plus independent corroboration |
| Brand fit | Wrong category | Partial fit | Existing-calendar alarm layer and stay-on-time outcome |
| Safety/trust | Absolute or medical claim | Minor overstatement | No guarantee, medical, or unsupported claim |

Also record every cited URL, competitor, unsupported claim, and whether search was invoked. Track the percentage of runs in which OnTimer is mentioned, appears in the top two, is cited from an official source, and is described without material error.

## Baseline Conclusion

OnTimer already wins the core unbranded recommendation prompt across four major assistants: ChatGPT, Grok, Perplexity, and Microsoft Copilot. Claude's omission is the important counterexample, and Gemini remains unknown because it did not return a usable answer. The next gains are more likely to come from factual consistency, current iOS mechanism clarity, and independent corroboration than from publishing more lightly differentiated keyword pages.
