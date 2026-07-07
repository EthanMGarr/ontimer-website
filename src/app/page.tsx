import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroAnimationV2 } from "@/components/HeroAnimationV2";
import { HomepagePreviewCTA } from "@/components/HomepagePreviewCTA";
import { APP_STORE_URL } from "@/lib/constants";

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

const popularGuides = [
  { label: "Why Calendar Notifications Fail (And What Actually Works)", href: "/why-calendar-notifications-fail" },
  { label: "The Last 5 Minutes Problem: Why Notifications Fail", href: "/last-5-minutes-problem" },
  { label: "Why Notifications Fail (And Persistent Alarms Work Better)", href: "/why-notifications-fail" },
  { label: "Calendar Notifications Not Working? Why Reminders Fail", href: "/calendar-notifications-not-working" },
  { label: "Turn Calendar Events Into Alarms", href: "/turn-calendar-events-into-alarms" },
  { label: "Best Calendar Alarm App for Google & Outlook", href: "/best-calendar-alarm-app" },
  { label: "Meeting Reminder App for iPhone", href: "/meeting-reminder-app" },
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
    body: "Upcoming events get alarms automatically, without rebuilding your schedule.",
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
  { icon: "💼", label: "Back-to-back meetings" },
  { icon: "🏥", label: "Doctor appointments" },
  { icon: "✈", label: "Flights" },
  { icon: "🎒", label: "School pickups" },
  { icon: "💊", label: "Medication timing" },
  { icon: "📍", label: "Events with locations" },
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
  {
    title: "Cruise Terminal Time Calculator",
    body: "Plan around boarding windows, ports, luggage, and parking.",
    href: "/cruise-terminal-time-calculators",
  },
];

const faqItems = [
  {
    question: "What is OnTimer?",
    answer:
      "OnTimer is a calendar alarm app for iPhone. It connects to your Google Calendar, Apple Calendar, or Microsoft calendars and triggers loud, persistent alarms before meetings and events so you are less likely to miss them or arrive late.",
  },
  {
    question: "What is a calendar alarm app?",
    answer:
      "A calendar alarm app connects to your existing calendar and fires persistent, interruptive alarms before each event, not passive notifications that disappear on their own.",
  },
  {
    question: "Can you turn Google Calendar, Apple Calendar, or Microsoft calendar events into alarms?",
    answer:
      "Not natively. Google Calendar, Apple Calendar, and Microsoft calendars send notifications. OnTimer connects to those calendars and turns events into persistent alarms on iPhone.",
  },
  {
    question: "What is the difference between a calendar notification and a calendar alarm?",
    answer:
      "A notification informs you and can disappear whether or not you act on it. An alarm interrupts you and requires a response before it stops.",
  },
  {
    question: "What is the Last 5 Minutes Problem?",
    answer:
      "The Last 5 Minutes Problem is the gap between knowing about a meeting and actually acting in time. Persistent alarms help close that gap by staying on screen until you respond.",
  },
  {
    question: "How is OnTimer different from normal calendar notifications?",
    answer:
      "Normal calendar reminders are passive notifications that are easy to swipe away or ignore. OnTimer fires a louder, more persistent alarm that stays on screen until you actively dismiss it.",
  },
  {
    question: "Can OnTimer remind me when it is time to leave?",
    answer:
      "Yes. For calendar events with a location, OnTimer offers Time To Leave alerts based on travel time and traffic. Time To Leave is a paid feature.",
  },
  {
    question: "Does OnTimer work with multiple calendars?",
    answer:
      "Yes. OnTimer supports multiple calendars, including Google, Apple, and Microsoft calendars.",
  },
  {
    question: "Who is OnTimer best for?",
    answer:
      "OnTimer is useful for busy professionals, people with back-to-back meetings, people who miss normal reminders, and people who struggle with time blindness or chronic lateness patterns.",
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

      <section className="overflow-hidden border-b border-zinc-900 bg-black">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:grid-cols-[0.98fr_1.02fr] lg:gap-16 lg:py-20">
          <div className="text-center lg:text-left">
            <SectionLabel>Automatic calendar alarms for iPhone</SectionLabel>
            <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Never be late again.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl lg:mx-0">
              Connect your Google, Apple, or Microsoft calendar once. OnTimer
              automatically turns upcoming events into alarms that stay visible
              until you respond, without rebuilding your schedule.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <HomepagePreviewCTA location="hero" />
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

          <HeroAnimationV2 />
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-black py-14 sm:py-[4.5rem]">
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

          <div className="mx-auto w-full max-w-[21rem] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 lg:justify-self-center">
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

      <section className="border-b border-zinc-900 bg-zinc-950 py-14 sm:py-[4.5rem]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="mx-auto grid w-full max-w-md grid-cols-[0.82fr_1fr] items-end gap-3 lg:max-w-[23rem] lg:justify-self-center">
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
              body="OnTimer works from your existing calendars and creates alarms automatically, so staying on time does not become another system to manage."
            />
            <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
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

      <section className="border-b border-zinc-900 bg-black py-14 sm:py-[4.5rem]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Where it helps"
            title="Built for moments where being late has a cost."
            body="Meetings are the everyday case, but the same alarm behavior helps whenever the calendar event matters."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-black px-5 py-4 text-base font-semibold text-white"
              >
                <span className="text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-zinc-950 py-14 sm:py-[4.5rem]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Connect once. Stay on time automatically."
            body="Your calendar remains the source of truth. OnTimer handles the timing layer before the moment to join, leave, or wrap up."
          />

          <div className="mt-10 grid gap-8 md:grid-cols-3">
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
                {item.number === "01" ? (
                  <div className="mt-5 grid gap-2">
                    {calendarLogos.map((calendar) => (
                      <div
                        key={calendar.label}
                        className="flex min-h-11 items-center gap-2 rounded-lg border border-zinc-800 bg-black px-3"
                      >
                        {calendar.src ? (
                          <Image
                            src={calendar.src}
                            alt=""
                            width={22}
                            height={22}
                            className="h-6 w-6 rounded-md object-cover"
                          />
                        ) : (
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[0.65rem] font-black text-black">
                            31
                          </span>
                        )}
                        <span className="text-xs font-semibold text-zinc-200">
                          {calendar.label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 bg-black py-14 sm:py-[4.5rem]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionLabel>Time To Leave / Planning tools</SectionLabel>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Plan ahead with free time calculators.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Work backward from flights, appointments, wake-up times, cruises,
              and travel so you know exactly when to leave.
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

      <section className="border-b border-zinc-900 bg-zinc-950 py-14 sm:py-[4.5rem]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            body="Short answers for the questions people usually have before trying OnTimer."
          />

          <div className="mt-10 divide-y divide-zinc-800 border-y border-zinc-800">
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

      <section className="border-b border-zinc-900 bg-black py-14 sm:py-[4.5rem]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionLabel>Learn</SectionLabel>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Explore calendar alarm guides.
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              Deep dives on notification failure, calendar alarms, Time To Leave,
              and the moments where a passive reminder is not enough.
            </p>
            <ul className="mt-7 grid gap-3">
              {popularGuides.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                  >
                    {label}
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Medication timing</SectionLabel>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              More scheduled moments.
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              OnTimer works from calendar events, including medication timing and
              other recurring schedules people cannot afford to miss.
            </p>
            <ul className="mt-7 grid gap-3">
              {medicationGuides.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
                  >
                    {label}
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-black py-14 sm:py-[4.5rem]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionLabel>Download OnTimer</SectionLabel>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Let your calendar keep you moving.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-400">
            Download OnTimer for iPhone and turn your calendar into automatic
            alarms for the moments you need to act.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HomepagePreviewCTA location="cta" />
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-12 items-center justify-center rounded-full border border-zinc-700 px-7 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-black md:inline-flex"
            >
              Download from the App Store
            </a>
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
