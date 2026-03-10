import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Best Meeting Reminder Apps for Professionals in 2026 | OnTimer",
  description:
    "Looking for the best meeting reminder app? Compare reminder apps and learn why persistent calendar alarms work better than standard notifications.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Best Meeting Reminder Apps for Professionals",
  description:
    "Compare meeting reminder approaches and learn why alarm-based calendar apps work better than standard notifications for professionals.",
  url: "https://www.ontimer.app/best-meeting-reminder-app",
};

const reminderComparison = [
  {
    type: "Standard calendar notification",
    verdict: "Easy to miss",
    details: "Appears briefly, disappears, easy to swipe away",
  },
  {
    type: "Email reminder",
    verdict: "Easy to miss",
    details: "Gets buried in your inbox, no interruption",
  },
  {
    type: "Multiple reminders",
    verdict: "Still easy to miss",
    details: "Notification fatigue — you start ignoring them",
  },
  {
    type: "Persistent alarm (OnTimer)",
    verdict: "Hard to miss",
    details: "Stays on screen, requires dismissal, interrupts you",
  },
];

const goodReminderTraits = [
  "interrupts you — not just informs you",
  "stays visible until you acknowledge it",
  "fires at the right time based on your actual schedule",
  "works automatically without manual setup",
  "handles multiple calendars at once",
];

const professionalNeeds = [
  "back-to-back meetings with no buffer",
  "context switching between tasks",
  "working across multiple time zones",
  "managing calls on both Google Calendar and Outlook",
  "staying focused in deep work sessions",
];

export default function BestMeetingReminderApp() {
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
            Best Meeting{" "}
            <span className="text-green-500">Reminder Apps</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Most meeting reminders are passive notifications designed to inform
            you — not to guarantee you actually show up. This guide explains
            the difference, and why alarm-based reminders consistently work
            better for professionals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreButton size="lg" />
            <AndroidWaitlistButton size="lg" />
          </div>
        </div>
      </section>

      {/* ── WHY MOST REMINDERS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Most Meeting Reminders Fail
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The problem with most reminder apps isn&apos;t that they
              don&apos;t fire. It&apos;s that they&apos;re too easy to ignore.
            </p>
            <p>
              A banner notification appears, you glance at it, and you think
              you&apos;ll wrap up what you&apos;re doing before joining. Then
              ten minutes pass.
            </p>
            <p>
              Standard reminders are designed around the assumption that you
              only need to be informed. But for busy professionals, the problem
              is rarely awareness — it&apos;s losing track of time.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES A GOOD REMINDER APP ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Makes a Good Meeting Reminder App
          </h2>
          <p className="mt-4 text-zinc-400">
            The most effective meeting reminder apps share a few key traits:
          </p>
          <ul className="mt-6 space-y-3">
            {goodReminderTraits.map((trait) => (
              <li key={trait} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {trait}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The distinction between being informed and being interrupted is the
            difference between missing a meeting and making it.
          </p>
        </div>
      </section>

      {/* ── NOTIFICATIONS VS ALARMS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Calendar Notifications vs Alarm-Based Reminders
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A calendar notification is passive. It appears briefly, makes a
              sound, and disappears whether you act on it or not.
            </p>
            <p>
              An alarm is active. It stays on your screen, keeps alerting you,
              and requires you to acknowledge it before it goes away. Like your
              morning alarm — you can&apos;t simply wait for it to vanish.
            </p>
            <p>
              For meetings that matter, you want an alarm. Not a notification.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Comparison of Reminder Types
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
              <div className="px-4 py-3 text-sm font-semibold text-zinc-400">Type</div>
              <div className="border-l border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-400">Verdict</div>
              <div className="border-l border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-400">Why</div>
            </div>
            {reminderComparison.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-zinc-800 last:border-0"
              >
                <div className="px-4 py-4 text-sm text-zinc-400">{row.type}</div>
                <div className={`border-l border-zinc-800 px-4 py-4 text-sm font-medium ${row.verdict === "Hard to miss" ? "text-green-500" : "text-zinc-500"}`}>
                  {row.verdict}
                </div>
                <div className="border-l border-zinc-800 px-4 py-4 text-sm text-zinc-500">{row.details}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PROFESSIONALS NEED MORE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Professionals Need Stronger Meeting Alerts
          </h2>
          <p className="mt-4 text-zinc-400">
            Standard reminders were designed for occasional events. Professionals
            dealing with the following need something more reliable:
          </p>
          <ul className="mt-6 space-y-3">
            {professionalNeeds.map((need) => (
              <li key={need} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {need}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW ONTIMER SOLVES IT ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Solves This Problem
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              <Link href="/" className="text-green-500 hover:text-green-400">
                OnTimer
              </Link>{" "}
              is a{" "}
              <strong className="text-white">calendar alarm app</strong> that
              connects to Google Calendar and Microsoft Outlook and turns every
              event into a persistent alarm.
            </p>
            <p>
              Instead of a notification that disappears, you get an alarm that
              stays on your screen until you dismiss it — the same way a morning
              alarm works. It fires before your meeting, interrupts what
              you&apos;re doing, and makes sure you actually show up.
            </p>
            <p>
              No manual setup. No missed meetings. Your existing calendar events
              are covered automatically.
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
              href="/how-it-works"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              How it works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── AIRPORT CALCULATOR CALLOUT ── */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-zinc-400 leading-relaxed">
            Need to figure out{" "}
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-green-500 hover:text-green-400 transition-colors"
            >
              when to leave for the airport
            </Link>
            ? Our free Airport Time-to-Leave Calculator estimates your exact
            departure time based on traffic, security time, bags, and how
            you&apos;re getting there.
          </p>
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
            Stop relying on notifications. Get alarms you can&apos;t ignore.
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
