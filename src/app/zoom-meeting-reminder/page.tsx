import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Never Miss a Zoom Meeting Again | Meeting Alarm Apps",
  description:
    "Missing Zoom meetings because reminders disappear? Learn how persistent meeting alarms help remote workers stay on schedule.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Never Miss a Zoom Meeting Again",
  description:
    "How persistent meeting alarms help remote workers avoid missing Zoom calls and Teams meetings.",
  url: "https://www.ontimer.app/zoom-meeting-reminder",
};

const remoteWorkProblems = [
  {
    title: "No physical cues",
    body: "In an office, people walking to a conference room remind you it's time. Working from home, there are no external cues.",
  },
  {
    title: "Context switching",
    body: "Jumping between tasks, Slack, email, and actual work makes it easy to lose track of time entirely.",
  },
  {
    title: "Notification overload",
    body: "Dozens of notifications per hour train your brain to ignore them — including the important ones.",
  },
  {
    title: "Back-to-back meetings",
    body: "When meetings stack up, it's easy to miss a transition from one call to the next.",
  },
];

const alarmBenefits = [
  "stays on screen until you dismiss it",
  "fires at a set time before your meeting — not just when it starts",
  "requires active acknowledgment, breaking your focus",
  "works with your existing Google Calendar or Outlook events",
  "no manual setup — every meeting is covered automatically",
];

export default function ZoomMeetingReminder() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Never Miss a{" "}
            <span className="text-green-500">Zoom Meeting Again</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Zoom and Teams meeting reminders behave like standard calendar
            notifications — they appear briefly, then disappear. For remote
            workers who are focused on tasks between calls, these reminders are
            easy to miss.
          </p>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            Persistent meeting alarms fix this. Here&apos;s how.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY ZOOM REMINDERS ARE EASY TO MISS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Zoom Meeting Reminders Are Easy to Miss
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Zoom itself sends meeting reminders — but they&apos;re delivered
              through the same notification system as everything else on your
              phone or computer.
            </p>
            <p>
              That means they can be swiped away, buried, silenced by focus
              mode, or simply missed while you&apos;re heads-down on something
              else.
            </p>
            <p>
              Google Calendar and Outlook send their own reminders too — but
              these face exactly the same problem. A notification banner that
              appears for a few seconds isn&apos;t designed to interrupt deep
              work.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW REMOTE WORKERS LOSE TRACK ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How Remote Workers Lose Track of Meetings
          </h2>
          <p className="mt-4 text-zinc-400">
            Remote work removes the in-person cues that naturally keep you
            on schedule. Several factors make meeting timing harder:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {remoteWorkProblems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTIFICATION FATIGUE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Notification Fatigue and Calendar Overload
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The average knowledge worker receives dozens of notifications per
              hour. Slack messages, emails, app updates, calendar reminders —
              they all compete for the same attention.
            </p>
            <p>
              Over time, your brain learns to tune out notifications
              automatically. This is notification fatigue, and it means that
              even if a Zoom reminder appears, it may not register as urgent.
            </p>
            <p>
              An alarm is different. Unlike a notification, an alarm demands
              attention. It can&apos;t be tuned out because it doesn&apos;t
              disappear until you engage with it.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW ALARMS WORK ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How Alarm-Based Meeting Alerts Work
          </h2>
          <p className="mt-4 text-zinc-400">
            A <strong className="text-white">calendar alarm app</strong> replaces
            passive notifications with persistent alarms that:
          </p>
          <ul className="mt-6 space-y-3">
            {alarmBenefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The result is that you always know when a Zoom or Teams meeting is
            about to start — because the alarm makes sure you do.
          </p>
        </div>
      </section>

      {/* ── HOW ONTIMER HELPS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Helps You Stay On Time
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              <Link href="/" className="text-green-500 hover:text-green-400">
                OnTimer
              </Link>{" "}
              connects to your Google Calendar and Microsoft Outlook accounts
              and automatically turns every calendar event — including Zoom and
              Teams meetings — into a persistent alarm on your iPhone.
            </p>
            <p>
              You don&apos;t need to do anything. Once connected, every
              upcoming meeting is covered. The alarm fires before your meeting
              starts, stays on your screen, and doesn&apos;t go away until you
              dismiss it.
            </p>
            <p>
              For remote workers with busy schedules, this means one fewer thing
              to track manually.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/features" className="text-sm font-semibold text-green-500 hover:text-green-400">
              See all features →
            </Link>
            <Link href="/how-it-works" className="text-sm font-semibold text-green-500 hover:text-green-400">
              How it works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related Guides</h2>
          <ul className="space-y-3">
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
                href="/calendar-alarm-app"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Calendar Alarm App →
              </Link>
            </li>
            <li>
              <Link
                href="/never-be-late-to-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Never Be Late to Meetings →
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
            Download OnTimer
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Never miss a Zoom call again. Connect your calendar and get
            persistent alarms for every meeting.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreButton size="lg" />
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Android coming soon —{" "}
            <Link href="/android" className="text-green-500 hover:text-green-400">
              join the waitlist.
            </Link>
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-zinc-800 pt-8 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white">Home</Link>
            <Link href="/features" className="text-zinc-400 hover:text-white">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white">How It Works</Link>
          </div>
        </div>
      </section>
    </>
  );
}
