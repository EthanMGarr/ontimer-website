# Phase 1 - Keyword Universe

Research date: 2026-06-26  
Purpose: generate possible App Store search keywords for users trying to avoid lateness, missed meetings, weak calendar reminders, or ignored notifications.

## Keyword Clusters

| Cluster | User intent | Keywords |
|---|---|---|
| Calendar alarm | User wants alarms tied to calendar events | calendar alarm, calendar alarms, calendar alarm app, event alarm, event alarms, calendar event alarm, alarm for calendar events, calendar reminder alarm, calendar with alarm, alarm calendar, iPhone calendar alarm, Apple calendar alarm, Google Calendar alarm, Outlook calendar alarm |
| Meeting alarm | User wants a stronger cue before work meetings | meeting alarm, meeting alarms, meeting alarm app, alarm before meeting, alarm for meetings, work meeting alarm, Zoom meeting alarm, Teams meeting alarm, meeting alert, meeting alerts, meeting reminder alarm, meeting reminder app, meeting reminder, meeting reminders |
| Appointment reminder | User needs a cue before appointments | appointment reminder, appointment reminders, appointment reminder app, appointment alarm, appointment alarms, doctor appointment reminder, dentist appointment reminder, client appointment reminder, appointment notification, appointment alert, appointment alerts |
| Event reminder | User thinks in events, not calendars | event reminder, event reminders, event reminder app, event alarm app, event notification, event alert, alert before event, reminder before event, reminder for events, event timer |
| Time to leave | User wants departure timing | time to leave, time to leave app, leave reminder, time to leave reminder, leave now alert, leave now reminder, departure reminder, commute reminder, travel time reminder, travel time alert, get ready to leave, when to leave |
| Traffic and travel alerts | User wants time-buffered travel cues | traffic alert, traffic alerts, traffic reminder, traffic alarm, commute alert, commute alerts, travel alert app, travel reminder app, route alert, drive time alert, ETA alert, ETA reminder |
| Persistent alarms | User wants something harder to ignore | persistent alarm, persistent reminder, persistent reminders, loud reminder, loud reminders, nagging reminder, recurring alarm reminder, alarm reminder, reminder alarm, full screen alarm, vibration reminder, haptic reminder, notification alarm, can't ignore reminder |
| Notification blindness | User is aware normal alerts fail | notification blindness, ignore notifications, missed notifications, notification reminder, missed reminder, reminder that won't go away, reminders I ignore, stop ignoring reminders |
| ADHD reminders | User wants attention-support cues | ADHD reminder, ADHD reminders, ADHD reminder app, ADHD alarm, ADHD alarms, ADHD time management, ADHD calendar reminder, ADHD meeting reminder, executive function reminder, time blindness app, time blindness reminder, transition reminder |
| Work reminders | User wants reliable work prompts | work reminder, work reminders, work reminder app, business reminder, business reminders, office reminder, professional reminder, client meeting reminder, calendar work alarm, work calendar alarm |
| Business scheduling | User is thinking about scheduled commitments | business scheduling, business schedule reminder, schedule alarm, schedule alerts, schedule reminder, scheduled reminder, planner alarm, daily schedule alarm |
| Calendar notifications | User wants to fix existing notification behavior | calendar notifications, calendar notification, calendar alerts, calendar alert app, calendar reminder notification, event notification app, iPhone calendar notifications, Apple calendar reminders, calendar notifications not enough |
| Never late | User searches the outcome directly | never late, never be late, be on time, on time app, late reminder, don't be late, not late app, punctuality app, punctual app, always on time, arrive early, leave on time |
| Reminder alternatives | User compares against built-in apps | reminders app alternative, Apple Reminders alarm, reminder app with alarm, calendar reminders alternative, better calendar reminders, calendar reminder replacement |
| Alarm clock adjacent | User uses alarm vocabulary broadly | alarm app, alarm clock app, smart alarm, custom alarm, loud alarm app, alarm reminder app, alarm for tasks, alarm for schedule |

## Deduplication Notes

| Decision | Rationale |
|---|---|
| Singular/plural variants retained selectively | App Store search behavior can differ between singular and plural; both retained only where intent is high. |
| Calendar/task-manager terms separated | OnTimer is not a task manager; generic task keywords are lower-fit and should not dominate later decisions. |
| ADHD/time blindness retained | High-intent use case, but requires care: claims should be grounded and not medicalized. |

## Source Basis

| Source | Use |
|---|---|
| Product positioning from repository AGENTS.md | Defines OnTimer as an iOS alarm app for calendar events, not a calendar or productivity suite. |
| [OnTimer App Store page](https://apps.apple.com/us/app/ontimer-never-be-late/id6755317601) | Confirms current public title and App Store listing context. |

