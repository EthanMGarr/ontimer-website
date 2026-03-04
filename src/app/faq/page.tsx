"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/CTAButton";

const faqs = [
  {
    question: "Is OnTimer free?",
    answer:
      "Yes. OnTimer is free to download and use. There is no subscription, no paywall, and no in-app purchases required to use the core features. We believe punctuality should be accessible to everyone.",
  },
  {
    question: "What iOS version does OnTimer require?",
    answer:
      "OnTimer requires iOS 16 or later. It is optimized for iPhone and works on all iPhones that support iOS 16+.",
  },
  {
    question: "Does OnTimer work with Google Calendar?",
    answer:
      "Yes. OnTimer works with any calendar that syncs to your iPhone's native Calendar app — including iCloud Calendar, Google Calendar, Outlook, Exchange, and more. As long as the calendar shows up in your iPhone Calendar app, OnTimer can read it.",
  },
  {
    question: "Does OnTimer upload my calendar data anywhere?",
    answer:
      "No. OnTimer is completely on-device. It reads your calendar locally and never sends your data to any server. Your schedule stays private on your iPhone.",
  },
  {
    question: "What happens when I change or cancel an event?",
    answer:
      "OnTimer automatically syncs with your calendar in real time. If you update an event's time or cancel it entirely, the corresponding alarm is automatically updated or removed. You don't need to do anything.",
  },
  {
    question: "Can I choose which events get alarms?",
    answer:
      "Yes. You can configure OnTimer to only alarm for certain calendars, or to skip events that don't require travel. You have full control over which events trigger alarms.",
  },
  {
    question: "How far in advance does OnTimer set alarms?",
    answer:
      "You choose your lead time. Common settings are 15, 30, or 60 minutes before an event. You can also set different lead times for different types of events, or customize per-event.",
  },
  {
    question: "Does OnTimer work with Do Not Disturb / Focus modes?",
    answer:
      "Yes. OnTimer is designed to break through Focus modes for time-critical alarms when you want it to. You can configure which Focus modes OnTimer is allowed to interrupt so you never miss an important departure time.",
  },
  {
    question: "Is there an Android version?",
    answer:
      "Not yet, but it's coming. Join the Android waitlist to be notified as soon as it's available.",
  },
  {
    question: "How is OnTimer different from my calendar app's built-in reminders?",
    answer:
      "Calendar reminders are passive notifications — easy to dismiss and forget. OnTimer creates true alarms that escalate and persist until you acknowledge them. It also factors in your lead time preferences automatically, so you don't have to manually set a reminder for every event.",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
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
      {/* Hero */}
      <section className="border-b border-zinc-800 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Frequently asked{" "}
            <span className="text-green-500">questions</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Everything you want to know about OnTimer, answered.
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
            Ready to be on time?
          </h2>
          <p className="mt-3 text-zinc-400">
            Download OnTimer free and start every day with less stress.
          </p>
          <div className="mt-6">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
