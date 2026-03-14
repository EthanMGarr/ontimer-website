import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Why Calendar Reminders Fail (And How to Make Them Reliable)",
  description:
    "Calendar reminders often fail because of phone settings, notification limits, and dismissed alerts. Learn how to build a reliable reminder system.",
  alternates: { canonical: "https://www.ontimer.app/why-calendar-reminders-fail" },
  openGraph: {
    title: "Why Calendar Reminders Fail (And How to Make Them Reliable)",
    description:
      "Calendar reminders often fail because of phone settings, notification limits, and dismissed alerts. Learn how to build a reliable reminder system.",
    url: "https://www.ontimer.app/why-calendar-reminders-fail",
    type: "article",
  },
};

const faqItems = [
  {
    question: "Why do calendar reminders fail?",
    answer:
      "Calendar reminders fail because they are passive notifications that compete with dozens of other alerts. They fire once and disappear. Focus mode, notification permission changes, and battery optimization settings can all suppress them silently.",
  },
  {
    question: "Is one calendar reminder enough?",
    answer:
      "One reminder is not enough for high-stakes events. A single alert fires once, and if you're focused on something else, it's easy to dismiss it without registering the content. Multiple reminder stages and a backup system provide much stronger coverage.",
  },
  {
    question: "What is the most reliable meeting reminder system?",
    answer:
      "The most reliable system combines three layers: a calendar notification, an independent backup alarm, and a persistent alert app that reads your calendar directly. Each layer handles failures the others might miss.",
  },
  {
    question: "Can I make my calendar reminders more reliable?",
    answer:
      "Yes. The most impactful steps are: verify notification permissions are on, disable Focus mode during work hours, set multiple reminder times per event (e.g. 1 hour and 15 minutes before), and add a dedicated meeting reminder app as a final backup layer.",
  },
];

export default function WhyCalendarRemindersFail() {
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Why Calendar Reminders Fail{" "}
            <span className="text-green-500">(And How to Make Them Reliable)</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500">By Ethan Garr</p>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Default calendar reminders were not designed to guarantee you show up on time. They were designed to be convenient — and convenience and reliability are not the same thing.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Understanding why they fail is the first step to building a system that actually works.
          </p>
        </div>
      </section>

      {/* ── COMMON REASONS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Common Reasons Calendar Reminders Fail
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Most reminder failures trace back to one of five root causes.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">Focus Mode</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                iPhone&apos;s Focus mode silently blocks notifications from apps not on the allowed list. Users often activate a Focus for one context — a workout, a deep work session — and forget to turn it off. Every calendar alert that fires while Focus is active is suppressed without any indication.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Notification Permissions</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                iOS and Android updates periodically reset notification permissions. A calendar app that loses permission continues to accept event creation and alert configuration but silently delivers nothing. The user has no indication the system is broken until they miss something.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Battery Optimization</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Android devices restrict background app activity to extend battery life. If a calendar app is subject to battery optimization, it may be suspended before it can fire a scheduled notification. The alert is lost with no retry.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Silent Mode</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                The iPhone ringer switch silences notification sounds but not necessarily alarm sounds. This creates a confusing inconsistency: some users believe their phone is fully silenced, but alarms still ring. Conversely, some users believe they&apos;ll still receive notification sounds when the ringer switch is off — they won&apos;t.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">User Dismissal</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                The most common failure of all is habitual. People dismiss notification banners automatically — out of muscle memory — without reading them. A calendar alert competes for attention in the same notification stack as dozens of less important messages and is frequently cleared without registering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ONE REMINDER IS NOT ENOUGH ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why One Reminder Is Not Enough
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            A single calendar alert is a single point of failure. If it is suppressed, dismissed, or simply doesn&apos;t register — there is no fallback.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "The alert fires once and disappears — there is no repeat",
              "A passive banner can be dismissed in the same motion as clearing other notifications",
              "System failures (Focus, permissions, battery) give no warning before they block an alert",
              "If you're mid-task when the alert fires, your brain may process and dismiss it on autopilot",
              "A reminder set 15 minutes early can be forgotten in the 15 minutes between alert and meeting",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-zinc-600">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Redundancy is the solution. Multiple independent reminders at different times through different delivery mechanisms cover the failure modes of any single alert.
          </p>
        </div>
      </section>

      {/* ── RELIABLE REMINDER FRAMEWORK ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Reliable Reminder Framework
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The most reliable meeting reminder framework uses three independent layers. You don&apos;t need all three for every meeting — but having them available for high-stakes events dramatically reduces the risk of a miss.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                layer: "Calendar Alert",
                detail:
                  "Set alerts at 1 hour and 15 minutes before each meeting. Two alerts at different times are much harder to fully miss than one. Verify notification permissions and Focus mode exemptions so these actually fire.",
              },
              {
                layer: "Backup Alarm",
                detail:
                  "Set a manual alarm independent of your calendar app. Delivered through a different system path — if calendar alerts are blocked, this still fires. Essential for meetings where absence is not acceptable.",
              },
              {
                layer: "Persistent Alert System",
                detail:
                  "A dedicated app that connects to your calendar and fires persistent, dismissal-required alarms before meetings. Unlike passive banners, these don't disappear — they demand a response.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-bold text-green-500">Layer {i + 1} — {item.layer}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEDICATED REMINDER APPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How Dedicated Reminder Apps Improve Reliability
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Calendar apps are optimized for scheduling, not for guaranteeing attendance. A dedicated{" "}
            <Link
              href="/meeting-reminder-app"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              meeting reminder app
            </Link>{" "}
            like OnTimer is built specifically to solve the reliability problem — it reads your calendar directly and fires persistent, attention-demanding alarms before meetings so they can&apos;t be silently missed.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            The key difference: OnTimer alarms require active dismissal. They don&apos;t disappear after a few seconds. For professionals who can&apos;t afford to miss meetings, this distinction matters.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            For in-person meetings, OnTimer also calculates your departure time based on travel distance and live traffic, so the reminder fires at the right moment — not just a fixed number of minutes before the event starts. See the{" "}
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              time-to-leave calculator
            </Link>{" "}
            for how this works.
          </p>
          <p className="mt-6 text-sm text-zinc-500">
            Also read:{" "}
            <Link
              href="/never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              How to never be late to meetings
            </Link>{" "}
            —{" "}
            <Link
              href="/calendar-notifications-not-working"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              Calendar notifications not working: 8 fixes
            </Link>{" "}
            —{" "}
            <Link
              href="/how-to-never-miss-a-meeting"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              How to never miss a meeting
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-8">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-bold text-white">{item.question}</h3>
                <p className="mt-2 text-zinc-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related Guides</h2>
          <ul className="space-y-3">
            {[
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? 8 Fixes" },
              { href: "/how-to-never-miss-a-meeting", label: "How to Never Miss a Meeting Again" },
              { href: "/alarm-didnt-go-off-late-for-work", label: "Alarm Didn't Go Off? Build a Fail-Safe Reminder System" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 transition-colors hover:text-green-400">
                  {label} →
                </Link>
              </li>
            ))}
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
            Try OnTimer — a meeting reminder system designed to make sure you&apos;re never late again.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="why-calendar-reminders-fail" />
          </div>
        </div>
      </section>
    </>
  );
}
