import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";
import LeaveTimeCalculator from "./LeaveTimeCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/what-time-should-i-leave" },
  title: "What Time Should I Leave? Free Departure Time Calculator",
  description:
    "Calculate exactly when you should leave based on arrival time, traffic, commute length, and real-world delays. Free departure time calculator.",
  openGraph: {
    title: "What Time Should I Leave? Free Departure Time Calculator",
    description:
      "Calculate exactly when you should leave based on arrival time, traffic, commute length, and real-world delays. Free departure time calculator.",
  },
  twitter: {
    title: "What Time Should I Leave? Free Departure Time Calculator",
    description:
      "Calculate exactly when you should leave based on arrival time, traffic, commute length, and real-world delays. Free departure time calculator.",
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
    "A free departure time calculator that tells you exactly when to leave based on your destination, required arrival time, real-world traffic, and buffer.",
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
    question: "Can OnTimer automatically remind me when to leave?",
    answer:
      "Yes. For any calendar event with a location, OnTimer calculates when you need to leave based on travel time and traffic, then sends you an alert at the right time. No manual calculation needed.",
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
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.ontimer.app/tools" },
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
      <nav aria-label="Breadcrumb" className="border-b border-zinc-800/50 bg-zinc-950">
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
      <section className="relative overflow-hidden pb-5 pt-9 md:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-500">
            Free calculator
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            What Time Should{" "}
            <span className="text-green-500">I Leave?</span>
          </h1>
          <p className="mt-2.5 max-w-xl text-base leading-relaxed text-zinc-400">
            Know exactly when to leave so you&apos;re not late.
          </p>
          <p className="mt-3 max-w-xl text-sm text-zinc-400">
            Enter your destination, arrival time, and buffer. This departure time calculator uses
            real travel time and traffic to determine the exact moment to walk out the door.
          </p>
          <div className="mt-4">
            <p className="text-xs text-zinc-500">Popular uses:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Work commute",
                "Meetings",
                "Appointments",
                "Airport runs",
                "School pickup",
                "Events",
              ].map((use) => (
                <span
                  key={use}
                  className="rounded-full border border-zinc-700/60 px-2.5 py-0.5 text-xs text-zinc-400"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-green-400"
            >
              Calculate leave time
            </a>
            <Link
              href="/time-to-leave-reminders"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-300"
            >
              Never calculate this again → Get automatic leave-time alerts
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIRECT ANSWER ── */}
      <section className="border-t border-zinc-800/50 py-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-green-500/25 bg-green-500/5 p-3.5">
            <p className="text-sm font-semibold text-zinc-200">What time should I leave?</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              Start with your required arrival time, subtract travel time, then subtract a buffer
              for traffic or delays. The departure time calculator below does this automatically
              using real traffic data for your specific route and departure window.
            </p>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="border-t border-zinc-800 py-6 md:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <LeaveTimeCalculator />
        </div>
      </section>

      {/* ── CONVERSION CTA ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Stop doing this math every time
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            OnTimer connects to your calendar and automatically figures out your departure time
            for meetings, appointments, and any event with a location. It alerts you at the right
            moment based on traffic, not a guess.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Time-to-Leave alerts based on real travel time and live traffic",
              "Connects to Google Calendar and Microsoft Outlook",
              "Works for any event with a location in your calendar",
              "Stronger alerts that are harder to ignore than standard reminders",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AppStoreCTA location="leave_calculator_conversion" />
          </div>
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
              OnTimer works differently. It calculates your departure time based on real travel time
              and traffic, then sends you a stronger, harder-to-ignore alert at the right moment.
              Not a generic 15 minutes before start.
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
            <p>
              The formula: take your required arrival time, subtract your commute time at that hour,
              then subtract 5 to 10 minutes of buffer for minor delays. If you need to be at your
              desk by 9 AM and your rush-hour commute takes 28 minutes, your target departure time
              is 8:22 AM at the latest. Add time for parking or a longer building walk if needed.
            </p>
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

      {/* ── SCENARIO: Arrive On Time ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What Time Should I Leave to Arrive On Time?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              The formula for arrival planning is straightforward: departure time equals arrival
              time minus travel time minus buffer. The challenge is using the right inputs.
            </p>
            <p>
              Traffic is the largest variable. Travel time at 7:30 AM differs from 9 AM, which
              differs from noon. Standard route checkers give you a current snapshot, but departure
              planning requires a traffic-adjusted estimate for the specific window you are
              targeting. The calculator on this page uses Google&apos;s Routes API to account for
              predicted traffic at your planned departure time.
            </p>
            <p>
              The buffer matters more than people expect. A 10-minute buffer handles most common
              delays: a slow traffic light, a car looking for parking ahead of you, a longer walk
              from the parking structure. You almost never regret a buffer. You frequently regret
              not having one.
            </p>
            <p>
              Departure timing is harder than it looks because small delays compound quickly. Most
              people who run late did not plan to cut it close. They just ran through the math too
              optimistically. Build the buffer in at the start and arrival planning becomes much
              more reliable.
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
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white">
                  <span className="font-semibold leading-snug">{item.question}</span>
                  <span className="flex-shrink-0 text-lg text-green-500 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
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
