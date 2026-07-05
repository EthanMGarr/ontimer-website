import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";
import { WhyNotificationsFailGraphic } from "@/components/WhyNotificationsFailGraphic";

export const metadata: Metadata = {
  title: "OnTimer — Persistent Calendar Alarms for Meetings, Flights & Critical Moments",
  description:
    "OnTimer turns Google Calendar, Apple Calendar, and Microsoft calendar events into persistent alarms you can't ignore. Stop missing meetings, appointments, flights, and medication doses — calendar alarms that interrupt instead of disappear.",
  alternates: { canonical: "https://www.ontimer.app" },
  openGraph: {
    title: "OnTimer — Persistent Calendar Alarms for Meetings, Flights & Critical Moments",
    description: "OnTimer turns Google Calendar, Apple Calendar, and Microsoft calendar events into persistent alarms you can't ignore. Calendar alarms that interrupt instead of disappear.",
    url: "https://www.ontimer.app",
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
    "OnTimer is a calendar alarm app for iPhone. It connects to Google Calendar, Apple Calendar, and Microsoft calendars and turns every event into a persistent alarm — not a notification that disappears.",
  url: "https://ontimer.app",
  keywords: "calendar alarm app, turn calendar events into alarms, persistent calendar alarms, Google Calendar alarm, Apple Calendar alarm, Microsoft calendar alarm, Outlook calendar alarm, meeting alarm app, never miss meetings iPhone",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OnTimer",
  url: "https://www.ontimer.app",
  description:
    "OnTimer is a calendar alarm app for iPhone that turns Google Calendar, Apple Calendar, and Microsoft calendar events into persistent alarms. Never miss a meeting, flight, or medication dose.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OnTimer",
  url: "https://www.ontimer.app",
  logo: "https://www.ontimer.app/images/ontimer_1024x1024.png",
  description:
    "OnTimer is a calendar alarm app for iPhone. It connects to Google Calendar, Apple Calendar, and Microsoft calendars and turns every event into a persistent alarm — not a notification that disappears.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@ontimer.app",
    contactType: "customer support",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is OnTimer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OnTimer is a calendar alarm app for iPhone. It connects to your Google Calendar, Apple Calendar, or Microsoft calendars and triggers loud, persistent alarms before meetings and events so you are less likely to miss them or arrive late.",
      },
    },
    {
      "@type": "Question",
      name: "What is a calendar alarm app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A calendar alarm app connects to your existing calendar and fires persistent, interruptive alarms before each event — not passive notifications that disappear on their own. Unlike standard calendar reminders from Google Calendar, Apple Calendar, or Microsoft calendars, calendar alarm alerts stay on your screen until you actively dismiss them. OnTimer is a calendar alarm app for iPhone.",
      },
    },
    {
      "@type": "Question",
      name: "Can you turn Google Calendar, Apple Calendar, or Microsoft calendar events into alarms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not natively — Google Calendar, Apple Calendar, and Microsoft calendars send notifications, which disappear automatically whether or not you act on them. OnTimer connects to your Google, Apple, or Microsoft calendars and turns every event into a persistent alarm on iPhone that stays on screen until you respond. No manual setup per event.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a calendar notification and a calendar alarm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A notification informs you — it appears and disappears whether or not you act on it. An alarm interrupts you — it stays on screen and requires a response before it stops. Google Calendar, Apple Calendar, and Microsoft calendars send notifications. OnTimer turns those calendar events into alarms.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Last 5 Minutes Problem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Last 5 Minutes Problem is the gap between knowing about a meeting and actually acting in time. A notification fires, you see it, you plan to act in a moment — and then the window closes before you do. Persistent alarms solve this by staying on screen until you respond, eliminating the passive-to-action gap.",
      },
    },
    {
      "@type": "Question",
      name: "How is OnTimer different from normal calendar notifications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Normal calendar reminders are passive notifications that are easy to swipe away or ignore. OnTimer is a calendar alarm app — it fires a louder, more persistent alarm that stays on screen until you actively dismiss it.",
      },
    },
    {
      "@type": "Question",
      name: "Can OnTimer remind me when it is time to leave?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. For calendar events with a location, OnTimer offers Time To Leave alerts based on travel time and traffic. Time To Leave is a paid feature.",
      },
    },
    {
      "@type": "Question",
      name: "Does OnTimer work with multiple calendars?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. OnTimer supports multiple calendars, including Google, Apple, and Microsoft calendars.",
      },
    },
    {
      "@type": "Question",
      name: "Who is OnTimer best for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OnTimer is useful for busy professionals, people with back-to-back meetings, people who miss normal reminders, and people who struggle with time blindness or chronic lateness patterns.",
      },
    },
  ],
};

const comparisonRows = [
  { left: "Easy to swipe away", right: "Loud, persistent alarm" },
  { left: "Passive notification", right: "Designed to interrupt you" },
  { left: "Easy to forget", right: "Harder to miss" },
  {
    left: "Usually tied to one calendar flow",
    right: "Can work across multiple calendars",
  },
  { left: "Basic reminder", right: "Purpose-built meeting alarm" },
];

const whoCards = [
  {
    heading: "Busy professionals",
    body: "Packed workdays, back-to-back calls, client meetings. Passive notifications compete with everything else. Persistent alarms cut through.",
  },
  {
    heading: "People who miss notifications",
    body: "You see the reminder. You think \"in a minute.\" The notification disappears. That execution gap is exactly what OnTimer closes.",
  },
  {
    heading: "ADHD & time blindness",
    body: "For people where 10 minutes can feel like 2. A persistent alarm that won't leave until dismissed is a categorically different signal.",
  },
  {
    heading: "Critical timing moments",
    body: "Flights, medication doses, appointments, pickups. Any calendar event where missing the window has real consequences.",
  },
];

const featureItems = [
  {
    heading: "Persistent alarms, not notifications",
    body: "OnTimer alarms stay on your screen until you dismiss them. They don't disappear on their own. They interrupt — which is the point.",
  },
  {
    heading: "Every calendar event covered automatically",
    body: "OnTimer watches your Google Calendar, Apple Calendar, and Microsoft calendars and fires a persistent alarm for every upcoming event. No per-event setup.",
  },
  {
    heading: "Works across critical timing moments",
    body: "Meetings, appointments, medication doses, flight departures. Any calendar event where the window closing has real consequences.",
  },
  {
    heading: "Time To Leave alerts",
    body: "For events with a location, OnTimer calculates when you need to leave based on travel time and traffic — and alarms you. Paid feature.",
  },
];

const steps = [
  {
    number: 1,
    title: "Connect your calendars",
    body: "Link your calendars and choose your preferences.",
  },
  {
    number: 2,
    title: "OnTimer prepares alarms",
    body: "Upcoming calendar events get alarms automatically.",
  },
  {
    number: 3,
    title: "Get alerted before it is too late",
    body: "When the alarm fires, you know it is time to join, leave, or wrap up what you are doing.",
  },
];

const popularGuides = [
  { label: "Why Calendar Notifications Fail (And What Actually Works)", href: "/why-calendar-notifications-fail" },
  { label: "The Last 5 Minutes Problem: Why Notifications Fail", href: "/last-5-minutes-problem" },
  { label: "Why Notifications Fail (And Persistent Alarms Work Better)", href: "/why-notifications-fail" },
  { label: "Calendar Notifications Not Working? Why Reminders Fail", href: "/calendar-notifications-not-working" },
  { label: "Turn Calendar Events Into Alarms", href: "/turn-calendar-events-into-alarms" },
  { label: "Best Calendar Alarm App for Google & Outlook", href: "/best-calendar-alarm-app" },
  { label: "Persistent Calendar Reminders", href: "/persistent-calendar-reminders" },
  { label: "Calendar Notifications vs Alarms", href: "/calendar-notifications-vs-alarms" },
  { label: "Why Calendar Reminders Fail", href: "/why-calendar-reminders-fail" },
  { label: "ADHD Time Blindness Tools", href: "/adhd-time-blindness-tools" },
];

const medicationGuides = [
  { label: "How to Remember Your Medication", href: "/how-to-remember-medication-on-time" },
  { label: "Why Medication Reminders Fail", href: "/why-medication-reminders-fail" },
  { label: "How to Set Medication Reminders on iPhone", href: "/how-to-set-medication-reminders-iphone" },
  { label: "Medication Schedule Calendar Setup", href: "/medication-schedule-calendar-setup" },
  { label: "ADHD Medication Timing", href: "/adhd-medication-timing" },
  { label: "Help an Elderly Parent Remember Medication", href: "/help-elderly-parent-remember-medication" },
  { label: "Pet Medication Schedule", href: "/pet-medication-schedule" },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
                Persistent calendar alarms for iPhone
              </p>
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Never miss{" "}
                <span className="text-green-500">important moments</span>{" "}
                again
              </h1>
              <p className="mt-6 max-w-xl text-lg text-zinc-400 lg:text-xl leading-relaxed">
                Turn calendar events into <strong className="text-white">persistent alarms</strong> you
                can&apos;t ignore. OnTimer helps you break through the final execution
                gap before meetings, flights, appointments, medication schedules,
                and other critical moments.
              </p>
              <ul className="mt-4 max-w-xl space-y-1.5">
                {[
                  "Works with all of your Google, Apple Calendar, and Microsoft Calendars",
                  "Persistent alarms that stay on screen until dismissed",
                  "No manual setup — your calendar is the source of truth",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 max-w-xl rounded-xl border border-green-500/30 bg-green-500/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-2">Direct Answer</p>
                <p className="text-sm leading-relaxed text-zinc-200">
                  OnTimer turns Google Calendar, Apple Calendar, and Microsoft calendar events into{" "}
                  <strong className="text-white">persistent alarms</strong> instead of passive notifications.
                  Unlike standard reminders that are easy to ignore, OnTimer uses loud, persistent alarms
                  that interrupt you before important moments — meetings, flights, medication doses,
                  and appointments. Connect your calendar once; every event gets an alarm automatically.
                </p>
              </div>

              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-4">
                  <AppStoreCTA location="hero" />
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeaZ-qd4P9xZgC0WUiQDn9WH9QLZFomHJDJ5hD3F0IpqbM-kw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-green-500 px-8 py-4 text-base font-semibold text-green-500 transition-colors hover:bg-green-500 hover:text-black"
                  >
                    Join Android Waitlist
                  </a>
                </div>
                <p className="mt-3 text-xs text-zinc-400">
                  Free download • Connect your calendars in seconds
                </p>
              </div>

              {/* Calendar logos */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold text-zinc-400">
                  Works with all of your Google, Apple Calendar, and Microsoft Calendars
                </p>
                <div className="flex items-center justify-center gap-4 lg:justify-start">
                  <img
                    src="/images/google-calendar-logo-google-calendar.jpg"
                    alt="Google Calendar"
                    className="h-[38px] w-auto"
                  />
                  <img
                    src="/images/outlook-calendar.jpg"
                    alt="Microsoft Outlook"
                    className="h-[38px] w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="relative flex-shrink-0">
              <div className="relative flex gap-4">
                <div className="relative mt-8 h-[480px] w-[220px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/10">
                  <Image
                    src="/images/NeverBeLateAgain.png"
                    alt="OnTimer — Never Miss a Meeting Again"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative h-[480px] w-[220px] overflow-hidden rounded-[2rem] border border-zinc-700 shadow-2xl shadow-green-500/10">
                  <Image
                    src="/images/RelaxYourOnTime.png"
                    alt="OnTimer — Relax, You're On Time"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-4 rounded-full bg-green-500/5 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK INSIGHT ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_70%,rgba(34,197,94,0.06),transparent)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Why reminders fail
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              The problem isn&apos;t remembering.
              <br />
              <span className="text-green-500">It&apos;s follow-through.</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-400 sm:text-xl">
              Notifications inform.{" "}
              <span className="font-semibold text-white">Alarms interrupt behavior.</span>
            </p>
            <p className="mt-4 mx-auto max-w-xl text-zinc-500 text-sm leading-relaxed">
              Most missed reminders happen after the notification is seen. The issue is rarely awareness — it&apos;s the gap between knowing and acting.
            </p>
          </div>

          <div className="relative mt-14 mx-auto max-w-2xl">
            <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-green-500/5 blur-2xl" />
            <WhyNotificationsFailGraphic
              variant="condensed"
              caption="Passive notifications disappear. Interruptive alarms demand a response before they stop."
            />
          </div>

          <div className="mt-10 text-center">
            <p className="mx-auto max-w-lg text-zinc-400 leading-relaxed">
              OnTimer was built around this problem. Not a notification upgrade — a different category of alert that stays on your screen until you respond.
            </p>
            <div className="mt-5">
              <Link
                href="/why-calendar-notifications-fail"
                className="text-sm font-semibold text-green-500 hover:text-green-400 transition-colors"
              >
                Why calendar notifications fail — the full breakdown →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PEOPLE ASK ── */}
      <section className="border-y border-zinc-800 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-10 text-3xl font-black tracking-tight text-white sm:text-4xl">
            People ask…
          </h2>
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">
                Is there an app that reminds you about meetings on iPhone?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Yes. OnTimer connects to your calendar and creates loud,
                persistent alarms before meetings and events so they are harder
                to miss than standard calendar notifications.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">
                Why do I miss calendar reminders on iPhone?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Most calendar reminders are passive notifications that disappear
                quickly and are easy to ignore. OnTimer turns those events into
                alarms that stay visible until you dismiss them.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">
                Can I get an alert when it&apos;s time to leave for a meeting?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Yes. For calendar events with a location, OnTimer offers Time To
                Leave alerts based on travel time and traffic. Time To Leave is
                a paid feature.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">
                Does a calendar alarm app work with multiple calendars?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Yes. OnTimer supports multiple calendars, including Google and
                Microsoft accounts — simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LAST 5 MINUTES PROBLEM ── */}
      <section className="border-t border-zinc-800 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The <span className="text-green-500">Last 5 Minutes Problem</span>
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            You knew about the meeting. You had the reminder set. You looked at the clock ten minutes
            ago. Somehow you still ended up late.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            This isn&apos;t a memory problem. It&apos;s an{" "}
            <strong className="text-white">execution gap</strong> — the space between receiving a
            reminder and acting on it before the window closes. Notifications fire and disappear.
            Alarms interrupt and wait.
          </p>
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm font-semibold text-white mb-2">Why notifications fail at the worst moment:</p>
            <ul className="space-y-2">
              {[
                "You're in the middle of something when the reminder fires",
                "You glance at it, think \"in a minute\", and keep working",
                "The notification disappears — and so does the urgency",
                "Five minutes later you're late",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="mt-0.5 flex-shrink-0 text-zinc-600">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link
              href="/last-5-minutes-problem"
              className="text-sm font-semibold text-green-500 hover:text-green-400 transition-colors"
            >
              Read: The Last 5 Minutes Problem — why notifications fail →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT IS ONTIMER ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            What is <span className="text-green-500">OnTimer?</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            OnTimer is a{" "}
            <Link href="/calendar-alarm-app" className="text-green-500 hover:text-green-400">
              calendar alarm app
            </Link>{" "}
            for iPhone. It connects to your Google Calendar, Apple Calendar, or Microsoft calendars and triggers
            loud, persistent alarms before meetings and events so you do not
            miss them or show up late.
          </p>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            It is designed for people who rely on their calendar but know that
            normal calendar notifications are easy to miss.
          </p>
          <p className="mt-6 text-base font-semibold text-zinc-300">
            Works with all of your Google, Apple Calendar, and Microsoft Calendars. It does not replace your calendar.
          </p>
        </div>
      </section>

      {/* ── WHO SHOULD USE ONTIMER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Who should use OnTimer
          </h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            OnTimer is especially useful for people who need something more
            reliable than standard calendar notifications.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whoCards.map((card) => (
              <div
                key={card.heading}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="font-bold text-white">{card.heading}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ONTIMER IS DIFFERENT ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why OnTimer is different
          </h2>
          <p className="mb-10 text-zinc-400 leading-relaxed">
            Standard calendar apps are built to show notifications. OnTimer is
            built to get your attention before it is too late.
          </p>
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            {/* Header */}
            <div className="grid grid-cols-2 border-b border-zinc-800 bg-zinc-900">
              <div className="px-6 py-4 text-sm font-semibold text-zinc-400">
                Standard calendar reminder
              </div>
              <div className="border-l border-zinc-800 px-6 py-4 text-sm font-semibold text-green-500">
                OnTimer
              </div>
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b border-zinc-800 last:border-0"
              >
                <div className="px-6 py-4 text-sm text-zinc-400">
                  {row.left}
                </div>
                <div className="border-l border-zinc-800 px-6 py-4 text-sm font-medium text-white">
                  {row.right}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES THAT MATTER ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Features that matter
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {featureItems.map((f) => (
              <div
                key={f.heading}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
              >
                <h3 className="mb-3 text-xl font-black text-white">
                  {f.heading}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ONTIMER WORKS ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-12 text-3xl font-black tracking-tight text-white sm:text-4xl">
            How OnTimer works
          </h2>
          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-black text-black">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-zinc-400">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-green-500 hover:text-green-400"
            >
              See the full walkthrough →
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMON QUESTIONS ── */}
      <section className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-10 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Common questions
          </h2>
          <div className="space-y-6">
            {/* Q0 — Category definition */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">What is a calendar alarm app?</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                A <Link href="/calendar-alarm-app" className="text-green-500 hover:text-green-400">calendar alarm app</Link> connects to your existing calendar and fires persistent, interruptive alarms before each event — not passive notifications that disappear on their own. Unlike standard calendar reminders from Google Calendar, Apple Calendar, or Microsoft calendars, these alarms stay on your screen until you actively dismiss them. OnTimer is a calendar alarm app for iPhone.
              </p>
            </div>
            {/* Q0b — Turn events into alarms */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">Can you turn Google Calendar, Apple Calendar, or Microsoft calendar events into alarms?</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Not natively — Google Calendar, Apple Calendar, and Microsoft calendars send notifications, which disappear automatically. OnTimer connects to your calendar and{" "}
                <Link href="/turn-calendar-events-into-alarms" className="text-green-500 hover:text-green-400">turns every event into a persistent alarm</Link>{" "}
                on iPhone that stays on screen until you respond. No manual setup per event.
              </p>
            </div>
            {/* Q0c — Notification vs alarm */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">What is the difference between a calendar notification and a calendar alarm?</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                A notification informs you — it appears and disappears whether or not you act on it. An alarm interrupts you — it stays on screen and requires a response before it stops. Google Calendar, Apple Calendar, and Microsoft calendars send notifications. OnTimer turns those calendar events into alarms.
              </p>
            </div>
            {/* Q0d — Last 5 Minutes Problem */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">What is the Last 5 Minutes Problem?</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                The{" "}
                <Link href="/last-5-minutes-problem" className="text-green-500 hover:text-green-400">Last 5 Minutes Problem</Link>{" "}
                is the gap between knowing about a meeting and actually acting in time. A notification fires, you see it, you plan to act in a moment — and the window closes before you do. Persistent alarms solve this by staying on screen until you respond.
              </p>
            </div>
            {/* Q1 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">What is OnTimer?</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                OnTimer is a calendar alarm app for iPhone. It connects to your calendar and
                triggers loud, persistent alarms before meetings and events so
                you are less likely to miss them or arrive late.
              </p>
            </div>
            {/* Q2 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">
                How is OnTimer different from normal calendar notifications?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Normal calendar reminders are usually passive notifications that
                are easy to swipe away or ignore. OnTimer is designed to create
                a stronger alert that is{" "}
                <Link
                  href="/loud-calendar-alerts-iphone"
                  className="text-green-500 hover:text-green-400"
                >
                  louder, more persistent
                </Link>
                , and harder to miss.
              </p>
            </div>
            {/* Q3 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">
                Can OnTimer remind me when it is time to leave?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Yes. For calendar events with a location, OnTimer offers{" "}
                <Link
                  href="/time-to-leave-reminders"
                  className="text-green-500 hover:text-green-400"
                >
                  Time To Leave alerts
                </Link>{" "}
                based on travel time and traffic. Time To Leave is a paid
                feature.
              </p>
            </div>
            {/* Q4 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">
                Does OnTimer work with multiple calendars?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Yes. OnTimer supports multiple calendars, including Google and
                Microsoft accounts.
              </p>
            </div>
            {/* Q5 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">Who is OnTimer best for?</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                OnTimer is useful for busy professionals, people with
                back-to-back meetings, people who miss normal reminders, and
                people who struggle with time blindness or{" "}
                <Link
                  href="/never-be-late-to-meetings"
                  className="text-green-500 hover:text-green-400"
                >
                  chronic lateness patterns
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── START HERE ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-xl font-black text-white">
              Struggling to be on time?
            </h2>
            <p className="mt-3 text-sm text-zinc-400">If you&apos;ve ever:</p>
            <ul className="mt-2 space-y-1.5">
              {[
                "seen \"are you joining?\" and realized you're late",
                "remembered the meeting but got distracted right before",
                "set multiple alarms just to stay on track",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="mt-0.5 flex-shrink-0 text-zinc-600">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-semibold text-white">Start here:</p>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Why Calendar Notifications Fail", href: "/why-calendar-notifications-fail" },
                { label: "The Last 5 Minutes Problem", href: "/last-5-minutes-problem" },
                { label: "Turn Calendar Events Into Alarms", href: "/turn-calendar-events-into-alarms" },
                { label: "What Time Should I Leave", href: "/what-time-should-i-leave" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-semibold text-green-500 hover:text-green-400 transition-colors"
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── POPULAR GUIDES ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-black tracking-tight text-white">
            Popular guides
          </h2>
          <ul className="space-y-3">
            {popularGuides.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-green-500 hover:text-green-400 transition-colors"
                >
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── MEDICATION GUIDES ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-2 text-2xl font-black tracking-tight text-white">
            Medication reminder guides
          </h2>
          <p className="mb-6 text-sm text-zinc-400">OnTimer works for any scheduled event — including medication reminders set as calendar entries.</p>
          <ul className="space-y-3">
            {medicationGuides.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-green-500 hover:text-green-400 transition-colors"
                >
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden border-t border-zinc-800 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stop missing meetings.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and turn your calendar into a more reliable meeting
            alarm.
          </p>
          <div className="mt-8">
            <AppStoreCTA />
          </div>
        </div>
      </section>
    </>
  );
}
