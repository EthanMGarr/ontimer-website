# How OnTimer Alarms Work on iPhone

## The short version

OnTimer turns events from Apple Calendar, Google Calendar, and Outlook Calendar into alarms on your iPhone.

Unlike a passive calendar notification, an OnTimer alarm stays on screen until you dismiss it. You can choose the sound, adjust an individual event, add an Early Warning, and use Time To Leave or Time To Fly when the moment depends on travel.

This page describes current product behavior. Last reviewed: **October 13, 2026**.

## What happens when an alarm fires

- The event name and time appear in a full-screen alarm.
- The alarm remains active until you dismiss it.
- The event can use your default sound or a sound chosen specifically for that event.
- You can open the original calendar event from its card in OnTimer.

No phone alert can guarantee that a person will notice or act. OnTimer is designed to be harder to miss by requiring a response instead of disappearing on its own.

## Silent mode, Focus, and High Alert

| Situation | What to expect |
| --- | --- |
| iOS 26.1 or later with High Alert enabled and permitted | High Alert can ring through Silent mode and Focus or Do Not Disturb. |
| High Alert is not enabled or available | Sound and delivery depend on the iPhone's notification, sound, and Focus settings. |
| OnTimer notifications are disabled | OnTimer cannot deliver the expected alarm. Enable notifications in iPhone Settings. |
| OnTimer is paused | Event alarms remain paused until you resume them in OnTimer. |

If you use Focus modes and are not using High Alert, allow OnTimer in each Focus you use: **Settings → Focus → [your Focus] → Apps → Allow Notifications From → OnTimer**.

Also confirm **Settings → Notifications → OnTimer → Allow Notifications** is on, with Sounds enabled when you expect sound.

## Choose sounds globally or by event

Choose a default alarm sound in OnTimer Settings. When a particular event needs a distinct signal, use its Home-screen event card to assign a different sound. The event-specific sound changes that event without changing your default.

## Use the Home-screen event cards

Each upcoming event card gives you fine-grained control. You can:

- Turn its alarm on or off
- Choose its alarm sound
- Set or adjust Early Warning
- Open the original event in your calendar

## Start with alarms off by default

If you want to choose every event that gets an alarm:

1. Open **Settings** in OnTimer.
2. Open **Recurring Meeting Manager**.
3. Turn off both automatic-alarm options.
4. Return to the Home screen.
5. Tap the **green bell** on each event card you want to arm.

That makes OnTimer opt-in: alarms remain off by default until you choose an event.

## Early Warning, Time To Leave, and Time To Fly

**Early Warning** is a lighter heads-up before the main alarm. Choose a default time or adjust it on one event card.

**Time To Leave** uses a calendar event's location, travel time, and traffic to alert you when it is time to head out.

**Time To Fly** automatically discovers flights in your connected calendars. It works backward from the airline-recommended airport arrival time and the trip to the airport to set a leave-time alarm. You do not have to enter the flight again in OnTimer.

Time To Fly does not track flight status, delays, gates, terminals, check-in or bag-drop deadlines, security waits, or travel-document requirements. Always confirm current airline and airport information.

## Free and Pro

OnTimer is free and includes automatic alarms for one calendar provider. Time To Fly can set an initial airport departure estimate on the free plan; OnTimer Pro can update it for traffic when background conditions allow. Pro also adds multiple calendar providers, Time To Leave, Early Warning, and additional controls.

## If an alarm does not behave as expected

Open OnTimer and confirm:

- OnTimer is not paused
- The event appears on the Home screen
- Its green bell is on
- The event uses the alarm type and sound you expect
- Notifications and Background App Refresh are enabled
- High Alert is enabled when you expect it to ring through Silent mode or Focus

For more steps, see [Help & Troubleshooting](/help/troubleshooting).
