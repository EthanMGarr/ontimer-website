import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How to Never Miss a Meeting Again (Even If Your Calendar Fails)",
  description:
    "Learn a simple reminder system that ensures you never miss meetings, calls, or appointments — even if calendar notifications fail.",
  openGraph: {
    title: "How to Never Miss a Meeting Again (Even If Your Calendar Fails)",
    description:
      "Learn a simple reminder system that ensures you never miss meetings, calls, or appointments — even if calendar notifications fail.",
    type: "article",
  },
};

const faqItems = [
  {
    question: "What is the best meeting reminder system?",
    answer:
      "The most reliable system uses three layers: a calendar notification set 15 minutes before, a secondary phone alarm set independently, and a persistent alert app that reads your calendar directly. Each layer covers failures in the others.",
  },
  {
    question: "Why do calendar reminders fail?",
    answer:
      "Calendar reminders fail because they are passive notifications that fire once and disappear. Focus mode, notification permission changes, and background app restrictions can silently suppress them without any warning.",
  },
  {
    question: "How early should reminders trigger?",
    answer:
      "For most meetings, 15 minutes is enough lead time to wrap up what you're doing and join. For in-person meetings or appointments requiring travel, set a departure reminder at least 30 minutes before based on your actual travel time.",
  },
];

export default function HowToNeverMissAMeeting() {
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
            How to Never Miss a Meeting Again{" "}
            <span className="text-green-500">(Even If Your Calendar Fails)</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500">By Ethan Garr</p>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Even highly organized professionals miss meetings. In most cases the meeting was in the calendar, the reminder was set, and the intention was real — but the reminder system failed at the critical moment.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            The fix isn&apos;t better intentions. It&apos;s a better system.
          </p>
        </div>
      </section>

      {/* ── WHY PEOPLE MISS MEETINGS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why People Miss Meetings
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Missed meetings cluster around a few specific failure points — most of which are system problems, not personal ones.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                cause: "Calendar alerts dismissed without registering",
                detail:
                  "Passive notification banners appear briefly and disappear. When you're focused on work, your brain can process and dismiss a banner without consciously noting the meeting time.",
              },
              {
                cause: "Notification overload",
                detail:
                  "The average smartphone user receives 80+ notifications per day. Calendar alerts compete with messages, emails, and app updates, making it easy to miss the one that matters.",
              },
              {
                cause: "Poor reminder timing",
                detail:
                  "A reminder set for exactly the meeting start time gives you zero lead time. A reminder set too early is dismissed and forgotten. Most people never optimize their reminder window.",
              },
              {
                cause: "Travel time miscalculation",
                detail:
                  "For in-person meetings, people routinely underestimate how long it takes to get somewhere, especially with traffic or transit delays. A reminder that fires at the right time for a wrong travel estimate still makes you late.",
              },
            ].map((item) => (
              <div key={item.cause} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-semibold text-zinc-200">{item.cause}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-LAYER SYSTEM ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The 3-Layer Reminder System
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The most reliable meeting reminder system doesn&apos;t depend on any single mechanism. It stacks three independent layers so each one acts as a backup if the previous fails.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                layer: "Layer 1 — Calendar Notification",
                desc: "Set your calendar to alert you 15 minutes before each meeting. This covers the vast majority of meetings under normal conditions. Apply Focus mode exemptions and verify notification permissions so this layer fires reliably.",
                reliability: "Reliable when configured correctly",
              },
              {
                layer: "Layer 2 — Alarm or Secondary Alert",
                desc: "Set a separate phone alarm for important meetings, independent of your calendar system. If Focus mode silences your calendar notification, the alarm fires through a different delivery path and still reaches you.",
                reliability: "Independent of calendar system",
              },
              {
                layer: "Layer 3 — Persistent Reminder System",
                desc: "A dedicated app that reads your calendar directly and fires a persistent, attention-demanding alarm before meetings. Unlike passive notifications, persistent alerts require active dismissal — they don't silently disappear.",
                reliability: "Hardest to miss",
              },
            ].map((item) => (
              <div key={item.layer} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-bold text-green-500">{item.layer}</p>
                  <span className="flex-shrink-0 rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs text-zinc-500">
                    {item.reliability}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMPLE TIMELINE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Example Reminder Timeline
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            For a 2:00 PM meeting, an effective multi-stage reminder schedule looks like this:
          </p>
          <div className="mt-8 space-y-3">
            {[
              {
                time: "24 hours before",
                action: "Calendar notification at 2:00 PM the previous day",
                purpose: "Planning — confirms the meeting is happening; time to prepare or reschedule",
              },
              {
                time: "2 hours before",
                action: "12:00 PM alert",
                purpose: "Awareness — wrap up open work, start context-switching toward the meeting topic",
              },
              {
                time: "30 minutes before",
                action: "1:30 PM alert",
                purpose: "Preparation — for in-person meetings, this is the departure signal",
              },
              {
                time: "10 minutes before",
                action: "1:50 PM persistent alert",
                purpose: "Final call — hardest to miss; for critical meetings where absence is costly",
              },
            ].map((item) => (
              <div
                key={item.time}
                className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <div className="w-28 flex-shrink-0">
                  <p className="text-sm font-bold text-green-500">{item.time}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">{item.action}</p>
                </div>
                <div className="border-l border-zinc-700 pl-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.purpose}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            You don&apos;t need all four stages for every meeting. Use the 24-hour and 30-minute alerts for in-person appointments; the 10-minute alert for high-stakes video calls.
          </p>
        </div>
      </section>

      {/* ── HOW TECHNOLOGY HELPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How Technology Can Prevent Missed Meetings
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The problem with manual backup alarms is that you have to set them manually — for every meeting, every day. Most people don&apos;t maintain this habit consistently.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Automated systems close this gap. A{" "}
            <Link
              href="/meeting-reminder-app"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              dedicated meeting reminder app
            </Link>{" "}
            like OnTimer reads your calendar automatically and creates persistent alarms before each event — no manual setup required for each meeting. The three-layer system runs in the background without any daily maintenance.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            For in-person meetings and appointments, OnTimer also calculates when you need to leave based on your location and live traffic, so your departure alert fires at the right time — not just a fixed number of minutes before the event starts.
          </p>
          <p className="mt-6 text-sm text-zinc-500">
            Related:{" "}
            <Link
              href="/never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              How to never be late to meetings
            </Link>{" "}
            —{" "}
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              Airport time-to-leave calculator
            </Link>{" "}
            —{" "}
            <Link
              href="/calendar-notifications-not-working"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              Calendar notifications not working
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
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? 8 Fixes" },
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
            <AppStoreButton size="lg" location="how-to-never-miss-a-meeting" />
          </div>
        </div>
      </section>
    </>
  );
}
