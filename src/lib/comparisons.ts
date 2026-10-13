export type Comparison = {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  directAnswer: string;
  bestForOnTimer: string;
  bestForCompetitor: string;
  differences: Array<{ topic: string; ontimer: string; competitor: string }>;
  sourceUrl: string;
  sourceLabel: string;
};

export const COMPARISON_REVIEWED_ON = "October 13, 2026";

export const comparisons: Comparison[] = [
  {
    slug: "ontimer-vs-pealo",
    competitor: "Pealo",
    title: "OnTimer vs Pealo",
    description:
      "Compare OnTimer and Pealo for automatic calendar alarms, event controls, travel timing, supported calendars, and platform coverage.",
    directAnswer:
      "Both products turn calendar events into alarms automatically. OnTimer is the stronger fit when you want event-specific sounds, Early Warning, traffic-aware Time To Leave, and Time To Fly in one iPhone workflow. Pealo is the stronger fit when broad device coverage—including Android, iPad, Mac, and web—is the priority.",
    bestForOnTimer:
      "iPhone users who want an automatic punctuality system around each event, including custom sounds, event cards, Early Warning, Time To Leave, and Time To Fly.",
    bestForCompetitor:
      "People who need calendar alarms on more device types or want Pealo's calendar-alarm workflow across iPhone, iPad, Mac, Android, and the web.",
    differences: [
      { topic: "Core job", ontimer: "Automatic alarms plus event and travel controls", competitor: "Automatic real alarms from calendar events" },
      { topic: "Calendars", ontimer: "Apple, Google, and Outlook", competitor: "Google, Outlook, and iCloud" },
      { topic: "Event controls", ontimer: "Alarm, sound, Early Warning, and calendar access on each event card", competitor: "Shows events and lets users skip an alarm; per-calendar auto-alarm rules" },
      { topic: "Travel timing", ontimer: "Time To Leave and Time To Fly", competitor: "Not described on the reviewed product page" },
      { topic: "Platforms", ontimer: "iPhone", competitor: "iPhone, iPad, Mac, Android, and web" },
    ],
    sourceUrl: "https://pealo.app/",
    sourceLabel: "Pealo official product page",
  },
  {
    slug: "ontimer-vs-due",
    competitor: "Due",
    title: "OnTimer vs Due",
    description:
      "Compare OnTimer's automatic calendar alarms with Due's manually created reminders, Auto Snooze, and reusable countdown timers.",
    directAnswer:
      "Choose OnTimer when the schedule already lives in your calendar and you do not want to create or maintain reminders by hand. Choose Due when you want to create individual reminders and have overdue notifications repeat until you complete, reschedule, or disable them.",
    bestForOnTimer:
      "People whose meetings, appointments, and flights already live in Apple, Google, or Outlook calendars and should become alarms automatically.",
    bestForCompetitor:
      "People who want fast manual reminders, repeating overdue nudges, and reusable countdown timers for tasks and errands.",
    differences: [
      { topic: "Source of truth", ontimer: "Your existing calendar", competitor: "Reminders created in Due" },
      { topic: "Setup", ontimer: "Calendar events become alarms automatically", competitor: "Create each reminder or timer" },
      { topic: "Persistence", ontimer: "Alarm remains active until dismissed", competitor: "Auto Snooze repeats overdue reminder notifications" },
      { topic: "Travel timing", ontimer: "Time To Leave and Time To Fly", competitor: "Not described on the reviewed product page" },
      { topic: "Platforms", ontimer: "iPhone", competitor: "iPhone, iPad, Apple Watch, and Mac" },
    ],
    sourceUrl: "https://www.dueapp.com/",
    sourceLabel: "Due official product page",
  },
  {
    slug: "ontimer-vs-fantastical",
    competitor: "Fantastical",
    title: "OnTimer vs Fantastical",
    description:
      "Compare OnTimer's focused calendar-alarm layer with Fantastical's full calendar and task-management experience.",
    directAnswer:
      "Choose OnTimer when you want to keep your existing calendar app and add persistent alarms, per-event controls, and flight-aware leave timing. Choose Fantastical when you want a complete calendar interface with calendar views, event creation, tasks, scheduling tools, and time-to-leave notifications.",
    bestForOnTimer:
      "People who like their current calendar and want a focused alarm layer that automatically helps them act on time.",
    bestForCompetitor:
      "People looking to manage calendars and tasks inside a full calendar application across Apple platforms and Windows.",
    differences: [
      { topic: "Product role", ontimer: "Alarm layer for an existing calendar", competitor: "Complete calendar and tasks application" },
      { topic: "Alarm focus", ontimer: "Persistent alarms with per-event sound and control", competitor: "Event and task notifications, with urgent alarms listed in Premium" },
      { topic: "Travel timing", ontimer: "Time To Leave plus automatic Time To Fly", competitor: "Travel time and time-to-leave notifications" },
      { topic: "Calendar management", ontimer: "Open the source event in your calendar", competitor: "Create, edit, view, and organize events and tasks" },
      { topic: "Best decision", ontimer: "Add stronger alarms without replacing your calendar", competitor: "Replace or expand your calendar workflow" },
    ],
    sourceUrl: "https://flexibits.com/fantastical",
    sourceLabel: "Fantastical official product page",
  },
  {
    slug: "ontimer-vs-apple-calendar",
    competitor: "Apple Calendar",
    title: "OnTimer vs Apple Calendar Alerts",
    description:
      "Compare OnTimer's persistent calendar alarms with the event alerts built into Apple Calendar on iPhone.",
    directAnswer:
      "Apple Calendar is the place to create, edit, and organize events. OnTimer uses those events as the source of truth and adds an alarm layer that stays active until you dismiss it. They work together rather than replacing one another.",
    bestForOnTimer:
      "People who already use Apple Calendar but need a stronger action signal, custom event sounds, Early Warning, or travel-aware alarms.",
    bestForCompetitor:
      "People who are satisfied with standard event alerts and primarily need to create, view, invite, and manage calendar events.",
    differences: [
      { topic: "Core job", ontimer: "Turn calendar events into alarms", competitor: "Create, organize, and view calendar events" },
      { topic: "Alert behavior", ontimer: "Stays active until dismissed", competitor: "Uses iPhone calendar alerts and notification settings" },
      { topic: "Per-event sound", ontimer: "Choose a distinct alarm sound for an event", competitor: "Uses Calendar alert settings" },
      { topic: "Travel timing", ontimer: "Time To Leave and Time To Fly", competitor: "Calendar event features vary by account and iOS settings" },
      { topic: "Relationship", ontimer: "Adds an alarm layer", competitor: "Remains the calendar source of truth" },
    ],
    sourceUrl: "https://support.apple.com/guide/iphone/change-calendar-settings-iphc37be2016/ios",
    sourceLabel: "Apple iPhone User Guide",
  },
];

export function getComparison(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}
