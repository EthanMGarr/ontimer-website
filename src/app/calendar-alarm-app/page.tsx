import type { Metadata } from "next";
import Link from "next/link";
import { AndroidWaitlistButton, AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Calendar Alarm App for iPhone — What It Is and How It Works",
  description:
    "A calendar alarm app turns your Google Calendar and Outlook events into alarms requiring acknowledgment — not passive notifications that disappear. Here's what OnTimer does and why it works.",
  alternates: { canonical: "https://www.ontimer.app/calendar-alarm-app" },
  openGraph: {
    title: "Calendar Alarm App for iPhone — What It Is and How It Works",
    description:
      "A calendar alarm app turns your Google Calendar and Outlook events into alarms requiring acknowledgment — not passive notifications that disappear.",
    url: "https://www.ontimer.app/calendar-alarm-app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar Alarm App for iPhone — What It Is and How It Works",
    description:
      "A calendar alarm app turns your Google Calendar and Outlook events into alarms requiring acknowledgment — not passive notifications that disappear.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnTimer",
  operatingSystem: "iOS",
  applicationCategory: "ProductivityApplication",
  applicationSubCategory: "Calendar Alarm App",
  description:
    "OnTimer is a calendar alarm app for iPhone. It connects to Google Calendar and Microsoft Outlook and turns every event into a persistent alarm — not a notification that disappears.",
  url: "https://ontimer.app/calendar-alarm-app",
  keywords: "calendar alarm app, turn calendar events into alarms, persistent calendar alarms, Google Calendar alarm, Outlook calendar alarm, meeting alarm app, never miss meetings iPhone",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
};

const faqItems = [
  {
    question: "What is a calendar alarm app?",
    answer:
      "A calendar alarm app turns your existing calendar events into persistent alarms — not passive notifications. Instead of a banner that disappears, you get an alert that stays on your screen until you dismiss it, similar to how your morning alarm works.",
  },
  {
    question: "Does OnTimer work with Google Calendar?",
    answer:
      "Yes. OnTimer connects directly to Google Calendar — personal Gmail accounts and Google Workspace. Every event in your Google Calendar automatically gets a persistent alarm. No manual setup per event required.",
  },
  {
    question: "Does OnTimer work with Microsoft Outlook or Microsoft 365?",
    answer:
      "Yes. OnTimer connects to Microsoft 365 and Outlook calendars. Work calendars, Teams meetings, and personal Outlook events all get persistent alarms. Multiple Microsoft accounts are supported.",
  },
  {
    question: "What's the difference between a calendar notification and a calendar alarm?",
    answer:
      "A notification appears briefly and disappears automatically — whether you act on it or not. An alarm stays on your screen until you explicitly dismiss it. Google Calendar and Outlook send notifications. OnTimer turns those events into alarms.",
  },
  {
    question: "Can OnTimer work with both Google Calendar and Outlook at the same time?",
    answer:
      "Yes. OnTimer supports multiple connected calendars simultaneously — you can link Google Calendar and Microsoft 365 at the same time, and alarms will fire for events from both.",
  },
  {
    question: "Who benefits most from a calendar alarm app?",
    answer:
      "People who miss meetings despite having reminders set. Remote workers without physical office cues. People with ADHD or time blindness who need stronger transition signals. Anyone managing multiple calendars across Google and Microsoft.",
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
    { "@type": "ListItem", position: 2, name: "Calendar Alarm App", item: "https://ontimer.app/calendar-alarm-app" },
  ],
};

const notificationProblems = [
  { problem: "They disappear automatically", detail: "A notification banner vanishes after a few seconds whether you act on it or not." },
  { problem: "They can be dismissed by accident", detail: "A quick swipe and the reminder is gone — even if you didn't consciously decide to ignore it." },
  { problem: "They compete with everything else", detail: "Your phone shows dozens of notifications per day. Calendar reminders don't stand out." },
  { problem: "They don't interrupt deep work", detail: "When you're focused, notifications fade into the background — especially with Focus mode on." },
];

const whoNeedsAlarms = [
  { title: "Professionals with back-to-back meetings", body: "When every hour is scheduled, a single missed transition derails the rest of the day." },
  { title: "Remote workers", body: "Without the physical cues of an office environment, it's easier to lose track of time." },
  { title: "People with ADHD or time blindness", body: "Passive notifications often aren't strong enough to break through hyperfocus or time distortion." },
  { title: "Executives and salespeople", body: "High-stakes meetings require showing up prepared and on time — every time." },
  { title: "Anyone managing multiple calendars", body: "When Google Calendar and Outlook events are spread across accounts, it's easy for something to slip through." },
];

export default function CalendarAlarmApp() {
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
            headline: "Best Calendar Alarm App for Google & Outlook (iPhone)",
            description: "OnTimer is a calendar alarm app for iPhone that turns Google Calendar and Microsoft Outlook events into persistent alarms — not notifications that disappear.",
            author: { "@type": "Organization", name: "OnTimer" },
            publisher: { "@type": "Organization", name: "OnTimer" },
            datePublished: "2026-04-01",
            dateModified: "2026-05-11",
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/calendar-alarm-app" },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            iPhone · Google Calendar &amp; Microsoft Outlook
          </p>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl leading-tight">
            Calendar Alarm App for{" "}
            <span className="text-green-500">Google &amp; Outlook</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Google Calendar and Outlook send notifications. Notifications disappear whether or
            not you act on them. A calendar alarm app does something different: it fires an
            alert that demands a response before it stops. OnTimer is that app — it connects
            to your existing calendars and fires an interruptive alarm for every event,
            automatically.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreCTA location="calendar_alarm_app_hero" />
            <AndroidWaitlistButton size="lg" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · Works with Google Calendar &amp; Microsoft 365 / Outlook</p>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">A calendar alarm app bridges the gap between your schedule and being interrupted at the right moment.</strong>{" "}
              Unlike a calendar notification — which informs without interrupting — a calendar alarm requires
              acknowledgment before it stops. OnTimer connects to Google Calendar and Outlook and fires these
              high-attention alarms automatically for every event, with no per-event setup.
            </p>
          </div>
        </div>
      </section>

      {/* What Is a Calendar Alarm App */}
      <section className="border-t border-zinc-800 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Is a Calendar Alarm App?
          </h2>
          <p className="mt-5 text-zinc-400 leading-relaxed">
            A calendar alarm app is a mobile app that connects to your existing calendar and converts
            upcoming events into persistent, interruptive alarms — not the passive push notifications
            that Google Calendar and Outlook send by default.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Standard calendar notifications are designed to inform without interrupting. They appear
            briefly at the top of your screen and then disappear — whether or not you saw them, whether
            or not you acted. A calendar alarm works differently: it stays on your screen, plays audio,
            and demands an explicit response before it stops.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            OnTimer is a calendar alarm app for iPhone. It connects to Google Calendar and Microsoft
            Outlook and fires a persistent alarm before every scheduled event automatically — with no
            per-event setup required. Your calendar is the source of truth; OnTimer makes sure you
            can&apos;t ignore it.
          </p>
        </div>
      </section>

      {/* Google + Microsoft Support */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Works With Your Existing Calendars
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            You don&apos;t switch calendars. You don&apos;t re-enter events. OnTimer connects to
            where your schedule already lives.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white text-lg">Google Calendar</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Connect personal Gmail, Google Workspace, or both. Every event across all linked Google
                accounts gets an alarm automatically. Nothing to configure per event.
              </p>
              <ul className="mt-4 space-y-1">
                {["Personal Gmail", "Google Workspace", "Multiple accounts"].map((i) => (
                  <li key={i} className="text-xs text-zinc-500 flex gap-2"><span className="text-green-500">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white text-lg">Microsoft 365 &amp; Outlook</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Connect your work Microsoft 365 account or personal Outlook calendar. Teams meetings,
                client calls, internal standups — all covered.
              </p>
              <ul className="mt-4 space-y-1">
                {["Microsoft 365", "Outlook Calendar", "Multiple accounts"].map((i) => (
                  <li key={i} className="text-xs text-zinc-500 flex gap-2"><span className="text-green-500">✓</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Notifications Aren't Enough */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Calendar Notifications Aren&apos;t Enough
          </h2>
          <p className="mt-4 text-zinc-400">
            Standard calendar reminders — from Google Calendar, Outlook, or built-in iOS calendars —
            are delivered as notifications. And notifications have a fundamental limitation:
          </p>
          <div className="mt-6 space-y-4">
            {notificationProblems.map((item) => (
              <div key={item.problem} className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
                <p className="font-semibold text-white">{item.problem}</p>
                <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-3 text-sm text-zinc-400">
            <strong className="text-zinc-300">The core problem:</strong> notifications are designed to inform without interrupting. For time-critical events, that design is backwards.
          </div>
          <div className="mt-4 space-y-2">
            <Link href="/why-calendar-notifications-fail" className="block text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              Why calendar notifications fail — the full explanation →
            </Link>
            <Link href="/calendar-notifications-vs-alarms" className="block text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              Calendar notifications vs alarms →
            </Link>
          </div>
        </div>
      </section>

      {/* Notification vs Alarm Table */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The Difference Between Reminders and Alarms
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              A <strong className="text-white">reminder</strong> informs you. It appears, you
              acknowledge it (or don&apos;t), and it goes away.
            </p>
            <p>
              An <strong className="text-white">alarm</strong> demands action. It continues alerting
              until you respond. For meetings that matter, you want alarm behavior.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-6 py-4 text-sm font-semibold text-zinc-400">Calendar Notification</div>
              <div className="border-l border-zinc-800 px-6 py-4 text-sm font-semibold text-green-500">OnTimer Alarm</div>
            </div>
            {[
              ["Disappears automatically", "Stays until dismissed"],
              ["Passive — no action required", "Active — requires response"],
              ["Easy to miss", "Hard to miss"],
              ["Competes with other notifications", "Interrupts regardless of focus"],
              ["Built into Google / Outlook natively", "Works alongside your existing calendars"],
            ].map(([left, right], i) => (
              <div key={i} className="grid grid-cols-2 border-b border-zinc-800 last:border-0">
                <div className="px-6 py-4 text-sm text-zinc-400">{left}</div>
                <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who Benefits From a Calendar Alarm App
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {whoNeedsAlarms.map((item) => (
              <div key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Turns Your Calendar Into an Alarm System
          </h2>
          <div className="mt-8 space-y-6">
            {[
              { n: 1, title: "Connects to your calendar", body: "Links to Google Calendar and Microsoft Outlook — including multiple accounts." },
              { n: 2, title: "Monitors your schedule", body: "Automatically detects upcoming events and prepares alarms in advance." },
              { n: 3, title: "Fires an interruptive alarm", body: "Before each meeting, triggers an alarm that stays on your screen and requires an explicit dismiss or snooze before it stops." },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">{n}</div>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-1 text-zinc-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-400 leading-relaxed">
            No manual event entry. No configuration per meeting. Your calendar is the source of truth
            — OnTimer just makes sure you can&apos;t ignore it.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="calendar_alarm_app_how_it_works" />
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/features" className="text-sm font-semibold text-green-500 hover:text-green-400">See all features →</Link>
            <Link href="/how-it-works" className="text-sm font-semibold text-green-500 hover:text-green-400">How it works →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
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

      {/* Related */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/why-calendar-notifications-fail", label: "Why Calendar Notifications Fail (And What Actually Works)" },
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/persistent-calendar-reminders", label: "How to Make Calendar Reminders Persistent" },
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/how-to-never-miss-a-meeting", label: "How to Never Miss a Meeting Again" },
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
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Try OnTimer</h2>
          <p className="mt-4 text-lg text-zinc-400">
            Replace passive notifications with alarms that actually work. Free download for iPhone.
            Works with Google Calendar and Microsoft Outlook.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreCTA location="calendar_alarm_app_final_cta" />
          </div>
          <p className="mt-6 text-sm text-zinc-400">
            Android coming soon —{" "}
            <Link href="/android" className="text-green-500 hover:text-green-400">join the waitlist.</Link>
          </p>
        </div>
      </section>
    </>
  );
}
