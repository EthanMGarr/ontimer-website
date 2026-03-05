import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title:
    "Why Calendar Reminders Fail (And How to Never Miss a Meeting Again) | OnTimer",
  description:
    "Calendar reminders were designed for a simpler era of work. Learn why they fail and how OnTimer fixes the problem with persistent alarms.",
};

export default function WhyCalendarRemindersFail() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Why Calendar Reminders Fail
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Calendar reminders were designed for a simpler era of work. Today,
            people juggle back-to-back meetings, constant notifications, and
            busy schedules. Because of this, standard reminders often fail to
            get our attention when we need them most.
          </p>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Problem With Calendar Notifications
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Most calendar apps rely on passive notifications. These
              notifications appear briefly and can easily be dismissed without
              noticing the time.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY PEOPLE MISS MEETINGS ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why People Miss Meetings
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            There are several reasons people miss meetings even when reminders
            exist.
          </p>
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Notification overload",
                body: "People receive dozens of notifications every day.",
              },
              {
                title: "Swipe fatigue",
                body: "Users often dismiss alerts automatically without reading them.",
              },
              {
                title: "Passive reminders",
                body: "Standard reminders do not interrupt focused work.",
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ALARMS WORK BETTER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Alarms Work Better
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Alarms are more effective because they actively demand attention.
            Instead of quietly appearing on screen, an alarm interrupts the user
            and signals that something important is about to happen.
          </p>
        </div>
      </section>

      {/* ── HOW ONTIMER SOLVES THIS ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Solves This
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            OnTimer connects to your calendar and triggers alarms before
            meetings begin. Instead of a passive notification, users receive a
            clear alert that helps them prepare and arrive on time.
          </p>
        </div>
      </section>

      {/* ── RECOMMENDED READING ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            Recommended Reading
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/blog/stop-being-late-to-meetings"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                How to Stop Being Late to Meetings →
              </Link>
            </li>
            <li>
              <Link
                href="/blog/calendar-reminders-vs-alarms"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Calendar Reminders vs Alarms →
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
          </ul>
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
            Download OnTimer and never miss a meeting again.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
