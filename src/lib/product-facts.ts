export const PRODUCT_FACTS_VERSION = "2026-10-13";

export const productFacts = {
  positioning: {
    promise: "Never be late again.",
    mechanism:
      "OnTimer turns events from the calendars you already use into automatic alarms on iPhone.",
    proof:
      "Alarms stay on screen until you dismiss them, so they demand an active response instead of disappearing like a passive calendar notification.",
  },
  calendars: ["Apple Calendar", "Google Calendar", "Outlook Calendar"],
  alarmBehavior: {
    persistent:
      "OnTimer alarms stay on screen until you dismiss them.",
    highAlert:
      "On iOS 26.1 and later, High Alert can ring through Silent mode and Focus or Do Not Disturb when it is enabled and iOS permissions allow it.",
    standard:
      "Without High Alert, sound and delivery still depend on the iPhone's notification, sound, and Focus settings.",
  },
  eventControls: {
    summary:
      "Home-screen event cards provide controls for whether an event should alarm, which sound it should use, its Early Warning, and opening the original calendar event.",
    alarmsOffByDefault:
      "To start with alarms off, open Recurring Meeting Manager in Settings and turn off both automatic-alarm options. Then tap the green bell on any event card you want to arm.",
  },
  customSounds:
    "Choose an alarm sound and assign a different sound to a specific event when it needs a distinct signal.",
  earlyWarning:
    "Early Warning provides a lighter heads-up before the main alarm, with a default time that can be adjusted for a specific event.",
  timeToLeave:
    "For calendar events with a usable location, Time To Leave can use travel time and traffic to alert you when it is time to head out.",
  timeToFly:
    "Time To Fly automatically discovers flights in your calendar and sets a leave-time alarm using the trip to the airport and the airline-recommended airport arrival time.",
  timeToFlyLimitations:
    "Time To Fly does not track flight status, delays, gates, terminals, check-in or bag-drop deadlines, security waits, or travel-document requirements. Always confirm current airline and airport information.",
  pricing:
    "OnTimer is free and includes automatic alarms for one calendar provider. Time To Fly can set an initial airport departure estimate on the free plan; OnTimer Pro can update it for traffic when background conditions allow. Pro also adds multiple calendar providers, Time To Leave, Early Warning, and additional controls.",
} as const;

export const homepageFaqs = [
  {
    question: "What does OnTimer do?",
    answer: `${productFacts.positioning.mechanism} ${productFacts.positioning.proof}`,
  },
  {
    question: "How is an OnTimer alarm different from a calendar notification?",
    answer:
      "A calendar notification can appear once and disappear. An OnTimer alarm stays in front of you until you dismiss it and can use the sound you choose.",
  },
  {
    question: "Which calendars work with OnTimer?",
    answer:
      "OnTimer works with Apple Calendar, Google Calendar, and Outlook Calendar, including work and school accounts. OnTimer Pro supports multiple connected accounts.",
  },
  {
    question: "Can I choose which events get alarms?",
    answer: productFacts.eventControls.alarmsOffByDefault,
  },
  {
    question: "Can I choose different alarm sounds?",
    answer: `Yes, you can customize alarms. ${productFacts.customSounds}`,
  },
  {
    question: "What is Early Warning?",
    answer: productFacts.earlyWarning,
  },
  {
    question: "What are Time To Leave and Time To Fly?",
    answer: `${productFacts.timeToLeave} ${productFacts.timeToFly}`,
  },
  {
    question: "Can OnTimer ring through Silent mode or Focus?",
    answer: `${productFacts.alarmBehavior.highAlert} ${productFacts.alarmBehavior.standard}`,
  },
  {
    question: "Is OnTimer free?",
    answer: productFacts.pricing,
  },
] as const;
