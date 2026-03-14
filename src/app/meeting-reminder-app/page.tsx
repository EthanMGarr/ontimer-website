import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Best Meeting Reminder App for iPhone | Never Miss a Meeting Again",
  description:
    "OnTimer turns calendar reminders into real alarms so you never miss meetings, Zoom calls, or appointments again.",
};

export default function MeetingReminderApp() {
  return (
    <>
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
          <div className="mt-8">
            <AppStoreButton size="lg" />
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
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-500">
                    <span className="mt-0.5 flex-shrink-0 text-zinc-600">—</span>
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
            <AppStoreButton size="lg" />
          </div>
          <p className="mt-6 text-sm text-zinc-500">
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
