import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Calendar Notifications Not Working? 8 Fixes for iPhone and Google Calendar",
  description:
    "Calendar notifications not working? Learn the most common reasons reminders fail on iPhone and Google Calendar and how to fix them so you never miss a meeting again.",
  openGraph: {
    title: "Calendar Notifications Not Working? 8 Fixes for iPhone and Google Calendar",
    description:
      "Calendar notifications not working? Learn the most common reasons reminders fail on iPhone and Google Calendar and how to fix them so you never miss a meeting again.",
    type: "article",
  },
};

const faqItems = [
  {
    question: "Why are my iPhone calendar notifications not working?",
    answer:
      "The most common causes are Focus mode blocking alerts, notification permissions being disabled for your calendar app, or the app running into background restrictions. Check Settings → Notifications → Calendar and Settings → Focus to identify the issue.",
  },
  {
    question: "Can Focus mode silence reminders?",
    answer:
      "Yes. Any Focus configuration that doesn't explicitly allow calendar notifications will suppress them silently. You won't see any indication that an alert was blocked. Open Settings → Focus → your active Focus → Apps to allow your calendar app through.",
  },
  {
    question: "Do calendar reminders fail sometimes?",
    answer:
      "Yes, even with correct settings. Calendar notifications are delivered through the operating system's notification pipeline, which can be affected by OS updates, time zone changes, battery optimization, and occasional system bugs.",
  },
  {
    question: "What's the best way to avoid missing meetings?",
    answer:
      "The most reliable approach combines three layers: a calendar notification, a secondary backup alarm, and a persistent alert system that connects directly to your calendar. Each layer compensates for weaknesses in the others.",
  },
];

export default function CalendarNotificationsNotWorking() {
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
            Calendar Notifications Not Working?{" "}
            <span className="text-green-500">8 Fixes That Actually Help</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Many people assume their calendar reminders are reliable until the moment they miss a meeting or appointment. In reality, calendar notifications can fail for several reasons — most of which have nothing to do with user error.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            This guide covers the most common failure points on iPhone and Google Calendar, plus eight fixes you can apply in under ten minutes.
          </p>
        </div>
      </section>

      {/* ── WHY NOTIFICATIONS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Notifications Sometimes Fail
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Calendar alerts pass through multiple system layers before they reach you. Any one of these can silently block them.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">Focus Mode / Do Not Disturb</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                iPhone&apos;s Focus mode is the single most common cause of missed calendar alerts. When a Focus is active, it suppresses notifications from any app not on the allowed list — silently, with no notification that something was blocked. Many people activate a Focus for one meeting and forget to turn it off.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Notifications Disabled</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                iOS and Android updates occasionally reset notification permissions. An app that had permission before an update may silently lose it. The calendar app continues to accept events and appear to set reminders, but never delivers them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Battery Optimization</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Android devices in particular use aggressive background process management. If a calendar app is restricted by battery optimization, it may be suspended before it can fire a scheduled notification.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Notification Overload</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                When dozens of notifications arrive throughout the day, calendar alerts get buried in notification center. The alert fired correctly — but you scrolled past it without registering the content.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Silent Mode Misunderstandings</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                On iPhone, the physical ringer switch silences calls and notification sounds, but not all alarms. The inconsistency causes confusion: users assume their phone is fully silenced and miss the visual alert that fires without sound.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 FIXES ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            8 Quick Fixes for Calendar Notifications
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Work through this list in order. Most issues are resolved by fix 1–4.
          </p>
          <ol className="mt-8 space-y-5">
            {[
              {
                fix: "Check notification permissions",
                detail:
                  "Go to Settings → Notifications → [your calendar app] and confirm alerts are enabled with sound and banners.",
              },
              {
                fix: "Disable Focus mode during work hours",
                detail:
                  "Go to Settings → Focus and turn off any active Focus, or add your calendar app to the Allowed Apps list for each Focus configuration.",
              },
              {
                fix: "Verify calendar alert settings",
                detail:
                  "Inside your calendar app (Google Calendar, Apple Calendar, Outlook), open an event and confirm an alert time is set. Some apps default to 'None' after updates.",
              },
              {
                fix: "Check alarm and notification volume",
                detail:
                  "Go to Settings → Sounds & Haptics and verify the notification volume is not set to zero. This is separate from the ringer switch.",
              },
              {
                fix: "Disable battery optimization for the calendar app",
                detail:
                  "On Android, go to Settings → Battery → Battery Optimization and set your calendar app to 'Not Optimized' or 'Unrestricted'.",
              },
              {
                fix: "Restart the calendar app",
                detail:
                  "Force-quit the calendar app and reopen it. Some notification bugs are session-specific and clear on restart.",
              },
              {
                fix: "Confirm event alert times",
                detail:
                  "Open several upcoming events and verify alerts are set to the correct times. Events imported from external calendars sometimes arrive with no alert attached.",
              },
              {
                fix: "Test a reminder",
                detail:
                  "Create a test event 3 minutes from now with an alert. If it doesn't fire, the issue is systemic — likely a permissions or Focus configuration problem.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-500">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-zinc-200">{item.fix}</p>
                  <p className="mt-1 text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── WHY ALERTS ARE FRAGILE ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Alerts Are Inherently Fragile
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Even after applying all eight fixes, calendar notifications remain fragile by design. They were built to be low-interruption — helpful for low-stakes reminders, but unreliable for time-sensitive events.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "A calendar alert fires once and disappears — there is no repeat if you miss it",
              "Passive notification banners compete with dozens of other alerts for the same screen real estate",
              "Background app restrictions can be re-applied silently after an OS update",
              "Dismissing a notification center pile can swipe away calendar alerts accidentally",
              "Focus mode can be reactivated automatically by time-of-day or location triggers you set up and forgot",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0 text-zinc-600">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW PROFESSIONALS PREVENT MISSED MEETINGS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How Professionals Prevent Missed Meetings
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            The most reliable approach isn&apos;t to fix calendar notifications — it&apos;s to stop relying on them as a single point of failure. Professionals who can&apos;t afford to miss meetings use a redundant reminder structure.
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                layer: "Layer 1 — Calendar Notification",
                desc: "The standard alert from your calendar app. Covers most meetings most of the time. Apply the 8 fixes above to make it as reliable as possible.",
              },
              {
                layer: "Layer 2 — Secondary Alarm",
                desc: "A manual phone alarm set 10–15 minutes before the meeting. Independent of the calendar system. Fires even if calendar notifications are blocked.",
              },
              {
                layer: "Layer 3 — Persistent Alert System",
                desc: "A dedicated app that reads your calendar directly and fires a persistent, hard-to-dismiss alarm before important events. The final safety net.",
              },
            ].map((item) => (
              <div key={item.layer} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-bold text-green-500">{item.layer}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BACKUP REMINDER LAYER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Tools That Add a Backup Reminder Layer
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Some people add a dedicated{" "}
            <Link
              href="/meeting-reminder-app"
              className="text-green-500 transition-colors hover:text-green-400"
            >
              meeting reminder system
            </Link>{" "}
            like OnTimer, which connects directly to your calendar and sends persistent alerts before meetings so important events can&apos;t be missed. Unlike passive calendar notifications, OnTimer is designed to demand attention rather than request it.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            This is especially useful for professionals with back-to-back schedules, remote workers who can&apos;t rely on office context cues, and anyone who has missed a high-stakes meeting due to a silent notification.
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
            </Link>
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
            <AppStoreButton size="lg" location="calendar-notifications-not-working" />
          </div>
        </div>
      </section>
    </>
  );
}
