import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HomepagePreviewCTA } from "@/components/HomepagePreviewCTA";

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
        url: "/images/CantMissAlerts.png",
        width: 946,
        height: 2048,
        alt: "OnTimer iPhone calendar alarm proof showing an upcoming meeting and priority notification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnTimer Homepage Preview",
    description:
      "Automatic calendar alarms for iPhone that help you stay on time from Google Calendar, Apple Calendar, and Microsoft calendars.",
    images: ["/images/CantMissAlerts.png"],
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
    "OnTimer is an iPhone calendar alarm app. It connects to Google Calendar, Apple Calendar, and Microsoft calendars and turns events into persistent alarms.",
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
        text: "No. OnTimer works with the calendars you already use and creates alarms from those events.",
      },
    },
  ],
};

const calendarLogos = [
  {
    label: "Google Calendar",
    src: "/images/google-calendar-logo-google-calendar.jpg",
  },
  {
    label: "Apple Calendar",
    text: "Apple Calendar",
  },
  {
    label: "Microsoft calendars",
    src: "/images/outlook-calendar.jpg",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect your calendars",
    body: "Use the Google, Apple Calendar, and Microsoft calendars you already rely on.",
  },
  {
    number: "02",
    title: "OnTimer creates alarms",
    body: "No need to set an alarm for every meeting. Your events are covered automatically.",
  },
  {
    number: "03",
    title: "Move before it is too late",
    body: "When it is time to join, leave, or wrap up, OnTimer keeps the alert in front of you.",
  },
];

const automaticDetails = [
  "No manual alarm setup for every meeting",
  "Work and personal calendars in one place",
  "Alarms stay aligned when your schedule changes",
  "Read-only calendar access",
];

const useCases = [
  "Back-to-back meetings",
  "Doctor appointments",
  "Flights",
  "School pickups",
  "Medication timing",
  "Events with locations",
];

const calculators = [
  {
    title: "Airport Time To Leave",
    body: "Know when to leave for a flight.",
    href: "/airport-time-to-leave-calculator",
  },
  {
    title: "What Time Should I Leave",
    body: "Plan the moment to head out.",
    href: "/what-time-should-i-leave",
  },
  {
    title: "Wake-Up Time",
    body: "Work backward from when you need to move.",
    href: "/wake-up-time-calculator",
  },
  {
    title: "Airport Theory",
    body: "See how risky a last-minute airport plan is.",
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
      "No. Notifications appear once and disappear. OnTimer alarms are designed to stay in front of you until you respond.",
  },
  {
    question: "Does it replace my calendar?",
    answer:
      "No. OnTimer works from the calendars you already use, so you do not have to rebuild your schedule in another app.",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-4.22-4.22a.75.75 0 1 1 1.06-1.06l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06l4.22-4.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
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

      <section className="overflow-hidden border-b border-zinc-900 bg-black">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16 lg:py-24">
          <div className="text-center lg:text-left">
            <SectionLabel>Automatic calendar alarms for iPhone</SectionLabel>
            <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Never be late again.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl lg:mx-0">
              OnTimer turns your calendar events into real alarms, so you know
              when to join, leave, or act before the moment passes.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <HomepagePreviewCTA location="homepage2_hero" />
            </div>

            <div className="mt-5 flex flex-col items-center gap-2 text-sm text-zinc-500 sm:flex-row sm:justify-center lg:justify-start">
              <span>iPhone today.</span>
              <Link
                href="/android"
                className="font-semibold text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Android? Join the waitlist.
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="relative aspect-[0.92] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60">
              <Image
                src="/images/CantMissAlerts.png"
                alt="OnTimer iPhone screen showing an upcoming calendar event and an OnTimer priority notification"
                fill
                priority
                sizes="(min-width: 1024px) 34rem, 90vw"
                className="object-cover object-[56%_44%]"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-zinc-800 bg-black/90 px-5 py-4 shadow-xl backdrop-blur">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-left">
                <p className="text-sm font-semibold text-white">
                  Calendar event
                </p>
                <ArrowRight />
                <p className="text-sm font-semibold text-white">Real alarm</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                The difference is not another reminder. It is an alert you have
                to acknowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-zinc-950 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-white">
                Works with all of your Google, Apple Calendar, and Microsoft
                Calendars.
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Automatic alarms. Time To Leave. Multiple calendars.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {calendarLogos.map((calendar) => (
                <div
                  key={calendar.label}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-black px-4"
                >
                  {calendar.src ? (
                    <Image
                      src={calendar.src}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-md object-cover"
                    />
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-black text-black">
                      31
                    </span>
                  )}
                  <span className="text-sm font-semibold text-zinc-200">
                    {calendar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Connect once. Stay on time automatically."
            body="OnTimer is for people who already use a calendar and do not want to manage a second schedule. Your events are already there. OnTimer turns them into alarms."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.number} className="border-t border-zinc-800 pt-6">
                <p className="text-sm font-black text-sky-300">
                  {item.number}
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

      <section className="border-b border-zinc-900 bg-zinc-950 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="mx-auto grid w-full max-w-md grid-cols-[0.82fr_1fr] items-end gap-3">
            <div className="overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-black">
              <Image
                src="/images/ConnectsToCalendars.png"
                alt="OnTimer calendar connection screen explaining calendar access"
                width={946}
                height={2048}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-black shadow-2xl shadow-black/50">
              <Image
                src="/images/AutomaticAlarms.png"
                alt="OnTimer full-screen alarm for an upcoming calendar event"
                width={946}
                height={2048}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Automatic by design"
              title="This is not another place to manage reminders."
              align="left"
              body="OnTimer watches the calendars you already use and creates alarms automatically. That is the product."
            />
            <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {automaticDetails.map((item) => (
                <div key={item} className="border-t border-zinc-800 pt-4">
                  <p className="text-sm font-semibold leading-6 text-zinc-200">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-black py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The Last 5 Minutes"
              title="You did not forget. The reminder disappeared."
              align="left"
              body="Most people are not late because they never knew what was coming. They saw the reminder, planned to move in a minute, got pulled back into something, and missed the final window."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-t border-zinc-800 pt-5">
                <h3 className="text-lg font-black text-white">
                  Calendar notifications inform you.
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  They appear with every other alert, then leave you alone to
                  remember what to do next.
                </p>
              </div>
              <div className="border-t border-emerald-500/50 pt-5">
                <h3 className="text-lg font-black text-white">
                  OnTimer alarms make you act.
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  They stay visible until you respond, so the moment to move is
                  harder to miss.
                </p>
              </div>
            </div>
            <Link
              href="/why-calendar-notifications-fail"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Read why calendar notifications fail
              <ArrowRight />
            </Link>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950">
            <Image
              src="/images/NeverBeLateAgain.png"
              alt="OnTimer current homepage screenshot about never being late again"
              width={946}
              height={2048}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-zinc-950 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Where it helps"
            title="Built for moments where being late has a cost."
            body="Meetings are the everyday case, but the same alarm behavior helps whenever the calendar event matters."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-800 bg-black px-5 py-4 text-base font-semibold text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-black py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionLabel>Time To Leave</SectionLabel>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Know when to leave, not just when the event starts.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              If a calendar event has a location, OnTimer can help with Time To
              Leave alerts based on travel time and traffic. Time To Leave is a
              paid feature.
            </p>
          </div>

          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {calculators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-5 py-5"
              >
                <span>
                  <span className="block font-black text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-zinc-500">
                    {item.body}
                  </span>
                </span>
                <span className="text-zinc-600 transition-colors group-hover:text-emerald-300">
                  <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-zinc-950 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Direct answers"
            title="The short version."
            body="OnTimer is an iPhone calendar alarm app. It turns existing calendar events into alarms that stay visible until you respond."
          />

          <div className="mt-12 divide-y divide-zinc-800 border-y border-zinc-800">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="grid gap-3 py-6 md:grid-cols-[0.48fr_0.52fr] md:gap-8"
              >
                <h3 className="font-black text-white">{item.question}</h3>
                <p className="text-sm leading-6 text-zinc-400">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionLabel>Download OnTimer</SectionLabel>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Let your calendar keep you moving.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-400">
            Download OnTimer for iPhone and turn your calendar into automatic
            alarms for the moments you need to act.
          </p>
          <div className="mt-8 flex justify-center">
            <HomepagePreviewCTA location="homepage2_final" />
          </div>
          <Link
            href="/android"
            className="mt-5 inline-block text-sm font-semibold text-zinc-500 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Android? Join the waitlist.
          </Link>
        </div>
      </section>
    </>
  );
}
