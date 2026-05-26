import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It",
  description:
    "Calendar notifications fail silently — they fire correctly but you still miss the meeting. Here's why iPhone and Google Calendar reminders break, 8 fixes, and what to use when fixes aren't enough.",
  alternates: { canonical: "https://www.ontimer.app/calendar-notifications-not-working" },
  openGraph: {
    title: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It",
    description:
      "Calendar notifications fail silently — they fire correctly but you still miss the meeting. Here's why reminders break, 8 fixes, and what to use when fixes aren't enough.",
    url: "https://www.ontimer.app/calendar-notifications-not-working",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It",
    description:
      "Calendar notifications fail silently. Here's why iPhone and Google Calendar reminders break — and 8 fixes that actually work.",
  },
};

const faqItems = [
  {
    question: "Why are my iPhone calendar notifications not working?",
    answer:
      "The most common cause is Focus mode silently blocking alerts. Check Settings → Focus → your active Focus → Apps and add your calendar app. If Focus isn't the issue, check Settings → Notifications → Calendar and confirm alerts are enabled with sound and banners. iOS updates occasionally reset notification permissions without warning.",
  },
  {
    question: "Why are my Google Calendar notifications not working on iPhone?",
    answer:
      "Google Calendar on iPhone relies on Apple's notification system, which can be blocked by Focus mode, battery optimization, or background app restrictions. Even when delivered correctly, Google Calendar notifications are passive — they appear briefly and disappear whether or not you act. If the notification fires but you still miss events, the problem is behavioral, not technical.",
  },
  {
    question: "Can Focus mode silence calendar reminders without telling me?",
    answer:
      "Yes. Any Focus configuration that doesn't explicitly allow your calendar app will suppress notifications silently. You won't see any indication that an alert was blocked — the notification simply never arrives. Check Settings → Focus → your active Focus → Apps to allow your calendar app through.",
  },
  {
    question: "Why do calendar reminders fire but I still miss meetings?",
    answer:
      "Because notifications are passive — they appear and disappear whether or not you act. You may have seen the notification, registered the meeting time, decided to finish what you were doing first, and then missed the window when the notification vanished and nothing interrupted you again. This is a design limitation of notifications, not a settings problem. Persistent alarms solve it.",
  },
  {
    question: "What's the difference between a calendar notification and a persistent alarm?",
    answer:
      "A notification fires once, appears briefly, and disappears. It requires you to see it and act on it in the same instant. A persistent alarm stays on your screen, plays audio continuously, and requires an explicit dismiss or snooze before it stops — the same behavior as your morning alarm. For time-critical events, persistent alarms are the reliable option.",
  },
  {
    question: "Do calendar reminders fail even with correct settings?",
    answer:
      "Yes. Even with correct permissions, calendar notifications can be affected by OS updates, time zone changes, battery optimization, and occasional system bugs. They also fail behaviorally — you see them and still miss the event. The most reliable approach adds a persistent alarm layer on top of your standard calendar notifications.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It",
  description:
    "Calendar notifications fail silently — they fire correctly but you still miss the meeting. Here's why iPhone and Google Calendar reminders break, 8 fixes, and what to use when fixes aren't enough.",
  author: { "@type": "Organization", name: "OnTimer" },
  publisher: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
  url: "https://www.ontimer.app/calendar-notifications-not-working",
  mainEntityOfPage: "https://www.ontimer.app/calendar-notifications-not-working",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ontimer.app" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calendar Notifications Not Working",
      item: "https://ontimer.app/calendar-notifications-not-working",
    },
  ],
};

export default function CalendarNotificationsNotWorking() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Calendar Notifications Not Working</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            iPhone · Google Calendar · Outlook
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            Calendar Notifications Not Working?
            <br />
            <span className="text-green-500">Here&apos;s Why — and What Fixes It</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Most people discover their calendar reminders are unreliable the moment they miss a meeting.
            Calendar notifications can fail two ways: technical failures (Focus mode, permissions, background
            restrictions) and silent behavioral failures (notifications that fire correctly but you still
            miss). This guide covers both.
          </p>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">The most common cause of broken calendar notifications is Focus mode silently blocking alerts.</strong>{" "}
              Check Settings → Focus → your active Focus → Apps. If Focus isn&apos;t the issue, check
              notification permissions (Settings → Notifications → Calendar). But if the notifications fire
              correctly and you still miss events, the problem is behavioral — not technical. Notifications are
              passive; they disappear whether or not you act.{" "}
              <Link href="/why-calendar-notifications-fail" className="text-green-500 hover:text-green-400 transition-colors">
                That requires a different solution entirely.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Notifications Fail Silently */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Two Ways Calendar Reminders Fail — and Why One Is Invisible
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Most troubleshooting guides focus on technical failures: the notification never arrived, the
              permissions were wrong, the app had a bug. These are real — and fixable.
            </p>
            <p>
              But there&apos;s a second failure mode that no settings fix can address:{" "}
              <strong className="text-white">notifications that fire correctly and you still miss the meeting.</strong>{" "}
              You saw the banner. You understood what it said. You told yourself you&apos;d leave in five
              minutes. Five minutes became fifteen, the notification was long gone, and nothing interrupted
              you again.
            </p>
            <p>
              This isn&apos;t a settings problem. It&apos;s a design problem. Calendar notifications are
              passive — they appear briefly and disappear whether or not you respond. For time-critical
              events, passive alerts are structurally unreliable.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/why-calendar-notifications-fail"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Why calendar notifications fail by design — the full explanation →
            </Link>
          </div>
        </div>
      </section>

      {/* The 5 Most Common Failure Modes */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The 5 Most Common Technical Failure Modes
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Calendar alerts pass through multiple system layers before they reach you. Any one of these can
            silently block them. Work through this list in order.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white">
                1. Focus Mode silently blocks calendar alerts
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Focus mode is the single most common cause of missing calendar reminders on iPhone. When a
                Focus is active, it suppresses notifications from any app not on the allowed list — silently,
                with no indication that anything was blocked. Many users activate a Focus for one meeting
                and forget to turn it off. The calendar continues showing events; the alerts simply never
                arrive.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Fix: Settings → Focus → your active Focus → Apps → add your calendar app.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                2. iPhone calendar notification permissions reset
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                iOS updates occasionally reset notification permissions without warning. An app that had
                permission before an update may silently lose it. The calendar app continues accepting events
                and appearing to set reminders, but delivers nothing. This is especially common after major
                iOS version upgrades.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Fix: Settings → Notifications → [your calendar app] → confirm alerts are enabled with
                sound and banners.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                3. Background restrictions kill Google Calendar notifications
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                On iPhone, apps can be restricted from running in the background. If your calendar app is
                restricted, it may be suspended before it fires a scheduled notification. This is more common
                after battery optimization changes or when Low Power Mode is active. Android devices use even
                more aggressive background process management.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Fix: Settings → General → Background App Refresh → enable for your calendar app.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                4. Notification overload buries calendar alerts
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                When dozens of notifications arrive throughout the day, calendar alerts get buried in
                notification center. The alert fired correctly — but you scrolled past it without registering
                the content, or cleared the pile with a swipe and accidentally dismissed it. This is alert
                fatigue: your brain has learned to treat notification banners as low-priority background noise.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Fix: Reduce non-essential notification sources. But this won&apos;t solve the behavioral
                problem — see below.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                5. Silent mode misunderstandings
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                On iPhone, the physical ringer switch silences calls and notification sounds, but not all
                alarms. The inconsistency causes confusion: users assume their phone is fully silenced and
                miss the visual alert that fires without sound. Some Focus configurations also mute
                notification sounds while still showing banners.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Fix: Settings → Sounds &amp; Haptics → verify notification volume is not set to zero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting Table */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Quick Troubleshooting Reference
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Match your symptom to the most likely cause and the fastest fix.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
              <div className="px-4 py-3 text-sm font-semibold text-zinc-400">Symptom</div>
              <div className="border-l border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-400">Most Likely Cause</div>
              <div className="border-l border-zinc-800 px-4 py-3 text-sm font-semibold text-green-500">First Check</div>
            </div>
            {[
              ["Reminder never appeared", "Focus mode active", "Settings → Focus"],
              ["Reminder appears but no sound", "Notification volume or ringer switch", "Settings → Sounds & Haptics"],
              ["Worked last week, broken now", "OS update reset permissions", "Settings → Notifications"],
              ["Some events fire, others don't", "Events from external calendar", "Check event source in calendar app"],
              ["Notification appears, miss meeting anyway", "Passive design — notifications are insufficient", "Use persistent alarms"],
              ["Reminder fires too early or late", "Wrong timezone on event", "Open event → check timezone"],
              ["Nothing works after troubleshooting", "Systemic background restriction", "Settings → General → Background App Refresh"],
            ].map(([symptom, cause, fix], i) => (
              <div key={i} className="grid grid-cols-3 border-b border-zinc-800 last:border-0">
                <div className="px-4 py-4 text-sm text-zinc-400">{symptom}</div>
                <div className="border-l border-zinc-800 px-4 py-4 text-sm text-zinc-400">{cause}</div>
                <div className="border-l border-zinc-800 px-4 py-4 text-sm font-medium text-white">{fix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Fixes */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            8 Fixes for Calendar Notifications Not Working
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Work through this list in order. Most issues are resolved by fix 1–4.
          </p>
          <ol className="mt-8 space-y-5">
            {[
              {
                fix: "Check notification permissions",
                detail:
                  "Go to Settings → Notifications → [your calendar app] and confirm alerts are enabled with sound and banners. iOS updates can silently reset these.",
              },
              {
                fix: "Disable or configure Focus mode",
                detail:
                  "Go to Settings → Focus and turn off any active Focus, or add your calendar app to the Allowed Apps list for each Focus configuration. This is the most common fix.",
              },
              {
                fix: "Verify calendar alert settings inside the app",
                detail:
                  "Inside your calendar app (Google Calendar, Apple Calendar, Outlook), open an event and confirm an alert time is set. Some apps default to 'None' after updates.",
              },
              {
                fix: "Check alarm and notification volume",
                detail:
                  "Go to Settings → Sounds & Haptics and verify the notification volume is not set to zero. This is separate from the ringer switch.",
              },
              {
                fix: "Enable Background App Refresh",
                detail:
                  "Settings → General → Background App Refresh → enable for your calendar app. Without this, the app may be suspended before it fires a scheduled notification.",
              },
              {
                fix: "Restart the calendar app",
                detail:
                  "Force-quit the calendar app and reopen it. Some notification bugs are session-specific and clear on restart.",
              },
              {
                fix: "Confirm event alert times on imported events",
                detail:
                  "Open several upcoming events and verify alerts are set. Events imported from external calendars sometimes arrive with no alert attached.",
              },
              {
                fix: "Test a reminder now",
                detail:
                  "Create a test event 3 minutes from now with an alert. If it doesn't fire, the issue is systemic — likely a permissions or Focus configuration problem that the steps above will address.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-500">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-zinc-200">{item.fix}</p>
                  <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* When Notifications Keep Failing */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            When Reminders Keep Failing Despite the Fixes
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              If you&apos;ve applied all eight fixes and still miss events, the problem isn&apos;t in the
              settings — it&apos;s in the design. Calendar notifications are passive by nature.
            </p>
            <p>
              A passive notification requires you to be looking at the right place at exactly the right
              moment. It fires once and disappears. It doesn&apos;t know or care whether you acted on it.
              If you were in flow, if you were in a meeting, if you simply didn&apos;t register it —
              nothing fires again.
            </p>
            <p>
              <strong className="text-white">Persistent alarms work differently.</strong> They occupy your
              full screen, play audio continuously, and don&apos;t stop until you dismiss or snooze them.
              You can&apos;t passively ignore them — you have to make an active decision. That forced
              decision is what actually gets you out the door.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            {[
              {
                layer: "Technical fix layer",
                desc: "Apply the 8 fixes above to ensure notifications actually reach your screen. Covers Focus mode, permissions, background restrictions.",
              },
              {
                layer: "Behavioral fix layer",
                desc: "Replace passive notifications with persistent alarms for time-critical events. Use an app that reads your calendar and fires alarms that won't stop until you respond.",
              },
            ].map((item) => (
              <div key={item.layer} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-bold text-green-500">{item.layer}</p>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/why-calendar-notifications-fail"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Why calendar notifications fail even when they technically work →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Calendar Alerts Are Inherently Fragile */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Alerts Are Inherently Fragile
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            Even after applying all eight fixes, calendar notifications remain fragile by design. They were
            built to be low-interruption — helpful for low-stakes reminders, but structurally unreliable for
            time-sensitive events.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "A calendar alert fires once and disappears — there is no repeat if you miss it",
              "Passive notification banners compete with dozens of other alerts for the same screen real estate",
              "Background app restrictions can be re-applied silently after an OS update",
              "Dismissing a notification center pile can swipe away calendar alerts accidentally",
              "Focus mode can be reactivated automatically by time-of-day or location triggers you forgot you set",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-1 flex-shrink-0">—</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OnTimer solution */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Adds a Persistent Alarm Layer
          </h2>
          <p className="mt-6 text-zinc-400 leading-relaxed">
            OnTimer connects directly to your Google Calendar and Microsoft 365 / Outlook and fires a
            persistent alarm before each event — not a notification that disappears. Unlike passive calendar
            alerts, OnTimer is designed to demand attention rather than request it.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            This is especially useful for professionals with back-to-back schedules, remote workers who
            can&apos;t rely on office context cues, and anyone with ADHD or{" "}
            <Link href="/adhd-time-blindness-tools" className="text-green-500 hover:text-green-400 transition-colors">
              time blindness
            </Link>{" "}
            who needs an alert that won&apos;t let them defer indefinitely.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="calendar_notifications_not_working_solution" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar &amp; Microsoft 365 / Outlook</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
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

      {/* Related Guides */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/why-calendar-notifications-fail", label: "Why Calendar Notifications Fail (And What Actually Works)" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms: Why Most Reminders Fail" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Notifications Fail" },
              { href: "/why-notifications-fail", label: "Why Notifications Fail (And Persistent Alarms Work Better)" },
              { href: "/how-to-never-miss-a-meeting", label: "How to Never Miss a Meeting Again" },
              { href: "/alarm-didnt-go-off-late-for-work", label: "Alarm Didn't Go Off? Build a Fail-Safe Reminder System" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 transition-colors hover:text-green-400 text-sm">
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop relying on notifications that disappear.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer replaces passive calendar alerts with persistent alarms — the kind that stay until you respond.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="calendar_notifications_not_working_final_cta" />
          </div>
          <p className="mt-3 text-sm text-zinc-500">Free · Google Calendar &amp; Microsoft Outlook</p>
        </div>
      </section>
    </>
  );
}
