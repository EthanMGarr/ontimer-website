import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";
import LeaveTimeCalculator from "./LeaveTimeCalculator";
import { localizedAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.ontimer.app/what-time-should-i-leave",
    ...localizedAlternates("/what-time-should-i-leave", "/es/calculadora-a-que-hora-salir"),
  },
  title: "What Time Should I Leave? Free Departure Time Calculator",
  description:
    "Going somewhere? This free calculator uses traffic-aware routing, travel mode, arrival time, and your buffer to tell you when to leave—no sign-up required.",
  openGraph: {
    title: "What Time Should I Leave? Free Departure Time Calculator",
    description:
      "Going somewhere? This free calculator uses traffic-aware routing, travel mode, arrival time, and your buffer to tell you when to leave—no sign-up required.",
  },
  twitter: {
    title: "What Time Should I Leave? Free Departure Time Calculator",
    description:
      "Going somewhere? This free calculator uses traffic-aware routing, travel mode, arrival time, and your buffer to tell you when to leave—no sign-up required.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Departure Time Calculator",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Going somewhere? This free calculator uses traffic-aware routing, travel mode, arrival time, and your buffer to tell you when to leave—no sign-up required.",
  url: "https://www.ontimer.app/what-time-should-i-leave",
  author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
};

const faqItems = [
  {
    question: "How do I calculate what time I should leave?",
    answer:
      "Work backwards from when you need to arrive. Subtract your travel time, then subtract any buffer for unexpected delays, and any extra time you need for parking or checking in. The result is the latest you should walk out the door.",
  },
  {
    question: "How much buffer should I add before a meeting or appointment?",
    answer:
      "A 10-minute buffer handles most minor delays: a slow traffic light, a parking spot that takes a minute to find, or a brief wait in a lobby. For important appointments like job interviews or medical visits, 15–20 minutes is worth it.",
  },
  {
    question: "Does travel time change based on when I leave?",
    answer:
      "Yes. Traffic varies significantly by time of day and day of week. Leaving at 8 AM on a Tuesday is very different from leaving at 10 AM or on a Saturday. This calculator uses Google's live traffic data to estimate travel time based on when you plan to arrive.",
  },
  {
    question: "What if I am taking transit or walking?",
    answer:
      "Use the Transit or Walking mode in the calculator. Walking time is straightforward. Transit times depend on schedules and may have more variability, so adding a few extra minutes of buffer is a good idea.",
  },
  {
    question: "What time should I leave for work?",
    answer:
      "Calculate your commute time for the hour you would actually be leaving, not an off-peak estimate. Subtract that travel time from your required arrival time, then add 5 to 10 minutes of buffer. If your commute takes 30 minutes during morning rush and you need to arrive by 9 AM, your departure time should be no later than 8:20 AM. Use the calculator above with your specific route and departure window to get a traffic-adjusted estimate.",
  },
  {
    question: "What time should I leave for a meeting or appointment?",
    answer:
      "Back-calculate from the meeting or appointment start time. Subtract travel time, then add buffer for parking, check-in, or navigating a new building. For important appointments, a 10 to 15 minute buffer is a reasonable target. For client meetings or job interviews, plan to arrive at least 10 minutes early. Enter the address and arrival time into the calculator to get a specific departure time.",
  },
  {
    question: "What time should I leave to pick someone up?",
    answer:
      "Use the time the person expects to be ready, then subtract the traffic-aware travel time from your starting point and any buffer for parking, waiting, or finding the pickup location. Select Pick up in the calculator to use pickup-specific labels and save the result to your calendar.",
  },
  {
    question: "What time should I leave to drop someone off on time?",
    answer:
      "Start with when the person needs to arrive. Subtract the traffic-aware travel time, then subtract time for parking, unloading, walking them inside, or completing the handoff. Select Drop off in the calculator to calculate and save the leave time.",
  },
  {
    question: "Can OnTimer automatically remind me when to leave?",
    answer:
      "Yes. For any calendar event with a location, OnTimer calculates when you need to leave based on travel time and traffic, then sends you an alert at the right time. No manual calculation needed.",
  },
];

const snippetEligibleFaqItems = faqItems.filter((_, index) => index !== 0 && index !== 4);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: snippetEligibleFaqItems.map((item) => ({
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
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.ontimer.app/time-calculators" },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Time Should I Leave Calculator",
      item: "https://www.ontimer.app/what-time-should-i-leave",
    },
  ],
};

export default function WhatTimeShouldILeavePage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── BREADCRUMBS ── */}
      <nav aria-label="Breadcrumb" className="hidden border-b border-zinc-800/50 bg-zinc-950 sm:block">
        <div className="mx-auto max-w-3xl px-4 py-2.5 sm:px-6">
          <ol className="flex items-center gap-1.5 text-xs text-zinc-400">
            <li>
              <Link href="/" className="transition-colors hover:text-zinc-300">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <span className="text-zinc-400">Tools</span>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-zinc-300">What Time Should I Leave Calculator</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-3 pt-4 sm:pb-5 sm:pt-7 md:pt-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-green-500 sm:mb-2 sm:text-sm">
            <span className="sm:hidden">Free departure time calculator</span>
            <span className="hidden sm:inline">Free Departure Time Calculator · No Sign-Up Required</span>
          </p>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            What Time Should{" "}
            <span className="text-green-500">I Leave?</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:mt-3 sm:text-base">
            Going somewhere? This free calculator uses traffic-aware routing, travel mode, arrival
            time, and your buffer to tell you when to leave—no sign-up required.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="border-t border-zinc-800 pb-8 pt-2 sm:pt-4 md:pb-10 md:pt-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <LeaveTimeCalculator />
        </div>
      </section>

      {/* ── DIRECT ANSWER ── */}
      <section className="border-t border-zinc-800/50 py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/25 bg-green-500/5 p-4 sm:p-5">
            <h2 className="text-lg font-bold text-zinc-100">How to calculate when to leave</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Enter your starting point, destination, travel mode, and required arrival time. The
              calculator estimates the route for that travel window and subtracts your chosen
              buffer to give you a personalized leave time.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              Useful for commutes, meetings, appointments, pickups, drop-offs, events, and airport runs.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONVERSION CTA ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Stop doing this math every time
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            OnTimer connects to your calendar and automatically figures out your departure time
            for meetings, appointments, and any event with a location. It alerts you at the right
            moment based on traffic, not a guess.
          </p>
          <div className="mt-6">
            <AppStoreCTA location="leave_calculator_conversion" />
          </div>
          <ul className="mt-6 space-y-3">
            {[
              "Time-to-Leave alerts based on real travel time and live traffic",
              "Connects to Google Calendar, Apple Calendar, and Outlook Calendar",
              "Works for any event with a location in your calendar",
              "Stronger alerts that are harder to ignore than standard reminders",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SEO CONTENT ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How this calculator works
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              The departure time calculation starts from your required arrival time, then subtracts
              travel time, your buffer, and any extra time for parking or check-in. The result is
              your exact leave time: when you should walk out the door.
            </p>
            <p>
              Travel time is estimated using Google&apos;s Routes API, which accounts for current
              and predicted traffic based on your departure time. Walking and transit times are also
              supported. If Google cannot estimate the route, you can enter the travel time manually.
            </p>
            <p>
              The buffer is there because real life is not perfectly predictable. A 10-minute buffer
              costs you very little if everything goes smoothly, but saves you a lot of stress if
              something small goes wrong.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What to factor in before you leave
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Traffic is the most variable factor. A route that takes 20 minutes at 10 AM might
              take 40 minutes at 5 PM on the same road. If your meeting is during peak hours, use a
              realistic estimate: not the best-case time from an earlier route check.
            </p>
            <p>
              Parking and getting inside takes longer than most people expect. Finding a spot,
              walking to the building, waiting for an elevator: these steps easily add 5 to 15
              minutes before you are actually in the room. The prep time field in the calculator is
              for exactly this.
            </p>
            <p>
              Give yourself a buffer even when you think you do not need one. Unexpected things
              happen: a slow traffic light, a confusing entrance, a detour. A 10-minute buffer costs
              almost nothing when everything goes right, and buys you meaningful peace of mind when
              it does not.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why standard reminders often are not enough
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Calendar reminders are easy to set and easy to dismiss. Most people set them for 15
              or 30 minutes before an event, but that is often not enough time to actually get
              ready, get out the door, and drive somewhere with any margin.
            </p>
            <p>
              Standard reminders also do not account for travel time at all. A 15-minute reminder
              before a meeting 25 minutes away means you are already late before you leave.
            </p>
            <p>
              But there is a deeper problem. Even when the math is right, knowing when to leave and
              actually leaving are two different things. This is the{" "}
              <Link href="/last-5-minutes-problem" className="text-green-500 hover:text-green-400">
                Last 5 Minutes Problem
              </Link>
              : the execution gap between receiving a reminder and acting on it before the window closes.
              A passive notification that disappears does not close that gap.{" "}
              <Link href="/why-notifications-fail" className="text-green-500 hover:text-green-400">
                Persistent alarms do.
              </Link>
            </p>
            <p>
              OnTimer works differently. It calculates your departure time based on real travel time
              and traffic, then fires a persistent alarm at the right moment — an alert that stays
              on your screen until you dismiss it, not a notification that vanishes.
            </p>
          </div>
        </div>
      </section>

      {/* ── SCENARIO: Work ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Time Should I Leave for Work?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Your commute takes longer during morning rush than a midday route check suggests. A
              drive that shows 20 minutes on Google Maps at noon can take 35 minutes when you are
              actually leaving at 8 AM. Your departure time calculation should use your actual
              departure window, not an off-peak estimate.
            </p>
            <div data-nosnippet>
              The formula: take your required arrival time, subtract your commute time at that hour,
              then subtract 5 to 10 minutes of buffer for minor delays. If you need to be at your
              desk by 9 AM and your rush-hour commute takes 28 minutes, your target departure time
              is 8:22 AM at the latest. Add time for parking or a longer building walk if needed.
            </div>
            <p>
              Most commuters underestimate their departure time by 10 to 15 minutes because they
              plan based on best-case traffic. Rush hour adds time in both directions: the drive
              itself and the time to exit your neighborhood or reach the main route.
            </p>
            <p>
              Use the departure time calculator above with your office address and your actual
              planned departure window. It returns a traffic-adjusted travel time estimate so you
              know your real leave-by time, not an optimistic one.
            </p>
          </div>
        </div>
      </section>

      {/* ── SCENARIO: Appointment ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Time Should I Leave for an Appointment?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              For medical visits, dentist appointments, government offices, and any appointment with
              a hard start time, being late often means losing your slot. The buffer needed for
              arrival planning is higher than a typical commute.
            </p>
            <p>
              Work backward from your appointment time. Subtract your travel time, add 10 to 15
              minutes for check-in or registration, and include time for parking at an unfamiliar
              location. For appointments you cannot easily reschedule, a 15-minute cushion is worth
              building in.
            </p>
            <p>
              The common mistake is treating the waiting room as your buffer. Receptionists mark
              you as late when you walk in, not when you sit down. Arriving at 2:03 for a 2:00 PM
              appointment means you were late.
            </p>
            <p>
              Use the leave-time calculator above with your appointment address and required arrival
              time. Set the prep time field to include check-in time so your departure time accounts
              for the full picture.
            </p>
          </div>
        </div>
      </section>

      {/* ── SCENARIO: Meeting ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Time Should I Leave for a Meeting?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Whether you are meeting a client, heading to an off-site team meeting, or showing up
              for an interview, arriving on time signals that you planned ahead. Five minutes early
              is much better than two minutes late.
            </p>
            <p>
              Work backward from the meeting start time. Subtract travel time, then add buffer for
              parking and finding the right floor or conference room. For an unfamiliar location,
              add extra time since navigating a new building takes longer than you expect.
            </p>
            <p>
              For client meetings or interviews, plan to arrive 10 to 15 minutes before the meeting
              time. For internal team meetings at a familiar location, 5 minutes is usually enough.
            </p>
            <p>
              The biggest variable is traffic at your specific departure time. A downtown meeting at
              10 AM has different traffic conditions than the same route at 8:30 AM. Enter the
              meeting address and required arrival time into the departure time calculator above to
              get a traffic-adjusted leave time for your specific route and departure window.
            </p>
          </div>
        </div>
      </section>

      {/* ── SCENARIOS: Pickup and drop-off ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Time Should I Leave to Pick Someone Up?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Start with the time the person expects to be ready, not simply when their class,
              train, appointment, or event is scheduled to end. Subtract the traffic-aware travel
              time from your starting point, then subtract any time you want for parking, waiting,
              or finding the pickup location.
            </p>
            <p>
              Select <strong className="font-semibold text-zinc-200">Pick up</strong> in the
              calculator above, enter the pickup location and when they expect to be ready, and add
              a waiting or parking buffer if the handoff may take extra time. For a flight arrival,
              use the specialized{" "}
              <Link href="/airport-pickup-time-calculator" className="text-green-500 hover:text-green-400">
                Airport Pickup Time Calculator
              </Link>{" "}
              so deplaning, bags, immigration, and the meeting point are included.
            </p>

            <h3 className="pt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What Time Should I Leave to Drop Someone Off on Time?
            </h3>
            <p>
              Work backward from when the person needs to arrive. Subtract the travel time for that
              part of the day, then subtract time for unloading, walking them inside, or completing
              the handoff. Select <strong className="font-semibold text-zinc-200">Drop off</strong>{" "}
              above to make the destination, arrival deadline, and handoff time explicit.
            </p>
            <p>
              This works for school or daycare drop-off, a train or bus station, an appointment, or
              an event. If you are taking someone to a flight, use the{" "}
              <Link href="/airport-time-to-leave-calculator" className="text-green-500 hover:text-green-400">
                Airport Time-to-Leave Calculator
              </Link>{" "}
              to include airline check-in, security, baggage, parking, and terminal time.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-10 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-zinc-800">
            {faqItems.map((item, index) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white">
                  <span className="font-semibold leading-snug">{item.question}</span>
                  <span className="flex-shrink-0 text-lg text-green-500 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div
                  className="mt-4 text-sm leading-relaxed text-zinc-400"
                  data-nosnippet={index === 0 || index === 4 || undefined}
                >
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED TOOLS ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related timing tools</h2>
          <ul className="space-y-3">
            {[
              {
                href: "/wake-up-time-calculator",
                label: "Wake-Up Time Calculator →",
              },
              {
                href: "/airport-time-to-leave-calculator",
                label: "Airport Time-to-Leave Calculator →",
              },
              {
                href: "/airport-theory-calculator",
                label: "Airport Theory Calculator (how close can you cut it?) →",
              },
              {
                href: "/time-to-leave-reminders",
                label: "Time-to-Leave Reminders: Automatic Departure Alerts →",
              },
              {
                href: "/never-be-late-to-meetings",
                label: "How to Never Be Late to Meetings →",
              },
              {
                href: "/adhd-time-blindness-tools",
                label: "ADHD Time Blindness: Tools That Actually Help →",
              },
              {
                href: "/last-5-minutes-problem",
                label: "The Last 5 Minutes Problem: Why Reminders Fail When You Need Them Most →",
              },
              {
                href: "/turn-calendar-events-into-alarms",
                label: "Turn Calendar Events Into Persistent Alarms →",
              },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-green-500 transition-colors hover:text-green-400"
                >
                  {link.label}
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
            Get there on time, every time
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and get automatic leave-time reminders for meetings, appointments, and
            every event in your calendar.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="leave_calculator_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
