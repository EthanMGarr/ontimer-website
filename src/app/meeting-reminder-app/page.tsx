import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Meeting Reminder App for iPhone — Alarms That Actually Work",
  description:
    "Most missed meetings happen after the reminder fires — not before. OnTimer replaces passive calendar notifications with interruptive alarms that demand acknowledgment before every meeting.",
  alternates: { canonical: "https://www.ontimer.app/meeting-reminder-app" },
  openGraph: {
    title: "Meeting Reminder App for iPhone — Alarms That Actually Work",
    description:
      "Most missed meetings happen after the reminder fires — not before. OnTimer replaces passive calendar notifications with interruptive alarms for every meeting.",
    url: "https://www.ontimer.app/meeting-reminder-app",
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is a meeting reminder app?",
    answer:
      "A meeting reminder app connects to your calendar and fires alerts before meetings. The best ones fire persistent alarms — not passive notifications — that stay on screen until you dismiss them, ensuring you actually notice and act.",
  },
  {
    question: "How is OnTimer different from Google Calendar reminders?",
    answer:
      "Google Calendar and Outlook reminders are passive notifications that appear briefly and disappear. OnTimer fires a persistent alarm that stays on screen and requires active dismissal — like a morning alarm clock, not a banner. This makes it much harder to miss a meeting even during focused work.",
  },
  {
    question: "Does OnTimer require setting up alarms for each meeting manually?",
    answer:
      "No. Once you connect your Google Calendar or Outlook account, OnTimer automatically creates alarms for all upcoming events. You don't have to do anything for each individual meeting — the system runs in the background and covers your entire calendar.",
  },
];

export default function MeetingReminderApp() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "OnTimer",
            operatingSystem: "iOS",
            applicationCategory: "ProductivityApplication",
            description: "Meeting reminder app that turns Google Calendar and Outlook events into persistent alarms you can't miss.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            url: "https://www.ontimer.app",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
              { "@type": "ListItem", position: 2, name: "Meeting Reminder App", item: "https://www.ontimer.app/meeting-reminder-app" },
            ],
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Google Calendar · Outlook · iPhone
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            Meeting Reminder App
            <br />
            <span className="text-green-500">That Fires Alarms, Not Pings</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Most missed meetings don&apos;t happen because the reminder never fired. They happen
            because the reminder fired, you saw it, and you didn&apos;t act in time. OnTimer
            replaces dismissible calendar notifications with interruptive alarms that stay on
            your screen until you respond.
          </p>
          <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">Most missed meetings happen after the reminder fires — not before.</strong>{" "}
              Passive notifications disappear whether or not you act on them. OnTimer
              connects to Google Calendar and Outlook and fires an interruptive alarm before
              each event — one that demands acknowledgment and doesn&apos;t go away until you respond.
              No per-meeting setup required.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreCTA location="meeting_reminder_app_hero" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar &amp; Microsoft 365 / Outlook</p>
        </div>
      </section>

      {/* ── WHY CALENDAR REMINDERS FAIL ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Meeting Reminders Fail — Even When They Work
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Calendar notifications are passive. They appear at the top of your screen for a few
              seconds, then disappear — whether or not you acted on them. In a focused work session,
              that window is often not enough.
            </p>
            <p>
              You might see the notification, register what it says, and decide to finish the thing
              you&apos;re in the middle of before switching. The notification disappears. Nothing
              interrupts you again. The meeting starts without you.
            </p>
            <p>
              This isn&apos;t a willpower problem. It&apos;s a design problem.{" "}
              <strong className="text-white">Notifications inform. They don&apos;t interrupt.</strong>{" "}
              For time-critical events — especially client meetings, interviews, or back-to-back
              calls — inform is not enough.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/why-calendar-notifications-fail"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Why calendar notifications fail by design — the full breakdown →
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW ONTIMER FIXES THIS ── */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Fixes This
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            OnTimer connects to your Google Calendar and Microsoft 365 / Outlook and fires an
            alarm before each event. Not a notification — an alarm. The distinction matters:
          </p>
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Stays on screen until dismissed",
                body: "The alarm doesn't disappear after 4 seconds. It remains on your screen, plays audio, and requires an explicit dismiss or snooze before it stops. You can't passively ignore it.",
              },
              {
                title: "Fires automatically for every meeting",
                body: "Connect your calendar once. OnTimer monitors your schedule and fires alarms automatically before each event — no configuration per meeting, no manual alarm-setting.",
              },
              {
                title: "Works across Google and Microsoft accounts",
                body: "Link Google Calendar (personal or Workspace) and Microsoft 365 / Outlook simultaneously. Multiple accounts from each provider are supported.",
              },
              {
                title: "Adjustable lead time",
                body: "Set whether the alarm fires 5, 10, 15, or 30 minutes before the event. Adjust based on whether you need commute time or just transition time.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <AppStoreCTA location="meeting_reminder_app_solution" />
          </div>
        </div>
      </section>

      {/* ── WHO USES ONTIMER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who Uses OnTimer
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            OnTimer is designed for people who rely on their calendar to manage
            a busy schedule.
          </p>
          <p className="mt-4 text-zinc-400">Common users include:</p>
          <ul className="mt-4 space-y-3">
            {[
              "Professionals with back-to-back meetings",
              "Remote workers",
              "Sales professionals",
              "Founders and executives",
              "People who struggle with time blindness",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Calendar Reminder vs OnTimer Alarm
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-zinc-400">
                Standard Calendar Reminder
              </h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Passive notification",
                  "Easy to dismiss",
                  "Often missed during focused work",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-0.5 flex-shrink-0 text-zinc-400">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-green-500/30 bg-zinc-900 p-6">
              <h3 className="font-bold text-green-500">OnTimer Alarm</h3>
              <ul className="mt-4 space-y-2">
                {[
                  "Persistent alert",
                  "Hard to ignore",
                  "Helps ensure you arrive on time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}
                  <span className="ml-4 shrink-0 text-zinc-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/why-calendar-notifications-fail", label: "Why Calendar Notifications Fail (And What Actually Works)" },
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Notifications Fail" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/best-meeting-reminder-app", label: "Best Meeting Reminder App for iPhone" },
              { href: "/how-to-never-miss-a-meeting", label: "How to Never Miss a Meeting Again" },
              { href: "/zoom-meeting-reminder", label: "Zoom Meeting Reminder That Won't Let You Miss the Call" },
              { href: "/alarm-didnt-go-off-late-for-work", label: "Alarm Didn't Go Off? Build a Fail-Safe Reminder System" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 hover:text-green-400 transition-colors text-sm">
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
            Reminders that don&apos;t let you drift.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Replace passive calendar notifications with alarms that demand acknowledgment before every meeting.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="meeting_reminder_app_final_cta" />
          </div>
          <p className="mt-3 text-sm text-zinc-500">Free · Google Calendar &amp; Microsoft Outlook</p>
        </div>
      </section>
    </>
  );
}
