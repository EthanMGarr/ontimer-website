"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
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
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
