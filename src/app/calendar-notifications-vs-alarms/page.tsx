import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/calendar-notifications-vs-alarms" },
  title: "Calendar Notifications vs Alarms: Why Most Reminders Fail",
  description:
    "Notifications inform. Alarms interrupt. Understanding this difference explains why most calendar reminders fail — and what to use instead for Google and Outlook calendars.",
  openGraph: {
    title: "Calendar Notifications vs Alarms: Why Most Reminders Fail",
    description:
      "Notifications inform. Alarms interrupt. Understanding this difference explains why most calendar reminders fail.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar Notifications vs Alarms: Why Most Reminders Fail",
    description:
      "Notifications inform. Alarms interrupt. Understanding this difference explains why most calendar reminders fail.",
  },
};

const faqItems = [
  {
    question: "What is the difference between a calendar notification and a calendar alarm?",
    answer:
      "A calendar notification is a passive alert — it appears briefly, then disappears automatically whether or not you act on it. A calendar alarm is an active, persistent alert that stays on screen and continues firing until you explicitly dismiss it.",
  },
  {
    question: "Why do calendar reminders fail to get my attention?",
    answer:
      "Calendar reminders use the same notification system as every other app on your phone. They compete with dozens of daily alerts, disappear after a few seconds, and are easy to dismiss or miss entirely — especially during focused work. They're built for awareness, not for action.",
  },
  {
    question: "Why are calendar alarms better than notifications for meetings?",
    answer:
      "Alarms require a response. They don't disappear automatically and don't tolerate being ignored. For meetings where missing or being late has real consequences, that behavioral difference is what ensures you actually show up.",
  },
  {
    question: "Can I get alarm-style alerts for Google Calendar events?",
    answer:
      "Not natively — Google Calendar only sends push notifications. OnTimer connects to Google Calendar and fires persistent, alarm-style alerts for every scheduled event.",
  },
  {
    question: "Can I get alarm-style alerts for Outlook calendar events?",
    answer:
      "Not natively on iPhone — Outlook's mobile reminders are push notifications. OnTimer connects to Microsoft 365 and Outlook calendars and replaces those with persistent alarms.",
  },
];

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
      name: "Calendar Notifications vs Alarms",
      item: "https://ontimer.app/calendar-notifications-vs-alarms",
    },
  ],
};

const fullComparison = [
  { dimension: "Disappears automatically", notification: true, alarm: false },
  { dimension: "Requires active dismissal", notification: false, alarm: true },
  { dimension: "Can be ignored without interaction", notification: true, alarm: false },
  { dimension: "Stays on lock screen", notification: false, alarm: true },
  { dimension: "Competes with other alerts", notification: true, alarm: false },
  { dimension: "Overrides Focus/Do Not Disturb", notification: false, alarm: true },
  { dimension: "Works during deep focus", notification: false, alarm: true },
  { dimension: "Native to Google Calendar / Outlook", notification: true, alarm: false },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Calendar Notifications vs Alarms</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Google Calendar &amp; Outlook · iPhone
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            Calendar Notifications vs Alarms:<br className="hidden sm:block" />
            <span className="text-zinc-400"> Why Most Reminders Fail</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Google Calendar sends a notification. Outlook sends a notification. Both look like
            reminders. Neither behaves like an alarm. That distinction is why most people still
            miss meetings despite having reminders set.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AppStoreCTA location="notif_vs_alarms_hero" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Works with Google Calendar &amp; Microsoft Outlook</p>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">Calendar notifications inform. Calendar alarms interrupt.</strong>{" "}
              A notification appears briefly and disappears on its own — no action required. An alarm stays
              on your screen and demands a response before it stops. Google Calendar and Outlook use
              notifications. OnTimer turns those events into alarms.
            </p>
          </div>
        </div>
      </section>

      {/* The Core Difference */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Core Difference
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Notification</p>
              <h3 className="text-xl font-black text-white">Informs you</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed text-sm">
                A notification appears at the top of your screen or in your notification tray. It
                stays for a few seconds, then disappears — whether or not you saw it, whether or
                not you acted on it. It has done its job simply by appearing.
              </p>
              <p className="mt-4 text-xs text-zinc-500">
                Used by: Google Calendar, Microsoft Outlook (native)
              </p>
            </div>
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-3">Alarm</p>
              <h3 className="text-xl font-black text-white">Interrupts you</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed text-sm">
                An alarm stays on your screen and continues alerting until you respond. Like your
                morning alarm clock — it does not stop because you happened to notice it. It stops
                because you made it stop. Action is required.
              </p>
              <p className="mt-4 text-xs text-green-500/70">
                Used by: OnTimer (for Google &amp; Outlook events)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Full Comparison
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
              <div className="px-5 py-4 text-sm font-semibold text-zinc-400">Feature</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-zinc-400">Notification</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-green-500">Alarm</div>
            </div>
            {fullComparison.map(({ dimension, notification, alarm }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-zinc-800 last:border-0">
                <div className="px-5 py-4 text-sm text-zinc-300">{dimension}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm text-center">
                  <span className={notification ? "text-white font-medium" : "text-zinc-600"}>
                    {notification ? "✓" : "✗"}
                  </span>
                </div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm text-center">
                  <span className={alarm ? "text-green-500 font-medium" : "text-zinc-600"}>
                    {alarm ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters for Meetings */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why This Matters for Meetings
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>
              If you miss a meeting, it probably wasn&apos;t because you forgot it existed. It was
              because the reminder fired, you were in the middle of something, you thought
              &ldquo;I&apos;ll join in a minute&rdquo; — and then you didn&apos;t.
            </p>
            <p>
              That gap between &ldquo;I see the reminder&rdquo; and &ldquo;I actually act on
              it&rdquo; is where notification-based reminders fail. They inform you. They don&apos;t
              make you do anything.
            </p>
            <p>
              Alarms close that gap. The meeting time is the meeting time. The alarm won&apos;t let
              you defer it.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/why-calendar-reminders-fail" className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              Read more: Why calendar reminders fail →
            </Link>
          </div>
        </div>
      </section>

      {/* What Google Calendar and Outlook Actually Send */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Google Calendar and Outlook Actually Send
          </h2>
          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-semibold text-white mb-2">Google Calendar</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Sends a push notification via the Google Calendar app or your device&apos;s notification
                system. It appears, shows the event name, and disappears. If your phone is face-down,
                on silent, or you&apos;re in Do Not Disturb, it may not even appear at all. There is no
                native option to make it persistent.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-semibold text-white mb-2">Microsoft Outlook / Microsoft 365</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Same behavior on iPhone. Outlook&apos;s mobile reminders are push notifications delivered
                through iOS. They disappear automatically. There is no built-in mechanism to make them
                persistent or to require acknowledgment.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/turn-calendar-events-into-alarms" className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              How to turn calendar events into real alarms →
            </Link>
          </div>
        </div>
      </section>

      {/* OnTimer Solution */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            OnTimer: Alarm Behavior for Google &amp; Outlook Events
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              OnTimer connects to your Google Calendar and Microsoft 365 / Outlook calendar and turns
              every event into a persistent alarm on iPhone — not a notification.
            </p>
            <p>
              When your meeting is about to start, the alarm fires. It stays on your screen.
              It doesn&apos;t disappear. It doesn&apos;t go away on its own. It waits for you to
              dismiss it, which means you have to actively acknowledge it before moving on.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
              <div className="px-5 py-4 text-sm font-semibold text-zinc-400">Scenario</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-zinc-400">Native Reminder</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-green-500">OnTimer</div>
            </div>
            {[
              ["Phone face-down", "Missed", "Alarm still fires"],
              ["In deep focus", "Notification ignored", "Alarm interrupts"],
              ["In another app", "Banner disappears", "Full-screen alarm"],
              ["On a call", "Silently missed", "Alarm queues"],
              ["Swiped away accidentally", "Lost", "Alarm persists"],
            ].map(([scenario, native, ontimer]) => (
              <div key={scenario} className="grid grid-cols-3 border-b border-zinc-800 last:border-0">
                <div className="px-5 py-4 text-sm text-zinc-300">{scenario}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm text-zinc-500">{native}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm font-medium text-white">{ontimer}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <AppStoreCTA location="notif_vs_alarms_solution" />
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

      {/* Related */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/calendar-alarm-app", label: "Best Calendar Alarm App for Google & Outlook" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/how-to-never-miss-a-meeting", label: "How to Never Miss a Meeting Again" },
              { href: "/adhd-time-blindness-tools", label: "ADHD Time Blindness Tools" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-green-500 hover:text-green-400 transition-colors text-sm">{label} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop relying on reminders that can be ignored.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            OnTimer turns your Google and Outlook calendar events into persistent alarms.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="notif_vs_alarms_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
