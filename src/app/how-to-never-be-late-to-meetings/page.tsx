import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Never Be Late to Meetings | OnTimer",
  description:
    "Practical ways to stop being late to meetings, plus how louder, more persistent calendar alarms can help.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do I keep being late to meetings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually because the reminder system is too weak. Quiet notifications, packed schedules, underestimated prep time, and missed transitions all contribute.",
      },
    },
    {
      "@type": "Question",
      name: "How can I get better reminders for meetings on iPhone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a system that gives you a stronger signal than a standard calendar notification. That can mean multiple reminders, more lead time, or an app that creates louder, more persistent alarms.",
      },
    },
    {
      "@type": "Question",
      name: "Is there an app that gives loud alarms for calendar events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OnTimer is designed to trigger loud, persistent alarms before meetings and calendar events.",
      },
    },
    {
      "@type": "Question",
      name: "How do Time To Leave alerts work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For events with a location, Time To Leave estimates when you should head out based on travel time and traffic. It is a paid feature in OnTimer.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use OnTimer with more than one calendar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OnTimer supports multiple calendars.",
      },
    },
  ],
};

export default function HowToNeverBeLateToMeetings() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            How to Never Be Late to{" "}
            <span className="text-green-500">Meetings</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Being late to meetings is usually not a character flaw. It is a
            systems problem. People run late because transitions are easy to
            miss, schedules get packed, reminders are too passive, and travel
            time gets underestimated.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY PEOPLE ARE LATE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why people are late to meetings
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            People are often late for predictable reasons:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "they underestimate how long it takes to wrap up the current task",
              "they rely on a single quiet notification",
              "they have back-to-back meetings with no transition buffer",
              "they underestimate travel time",
              "they struggle with time blindness or inconsistent routines",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHY NORMAL ALERTS FAIL ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why normal calendar alerts often fail
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Most calendar apps send passive notifications. They are useful,
              but they are easy to swipe away, easy to ignore, and easy to
              forget five minutes later. That is why many people see the
              reminder and still arrive late.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT ACTUALLY HELPS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What actually helps
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            A better system usually includes:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "more than one reminder",
              "stronger transition cues",
              "enough buffer before the meeting",
              "a leave-time signal for in-person events",
              "an alarm that is harder to ignore than a normal notification",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW ONTIMER HELPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer helps
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              OnTimer connects to your calendar and turns upcoming meetings and
              events into loud, persistent alarms. Instead of relying only on a
              passive calendar notification, you get a stronger signal before it
              is too late.
            </p>
            <p>
              For events with a location,{" "}
              <Link
                href="/time-to-leave-reminders"
                className="text-green-500 hover:text-green-400"
              >
                Time To Leave
              </Link>{" "}
              can alert you when it is time to leave based on travel time and
              traffic. Time To Leave is a paid feature.
            </p>
            <p>
              OnTimer also supports multiple calendars, which is helpful if your
              real schedule lives across more than one account.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/features"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See all features →
            </Link>
            <Link
              href="/faq"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black tracking-tight text-white sm:text-3xl">
            FAQ
          </h2>
          <div className="space-y-px">
            {[
              {
                q: "Why do I keep being late to meetings?",
                a: "Usually because the reminder system is too weak. Quiet notifications, packed schedules, underestimated prep time, and missed transitions all contribute.",
              },
              {
                q: "How can I get better reminders for meetings on iPhone?",
                a: "Use a system that gives you a stronger signal than a standard calendar notification. That can mean multiple reminders, more lead time, or an app that creates louder, more persistent alarms.",
              },
              {
                q: "Is there an app that gives loud alarms for calendar events?",
                a: "Yes. OnTimer is designed to trigger loud, persistent alarms before meetings and calendar events.",
              },
              {
                q: "How do Time To Leave alerts work?",
                a: "For events with a location, Time To Leave estimates when you should head out based on travel time and traffic. It is a paid feature in OnTimer.",
              },
              {
                q: "Can I use OnTimer with more than one calendar?",
                a: "Yes. OnTimer supports multiple calendars.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="border-b border-zinc-800 py-5 last:border-0"
              >
                <p className="font-semibold text-white">{item.q}</p>
                <p className="mt-2 text-zinc-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related guides</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/loud-calendar-alerts-iphone"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get Loud Calendar Alerts on iPhone →
              </Link>
            </li>
            <li>
              <Link
                href="/time-to-leave-reminders"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Get a Reminder When It's Time to Leave for a Meeting →
              </Link>
            </li>
            <li>
              <Link
                href="/stop-missing-calendar-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Stop Missing Zoom, Google Meet, and Other Calendar Meetings →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Get more reliable meeting reminders
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and make your calendar harder to ignore.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
