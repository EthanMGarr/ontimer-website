import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreCTA } from "@/components/CTAButton";
import { indexableTravelLocations } from "@/lib/travel-locations";
import AirportCalculator from "./AirportCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ontimer.app/airport-time-to-leave-calculator" },
  title: "Airport Time-to-Leave Calculator | What Time Should I Leave?",
  description:
    "Calculate exactly when to leave for the airport based on traffic, TSA wait times, parking, drive time, and flight departure.",
  openGraph: {
    title: "Airport Time-to-Leave Calculator | What Time Should I Leave?",
    description:
      "Calculate exactly when to leave for the airport based on traffic, TSA wait times, parking, drive time, and flight departure.",
  },
  twitter: {
    title: "Airport Time-to-Leave Calculator | What Time Should I Leave?",
    description:
      "Calculate exactly when to leave for the airport based on traffic, TSA wait times, parking, drive time, and flight departure.",
  },
};

const faqItems = [
  {
    question: "When should I leave for the airport?",
    answer:
      "It depends on your flight type, security setup, bags, and how you're getting there. A common rule: domestic flights need you at the airport 2 hours early, international 3 hours. Add your drive time and any parking buffer on top of that. Use the calculator above to get a specific leave time.",
  },
  {
    question: "How early should I get to the airport for a domestic flight?",
    answer:
      "Most airlines and TSA recommend arriving 2 hours before a domestic flight. If you have TSA PreCheck or Global Entry, you may be able to shave 15 minutes off that. If you're checking a bag or driving to park, add extra time.",
  },
  {
    question: "How early should I get to the airport for an international flight?",
    answer:
      "3 hours before departure is the standard recommendation for international flights. Customs pre-clearance, longer security lines, and stricter bag drop cutoffs all add time. If traveling during peak hours or from a large hub, giving yourself more time is rarely the wrong call.",
  },
  {
    question: "Does traffic change when I should leave for the airport?",
    answer:
      "Yes, significantly. A 30-minute drive during off-peak hours can become 60+ minutes during rush hour near major airports. Always estimate your drive time based on when you'll actually be leaving, not a generic average.",
  },
  {
    question: "How much extra time should I allow for parking?",
    answer:
      "Add at least 15–20 minutes for airport parking. This accounts for finding a spot, waiting for a shuttle, and the ride to the terminal. Economy lots are farther away and can easily add 30 minutes round-trip.",
  },
  {
    question: "Should I arrive earlier if I'm checking a bag?",
    answer:
      "Yes. Most airlines close bag check 30–45 minutes before departure. If you're running late and can't check your bag, you may be denied boarding. Add 15–20 minutes to your buffer if you're checking luggage.",
  },
  {
    question: "Can OnTimer remind me when to leave for the airport?",
    answer:
      "OnTimer is built for calendar events with locations — like flights, meetings, and appointments. For any event with an address, OnTimer's Time-to-Leave feature can alert you when it's time to head out, based on travel time and traffic. Time-to-Leave is a Pro feature.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Airport Time-to-Leave Calculator",
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "A free airport departure time calculator that estimates when you should leave for the airport based on your flight time, traffic, TSA wait times, parking, and arrival method.",
  url: "https://www.ontimer.app/airport-time-to-leave-calculator",
  author: {
    "@type": "Organization",
    name: "OnTimer",
    url: "https://www.ontimer.app",
  },
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
      name: "Airport Time-to-Leave Calculator",
      item: "https://www.ontimer.app/airport-time-to-leave-calculator",
    },
  ],
};

export default function AirportTimeToLeaveCalculator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
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
            <li className="text-zinc-300">Airport Time-to-Leave Calculator</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO (compressed — calculator below) ── */}
      <section className="relative overflow-hidden pb-3 pt-5 md:pt-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-1.5 text-sm font-semibold uppercase tracking-wider text-green-500">
            Free Airport Leave Time Calculator from OnTimer
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            What Time Should I Leave for the{" "}
            <span className="text-green-500">Airport?</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            Get a personalized airport leave time using live traffic, TSA estimates, parking time, and airport timing.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="border-t border-zinc-800 pb-6 pt-3 md:pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <AirportCalculator genericRedesign />
          <p className="mt-5 text-center text-sm text-zinc-400">
            This calculator is for realistic departure planning. For a fun take on risky airport
            timing, see the{" "}
            <Link
              href="/airport-theory-calculator"
              className="text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-300"
            >
              Airport Theory Calculator (experimental)
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── SEO #1: How Early Should You Leave ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How Early Should You Leave for the Airport?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Plan to arrive 2 hours early for domestic flights and 3 hours early for international
              flights. Then add your actual drive time on top of that. The result is your leave
              time — not a rough guess.
            </p>
            <p>
              Those airport arrival windows exist for a reason: security lines, bag drop cutoffs,
              and terminal walking time all absorb the margin most people assume they have. The
              calculator above applies that math to your specific route and departure time.
            </p>
            <p>
              What the standard rule doesn&apos;t account for: whether you&apos;re parking (add
              15–20 minutes), checking a bag (add another 15 minutes), or traveling during a peak
              traffic window. Each of those can individually erase the buffer you thought you had.
            </p>
          </div>
        </div>
      </section>

      {/* ── SEO #2: Leave Time by Flight Time ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            When Should You Leave for the Airport Based on Your Flight Time?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              The departure time on your ticket tells you when to stop calculating backwards.
              For a domestic flight at noon, subtract 2 hours to get your required airport arrival
              (10 AM), then subtract your drive time from that. If the drive is 40 minutes, you
              need to leave by 9:20 AM — before accounting for parking or traffic.
            </p>
            <p>
              Flight time affects how much traffic you&apos;ll hit. An early morning flight sounds
              easy until you realize you&apos;re driving to the airport at 5 AM — which is actually
              light traffic and often faster than you expect. A noon flight means leaving during
              morning rush, which can add 20–40 minutes to a drive that looks short on the map.
            </p>
            <p>
              Evening flights are the most commonly misjudged. Traffic has thinned, so the drive
              feels easy — but airports are busiest in the late afternoon and security lines reflect
              that. The drive is shorter; the airport wait often isn&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* ── SEO #3: When should you leave ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            When should you leave for the airport?
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Work backwards from your flight. Start with when you need to be at the airport
              (2 hours before domestic, 3 hours before international), then subtract your actual
              drive time. That&apos;s your leave time.
            </p>
            <p>
              The inputs that shift the answer meaningfully: parking adds 15–20 minutes, checking
              a bag adds 15 minutes, and driving during rush hour can double a drive that looks
              routine on the map. Most people who miss flights didn&apos;t plan to cut it close —
              they just ran the math optimistically on one of these.
            </p>
            <p>
              The calculator above runs this backwards from your flight time using live traffic,
              TSA wait estimates for your airport, and your specific situation. Enter your departure
              and it returns the latest reasonable moment to leave your door.
            </p>
          </div>
        </div>
      </section>

      {/* ── SEO #4: Why airport timing is harder ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Why airport timing is harder than it looks
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Most people have a rough sense of how far the airport is. What they underestimate is
              how many places in the chain can absorb time unexpectedly.
            </p>
            <p>
              Traffic changes. A drive that takes 30 minutes on Sunday morning takes 55 minutes on a
              Tuesday at 5 PM. If you pulled your estimate from earlier in the day, you may already
              be behind before you leave.
            </p>
            <p>
              Parking adds time in ways that are easy to overlook. Finding a spot, waiting for the
              shuttle, riding to the terminal: economy parking at a major airport can easily absorb
              20 to 30 minutes that most people do not budget for.
            </p>
            <p>
              Bag check has a hard cutoff. Miss it and you lose your checked bag for the trip or
              miss the flight entirely. That cutoff does not care how close you are to the airport.
            </p>
            <p>
              Security lines are unpredictable and heavily influenced by TSA wait times, staffing,
              and checkpoint volume. Even with TSA PreCheck, a busy period can add meaningful delay.
            </p>
            <p>
              The biggest factor is overconfidence. Most people who miss flights were not planning
              to cut it close. They just ran through the departure timing math too optimistically. A
              small buffer in every step of the chain is cheap insurance.
            </p>
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="text-sm font-semibold text-white mb-2">The execution gap at the airport</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Most missed flights don&apos;t happen because people forgot about the flight. They happen
                in the final execution window — knowing you need to leave and actually leaving.{" "}
                <strong className="text-white">This is the{" "}
                <Link href="/last-5-minutes-problem" className="text-green-500 hover:text-green-400">
                  Last 5 Minutes Problem
                </Link>
                .</strong>{" "}
                Knowing the right departure time is step one. Having something that
                actually interrupts you and forces you out the door at that moment is step two.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Link href="/last-5-minutes-problem" className="block text-sm text-green-500 hover:text-green-400 transition-colors font-medium">
              The Last 5 Minutes Problem: why knowing isn&apos;t enough →
            </Link>
            <Link href="/why-notifications-fail" className="block text-sm text-green-500 hover:text-green-400 transition-colors">
              Why notifications fail at the worst moment →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONVERSION — stop doing the math yourself ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Stop calculating this every trip
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            OnTimer can automatically remind you when it&apos;s time to leave for flights,
            meetings, appointments, and any event with a location. No more doing the math yourself
            before every trip.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Time-to-Leave alerts based on real travel time and traffic",
              "Connects to Google Calendar and Microsoft Outlook",
              "Works for flights, meetings, appointments — any event with a location",
              "Customizable lead time and buffer settings",
              "iPhone app — alarms that actually get your attention",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AppStoreCTA location="airport_calculator_conversion" />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            A better way to avoid missing flights
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Calculating your departure time manually every trip works, until it doesn&apos;t. You
              forget, you rush, you underestimate. The math is not hard. The problem is remembering
              to do it, at the right moment, with the right inputs.
            </p>
            <p>
              OnTimer is an iPhone app designed to solve this automatically. It calculates when you
              need to leave based on real-world conditions like traffic and timing, so you
              don&apos;t have to rely on static estimates or guesswork.
            </p>
            <p>
              The same feature works for meetings, appointments, pickups, and anything else in your
              calendar with a location. You stop having to think about it. OnTimer handles the
              departure timing.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <AppStoreCTA location="airport_calculator_seo_cta" />
            <Link
              href="/time-to-leave-reminders"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              How Time-to-Leave works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-zinc-800 py-20">
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

      {/* ── RELATED LINKS ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-black text-white">Airport-specific calculator</h2>
          <p className="mt-3 text-zinc-400">
            Newark is the first location-specific planning guide. Enter your origin and flight time
            for an EWR calculation with airport-transfer context.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {indexableTravelLocations.map((location) => (
              <Link
                key={location.code}
                href={`/airport-time-to-leave/${location.slug}`}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 transition-colors hover:border-green-800"
              >
                <span className="block text-sm font-semibold text-green-500">{location.code}</span>
                <span className="mt-1 block font-bold text-white">{location.shortName}</span>
              </Link>
            ))}
          </div>

          <h2 className="mb-6 mt-12 text-xl font-bold text-white">Related timing tools</h2>
          <ul className="space-y-3">
            {[
              {
                href: "/what-time-should-i-leave",
                label: "Leave-Time Calculator: Commutes, Meetings, and Appointments →",
              },
              {
                href: "/wake-up-time-calculator",
                label: "Wake-Up Time Calculator →",
              },
              {
                href: "/airport-theory-calculator",
                label: "Airport Theory Calculator (experimental) →",
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
                label: "ADHD Time Blindness: Departure Planning Tools →",
              },
              {
                href: "/last-5-minutes-problem",
                label: "The Last 5 Minutes Problem: Why Reminders Fail at the Worst Moment →",
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
            Never cut it close again
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and get automatic leave-time reminders for flights, meetings, and
            every event in your calendar.
          </p>
          <div className="mt-8">
            <AppStoreCTA location="airport_calculator_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
