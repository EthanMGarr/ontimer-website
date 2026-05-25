import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Turn Google Calendar & Outlook Events Into Real Alarms",
  description:
    "Calendar notifications disappear. Real alarms interrupt you. Learn how to turn your Google or Outlook calendar events into persistent alarms that are impossible to miss.",
  alternates: { canonical: "https://www.ontimer.app/turn-calendar-events-into-alarms" },
  openGraph: {
    title: "Turn Google Calendar & Outlook Events Into Real Alarms",
    description:
      "Calendar notifications disappear. Real alarms interrupt you. Learn how to turn your Google or Outlook calendar events into persistent alarms.",
    url: "https://www.ontimer.app/turn-calendar-events-into-alarms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn Google Calendar & Outlook Events Into Real Alarms",
    description:
      "Calendar notifications disappear. Real alarms interrupt you. Learn how to turn your Google or Outlook calendar events into persistent alarms.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnTimer",
  operatingSystem: "iOS",
  applicationCategory: "ProductivityApplication",
  description:
    "OnTimer turns Google Calendar and Microsoft Outlook calendar events into persistent alarms on iPhone.",
  url: "https://ontimer.app/turn-calendar-events-into-alarms",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
};

const faqItems = [
  {
    question: "Can you turn Google Calendar events into alarms?",
    answer:
      "Not natively — Google Calendar only sends push notifications, which disappear automatically. OnTimer connects to Google Calendar and turns every event into a persistent alarm that stays on your screen until you dismiss it.",
  },
  {
    question: "Can you turn Outlook calendar events into alarms on iPhone?",
    answer:
      "Microsoft Outlook's built-in reminders are notifications, not alarms. OnTimer connects to Microsoft 365 and Outlook calendars and fires persistent alarms for every scheduled event, replacing dismissible notifications with interruptions that demand a response.",
  },
  {
    question: "What is the difference between a calendar notification and a calendar alarm?",
    answer:
      "A notification informs you — it appears briefly and disappears whether you act or not. An alarm interrupts you — it stays active and demands acknowledgment before it stops. For meetings that matter, you want alarm behavior, not notification behavior.",
  },
  {
    question: "Why do I miss meetings even when I have calendar reminders set?",
    answer:
      "Because calendar reminders are notifications, not alarms. They're easy to dismiss accidentally, they disappear on their own, and they compete with dozens of other notifications. If you're in deep work or hyperfocused, they fade into the background without registering.",
  },
  {
    question: "Does OnTimer work with both Google Calendar and Outlook?",
    answer:
      "Yes. OnTimer connects to Google Calendar (personal and Workspace) and Microsoft 365 / Outlook calendars. Multiple accounts from each provider are supported.",
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
      name: "Turn Calendar Events Into Alarms",
      item: "https://ontimer.app/turn-calendar-events-into-alarms",
    },
  ],
};

const comparisonRows = [
  ["Appears briefly, then disappears", "Stays on screen until dismissed"],
  ["Easy to miss in notification tray", "Interrupts whatever you're doing"],
  ["No action required to clear it", "Requires you to actively dismiss it"],
  ["Competes with texts, emails, social", "Takes priority over other alerts"],
  ["Built for awareness", "Built for action"],
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Turn Calendar Events Into Real Alarms",
            description: "Calendar notifications disappear. Real alarms interrupt you. Learn how to turn your Google or Outlook calendar events into persistent alarms that are impossible to miss.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/turn-calendar-events-into-alarms" },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Turn Calendar Events Into Alarms</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Calendar alarm app for Google &amp; Outlook
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            How to Turn Calendar Events Into Real Alarms
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Google Calendar and Outlook send notifications. Notifications disappear.
            Real alarms interrupt you and stay on screen until you act. OnTimer turns
            every event in your calendar into an alarm — automatically.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <AppStoreCTA location="turn_events_into_alarms_hero" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Works with Google Calendar &amp; Microsoft 365 / Outlook Calendar
          </p>
        </div>
      </section>

      {/* Direct Answer Block */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">To turn calendar events into real alarms:</strong> use OnTimer. It connects
              to your Google or Outlook calendar, detects every upcoming event, and fires a persistent alarm before
              each one — not a notification that disappears, but an alert that stays on your screen until you dismiss it.
              No manual setup per meeting. Your calendar is the source of truth.
            </p>
          </div>
        </div>
      </section>

      {/* Why Calendar Notifications Aren't Alarms */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Notifications Aren&apos;t Alarms
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>
              Google Calendar sends a push notification. Outlook sends a push notification. Both
              appear in your notification tray, compete with hundreds of other alerts, and vanish
              after a few seconds whether you saw them or not.
            </p>
            <p>
              This is fine for casual reminders. It is not reliable for meetings where showing up
              on time actually matters.
            </p>
            <p>
              The problem isn&apos;t that you forgot the meeting. The problem is that the alert
              fired and nothing forced you to act on it.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-6 py-4 text-sm font-semibold text-zinc-400">Calendar Notification</div>
              <div className="border-l border-zinc-800 px-6 py-4 text-sm font-semibold text-green-500">Calendar Alarm (OnTimer)</div>
            </div>
            {comparisonRows.map(([left, right], i) => (
              <div key={i} className="grid grid-cols-2 border-b border-zinc-800 last:border-0">
                <div className="px-6 py-4 text-sm text-zinc-400">{left}</div>
                <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Calendar Support */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Works With Google Calendar
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              OnTimer connects directly to Google Calendar — personal accounts and Google Workspace.
              Every event you have scheduled, across every connected Google account, gets an alarm.
            </p>
            <p>
              You don&apos;t create new events. You don&apos;t configure reminders. Google Calendar
              stays exactly as it is. OnTimer runs alongside it and fires the alarm at the right time.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Personal Gmail", "Google Workspace", "Multiple accounts"].map((item) => (
              <div key={item} className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-300">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Microsoft / Outlook Support */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Works With Microsoft 365 &amp; Outlook Calendar
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              OnTimer also connects to Microsoft 365 and Outlook calendars. If your work schedule
              lives in Outlook — Teams meetings, client calls, internal standups — OnTimer picks
              those up and fires alarms for them.
            </p>
            <p>
              For people juggling both a Google Calendar and an Outlook calendar, OnTimer consolidates
              both into a single alarm system. You see one set of alarms across all your events.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Microsoft 365", "Outlook Calendar", "Multiple accounts"].map((item) => (
              <div key={item} className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-300">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Turns Events Into Alarms
          </h2>
          <div className="mt-8 space-y-6">
            {[
              {
                n: 1,
                title: "Connect your calendars",
                body: "Link Google Calendar, Microsoft 365, or both. Takes under a minute. OAuth — OnTimer never stores your credentials.",
              },
              {
                n: 2,
                title: "OnTimer monitors your schedule",
                body: "In the background, OnTimer reads your upcoming events and schedules alarms for each one, based on your lead time preference.",
              },
              {
                n: 3,
                title: "A persistent alarm fires before each event",
                body: "When it's time, an alarm appears on your screen. It does not disappear automatically. It stays until you dismiss it.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">
                  {n}
                </div>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-1 text-zinc-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              No manual setup per meeting. No reminder configuration. Your calendar is the source of
              truth — OnTimer reads it, and turns every event into an alarm.
            </p>
          </div>
          <div className="mt-8">
            <AppStoreCTA location="turn_events_into_alarms_how_it_works" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free download · Works with Google &amp; Outlook calendars</p>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who This Is For
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "People who miss meetings despite reminders",
                body: "If you've seen a notification and still missed the meeting, the problem is the notification — not you. Alarms fix this.",
              },
              {
                title: "Remote workers without office cues",
                body: "Without hallway conversations or room bookings, there's nothing physical to remind you a meeting is starting. Alarms fill that gap.",
              },
              {
                title: "People with ADHD or time blindness",
                body: "Passive notifications don't break through hyperfocus. A persistent alarm that demands dismissal is a categorically different signal.",
              },
              {
                title: "Multi-calendar users",
                body: "If your schedule spans Google Calendar and Outlook, OnTimer consolidates both into one alarm system so nothing slips through.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
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
              { href: "/why-notifications-fail", label: "Why Notifications Fail (And Persistent Alarms Work Better)" },
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Notifications Fail" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/best-calendar-alarm-app", label: "Best Calendar Alarm App for Google & Outlook" },
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms: Why Most Reminders Fail" },
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
            Turn your calendar into an alarm system.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Free for iPhone. Works with Google Calendar and Microsoft Outlook.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="turn_events_into_alarms_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
