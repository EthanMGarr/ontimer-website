import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Alarm Didn't Go Off? How to Build a Fail-Safe Meeting Reminder System",
  description:
    "Alarm didn't go off and you were late? Learn why phone alarms fail and how to build a fail-safe reminder system that prevents missed meetings and appointments.",
  alternates: { canonical: "https://www.ontimer.app/alarm-didnt-go-off-late-for-work" },
  openGraph: {
    title: "Alarm Didn't Go Off? How to Build a Fail-Safe Meeting Reminder System",
    description:
      "Alarm didn't go off and you were late? Learn why phone alarms fail and how to build a fail-safe reminder system that prevents missed meetings and appointments.",
    url: "https://www.ontimer.app/alarm-didnt-go-off-late-for-work",
    type: "article",
  },
};

const faqItems = [
  {
    question: "Why didn't my iPhone alarm go off?",
    answer:
      "The most common causes are Focus mode silencing the alarm, the ringer switch being set to silent, or low volume. Background app restrictions and battery optimization settings can also prevent alarms from firing at the scheduled time.",
  },
  {
    question: "Can Focus mode silence alarms?",
    answer:
      "Yes. Certain Focus configurations on iPhone will silence alarms unless you explicitly allow them. Check your Focus settings and add your alarm app to the allowed apps list.",
  },
  {
    question: "Do calendar notifications fail sometimes?",
    answer:
      "Yes. Calendar notifications are passive banners that are easy to miss when you're focused on other tasks. Notification permission changes, app updates, and battery optimization settings can all cause them to fail silently.",
  },
  {
    question: "What is the best backup reminder system?",
    answer:
      "The most reliable approach is a three-layer system: a calendar alert, a secondary alarm set manually, and a persistent meeting reminder app. Each layer acts as a failsafe if the previous one is missed.",
  },
];

export default function AlarmDidntGoOff() {
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
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Alarm Didn&apos;t Go Off?{" "}
            <span className="text-green-500">How to Build a Fail-Safe Reminder System</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500">By Ethan Garr</p>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            People assume their phone alarms and calendar notifications are reliable. But millions of people discover the opposite the moment they miss a meeting, appointment, or work shift.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            If your alarm didn&apos;t go off and you were late, you&apos;re not alone — and there are specific, fixable reasons it happens.
          </p>
        </div>
      </section>

      {/* ── WHAT TO DO IMMEDIATELY ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What To Do Immediately If Your Alarm Didn&apos;t Go Off
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Before investigating the cause, take these immediate steps to restore your reminder system today.
          </p>
          <ol className="mt-6 space-y-4">
            {[
              {
                step: "Check Focus / Do Not Disturb settings",
                detail: "Open Settings → Focus and confirm your active Focus mode isn't blocking alarms or notification apps.",
              },
              {
                step: "Check notification permissions",
                detail: "Go to Settings → Notifications and verify your calendar app and alarm app are allowed to send alerts.",
              },
              {
                step: "Verify calendar alerts are enabled",
                detail: "Open your calendar app and confirm that event alerts are turned on. Many apps disable them by default after updates.",
              },
              {
                step: "Confirm alarm volume",
                detail: "The ringer volume and alarm volume are separate on iPhone. Check Settings → Sounds & Haptics.",
              },
              {
                step: "Review battery optimization settings",
                detail: "Some Android devices aggressively kill background apps. Check battery settings and whitelist your alarm app.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-500">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-zinc-200">{item.step}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY PHONE ALARMS FAIL ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Phone Alarms and Calendar Notifications Fail
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Modern smartphones have multiple systems that can independently block or suppress alarms. Understanding each one helps you close the gaps.
          </p>

          <div className="mt-10 space-y-10">
            <div>
              <h3 className="text-xl font-bold text-white">Focus Mode / Do Not Disturb</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                iPhone&apos;s Focus mode can silently suppress alarms, calendar alerts, and app notifications without any visible warning. If you activated a Focus mode during a previous task and forgot to turn it off, every subsequent alarm fires silently.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Notification Permissions Disabled</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                App updates and iOS updates occasionally reset notification permissions. A calendar app or alarm app that loses permission will appear to set reminders normally — but deliver nothing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Battery Optimization Killing Background Alerts</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Android devices in particular use aggressive background app killing to extend battery life. If your alarm app is not on the battery optimization exemption list, it may be terminated before it can fire.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Calendar Notification Bugs</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Calendar apps rely on the operating system delivering notifications at a precise time. System-level bugs, time zone changes, and DST transitions can all cause calendar alerts to fire at the wrong time or not at all.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Silent Mode Misunderstandings</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                On iPhone, the physical ringer switch controls whether sounds play for calls and notifications — but not necessarily for alarms. This inconsistency regularly catches people off guard, especially when the phone has been silenced for a meeting and not restored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHECKLIST ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The 10-Minute Alarm Reliability Checklist
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Run through this checklist once to harden your reminder system against the most common failure points.
          </p>
          <ol className="mt-8 space-y-3">
            {[
              "Verify alarm volume is set to maximum",
              "Confirm the ringer switch is not set to silent",
              "Turn off or configure Focus mode to allow alarms during work hours",
              "Check notification permissions for your calendar and alarm apps",
              "Enable persistent (non-dismissable) notifications where available",
              "Set multiple alerts for important meetings (15 min and 5 min before)",
              "On Android, whitelist your alarm app from battery optimization",
              "Verify your calendar app is syncing with your event source",
              "Test an alarm by setting one 2 minutes out and confirming it fires",
              "Set up a backup reminder app as your final failsafe layer",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-bold text-green-500">
                  {i + 1}.
                </span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 3-LAYER SYSTEM ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The 3-Layer Reminder System That Prevents Missed Meetings
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            No single reminder is 100% reliable. The solution is redundancy — three independent layers, each acting as a backup if the previous one fails.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                layer: "Layer 1 — Calendar Notification",
                desc: "Your primary calendar alert. Set it 15 minutes before the meeting. This works most of the time but can be suppressed by Focus mode, notification permission issues, or passive dismissal.",
              },
              {
                layer: "Layer 2 — Secondary Alarm",
                desc: "A separate alarm app alarm set 10 minutes before the meeting. Independent of the calendar system. If the calendar notification fails, this fires separately.",
              },
              {
                layer: "Layer 3 — Persistent Backup Alert",
                desc: "A dedicated meeting alert system that connects to your calendar and fires a persistent, attention-grabbing alarm before your meeting. Designed specifically to not be ignored.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="font-bold text-green-500">{item.layer}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Using all three layers reduces the probability of missing a meeting to near zero. Any single layer can fail — but it is unlikely all three fail at once.
          </p>
        </div>
      </section>

      {/* ── BACKUP REMINDER APP ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Many Professionals Use a Backup Reminder App
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Calendar notifications were designed for low-stakes reminders. They are passive, easy to dismiss, and compete with dozens of other notifications for your attention.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Calendar alerts fire once and disappear — they don't repeat",
              "Notification badges are easy to swipe away without registering the content",
              "Alarms get buried in notification center alongside email, Slack, and social media",
              "A missed notification during focused work doesn't repeat itself",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-zinc-600">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-zinc-400 leading-relaxed">
            Some people add a dedicated{" "}
            <Link
              href="/meeting-reminder-app"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              meeting reminder app
            </Link>{" "}
            like OnTimer, which connects directly to your calendar and triggers persistent alerts before meetings so they can&apos;t be missed. Unlike passive calendar notifications,{" "}
            <Link
              href="/never-be-late-to-meetings"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              OnTimer is designed to get your attention
            </Link>{" "}
            and keep it until you acknowledge the alarm.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
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

      {/* ── HOW TO NEVER BE LATE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to Make Sure You&apos;re Never Late Again
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The most reliable reminder stack combines three things: a calendar alert, a manual backup alarm, and a persistent alert system that connects directly to your calendar.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Set calendar alerts 15 minutes before every important meeting",
              "Add a separate phone alarm as a secondary backup",
              "Use a persistent meeting reminder app as the final layer",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-zinc-400 leading-relaxed">
            If you also need to figure out exactly when to leave for an event, the{" "}
            <Link
              href="/airport-time-to-leave-calculator"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              Airport Time-to-Leave Calculator
            </Link>{" "}
            estimates your exact departure time based on live traffic. For everyday meetings, the{" "}
            <Link
              href="/what-time-should-i-leave"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              leave time calculator
            </Link>{" "}
            works the same way.
          </p>
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
              { href: "/how-to-never-miss-a-meeting", label: "How to Never Miss a Meeting Again" },
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
            Never be late again.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Try OnTimer — the meeting reminder system designed to make sure you&apos;re never late again.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="alarm-didnt-go-off" />
          </div>
        </div>
      </section>
    </>
  );
}
