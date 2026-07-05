import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";
import { WhyNotificationsFailGraphic } from "@/components/WhyNotificationsFailGraphic";

export const metadata: Metadata = {
  title: "OnTimer Homepage Preview",
  description:
    "Preview the redesigned OnTimer homepage: automatic calendar alarms for iPhone that help you stay on time from Google Calendar, Apple Calendar, and Microsoft calendars.",
  alternates: { canonical: "https://www.ontimer.app/homepage2" },
  openGraph: {
    title: "OnTimer Homepage Preview",
    description:
      "Automatic calendar alarms for iPhone that help you stay on time from Google Calendar, Apple Calendar, and Microsoft calendars.",
    url: "https://www.ontimer.app/homepage2",
    images: [
      {
        url: "/images/AutomaticAlarms.png",
        width: 946,
        height: 2048,
        alt: "OnTimer iPhone alarm screen for an upcoming calendar event",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnTimer Homepage Preview",
    description:
      "Automatic calendar alarms for iPhone that help you stay on time from Google Calendar, Apple Calendar, and Microsoft calendars.",
    images: ["/images/AutomaticAlarms.png"],
  },
  robots: {
    index: false,
    follow: false,
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
    "OnTimer is a calendar alarm app for iPhone. It connects to Google Calendar, Apple Calendar, and Microsoft calendars and turns events into persistent alarms.",
  url: "https://www.ontimer.app/homepage2",
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
        text: "OnTimer is an iPhone calendar alarm app that turns calendar events into persistent alarms so you know when to join, leave, or act before the moment passes.",
      },
    },
    {
      "@type": "Question",
      name: "Which calendars does OnTimer work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OnTimer works with Google Calendar, Apple Calendar, and Microsoft calendars, including multiple calendars.",
      },
    },
    {
      "@type": "Question",
      name: "How is OnTimer different from a calendar notification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Calendar notifications appear and disappear. OnTimer alarms stay visible and require acknowledgement, making them harder to miss when it is time to act.",
      },
    },
    {
      "@type": "Question",
      name: "Does OnTimer replace my calendar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your calendar remains the source of truth. OnTimer adds an alarm layer on top of the calendar you already use.",
      },
    },
  ],
};

const proofItems = [
  "Google Calendar",
  "Apple Calendar",
  "Microsoft calendars",
  "Persistent alarms",
  "Time To Leave",
  "Multiple calendars",
];

const steps = [
  {
    step: "01",
    title: "Connect your calendar once",
    body: "Use the calendars you already trust. OnTimer reads your events and keeps your schedule as the source of truth.",
  },
  {
    step: "02",
    title: "Alarms are prepared automatically",
    body: "Upcoming events get alarms without per-meeting setup. When your calendar changes, the timing layer follows.",
  },
  {
    step: "03",
    title: "Act before the moment passes",
    body: "When it is time to join, leave, or wrap up, OnTimer interrupts with an alarm that requires acknowledgement.",
  },
];

const differentiators = [
  {
    label: "Calendar notification",
    body: "Appears briefly, competes with every other alert, and can disappear before you act.",
  },
  {
    label: "OnTimer alarm",
    body: "Interrupts the moment, stays visible, and requires a response before it stops.",
  },
];

const useCases = [
  "Back-to-back meetings",
  "Appointments",
  "Flights",
  "School pickups",
  "Medication timing",
  "Events with locations",
];

const calculators = [
  {
    title: "Airport Time To Leave",
    body: "Plan when to leave for a flight with airport-specific timing.",
    href: "/airport-time-to-leave-calculator",
  },
  {
    title: "What Time Should I Leave",
    body: "Estimate when to head out for everyday events.",
    href: "/what-time-should-i-leave",
  },
  {
    title: "Wake-Up Time",
    body: "Work backward from the moment you need to be moving.",
    href: "/wake-up-time-calculator",
  },
  {
    title: "Airport Theory",
    body: "See how risky a last-minute airport plan really is.",
    href: "/airport-theory-calculator",
  },
];

const faqItems = [
  {
    question: "What does OnTimer do?",
    answer:
      "OnTimer turns events from your existing calendar into persistent alarms on iPhone, so you know when to act before the window closes.",
  },
  {
    question: "Does it work with all my calendars?",
    answer:
      "OnTimer works with all of your Google, Apple Calendar, and Microsoft Calendars, including multiple calendars across work and personal life.",
  },
  {
    question: "Is this just another notification?",
    answer:
      "No. Notifications inform and disappear. OnTimer alarms are designed to interrupt and require acknowledgement.",
  },
  {
    question: "Does it replace my calendar?",
    answer:
      "No. Your calendar remains the source of truth. OnTimer protects the timing layer on top of it.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-green-400">
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function Homepage2() {
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

      <section className="relative isolate overflow-hidden border-b border-zinc-900 pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(34,197,94,0.16),transparent_62%)]" />
        <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-80 w-80 bg-green-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <SectionLabel>Automatic calendar alarms for iPhone</SectionLabel>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Never be late again.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl lg:mx-0">
              OnTimer automatically turns your calendar events into alarms, so
              you know when to join, leave, or act before the moment passes.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <AppStoreCTA location="homepage2_hero" />
            </div>

            <p className="mt-5 text-sm font-medium text-zinc-400">
              Works with all of your Google, Apple Calendar, and Microsoft
              Calendars.
            </p>

            <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2 text-left sm:grid-cols-3 lg:mx-0">
              {proofItems.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm font-medium text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/android"
              className="mt-5 inline-block text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Android? Join the waitlist.
            </Link>
          </div>

          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-green-500/10">
              <Image
                src="/images/AutomaticAlarms.png"
                alt="OnTimer iPhone alarm screen showing a calendar event starting in two minutes with a Dismiss button"
                width={946}
                height={2048}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Your calendar stays the source of truth."
            body="OnTimer does not ask you to rebuild your schedule. It adds the timing layer your calendar was never designed to provide."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <p className="text-sm font-black text-green-400">
                  {item.step}
                </p>
                <h3 className="mt-5 text-xl font-black text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-zinc-900/25 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-green-500/10">
              <Image
                src="/images/ConnectsToCalendars.png"
                alt="OnTimer calendar connection screen explaining read-only calendar access and privacy protections"
                width={946}
                height={2048}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div>
            <SectionLabel>Automatic by design</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Connect once. Let OnTimer handle the moments that matter.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              The value is not another place to manage reminders. The value is
              not having to manage them. OnTimer watches the calendar you
              already use and prepares alarms automatically.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "No manual alarm setup for every meeting",
                "Multiple calendars across work and life",
                "Alarms update as your schedule changes",
                "Read-only calendar access",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm font-medium text-zinc-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Why reminders fail"
            title="The problem is not remembering. It is follow-through."
            body="Most calendar failures happen after the reminder appears. You see it, intend to act in a minute, and then the final action window closes."
          />

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {differentiators.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <h3 className="text-xl font-black text-white">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto max-w-md">
              <WhyNotificationsFailGraphic
                variant="condensed"
                caption="Passive notifications disappear. Interruptive alarms demand a response before they stop."
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/why-calendar-notifications-fail"
              className="text-sm font-semibold text-green-400 transition-colors hover:text-green-300"
            >
              Read the full breakdown of why calendar notifications fail
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-zinc-900/25 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Where it helps"
            title="Built for moments where being late has a cost."
            body="Meetings are the clearest everyday case, but the same timing layer protects any calendar event where the moment to act matters."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-5 py-4 text-base font-semibold text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Time To Leave</SectionLabel>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Know when to leave, not just when the event starts.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              For calendar events with locations, OnTimer can help with Time To
              Leave alerts based on travel time and traffic. Time To Leave is a
              paid feature.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {calculators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-green-500/60 hover:bg-zinc-900"
              >
                <h3 className="font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-zinc-900/25 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Direct answers"
            title="The short version."
            body="OnTimer is an iPhone calendar alarm app. It turns existing calendar events into persistent alarms so the moment to act is harder to miss."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-6"
              >
                <h3 className="font-black text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(34,197,94,0.14),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Stay on time automatically.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-400">
            Download OnTimer for iPhone and turn your calendar into an alarm
            system built for the moment you need to act.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreCTA location="homepage2_final" />
          </div>
        </div>
      </section>
    </>
  );
}
