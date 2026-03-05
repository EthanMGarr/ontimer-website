import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "What Is a Calendar Alarm App? | Never Miss Meetings Again",
  description:
    "A calendar alarm app turns calendar events into alarms instead of notifications. Learn how this helps professionals stay on schedule.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "What Is a Calendar Alarm App?",
  description:
    "A calendar alarm app turns calendar events into persistent alarms so you never miss meetings. Learn how it differs from standard reminders.",
  url: "https://www.ontimer.app/calendar-alarm-app",
};

const notificationProblems = [
  {
    problem: "They disappear automatically",
    detail: "A notification banner vanishes after a few seconds whether you act on it or not.",
  },
  {
    problem: "They can be dismissed by accident",
    detail: "A quick swipe and the reminder is gone — even if you didn't consciously decide to ignore it.",
  },
  {
    problem: "They compete with everything else",
    detail: "Your phone shows dozens of notifications per day. Calendar reminders don't stand out.",
  },
  {
    problem: "They don't interrupt deep work",
    detail: "When you're focused, notifications fade into the background — especially with focus mode on.",
  },
];

const whoNeedsAlarms = [
  {
    title: "Professionals with back-to-back meetings",
    body: "When every hour is scheduled, a single missed transition derails the rest of the day.",
  },
  {
    title: "Remote workers",
    body: "Without the physical cues of an office environment, it's easier to lose track of time.",
  },
  {
    title: "People with ADHD or time blindness",
    body: "Passive notifications often aren't strong enough to break through hyperfocus or time distortion.",
  },
  {
    title: "Executives and salespeople",
    body: "High-stakes meetings require showing up prepared and on time — every time.",
  },
  {
    title: "Anyone managing multiple calendars",
    body: "When Google Calendar and Outlook events are spread across accounts, it's easy for something to slip through.",
  },
];

const howItWorks = [
  {
    number: 1,
    title: "Connects to your calendar",
    body: "Links to Google Calendar and Microsoft Outlook — including multiple accounts.",
  },
  {
    number: 2,
    title: "Monitors your schedule",
    body: "Automatically detects upcoming events and prepares alarms in advance.",
  },
  {
    number: 3,
    title: "Fires a persistent alarm",
    body: "Before each meeting, triggers an alarm that stays on your screen until dismissed.",
  },
];

export default function CalendarAlarmApp() {
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
            What Is a{" "}
            <span className="text-green-500">Calendar Alarm App?</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            A calendar alarm app turns your calendar events into persistent
            alarms — not passive notifications. Instead of a banner that
            disappears, you get an alert that stays on your screen until you
            dismiss it.
          </p>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            For professionals who rely on their calendar to manage their day,
            this distinction matters.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY NOTIFICATIONS AREN'T ENOUGH ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Notifications Aren&apos;t Enough
          </h2>
          <p className="mt-4 text-zinc-400">
            Standard calendar reminders — from Google Calendar, Outlook, or
            built-in phone calendars — are delivered as notifications. And
            notifications have a fundamental limitation:
          </p>
          <div className="mt-6 space-y-4">
            {notificationProblems.map((item) => (
              <div
                key={item.problem}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"
              >
                <p className="font-semibold text-white">{item.problem}</p>
                <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REMINDERS VS ALARMS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Difference Between Reminders and Alarms
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A <strong className="text-white">reminder</strong> informs you.
              It appears, you acknowledge it (or don&apos;t), and it goes away.
              Whether or not you act is entirely up to you.
            </p>
            <p>
              An <strong className="text-white">alarm</strong> demands action.
              It continues alerting you until you respond. Think of your morning
              alarm — it doesn&apos;t stop because you happened to notice it.
              It stops because you turned it off.
            </p>
            <p>
              For meetings that matter, you want your phone to behave like an
              alarm clock, not an information display.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-6 py-4 text-sm font-semibold text-zinc-400">Calendar Notification</div>
              <div className="border-l border-zinc-800 px-6 py-4 text-sm font-semibold text-green-500">Calendar Alarm</div>
            </div>
            {[
              ["Disappears automatically", "Stays until dismissed"],
              ["Passive — no action required", "Active — requires response"],
              ["Easy to miss", "Hard to miss"],
              ["Competes with other notifications", "Interrupts regardless of focus"],
            ].map(([left, right], i) => (
              <div key={i} className="grid grid-cols-2 border-b border-zinc-800 last:border-0">
                <div className="px-6 py-4 text-sm text-zinc-500">{left}</div>
                <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHEN YOU NEED STRONGER ALERTS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            When You Need Stronger Meeting Alerts
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Standard calendar reminders work fine when your schedule is light
              and you have time to notice a notification.
            </p>
            <p>
              They start to break down when you have back-to-back meetings, are
              deep in focused work, or are dealing with multiple calendars across
              different apps.
            </p>
            <p>
              If you&apos;ve ever missed a meeting despite having a reminder set,
              a calendar alarm app is likely the right solution.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO BENEFITS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who Benefits From Calendar Alarm Apps
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {whoNeedsAlarms.map((item) => (
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

      {/* ── HOW ONTIMER WORKS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Turns Your Calendar Into an Alarm System
          </h2>
          <p className="mt-4 text-zinc-400">
            <Link href="/" className="text-green-500 hover:text-green-400">
              OnTimer
            </Link>{" "}
            is a calendar alarm app built for iPhone that connects directly to
            Google Calendar and Microsoft Outlook.
          </p>
          <div className="mt-8 space-y-6">
            {howItWorks.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-zinc-400">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-400 leading-relaxed">
            No manual event entry. No configuration per meeting. Your calendar
            is the source of truth — OnTimer just makes sure you can&apos;t
            ignore it.
          </p>
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

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Try OnTimer
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Replace passive notifications with alarms that actually work. Free
            download for iPhone.
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
