import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import AirportCalculator from "./AirportCalculator";

export const metadata: Metadata = {
  title: "What Time Should I Leave for the Airport? (Free Calculator)",
  description:
    "Calculate exactly when to leave for the airport based on your flight time, traffic, and security. Avoid being late or missing your flight.",
  openGraph: {
    title: "What Time Should I Leave for the Airport? (Free Calculator)",
    description:
      "Calculate exactly when to leave for the airport based on your flight time, traffic, and security. Avoid being late or missing your flight.",
  },
  twitter: {
    title: "What Time Should I Leave for the Airport? (Free Calculator)",
    description:
      "Calculate exactly when to leave for the airport based on your flight time, traffic, and security. Avoid being late or missing your flight.",
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
  name: "OnTimer Airport Time-to-Leave Calculator",
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "A free calculator that estimates when you should leave for the airport based on your flight time, traffic, security buffer, bags, and arrival method.",
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
    { "@type": "ListItem", position: 3, name: "Airport Time-to-Leave Calculator", item: "https://www.ontimer.app/airport-time-to-leave-calculator" },
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
            <li><Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><span className="text-zinc-400">Tools</span></li>
            <li aria-hidden="true">›</li>
            <li className="text-zinc-300">Airport Time-to-Leave Calculator</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO (compressed — calculator below) ── */}
      <section className="relative overflow-hidden pb-5 pt-9 md:pt-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-500">
            Free calculator
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            What Time Should I Leave for the{" "}
            <span className="text-green-500">Airport?</span>
          </h1>
          <div className="mt-4 max-w-xl rounded-xl border border-green-500/30 bg-green-500/5 p-4">
            <p className="text-sm leading-relaxed text-zinc-300">
              Most flights require you to leave for the airport 2–3 hours before
              departure. Your exact leave time depends on traffic, airport size,
              and security lines. Use the calculator below to get your exact
              departure time.
            </p>
          </div>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            If you&apos;re wondering what time to leave for the airport, the
            general rule is to arrive 2–3 hours before your flight. That means
            your leave time depends on how long it takes to get there, plus
            buffer for traffic and delays.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-400">
            For example, if your flight boards at 3:00 PM and it takes 45
            minutes to drive to the airport, you may need to leave around
            11:15 AM to stay safe.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-400">
            But every trip is different. Traffic, airport size, time of day, and
            security lines can all affect your timing. That&apos;s why using a
            calculator is the most reliable way to avoid cutting it too close.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="border-t border-zinc-800 py-6 md:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <AirportCalculator />
          <p className="mt-5 text-center text-sm text-zinc-400">
            Want to see how far you can push it?{" "}
            <Link
              href="/airport-theory-calculator"
              className="text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-300"
            >
              Try the Airport Theory Calculator →
            </Link>
          </p>
        </div>
      </section>

      {/* ── SEO #1: How Early Should You Leave ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How Early Should You Leave for the Airport?
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>For most flights, you should plan your airport arrival time first:</p>
            <ul className="space-y-2">
              {[
                "Domestic flights: arrive 2 hours before departure",
                "International flights: arrive 3 hours before departure",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-green-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              However, this is your arrival time — not when you should leave
              your house.
            </p>
            <p>
              To determine when to leave, subtract your travel time and add
              buffer for traffic, parking, and delays.
            </p>
            <p>
              Most people underestimate how early they need to leave —
              especially during peak travel times.
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
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Your ideal leave time depends heavily on when your flight departs:
            </p>
            <ul className="space-y-2">
              {[
                "Morning flights often require earlier departure due to rush hour traffic",
                "Afternoon flights can be impacted by both traffic and longer security lines",
                "Evening flights may have lighter traffic but still require full airport buffer time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-green-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              The safest approach is to calculate your leave time based on your
              specific route and departure time, rather than relying on a fixed
              rule.
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
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              There is no single right answer, but a few factors always matter:
              whether you&apos;re flying domestic or international, how long
              security will take, whether you&apos;re checking a bag, and how
              long the drive actually is at the time you&apos;re leaving. Security
              time in particular varies widely depending on TSA wait times, time
              of day, and airport traffic.
            </p>
            <p>
              Most people underestimate at least one of these. They check traffic
              on Google Maps and assume a 35-minute drive, but forget that
              they&apos;re leaving during rush hour, need to find parking, and
              still have to get through a bag drop line. The math compounds
              quickly.
            </p>
            <p>
              A reliable estimate works backwards from your departure time:
              subtract the airport arrival buffer first, then subtract travel
              time. The result is the latest reasonable moment to walk out the
              door. The calculator above automates that math using real-world
              inputs like TSA wait times and travel conditions.
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
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Most people have a rough sense of how far the airport is. What
              they underestimate is how many places in the chain can absorb time
              unexpectedly.
            </p>
            <p>
              Traffic changes. A drive that takes 30 minutes on Sunday morning
              takes 55 minutes on a Tuesday at 5 PM. If you pulled your estimate
              from earlier in the day, you may already be behind before you
              leave.
            </p>
            <p>
              Parking adds time in ways that are easy to overlook. Finding a
              spot, waiting for the shuttle, riding to the terminal — economy
              parking at a major airport can easily absorb 20 to 30 minutes that
              most people do not budget for.
            </p>
            <p>
              Bag check has a hard cutoff. Miss it and you lose your checked bag
              for the trip or miss the flight entirely. That cutoff does not care
              how close you are to the airport.
            </p>
            <p>
              Security lines are unpredictable and heavily influenced by TSA
              wait times, staffing, and checkpoint volume. Even with TSA
              PreCheck, a busy period can add meaningful delay.
            </p>
            <p>
              The biggest factor is overconfidence. Most people who miss flights
              were not planning to cut it close. They just ran through the math
              too optimistically. A small buffer in every step of the chain is
              cheap insurance.
            </p>
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
            OnTimer can automatically remind you when it&apos;s time to leave for
            events with locations — flights, meetings, appointments, and more. No
            more doing the math yourself before every trip.
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
            <AppStoreButton size="lg" location="airport_calculator_conversion" />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            A better way to avoid missing flights
          </h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Calculating your leave time manually every trip works — until it
              doesn&apos;t. You forget, you rush, you underestimate. The math is
              not hard. The problem is remembering to do it, at the right moment,
              with the right inputs.
            </p>
            <p>
              OnTimer is an iPhone app designed to solve this automatically. It
              calculates when you need to leave based on real-world conditions
              like traffic and timing — so you don&apos;t have to rely on static
              estimates or guesswork.
            </p>
            <p>
              The same feature works for meetings, appointments, pickups, and
              anything else in your calendar with a location. You stop having to
              think about it. OnTimer handles the timing.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <AppStoreButton size="lg" location="airport_calculator_seo_cta" />
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
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="border-t border-zinc-800 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">Related guides</h2>
          <ul className="space-y-3">
            {[
              {
                href: "/what-time-should-i-leave",
                label: "What Time Should I Leave Calculator →",
              },
              {
                href: "/wake-up-time-calculator",
                label: "Wake-Up Time Calculator →",
              },
              {
                href: "/time-to-leave-reminders",
                label: "How to Get a Reminder When It's Time to Leave →",
              },
              {
                href: "/never-be-late-to-meetings",
                label: "How to Never Be Late to Meetings →",
              },
              {
                href: "/loud-calendar-alerts-iphone",
                label: "How to Get Loud Calendar Alerts on iPhone →",
              },
              {
                href: "/features",
                label: "All OnTimer Features →",
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
            Download OnTimer and get automatic leave-time reminders for flights,
            meetings, and every event in your calendar.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="airport_calculator_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
