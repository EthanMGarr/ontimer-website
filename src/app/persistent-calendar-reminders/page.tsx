import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/persistent-calendar-reminders" },
  title: "How to Make Calendar Reminders Persistent",
  description:
    "Standard calendar reminders disappear after a few seconds. Persistent calendar reminders stay on screen until you act. Here's why the difference matters — and how to set it up.",
  openGraph: {
    title: "How to Make Calendar Reminders Persistent",
    description:
      "Standard calendar reminders disappear. Persistent reminders stay on screen until you act. Here's how to set them up for Google Calendar, Apple Calendar, and Outlook Calendar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Make Calendar Reminders Persistent",
    description:
      "Standard calendar reminders disappear. Persistent reminders stay on screen until you act.",
  },
};

const faqItems = [
  {
    question: "How do I make Google Calendar reminders persistent?",
    answer:
      "Google Calendar doesn't natively support persistent reminders — its alerts are push notifications that disappear automatically. To get persistent reminders for Google Calendar events on iPhone, use OnTimer: it connects to your Google Calendar and fires a persistent alarm for every event that stays on your screen until dismissed.",
  },
  {
    question: "How do I make Outlook calendar reminders persistent on iPhone?",
    answer:
      "Outlook Calendar's native iPhone reminders are standard push notifications. OnTimer connects to your Outlook Calendar and replaces those with persistent alarms that don't disappear until you actively dismiss them.",
  },
  {
    question: "What is a persistent calendar reminder?",
    answer:
      "A persistent calendar reminder stays on your screen and continues alerting you until you respond — unlike a standard notification, which disappears automatically after a few seconds regardless of whether you saw it or acted on it.",
  },
  {
    question: "Why do calendar reminders keep getting ignored?",
    answer:
      "Because they're notifications, not alarms. Notifications are designed to inform without interrupting. If you're focused on something else, notifications fade into the background. A persistent reminder demands acknowledgment — it doesn't stop until you tell it to.",
  },
  {
    question: "Can I get loud, persistent calendar alerts on iPhone?",
    answer:
      "Yes. OnTimer turns Google Calendar, Apple Calendar, and Outlook Calendar events into loud, persistent alarms on iPhone. They use your system alarm sound, stay on screen until dismissed, and can override silent mode for critical events.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Make Calendar Reminders Persistent",
  description:
    "Standard calendar reminders disappear after a few seconds. Persistent calendar reminders stay on screen until you act. Here's why the difference matters and how to set it up.",
  author: { "@type": "Organization", name: "OnTimer" },
  publisher: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
  datePublished: "2026-04-01",
  dateModified: "2026-06-01",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/persistent-calendar-reminders" },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnTimer",
  operatingSystem: "iOS",
  applicationCategory: "ProductivityApplication",
  applicationSubCategory: "Calendar Alarm App",
  description:
    "OnTimer is a calendar alarm app for iPhone that turns Google Calendar, Apple Calendar, and Microsoft Outlook Calendar events into persistent alarms — alerts that stay on your screen until dismissed.",
  url: "https://ontimer.app/persistent-calendar-reminders",
  keywords: "persistent calendar reminders, persistent calendar alarms, calendar alarm app, Google Calendar alarm, Outlook persistent reminder",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "OnTimer", url: "https://ontimer.app" },
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
      name: "Persistent Calendar Reminders",
      item: "https://ontimer.app/persistent-calendar-reminders",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
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
            <span className="text-zinc-300">Persistent Calendar Reminders</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
            Google Calendar · Apple Calendar · Outlook Calendar · iPhone
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight">
            How to Make Calendar Reminders Persistent
          </h1>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Standard calendar reminders are designed to disappear. A persistent reminder stays on
            your screen — loud and visible — until you acknowledge it. Here&apos;s what that
            distinction means and how to actually set it up.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <AppStoreCTA location="persistent_reminders_hero" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Works with Google Calendar · Apple Calendar · Outlook Calendar</p>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-500 mb-3">Direct Answer</p>
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-white">Google Calendar, Apple Calendar, and Outlook Calendar don&apos;t support persistent reminders natively.</strong>{" "}
              Their alerts are push notifications that vanish automatically. To get persistent calendar
              reminders on iPhone, use OnTimer — it connects to Google Calendar, Apple Calendar, or Outlook Calendar and fires
              an alarm for each event that stays on screen until you dismiss it.
            </p>
          </div>
        </div>
      </section>

      {/* What "Persistent" Actually Means */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What &ldquo;Persistent&rdquo; Actually Means
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>
              A standard calendar reminder fires once and disappears. It appears in your notification
              tray for a few seconds, and then it&apos;s gone — whether you saw it or not. Whether
              you acted on it or not. Whether you were even looking at your phone or not.
            </p>
            <p>
              A <strong className="text-white">persistent reminder</strong> works differently. It stays on
              your screen. It keeps alerting. It does not go away until you actively dismiss it.
            </p>
            <p>
              This is the same behavior as your morning alarm clock. You don&apos;t wake up because
              you happened to notice a notification. You wake up because something won&apos;t stop
              until you turn it off.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-6 py-4 text-sm font-semibold text-zinc-400">Standard Reminder</div>
              <div className="border-l border-zinc-800 px-6 py-4 text-sm font-semibold text-green-500">Persistent Reminder</div>
            </div>
            {[
              ["Disappears automatically", "Stays until dismissed"],
              ["No response required", "Requires active acknowledgment"],
              ["Fades into notification tray", "Stays on your lock screen or in-app"],
              ["Easy to miss in deep work", "Interrupts regardless of what you're doing"],
              ["One alert, then silence", "Continues until you respond"],
            ].map(([left, right], i) => (
              <div key={i} className="grid grid-cols-2 border-b border-zinc-800 last:border-0">
                <div className="px-6 py-4 text-sm text-zinc-400">{left}</div>
                <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Default Reminders Fail */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why Default Calendar Reminders Fail
          </h2>
          <div className="mt-6 space-y-4 text-lg text-zinc-400 leading-relaxed">
            <p>
              Google Calendar, Apple Calendar, and Outlook Calendar use the same notification pattern as every
              other app on your phone. Your calendar reminder is competing with Messages, email,
              Slack, social media, and whatever else fires that day.
            </p>
            <p>
              In that environment, a single banner notification that appears for a few seconds
              doesn&apos;t stand out. Especially when you&apos;re focused. Especially when you&apos;re in the
              middle of something. Especially when you&apos;ve seen dozens of notifications already
              and your brain has learned to filter them out.
            </p>
            <p>
              You don&apos;t need more reminders. You need one that won&apos;t let you ignore it.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/calendar-notifications-vs-alarms" className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              Read more: Calendar notifications vs alarms — the full breakdown →
            </Link>
          </div>
        </div>
      </section>

      {/* How OnTimer Provides Persistence */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer Provides Persistent Reminders
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              OnTimer is a{" "}
              <Link href="/calendar-alarm-app" className="text-green-500 hover:text-green-400">
                calendar alarm app
              </Link>{" "}
              for iPhone. It connects to Google Calendar, Apple Calendar, and Outlook Calendar
              and reads your schedule to fire a persistent alarm before each event.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            {[
              {
                title: "Stays on screen until dismissed",
                body: "Unlike a notification, the alarm occupies your full screen and requires an explicit dismiss action before it goes away.",
              },
              {
                title: "Fires for every calendar event automatically",
                body: "You don't configure reminders per meeting. OnTimer monitors your connected calendars and fires alarms automatically.",
              },
              {
                title: "Works with Google Calendar, Apple Calendar, and Outlook Calendar",
                body: "Connect one or both. OnTimer handles both Google and Microsoft accounts, including multiple accounts per provider.",
              },
              {
                title: "Adjustable lead time",
                body: "Set how far in advance you want the alarm — 5 minutes, 15 minutes, 30 minutes. Works for your workflow.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <AppStoreCTA location="persistent_reminders_how_it_works" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Free · iPhone · Google Calendar · Apple Calendar · Outlook Calendar</p>
        </div>
      </section>

      {/* For ADHD */}
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Especially Important for ADHD and Time Blindness
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              For people with ADHD or time blindness, a passive notification has almost no chance of
              breaking through hyperfocus. You see it — or you don&apos;t — and either way it
              disappears, and the meeting starts without you.
            </p>
            <p>
              A persistent alarm is categorically different. It doesn&apos;t ask for your attention.
              It takes it. That&apos;s the signal strength needed to interrupt a focused state.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/adhd-time-blindness-tools" className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
              ADHD time blindness tools →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16 sm:py-20">
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
      <section className="border-t border-zinc-800 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related Guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/why-calendar-notifications-fail", label: "Why Calendar Notifications Fail (And What Actually Works)" },
              { href: "/calendar-notifications-not-working", label: "Calendar Notifications Not Working? Why Reminders Fail — and What Fixes It" },
              { href: "/why-notifications-fail", label: "Why Notifications Fail (And Persistent Alarms Work Better)" },
              { href: "/last-5-minutes-problem", label: "The Last 5 Minutes Problem: Why Notifications Fail" },
              { href: "/turn-calendar-events-into-alarms", label: "How to Turn Calendar Events Into Real Alarms" },
              { href: "/calendar-notifications-vs-alarms", label: "Calendar Notifications vs Alarms: Why Most Reminders Fail" },
              { href: "/best-calendar-alarm-app", label: "Best Calendar Alarm App for iPhone Calendars" },
              { href: "/why-calendar-reminders-fail", label: "Why Calendar Reminders Fail" },
              { href: "/adhd-time-blindness-tools", label: "ADHD Time Blindness Tools" },
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
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Reminders that won&apos;t let you ignore them.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and replace dismissible notifications with persistent alarms.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="persistent_reminders_final_cta" />
          </div>
          <p className="mt-3 text-sm text-zinc-500">Free · Google Calendar · Apple Calendar · Outlook Calendar</p>
        </div>
      </section>
    </>
  );
}
