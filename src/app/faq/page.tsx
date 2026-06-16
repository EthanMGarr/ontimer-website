"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a calendar alarm app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A calendar alarm app connects to your existing calendar and fires persistent, interruptive alarms before each event — not passive notifications that disappear on their own. Unlike standard calendar reminders from Google Calendar or Outlook, calendar alarm alerts stay on your screen until you actively dismiss them. OnTimer is a calendar alarm app for iPhone.",
      },
    },
    {
      "@type": "Question",
      name: "How do I turn Google Calendar events into alarms on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google Calendar doesn't natively support alarms — it sends notifications that disappear automatically. OnTimer connects to Google Calendar and turns every event into a persistent alarm on iPhone. Download OnTimer, connect your Google account, and every calendar event gets an alarm automatically — no per-event setup required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I turn Outlook calendar events into alarms on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Microsoft Outlook's built-in reminders are notifications, not alarms. OnTimer connects to Microsoft 365 and Outlook calendars and fires persistent alarms for every scheduled event — they don't disappear until you dismiss them. Multiple Outlook accounts are supported.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a calendar notification and a calendar alarm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A notification informs you — it appears briefly and disappears whether or not you act on it. An alarm interrupts you — it stays on screen and requires a response before it stops. Google Calendar and Outlook send notifications. OnTimer turns those calendar events into alarms.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Last 5 Minutes Problem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Last 5 Minutes Problem is the gap between knowing about a meeting and actually acting in time. You had the reminder set. You saw it. You planned to act in a moment. The notification disappeared, and the window closed before you did anything. Persistent alarms close this gap by staying on screen until you respond.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'persistent alarm' mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A persistent alarm stays on your screen and continues alerting until you actively dismiss or snooze it — unlike a standard notification, which disappears after a few seconds whether or not you acted. OnTimer fires persistent alarms for every calendar event, requiring explicit acknowledgment before they stop.",
      },
    },
    {
      "@type": "Question",
      name: "Is OnTimer free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OnTimer is free to download. Some advanced features, including Time To Leave alerts, are paid features.",
      },
    },
    {
      "@type": "Question",
      name: "What does OnTimer do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OnTimer connects to your calendar and creates loud, persistent alarms before meetings and events so they are harder to miss.",
      },
    },
    {
      "@type": "Question",
      name: "How is OnTimer different from my calendar app's built-in reminders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most calendar apps send standard notifications. OnTimer is built to create a stronger, more persistent alert before it is time to join or leave.",
      },
    },
    {
      "@type": "Question",
      name: "Does OnTimer work with Google Calendar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OnTimer works with Google Calendar.",
      },
    },
    {
      "@type": "Question",
      name: "Does OnTimer work with Microsoft calendars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OnTimer works with Microsoft calendars.",
      },
    },
    {
      "@type": "Question",
      name: "Does OnTimer support multiple calendars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can use OnTimer with multiple calendars and accounts.",
      },
    },
    {
      "@type": "Question",
      name: "Can OnTimer remind me when it is time to leave?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. For events with a location, Time To Leave can alert you when it is time to leave based on travel time and traffic. Time To Leave is a paid feature.",
      },
    },
    {
      "@type": "Question",
      name: "Who is OnTimer best for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OnTimer is especially useful for busy professionals, people with back-to-back meetings, people who miss standard notifications, and people who struggle with time blindness or chronic lateness.",
      },
    },
    {
      "@type": "Question",
      name: "Why do I still miss meetings even when I remember them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Knowing about a meeting and leaving on time are two separate steps. The gap between a reminder and the moment you need to stop working and leave is where lateness happens. Calendar notifications inform you — they don't interrupt you. The fix is an alarm timed to when you need to leave, not when the meeting starts.",
      },
    },
    {
      "@type": "Question",
      name: "Why don't calendar notifications work reliably?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most calendar notifications are passive — they appear, you tap away, and they disappear. There's no persistence, no escalation, and no interruption of what you're focused on. Do Not Disturb, Focus modes, and notification volume settings can all silently block them on top of that.",
      },
    },
    {
      "@type": "Question",
      name: "How is OnTimer different from setting alarms manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Manual alarms require you to remember to set them, update them when meetings change, and delete them when events get cancelled. OnTimer reads your calendar and creates, updates, and removes alarms automatically. When a meeting is rescheduled, your alarm moves too — with no action from you.",
      },
    },
    {
      "@type": "Question",
      name: "Does OnTimer upload my calendar data anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. OnTimer is completely on-device. It reads your calendar locally and never sends your data to any server. Your schedule stays private on your iPhone.",
      },
    },
    {
      "@type": "Question",
      name: "Is there an Android version?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not yet, but it is coming. Join the Android waitlist to be notified as soon as it is available.",
      },
    },
    {
      "@type": "Question",
      name: "When should I leave for the airport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your flight type, security setup, bags, and how you are getting there. Domestic flights typically require arriving 2 hours early; international flights 3 hours. Add your drive time and any parking buffer on top of that. You can estimate your exact departure time using the OnTimer Airport Time-to-Leave Calculator at ontimer.app/airport-time-to-leave-calculator.",
      },
    },
  ],
};

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What is a calendar alarm app?",
    answer: (
      <>
        A calendar alarm app connects to your existing calendar and fires persistent, interruptive
        alarms before each event — not passive notifications that disappear on their own. Unlike
        standard calendar reminders from Google Calendar or Outlook, these alarms stay on your screen
        until you actively dismiss them.{" "}
        <Link href="/calendar-alarm-app" className="text-green-500 hover:text-green-400 transition-colors">
          OnTimer is a calendar alarm app for iPhone
        </Link>.
      </>
    ),
  },
  {
    question: "How do I turn Google Calendar events into alarms on iPhone?",
    answer: (
      <>
        Google Calendar doesn&apos;t natively support alarms — it sends notifications that disappear
        automatically. OnTimer connects to Google Calendar and{" "}
        <Link href="/turn-calendar-events-into-alarms" className="text-green-500 hover:text-green-400 transition-colors">
          turns every event into a persistent alarm on iPhone
        </Link>.
        Download OnTimer, connect your Google account, and every calendar event gets an alarm
        automatically — no per-event setup required.
      </>
    ),
  },
  {
    question: "How do I turn Outlook calendar events into alarms on iPhone?",
    answer:
      "Microsoft Outlook's built-in reminders are notifications, not alarms. OnTimer connects to Microsoft 365 and Outlook calendars and fires persistent alarms for every scheduled event — they don't disappear until you dismiss them. Multiple Outlook accounts are supported.",
  },
  {
    question: "What is the difference between a calendar notification and a calendar alarm?",
    answer: (
      <>
        A notification informs you — it appears briefly and disappears whether or not you act on it.
        An alarm interrupts you — it stays on screen and requires a response before it stops. Google
        Calendar and Outlook send notifications.{" "}
        <Link href="/calendar-notifications-vs-alarms" className="text-green-500 hover:text-green-400 transition-colors">
          OnTimer turns those calendar events into alarms
        </Link>.
      </>
    ),
  },
  {
    question: "What is the Last 5 Minutes Problem?",
    answer: (
      <>
        The{" "}
        <Link href="/last-5-minutes-problem" className="text-green-500 hover:text-green-400 transition-colors">
          Last 5 Minutes Problem
        </Link>{" "}
        is the gap between knowing about a meeting and actually acting in time. You had the reminder
        set. You saw it. You planned to act in a moment. The notification disappeared, and the window
        closed before you did anything. Persistent alarms close this gap by staying on screen until
        you respond.
      </>
    ),
  },
  {
    question: "What does 'persistent alarm' mean?",
    answer: (
      <>
        A persistent alarm stays on your screen and continues alerting until you actively dismiss or
        snooze it — unlike a standard notification, which disappears after a few seconds whether or not
        you acted. OnTimer fires{" "}
        <Link href="/persistent-calendar-reminders" className="text-green-500 hover:text-green-400 transition-colors">
          persistent alarms for every calendar event
        </Link>,
        requiring explicit acknowledgment before they stop.
      </>
    ),
  },
  {
    question: "Is OnTimer free?",
    answer:
      "Yes. OnTimer is free to download. Some advanced features, including Time To Leave alerts, are paid features.",
  },
  {
    question: "What does OnTimer do?",
    answer:
      "OnTimer connects to your calendar and creates loud, persistent alarms before meetings and events so they are harder to miss.",
  },
  {
    question: "How is OnTimer different from my calendar app's built-in reminders?",
    answer:
      "Most calendar apps send standard notifications. OnTimer is built to create a stronger, more persistent alert before it is time to join or leave.",
  },
  {
    question: "Does OnTimer work with Google Calendar?",
    answer: "Yes. OnTimer works with Google Calendar.",
  },
  {
    question: "Does OnTimer work with Microsoft calendars?",
    answer: "Yes. OnTimer works with Microsoft calendars.",
  },
  {
    question: "Does OnTimer support multiple calendars?",
    answer: "Yes. You can use OnTimer with multiple calendars and accounts.",
  },
  {
    question: "Can OnTimer remind me when it is time to leave?",
    answer:
      "Yes. For events with a location, Time To Leave can alert you when it is time to leave based on travel time and traffic. Time To Leave is a paid feature.",
  },
  {
    question: "Who is OnTimer best for?",
    answer:
      "OnTimer is especially useful for busy professionals, people with back-to-back meetings, people who miss standard notifications, and people who struggle with time blindness or chronic lateness.",
  },
  {
    question: "Why do I still miss meetings even when I remember them?",
    answer: (
      <>
        Knowing about a meeting and leaving on time are two separate steps. The
        gap between a reminder and the moment you need to stop working and leave
        is where lateness happens. Calendar notifications inform you — they
        don&apos;t interrupt you. The fix is an alarm timed to when you need to
        leave, not when the meeting starts.{" "}
        <Link
          href="/never-be-late-to-meetings"
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          See why this gap exists and how to close it
        </Link>
        .
      </>
    ),
  },
  {
    question: "Why don't calendar notifications work reliably?",
    answer: (
      <>
        Most calendar notifications are passive — they appear, you tap away, and
        they disappear. There&apos;s no persistence, no escalation, and no
        interruption of what you&apos;re focused on. Do Not Disturb, Focus
        modes, and notification volume settings can all silently block them on
        top of that.{" "}
        <Link
          href="/why-calendar-reminders-fail"
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          Full breakdown: why calendar reminders fail
        </Link>
        .
      </>
    ),
  },
  {
    question: "How is OnTimer different from setting alarms manually?",
    answer:
      "Manual alarms require you to remember to set them, update them when meetings change, and delete them when events get cancelled. OnTimer reads your calendar and creates, updates, and removes alarms automatically. When a meeting is rescheduled, your alarm moves too — with no action from you.",
  },
  {
    question: "Does OnTimer upload my calendar data anywhere?",
    answer:
      "No. OnTimer is completely on-device. It reads your calendar locally and never sends your data to any server. Your schedule stays private on your iPhone.",
  },
  {
    question: "Is there an Android version?",
    answer:
      "Not yet, but it is coming. Join the Android waitlist to be notified as soon as it is available.",
  },
  {
    question: "When should I leave for the airport?",
    answer: (
      <>
        It depends on your flight type, security setup, bags, and how you are getting there.
        Domestic flights typically require arriving 2 hours early; international 3 hours.
        Add your drive time and any parking buffer on top of that.{" "}
        <Link
          href="/airport-time-to-leave-calculator"
          className="text-green-500 hover:text-green-400 transition-colors"
        >
          Use the Airport Time-to-Leave Calculator
        </Link>{" "}
        to estimate your exact departure time.
      </>
    ),
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800">
      <button
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-white">{question}</span>
        <span
          className={`mt-0.5 flex-shrink-0 text-green-500 transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-8 text-zinc-400 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            OnTimer <span className="text-green-500">FAQ</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Answers to common questions about OnTimer, calendar alarms, and
            meeting reminders.
          </p>
        </div>
      </section>

      {/* FAQ items */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div>
            {faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Ready to stop missing meetings?
          </h2>
          <p className="mt-3 text-zinc-400">
            Download OnTimer free and get more reliable alerts from your
            calendar.
          </p>
          <div className="mt-6">
            <AppStoreCTA />
          </div>
        </div>
      </section>
    </>
  );
}
