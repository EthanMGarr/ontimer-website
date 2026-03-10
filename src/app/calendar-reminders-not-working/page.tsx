import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Calendar Reminders Not Working? Try a Real Calendar Alarm App | OnTimer",
  description:
    "Missing meetings because calendar reminders are easy to ignore? Learn why Google Calendar and Outlook reminders fail — and how a calendar alarm app fixes the problem.",
};

const whyFailItems = [
  "notifications that disappear after a few seconds",
  "reminders that can be accidentally dismissed",
  "alerts that get buried under other notifications",
  "silent reminders when your phone is on focus mode",
];

const usefulFor = [
  "remote workers",
  "consultants with back-to-back calls",
  "executives managing packed schedules",
  "people with ADHD or time-blindness",
];

const perfectFor = [
  "professionals with busy calendars",
  "remote teams and hybrid workers",
  "consultants and sales professionals",
  "people who struggle with time awareness",
];

const steps = [
  {
    number: 1,
    title: "Connect your Google or Outlook calendars",
  },
  {
    number: 2,
    title: "OnTimer automatically detects your upcoming events",
  },
  {
    number: 3,
    title: "Before each meeting, the app triggers a persistent alarm",
  },
];

export default function CalendarRemindersNotWorking() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Calendar Reminders{" "}
            <span className="text-green-500">Not Working?</span>
          </h1>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>Calendar reminders are easy to miss.</p>
            <p>
              Most calendar apps send simple notifications that appear briefly
              on your screen — and disappear just as quickly.
            </p>
            <p>
              If you swipe the notification away, get distracted, or lose track
              of time, it&apos;s easy to realize too late that a meeting already
              started.
            </p>
            <p>
              This happens to people who rely heavily on their calendars every
              day.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
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
              Most calendar systems were designed to show notifications, not
              alarms.
            </p>
            <p>That means reminders are easy to ignore.</p>
            <p>Common problems include:</p>
            <ul className="space-y-2">
              {whyFailItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Even if you set multiple reminders, it&apos;s still easy to lose
              track of time.
            </p>
          </div>
        </div>
      </section>

      {/* ── GOOGLE CALENDAR AND OUTLOOK ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why This Happens With Google Calendar and Outlook
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Google Calendar and Outlook reminders behave like standard phone
              notifications.
            </p>
            <p>
              They appear on the lock screen, vibrate briefly, and then
              disappear once dismissed.
            </p>
            <p>
              For people with busy schedules, back-to-back meetings, or time
              blindness, these reminders often aren&apos;t strong enough to
              guarantee you actually notice them.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WORKS BETTER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Actually Works Better Than Calendar Reminders
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Instead of passive notifications, some people prefer{" "}
              <strong className="text-white">calendar alarms</strong>.
            </p>
            <p>
              A calendar alarm works more like a traditional alarm clock:
            </p>
            <ul className="space-y-2">
              {[
                "it stays on screen",
                "it requires you to dismiss it",
                "it's designed to interrupt you so you don't miss something important",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              This approach works better for people who depend heavily on their
              calendars.
            </p>
          </div>
        </div>
      </section>

      {/* ── ONTIMER ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            A Calendar Alarm App That Makes Sure You&apos;re On Time
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              <Link href="/" className="text-green-500 hover:text-green-400">
                OnTimer
              </Link>{" "}
              connects directly to your calendars and turns events into alarms
              you can&apos;t ignore.
            </p>
            <p>
              Instead of a quick notification, you get a persistent alert before
              your meeting so you know exactly when it&apos;s time to join.
            </p>
            <p>This is especially useful for:</p>
            <ul className="space-y-2">
              {usefulFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Works
          </h2>
          <div className="mt-8 space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">
                  {step.number}
                </div>
                <div className="flex items-center">
                  <p className="text-zinc-300">{step.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-400">
            You always know when it&apos;s time to join your meeting.
          </p>
          <p className="mt-3 text-zinc-400">
            Learn more on the{" "}
            <Link
              href="/how-it-works"
              className="text-green-500 hover:text-green-400"
            >
              How It Works
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* ── PERFECT FOR ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Perfect For
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {perfectFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm text-zinc-300"
              >
                <span className="flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400">
            See all{" "}
            <Link
              href="/features"
              className="text-green-500 hover:text-green-400"
            >
              OnTimer features →
            </Link>
          </p>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related Guides</h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/why-calendar-reminders-fail"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Why Calendar Reminders Fail →
              </Link>
            </li>
            <li>
              <Link
                href="/calendar-alarm-app"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Calendar Alarm App →
              </Link>
            </li>
            <li>
              <Link
                href="/meeting-reminder-app"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Meeting Reminder App →
              </Link>
            </li>
            <li>
              <Link
                href="/airport-time-to-leave-calculator"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Airport Time-to-Leave Calculator →
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
            Never Miss a Meeting Again
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Calendar notifications are easy to ignore.
          </p>
          <p className="mt-2 text-lg text-zinc-400">
            OnTimer turns your calendar into a real alarm system so meetings
            never sneak up on you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreButton size="lg" />
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Android version coming soon —{" "}
            <Link
              href="/android"
              className="text-green-500 hover:text-green-400"
            >
              join the waitlist.
            </Link>
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-zinc-800 pt-8 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white">
              Home
            </Link>
            <Link href="/features" className="text-zinc-400 hover:text-white">
              Features
            </Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white">
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
