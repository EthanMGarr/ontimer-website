# Phase 4 - Screenshot Analysis

Research date: 2026-06-26  
Important limitation: screenshot text is image-based on App Store pages. Automated collection did not reliably expose full screenshot headlines. This report records observable listing-level patterns and creates human tasks for screenshot transcription and scoring.

## Screenshot Data Status

| App | Screenshot headlines | Visual style | Confidence | Source |
|---|---|---|---|---|
| OnTimer | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601) |
| Unmissable | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/unmissable-calendar-alarm/id6752518796) |
| Fantastical | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/fantastical-calendar/id718043190) |
| Structured | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/structured-daily-planner/id1499198946) |
| TickTick | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/ticktick-to-do-list-calendar/id626144601) |
| Google Calendar | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/google-calendar-get-organized/id909319292) |
| Any.do | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/any-do-to-do-list-planner/id497328576) |
| TimeTree | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/timetree-shared-calendar/id952578473) |
| Due | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969) |
| Calendars by Readdle | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/calendars-schedule-planner/id608834326) |
| Microsoft Outlook | Needs screenshot OCR | Needs human verification | Low | [App Store](https://apps.apple.com/us/app/microsoft-outlook/id951937596) |

## Recurring Messaging Patterns to Verify

| Pattern | Expected among competitors | Fact or opinion | Verification task |
|---|---|---|---|
| Broad calendar screenshots show calendars, monthly/weekly views, scheduling UI | Fantastical, Google Calendar, TimeTree | Opinion based on app category and listing positioning | Phase 6 Task 5 |
| Planner screenshots emphasize daily timelines, tasks, checklists, and routines | Structured, TickTick, Any.do, Calendars by Readdle | Opinion based on listing positioning | Phase 6 Task 5 |
| Persistent reminder screenshots may explain repeated alerts better than calendar apps | Due | Hypothesis based on Due listing copy | Phase 6 Task 5 |
| Direct calendar-alarm screenshots may be sparse or less polished | OnTimer, Unmissable | Hypothesis | Phase 6 Task 5 |
| Alarm mechanism may be under-explained by broad calendar apps | Broad calendar apps | Hypothesis | Phase 6 Task 5 |

## Opportunity Signals to Look For Manually

| Signal | Why it matters |
|---|---|
| Screenshot headline says "Calendar Alarm" clearly | Confirms direct keyword ownership attempt. |
| Screenshot shows a full-screen alarm before an event | Demonstrates OnTimer's functional difference. |
| Screenshot relies on generic planner language | Indicates weak defense against high-intent alarm keywords. |
| Screenshots are cluttered or text-heavy | Creates an opportunity for simpler, trust-first explanation. |
| Screenshots do not show acknowledgement / alarm dismissal | Leaves the core "hard to ignore" behavior unexplained. |
| Screenshots focus on feature lists instead of the late-to-meeting problem | Suggests emotional/problem-positioning gap. |

## Required Human Output Format

| Field | Instructions |
|---|---|
| App | Exact App Store app name |
| Keyword searched | Search phrase used to find listing |
| Screenshot headline 1-5 | Transcribe exact text |
| First screenshot topic | What product behavior is shown? |
| Screenshot quality score | 1 = confusing, 5 = clear and persuasive |
| Alarm clarity score | 1 = no alarm behavior, 5 = alarm behavior obvious |
| Weaknesses | Short factual notes |
