import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Meeting Reminder App for iPhone: Alarms, Not Pings",
  description:
    "OnTimer turns calendar reminders into real alarms so you never miss meetings, Zoom calls, or appointments again.",
  alternates: { canonical: "https://www.ontimer.app/meeting-reminder-app" },
  openGraph: {
    title: "Meeting Reminder App for iPhone: Alarms, Not Pings",
    description:
      "OnTimer turns calendar reminders into real alarms so you never miss meetings, Zoom calls, or appointments again.",
    url: "https://www.ontimer.app/meeting-reminder-app",
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is a meeting reminder app?",
    answer:
      "A meeting reminder app connects to your calendar and fires alerts before meetings. The best ones fire persistent alarms — not passive notifications — that stay on screen until you dismiss them, ensuring you actually notice and act.",
  },
  {
    question: "How is OnTimer different from Google Calendar reminders?",
    answer:
      "Google Calendar and Outlook reminders are passive notifications that appear briefly and disappear. OnTimer fires a persistent alarm that stays on screen and requires active dismissal — like a morning alarm clock, not a banner. This makes it much harder to miss a meeting even during focused work.",
  },
  {
    question: "Does OnTimer require setting up alarms for each meeting manually?",
    answer:
      "No. Once you connect your Google Calendar or Outlook account, OnTimer automatically creates alarms for all upcoming events. You don't have to do anything for each individual meeting — the system runs in the background and covers your entire calendar.",
  },
];

export default function MeetingReminderApp() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "OnTimer",
            operatingSystem: "iOS",
            applicationCategory: "ProductivityApplication",
            description: "Meeting reminder app that turns Google Calendar and Outlook events into persistent alarms you can't miss.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            url: "https://www.ontimer.app",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
              { "@type": "ListItem", position: 2, name: "Meeting Reminder App", item: "https://www.ontimer.app/meeting-reminder-app" },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Meeting Reminder App That Turns Calendar Events Into{" "}
            <span className="text-green-500">Real Alarms</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Most calendar apps rely on simple notifications to remind you about
            meetings. These notifications are easy to swipe away or ignore.
            OnTimer is a calendar alarm app that turns your calendar events into
            persistent alarms so meetings never sneak up on you.
          </p>
          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              A meeting reminder app that fires persistent alarms — not passive notifications — works significantly better for preventing missed meetings. Passive notifications disappear on their own; persistent alarms stay on screen and require active dismissal, making them impossible to miss even during focused work. OnTimer connects to Google Calendar and Outlook and creates these alarms automatically for every event.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreCTA />
          </div>
        </div>
      </section>

      {/* ── WHY CALENDAR REMINDERS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Reminders Fail
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Calendar notifications often fail because they are passive. When
              you&apos;re focused on work or switching between tasks, a small
              notification is easy to miss. Many professionals discover they are
              late to meetings simply because they dismissed the reminder without
              realizing it.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW ONTIMER FIXES THIS ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Fixes This
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            OnTimer is a calendar alarm app that connects to your calendar and
            creates a real alarm before your meeting begins. Instead of a quiet
            notification, you receive an alert that is designed to get your
            attention.
          </p>
          <p className="mt-4 text-zinc-400">Key benefits include:</p>
          <ul className="mt-4 space-y-3">
            {[
              "Persistent alarms before meetings",
              "Multiple calendar support",
              "Business hours filtering",
              "Time-to-leave alerts based on location and traffic",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHO USES ONTIMER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who Uses OnTimer
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            OnTimer is designed for people who rely on their calendar to manage
            a busy schedule.
          </p>
          <p className="mt-4 text-zinc-400">Common users include:</p>
          <ul className="mt-4 space-y-3">
            {[
              "Professionals with back-to-back meetings",
              "Remote workers",
              "Sales professionals",
              "Founders and executives",
              "People who struggle with time blindness",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Calendar Reminder vs OnTimer Alarm
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-zinc-400">
                Standard Calendar Reminder
              </h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Passive notification",
                  "Easy to dismiss",
                  "Often missed during focused work",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-0.5 flex-shrink-0 text-zinc-400">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-green-500/30 bg-zinc-900 p-6">
              <h3 className="font-bold text-green-500">OnTimer Alarm</h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Persistent alert",
                  "Hard to ignore",
                  "Helps ensure you arrive on time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}
                  <span className="ml-4 shrink-0 text-zinc-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES CALLOUT ── */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6">
          <p className="text-zinc-400 leading-relaxed">
            If you need to figure out when to leave for the airport, try our{" "}
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Airport Time-to-Leave Calculator
            </Link>
            {" "}— it estimates your exact departure time based on traffic, security time, bags, and how you&apos;re getting there.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            If your alarm recently failed to fire, read{" "}
            <Link
              href="/alarm-didnt-go-off-late-for-work"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Alarm Didn&apos;t Go Off? How to Build a Fail-Safe Reminder System
            </Link>
            {" "}for a step-by-step fix.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            If you&apos;ve been charged for a missed appointment, see{" "}
            <Link
              href="/missed-appointment-fee-how-to-prevent-no-shows"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Missed Appointment Fee? How to Prevent Costly No-Shows
            </Link>
            {" "}for a practical prevention system.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            If your calendar notifications aren&apos;t firing reliably, see{" "}
            <Link
              href="/calendar-notifications-not-working"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Calendar Notifications Not Working
            </Link>
            {" "}for eight targeted fixes.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            For a complete guide on building a reliable reminder system, read{" "}
            <Link
              href="/why-calendar-reminders-fail"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Why Calendar Reminders Fail
            </Link>
            {" "}and{" "}
            <Link
              href="/how-to-never-miss-a-meeting"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              How to Never Miss a Meeting
            </Link>
            .
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Need a reminder that works specifically for Zoom calls? See the{" "}
            <Link
              href="/zoom-meeting-reminder"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Zoom Meeting Reminder That Won&apos;t Let You Miss the Call
            </Link>
            {" "}for a Zoom-specific setup guide.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Comparing options?{" "}
            <Link
              href="/best-meeting-reminder-app"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              Best Meeting Reminder App for iPhone
            </Link>
            {" "}breaks down what separates a solid meeting reminder from a basic notification.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Never miss a meeting again.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer on the App Store and never miss a meeting again.
          </p>
          <div className="mt-8">
            <AppStoreCTA />
          </div>
          <p className="mt-6 text-sm text-zinc-400">
            Also read:{" "}
            <Link
              href="/why-calendar-reminders-fail"
              className="text-green-500 hover:text-green-400"
            >
              Why Calendar Reminders Fail
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
