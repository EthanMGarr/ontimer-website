import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Best Meeting Reminder App (Never Be Late Again) | OnTimer",
  description:
    "OnTimer is a meeting reminder app that connects to your calendar and triggers loud persistent alarms before meetings so you never miss an appointment again.",
};

const features = [
  "Connects to Google Calendar and Microsoft Outlook",
  "Triggers persistent alarms before every meeting",
  "Customizable lead time — fire alarms 5, 10, or 30 minutes early",
  "Works automatically with your existing calendar events",
  "Built specifically for meetings, calls, and appointments",
];

const audiences = [
  {
    title: "Professionals with busy schedules",
    body: "Back-to-back meetings leave no room for error. OnTimer ensures every transition is covered.",
  },
  {
    title: "Remote workers",
    body: "Working from home means more distractions. OnTimer cuts through them with alarms you can't swipe away.",
  },
  {
    title: "Salespeople",
    body: "Missing a client call is costly. OnTimer makes sure you're ready before the phone rings.",
  },
  {
    title: "Executives",
    body: "High-stakes meetings require punctuality. OnTimer handles the timing so you can focus on the work.",
  },
  {
    title: "People with ADHD or time blindness",
    body: "Standard reminders are too easy to ignore. OnTimer's persistent alarms are designed to break through.",
  },
];

export default function MeetingReminderApp() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            The Best Meeting Reminder App{" "}
            <span className="text-green-500">for iPhone</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Most calendar notifications are easy to ignore. OnTimer is a{" "}
            <strong className="text-white">meeting reminder app</strong> that
            connects to your calendar and fires persistent alarms before every
            meeting — so you actually show up on time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Free download • Works with Google Calendar and Outlook
          </p>
        </div>
      </section>

      {/* ── WHY CALENDAR ALERTS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why calendar alerts fail
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Standard calendar apps show a notification banner — then it
              disappears. You glance at it, think you have more time, and
              suddenly the meeting already started.
            </p>
            <p>
              The problem isn&apos;t your calendar. It&apos;s that notifications
              aren&apos;t alarms. They&apos;re designed to inform you, not to
              make sure you actually act.
            </p>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-5 space-y-2 text-zinc-300">
              <p>You swipe the reminder away.</p>
              <p>You get distracted.</p>
              <p>You think &quot;I&apos;ll join in a minute.&quot;</p>
              <p>Then suddenly the meeting started 10 minutes ago.</p>
            </div>
            <p>
              A proper meeting reminder app doesn&apos;t just notify you — it
              alarms you. And that&apos;s exactly what OnTimer does.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW ONTIMER WORKS ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer works
          </h2>
          <p className="mt-4 text-zinc-400">
            OnTimer is the{" "}
            <Link href="/" className="text-green-500 hover:text-green-400">
              OnTimer meeting alarm app
            </Link>{" "}
            that replaces passive notifications with alarms you can&apos;t miss.
          </p>
          <ul className="mt-6 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Once connected, OnTimer monitors your calendar and automatically
            schedules alarms for every event. No manual setup. No forgotten
            meetings.
          </p>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who OnTimer is for
          </h2>
          <p className="mt-4 text-zinc-400">
            OnTimer is built for anyone who relies on their calendar and
            can&apos;t afford to miss a meeting.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="font-bold text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ONTIMER SOLVES ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The problem OnTimer solves
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Missing a meeting doesn&apos;t just waste time — it damages
              relationships, costs deals, and creates stress. Most people
              don&apos;t miss meetings because they don&apos;t care. They miss
              them because standard calendar reminders aren&apos;t designed to
              guarantee attention.
            </p>
            <p>
              OnTimer solves this by turning every calendar event into a
              persistent alarm. When it fires, it stays on your screen until
              you dismiss it — the same way a morning alarm works. You
              won&apos;t just see it. You&apos;ll have to deal with it.
            </p>
            <p>
              The result: you show up prepared, on time, every time.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop missing meetings.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and let your calendar finally keep you on time.
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
        </div>
      </section>
    </>
  );
}
