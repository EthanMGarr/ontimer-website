import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AndroidWaitlistButton, AppStoreCTA } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Turn Calendar Events Into Real Alarms",
  description:
    "Google, Apple and Outlook calendars only send notifications. Here's how to make every calendar event ring like an alarm on iPhone — automatically, with no per-event setup.",
  alternates: { canonical: "https://www.ontimer.app/turn-calendar-events-into-alarms" },
  openGraph: {
    title: "Turn Calendar Events Into Real Alarms",
    description:
      "Calendar apps only send notifications. Make every Google, Apple or Outlook calendar event ring like an alarm on iPhone — automatically.",
    url: "https://www.ontimer.app/turn-calendar-events-into-alarms",
    images: [{ url: "https://www.ontimer.app/images/homepage2/persistent-alarm-v4.png", width: 853, height: 1844 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn Calendar Events Into Real Alarms",
    description:
      "Calendar apps only send notifications. Make every Google, Apple or Outlook calendar event ring like an alarm on iPhone — automatically.",
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
    "OnTimer turns Google Calendar, Apple Calendar, and Outlook Calendar events into alarms on iPhone that stay on screen until you stop them.",
  url: "https://www.ontimer.app/turn-calendar-events-into-alarms",
  screenshot: "https://www.ontimer.app/images/homepage2/persistent-alarm-v4.png",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Turn Calendar Events Into Alarms on iPhone",
  description:
    "Make Google Calendar, Apple Calendar, and Outlook Calendar events ring like alarms on iPhone using OnTimer.",
  step: [
    {
      "@type": "HowToStep",
      name: "Install OnTimer and connect your calendar",
      text: "Install OnTimer free from the App Store and connect Google Calendar, Outlook Calendar, or Apple Calendar. Access is read-only; OnTimer never changes your events.",
    },
    {
      "@type": "HowToStep",
      name: "Let OnTimer create the alarms",
      text: "OnTimer reads your upcoming events and schedules an alarm for each one automatically. There is nothing to set up per event.",
    },
    {
      "@type": "HowToStep",
      name: "Adjust any event",
      text: "Open an event to change how many minutes before it rings, pick a different sound, or turn its alarm off.",
    },
  ],
};

const faqItems = [
  {
    question: "Can you add an alarm to a Google Calendar event?",
    answer:
      "Not inside Google Calendar. Its reminders are notifications: a banner and a sound that disappear on their own. On iPhone, OnTimer connects to Google Calendar and makes each event ring as an alarm that stays on screen until you slide to stop it.",
  },
  {
    question: "Can you set an alarm for an Apple Calendar event on iPhone?",
    answer:
      "Apple Calendar's Alert setting sends a notification, not an alarm. The only built-in workaround is to create a separate Clock alarm for every event by hand and update it whenever the meeting moves. OnTimer does that automatically from your calendar.",
  },
  {
    question: "Can you turn Outlook calendar events into alarms on iPhone?",
    answer:
      "Outlook's reminders are notifications too. OnTimer connects to Outlook Calendar, including work and school accounts, and turns upcoming events into alarms.",
  },
  {
    question: "Is OnTimer free?",
    answer:
      "Yes. OnTimer is free and includes automatic alarms for one calendar provider. OnTimer Pro adds multiple calendar providers, Time To Leave, Early Warning, and additional controls.",
  },
  {
    question: "Does OnTimer work on Android?",
    answer:
      "Not yet. OnTimer is available for iPhone. Android users can join the waitlist to hear when it launches.",
  },
  {
    question: "What is the difference between a calendar notification and a calendar alarm?",
    answer:
      "A notification appears briefly and disappears whether you act or not. An alarm keeps sounding and stays on screen until you stop it. For meetings that matter, you want alarm behavior.",
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Turn Calendar Events Into Alarms",
      item: "https://www.ontimer.app/turn-calendar-events-into-alarms",
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Turn Calendar Events Into Real Alarms",
  description:
    "Google, Apple and Outlook calendars only send notifications. Here's how to make every calendar event ring like an alarm on iPhone.",
  author: { "@type": "Organization", name: "OnTimer" },
  publisher: { "@type": "Organization", name: "OnTimer" },
  datePublished: "2026-04-01",
  dateModified: "2026-10-30",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ontimer.app/turn-calendar-events-into-alarms" },
};

const nativeOptions = [
  {
    calendar: "Google Calendar",
    native: "Notification only. Banner and sound, then it's gone.",
  },
  {
    calendar: "Apple Calendar",
    native: "“Alert” is a notification. A real alarm means a separate Clock alarm you set by hand.",
  },
  {
    calendar: "Outlook Calendar",
    native: "Reminder notification. Same banner, same tray.",
  },
];

const comparisonRows = [
  ["Banner for a few seconds", "Full-screen alarm until you slide to stop"],
  ["Same sound as every other app", "Alarm sound you choose, per event if you want"],
  ["Lands in the tray with texts and email", "Interrupts whatever you're doing"],
  ["Easy to swipe away without reading", "Takes a deliberate slide to stop"],
  ["One reminder per event, set by hand", "Every event gets an alarm automatically"],
];

const steps = [
  {
    title: "Connect your calendar",
    body: "Google, Outlook, or Apple Calendar. Read-only — OnTimer never changes your events. Takes about a minute.",
    image: "/images/homepage2/calendar-connections-v2.png",
    alt: "OnTimer screen for connecting Google, Outlook, and Apple calendars",
  },
  {
    title: "Every event gets an alarm",
    body: "OnTimer reads what's coming up and schedules an alarm for each event. Meeting moved? The alarm moves with it.",
    image: "/images/homepage2/persistent-alarm-v4.png",
    alt: "OnTimer full-screen alarm for a 9:00 job interview with a slide to stop control",
  },
  {
    title: "Tune the ones that matter",
    body: "Pick how many minutes before an event it rings, give it its own sound, or switch a meeting's alarm off.",
    image: "/images/homepage2/event-controls-v2.png",
    alt: "OnTimer event screen with alarm timing, sound, and Early Warning controls",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Hero: answer, proof image, and install action in the first viewport */}
      <section className="relative overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-16 md:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.14),transparent)]" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[1fr_18rem] md:gap-12">
          <div className="min-w-0">
            <nav className="mb-4 text-sm text-zinc-500">
              <Link href="/" className="transition-colors hover:text-zinc-300">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-zinc-300">Turn Calendar Events Into Alarms</span>
            </nav>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Turn Calendar Events Into Real Alarms
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-300">
              Your calendar sends a banner that disappears. OnTimer makes each event ring like an alarm
              clock — full screen, sound and vibration — until you slide to stop it.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <AppStoreCTA location="turn_events_into_alarms_hero" />
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              Free for iPhone · Google Calendar · Apple Calendar · Outlook Calendar
            </p>
          </div>
          <div className="mx-auto w-44 sm:w-56 md:w-full">
            <Image
              src="/images/homepage2/persistent-alarm-v4.png"
              alt="OnTimer full-screen alarm for a 9:00 job interview with a slide to stop control"
              width={853}
              height={1844}
              sizes="(max-width: 639px) 11rem, (max-width: 767px) 14rem, 18rem"
              className="h-auto w-full rounded-3xl border border-zinc-800 shadow-2xl shadow-green-950/30"
              priority
            />
          </div>
        </div>
      </section>

      {/* What your calendar can do on its own */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            Can you add an alarm to a calendar event?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-300">
            <strong className="text-white">Not with the calendar app alone.</strong> Google, Apple and
            Outlook calendars can only send notifications. Here&apos;s what each one gives you:
          </p>
          <div className="mt-6 space-y-3">
            {nativeOptions.map(({ calendar, native }) => (
              <div key={calendar} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                <p className="text-sm font-bold text-white">{calendar}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{native}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-zinc-400">
            The manual fix is to set a separate iPhone Clock alarm for every meeting — and remember to change
            it every time the meeting moves. OnTimer does that part for you, straight from your calendar.
          </p>
        </div>
      </section>

      {/* Notification vs alarm */}
      <section className="border-t border-zinc-800 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            A notification tells you. An alarm makes you stop.
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Most missed meetings aren&apos;t forgotten. The reminder showed up while you were finishing an email,
            you thought &ldquo;two more minutes,&rdquo; and it was gone.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 sm:px-6 sm:text-sm">Calendar notification</div>
              <div className="border-l border-zinc-800 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-green-500 sm:px-6 sm:text-sm">OnTimer alarm</div>
            </div>
            {comparisonRows.map(([left, right]) => (
              <div key={left} className="grid grid-cols-2 border-b border-zinc-800 last:border-0">
                <div className="min-w-0 px-4 py-3 text-sm text-zinc-400 sm:px-6 sm:py-4">{left}</div>
                <div className="min-w-0 border-l border-zinc-800 px-4 py-3 text-sm font-medium text-white sm:px-6 sm:py-4">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works, with real screens */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer turns your events into alarms
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
            Set it up once. After that you keep using your calendar exactly as you do now.
          </p>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-zinc-400">{step.body}</p>
                <div className="mx-auto mt-5 w-48 md:w-full">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={853}
                    height={1844}
                    sizes="(max-width: 767px) 12rem, 18rem"
                    className="h-auto w-full rounded-3xl border border-zinc-800"
                  />
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col items-center text-center">
            <AppStoreCTA location="turn_events_into_alarms_how_it_works" />
            <p className="mt-3 text-sm text-zinc-500">Free · Works with the calendar you already use</p>
          </div>
        </div>
      </section>

      {/* What's free */}
      <section className="border-t border-zinc-800 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">What you get for free</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-green-500">Free</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                <li>Automatic alarms for every event on one calendar provider</li>
                <li>Alarms that stay on screen until you stop them</li>
                <li>Google Calendar, Outlook Calendar, or Apple Calendar</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">OnTimer Pro</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                <li>Work and personal calendars together</li>
                <li>Early Warning heads-up before the main alarm</li>
                <li>Time To Leave alarms that account for travel and traffic</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-zinc-500">
            On Android? OnTimer is iPhone-only for now.
          </p>
          <div className="mt-3">
            <AndroidWaitlistButton size="md" location="turn_events_into_alarms_android" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            Calendar alarm questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-xl border border-zinc-800 bg-zinc-900">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white">
                  {item.question}
                  <span className="ml-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-zinc-800 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl font-black tracking-tight text-white">Related guides</h2>
          <ul className="mt-6 space-y-3">
            {[
              { href: "/calendar-notifications-not-working", label: "iPhone calendar alerts not working? 10 fixes" },
              { href: "/persistent-calendar-reminders", label: "How to make calendar reminders persistent" },
              { href: "/best-calendar-alarm-app", label: "Best calendar alarm app for iPhone" },
              { href: "/why-calendar-notifications-fail", label: "Why calendar notifications get missed, even when they work" },
              { href: "/adhd-time-blindness-tools", label: "ADHD time blindness tools" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-green-500 transition-colors hover:text-green-400">{label} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Your next meeting could ring instead of buzz.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Free for iPhone. Connect your calendar once and every event gets an alarm.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreCTA location="turn_events_into_alarms_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
