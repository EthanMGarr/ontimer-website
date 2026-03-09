import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton, AndroidWaitlistButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "OnTimer | Loud Calendar Alarms for Meetings on iPhone",
  description:
    "OnTimer is an iPhone app that connects to your calendar and creates loud, persistent alarms before meetings and events so they are harder to miss.",
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OnTimer",
  operatingSystem: "iOS",
  applicationCategory: "ProductivityApplication",
  description:
    "OnTimer connects to your calendar and creates loud, persistent alarms before meetings and events so they are harder to miss.",
  url: "https://ontimer.app",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
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
        text: "OnTimer is an iPhone app that connects to your calendar and triggers loud, persistent alarms before meetings and events so you are less likely to miss them or arrive late.",
      },
    },
    {
      "@type": "Question",
      name: "How is OnTimer different from normal calendar notifications?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Normal calendar reminders are usually passive notifications that are easy to swipe away or ignore. OnTimer is designed to create a stronger alert that is louder, more persistent, and harder to miss.",
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
        text: "Yes. OnTimer supports multiple calendars, including Google and Microsoft accounts.",
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
    body: "For people with packed workdays, client calls, internal meetings, and back-to-back schedules.",
  },
  {
    heading: "People who miss calendar notifications",
    body: "For anyone who sees reminders but still loses track of time before the meeting actually starts.",
  },
  {
    heading: "People with time blindness or ADHD tendencies",
    body: "For people who benefit from a stronger transition signal before it is time to leave or join.",
  },
  {
    heading: "Multi-calendar users",
    body: "For people juggling work and personal schedules across more than one calendar.",
  },
];

const featureItems = [
  {
    heading: "Connect multiple calendars",
    body: "Connect Google and Microsoft calendars, including multiple accounts, so your reminders reflect your real schedule.",
  },
  {
    heading: "Automatic alarms for calendar events",
    body: "OnTimer watches your schedule and prepares alarms for upcoming meetings, calls, and appointments.",
  },
  {
    heading: "Alerts you are less likely to miss",
    body: "Unlike a standard notification, OnTimer alarms are designed to stay loud and visible until you dismiss them.",
  },
  {
    heading: "Time To Leave alerts",
    body: "For events with a location, Time To Leave can alert you when it is time to head out based on travel time and traffic. This is a paid feature.",
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
  { label: "How to Never Be Late to Meetings", href: "/how-to-never-be-late-to-meetings" },
  { label: "How to Get Loud Calendar Alerts on iPhone", href: "/loud-calendar-alerts-iphone" },
  { label: "How to Get a Reminder When It's Time to Leave for a Meeting", href: "/time-to-leave-reminders" },
  { label: "How to Stop Missing Zoom, Google Meet, and Other Calendar Meetings", href: "/stop-missing-calendar-meetings" },
  { label: "Best Apps to Remind You About Meetings on iPhone", href: "/best-meeting-reminder-apps-iphone" },
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-500">
                Calendar alarm app for iPhone
              </p>
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Never miss a{" "}
                <span className="text-green-500">meeting again</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-zinc-400 lg:text-xl leading-relaxed">
                OnTimer connects to your calendar and triggers loud, persistent
                alarms before meetings, calls, and appointments so they do not
                sneak up on you.
              </p>

              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-4">
                  <AppStoreButton size="lg" location="hero" />
                  <AndroidWaitlistButton size="lg" />
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  Free download • Connect your calendars in seconds
                </p>
              </div>

              {/* Calendar logos */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold text-zinc-500">
                  Works with Google &amp; Microsoft calendars
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
                Can I use multiple calendars with one reminder app?
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Yes. OnTimer supports multiple calendars, including Google and
                Microsoft accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALENDAR REMINDERS AREN'T ALARMS ── */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Calendar reminders aren&apos;t alarms.
          </h2>
          <div className="mt-6 space-y-4 text-left text-zinc-400 leading-relaxed">
            <p>
              Most calendar reminders are passive notifications. They appear,
              you glance at them, and then they disappear into the rest of your
              day.
            </p>
            <p>
              That is fine for casual reminders. It is not reliable when you
              actually need to show up on time.
            </p>
            <p>
              OnTimer turns calendar events into loud, persistent alarms that
              are much harder to ignore.
            </p>
          </div>
          <ul className="mt-6 space-y-2 text-left">
            {[
              "Easy to swipe away notifications become real alarms",
              "Meetings and appointments are harder to miss",
              "You do not need to manually create reminders for every event",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHAT IS ONTIMER ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            What is <span className="text-green-500">OnTimer?</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            OnTimer is an iPhone app that connects to your calendar and triggers
            loud, persistent alarms before meetings and events so you do not
            miss them or show up late.
          </p>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            It is designed for people who rely on their calendar but know that
            normal calendar notifications are easy to miss.
          </p>
          <p className="mt-6 text-base font-semibold text-zinc-300">
            It works with your schedule. It does not replace your calendar.
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
                <div className="px-6 py-4 text-sm text-zinc-500">
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
            {/* Q1 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="font-bold text-white">What is OnTimer?</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                OnTimer is an iPhone app that connects to your calendar and
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
                  href="/how-to-never-be-late-to-meetings"
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
            <AppStoreButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
