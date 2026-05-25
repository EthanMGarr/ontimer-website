import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Best Calendar Alarm App for Google & Outlook Calendars",
  description:
    "OnTimer turns Google and Outlook calendar events into persistent alarms you can't ignore. Never miss meetings, appointments, flights, or medication reminders again.",
  alternates: { canonical: "https://www.ontimer.app/best-calendar-alarm-app" },
  openGraph: {
    title: "Best Calendar Alarm App for Google & Outlook Calendars",
    description:
      "OnTimer turns Google and Outlook calendar events into persistent alarms you can't ignore. Never miss meetings, appointments, or medication reminders again.",
    url: "https://www.ontimer.app/best-calendar-alarm-app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Calendar Alarm App for Google & Outlook Calendars",
    description:
      "OnTimer turns Google and Outlook calendar events into persistent alarms you can't ignore. Never miss meetings, appointments, or medication reminders again.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnTimer",
  operatingSystem: "iOS",
  applicationCategory: "ProductivityApplication",
  description:
    "OnTimer is a calendar alarm app for iPhone that turns Google Calendar and Microsoft Outlook events into persistent alarms — alerts that stay on your screen until dismissed.",
  url: "https://ontimer.app/best-calendar-alarm-app",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
};

const faqItems = [
  {
    question: "What is the best calendar alarm app for iPhone?",
    answer:
      "OnTimer is designed specifically to be a calendar alarm app for iPhone. It connects to Google Calendar and Microsoft Outlook and turns every event into a persistent alarm — not a passive notification. The alarm stays on your screen until you dismiss it, which is the key difference from standard calendar reminders.",
  },
  {
    question: "Can I get persistent alarms for Google Calendar events on iPhone?",
    answer:
      "Not natively — Google Calendar only sends push notifications that disappear after a few seconds. OnTimer connects to Google Calendar and turns every event into a persistent alarm that stays on your screen until you actively dismiss it.",
  },
  {
    question: "Can I get calendar alarms for Microsoft Outlook on iPhone?",
    answer:
      "Microsoft Outlook's native iPhone reminders are push notifications, not alarms. OnTimer connects to Microsoft 365 and Outlook and fires persistent alarms for every calendar event — they don't disappear until you dismiss them.",
  },
  {
    question: "What is the difference between a calendar notification and a calendar alarm?",
    answer:
      "A notification informs you — it appears briefly and disappears automatically, whether or not you act on it. A calendar alarm interrupts you — it stays active and requires your response before it stops. For important events where missing the window has real consequences, alarm behavior is what actually works.",
  },
  {
    question: "Does OnTimer work with both Google Calendar and Outlook at the same time?",
    answer:
      "Yes. OnTimer supports multiple connected calendars simultaneously — link Google Calendar and Microsoft 365/Outlook at the same time, and persistent alarms fire for events from both. Multiple accounts from each provider are supported.",
  },
  {
    question: "Who benefits most from a calendar alarm app?",
    answer:
      "Anyone who misses meetings or arrives late despite having reminders set. Remote workers without physical office cues. People with ADHD or time blindness who need stronger transition signals. Caregivers managing medication schedules. Frequent travelers who need to leave for airports on time.",
  },
  {
    question: "Is OnTimer free?",
    answer:
      "OnTimer is free to download. The core calendar alarm functionality — persistent alarms for all your calendar events — is free. Time To Leave alerts, which calculate when to leave based on travel time and traffic, are a paid feature.",
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
      name: "Best Calendar Alarm App",
      item: "https://ontimer.app/best-calendar-alarm-app",
    },
  ],
};

const comparisonRows = [
  { feature: "Alert type", standard: "Push notification", ontimer: "Persistent alarm" },
  { feature: "Disappears automatically", standard: "Yes (seconds)", ontimer: "No — stays until dismissed" },
  { feature: "Works when phone face-down", standard: "Often missed", ontimer: "Alarm fires regardless" },
  { feature: "Overrides silent mode", standard: "No", ontimer: "Optional (critical events)" },
  { feature: "Requires active dismissal", standard: "No", ontimer: "Yes" },
  { feature: "Google Calendar support", standard: "Notifications only", ontimer: "Persistent alarms" },
  { feature: "Outlook / Microsoft 365", standard: "Notifications only", ontimer: "Persistent alarms" },
  { feature: "Time To Leave alerts", standard: "Not available", ontimer: "Available (paid feature)" },
];

const whoCards = [
  {
    title: "Remote workers",
    description: "No office cues, no hallway conversations to prompt you. Calendar alarms provide the interruption that an open-office environment used to give you automatically.",
  },
  {
    title: "People with ADHD or time blindness",
    description: "Time blindness makes the gap between \"I'll wrap up\" and \"I'm late\" feel invisible. Persistent alarms interrupt regardless of whether you registered the time passing.",
  },
  {
    title: "Caregivers managing medication",
    description: "Medication timing requires the same reliable interruption. Passive reminders are easy to defer. Persistent alarms make \"I'll take it in a minute\" harder to accidentally forget.",
  },
  {
    title: "Frequent travelers",
    description: "Flight timing, airport departure, hotel checkout. When the window closes, there's no catching up. A persistent alarm for each calendar event means the deadline is harder to miss.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-zinc-300">Best Calendar Alarm App</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Google Calendar &amp; Microsoft Outlook · iPhone
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            Best Calendar Alarm App<br className="hidden sm:block" />
            <span className="text-zinc-400"> for Google &amp; Outlook</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Google Calendar sends notifications. Outlook sends notifications. Neither sends alarms.
            OnTimer is a free iPhone app that fixes this — it connects to your calendar and turns
            every event into a persistent alarm you can&rsquo;t swipe away and forget.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AppStoreCTA location="best_alarm_app_hero" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar &amp; Microsoft Outlook</p>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">OnTimer is a free iPhone app that turns Google Calendar and Outlook events into persistent alarms.</strong>{" "}
              Unlike standard calendar notifications, which disappear automatically, OnTimer alarms stay on your screen until you dismiss them.
              It works with Google Calendar (personal and Workspace), Microsoft 365, and Outlook — and fires alarms
              automatically for every event, with no per-event setup required.
            </p>
          </div>
        </div>
      </section>

      {/* Why Calendar Notifications Fail */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Notifications Fail
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Google Calendar and Microsoft Outlook both use the same mechanism for reminders: push
              notifications. They appear briefly at the top of your screen and then disappear —
              whether you saw them, acted on them, or missed them entirely.
            </p>
            <p>
              <strong className="text-white">Notifications require attention.</strong> If you&rsquo;re
              focused on something else, they vanish before registering. If your phone is face-down or
              in your bag, they&rsquo;re gone. If you&rsquo;re in Do Not Disturb, they never appear
              at all.
            </p>
            <p>
              This is why people miss meetings and appointments despite having reminders set. The
              reminder existed. The notification fired. The execution gap between{" "}
              <em>seeing a reminder</em> and <em>acting on it before the window closes</em> is where
              things fall apart.
            </p>
            <p>
              This is called the{" "}
              <Link href="/last-5-minutes-problem" className="text-green-500 hover:text-green-400">
                Last 5 Minutes Problem
              </Link>
              . The solution isn&rsquo;t more notifications — it&rsquo;s alarms.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/calendar-notifications-vs-alarms"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              Read more: Calendar notifications vs alarms explained →
            </Link>
          </div>
        </div>
      </section>

      {/* Reminders vs Alarms */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Reminders vs Alarms: The Core Difference
          </h2>
          <p className="mt-5 text-zinc-400 leading-relaxed">
            The distinction matters more than it sounds.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-black text-white mb-3">Calendar Reminder (Notification)</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Appears, then disappears automatically</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>No response required to clear it</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Easy to dismiss or swipe away</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Competes with all other app alerts</li>
                <li className="flex items-start gap-2"><span className="text-zinc-600 mt-0.5">—</span>Passive by design</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <h3 className="text-lg font-black text-white mb-3">Calendar Alarm (OnTimer)</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Stays on screen until you dismiss it</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Active response required to clear</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Interrupts regardless of what you&rsquo;re doing</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Works during deep focus and context switching</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Designed to interrupt, not inform</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/persistent-calendar-reminders"
              className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium"
            >
              How to make calendar reminders persistent →
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            OnTimer vs Standard Calendar Reminders
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900">
              <div className="px-5 py-4 text-sm font-semibold text-zinc-400">Feature</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-zinc-400">Standard Calendar</div>
              <div className="border-l border-zinc-800 px-5 py-4 text-sm font-semibold text-green-500">OnTimer</div>
            </div>
            {comparisonRows.map(({ feature, standard, ontimer }) => (
              <div key={feature} className="grid grid-cols-3 border-b border-zinc-800 last:border-0">
                <div className="px-5 py-4 text-sm text-zinc-300">{feature}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm text-zinc-500">{standard}</div>
                <div className="border-l border-zinc-800 px-5 py-4 text-sm font-medium text-white">{ontimer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Helps */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who This Helps
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            OnTimer is useful for anyone who relies on a calendar but has found that standard
            notifications aren&rsquo;t reliable enough for high-stakes moments.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {whoCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Turn Your Calendar Into a Meeting Alarm
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Connect OnTimer to your Google Calendar or Outlook. Every event gets a persistent alarm
              — automatically. No per-event setup required. No new calendar to manage. Your existing
              schedule becomes your alarm schedule.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Works with Google Calendar (personal + Workspace)",
                "Works with Microsoft 365 / Outlook",
                "Multiple accounts supported simultaneously",
                "Persistent alarms that stay until dismissed",
                "Optional Time To Leave alerts based on travel time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <AppStoreCTA location="best_alarm_app_features" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free download · iPhone</p>
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
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms: Why Most Reminders Fail" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Notifications Fail" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/never-be-late-to-meetings", label: "How to Never Be Late to Meetings" },
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
            Stop missing meetings.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and turn your Google Calendar and Outlook events into persistent alarms
            that actually get your attention.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="best_alarm_app_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
