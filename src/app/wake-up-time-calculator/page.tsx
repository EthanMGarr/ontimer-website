import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import WakeUpCalculator from "./WakeUpCalculator";

export const metadata: Metadata = {
  title: "Wake-Up Time Calculator | OnTimer",
  description:
    "Calculate what time to wake up based on your arrival time, travel time, and how long you need to get ready. Free wake-up time calculator.",
  openGraph: {
    title: "Wake-Up Time Calculator | OnTimer",
    description:
      "Calculate what time to wake up based on your arrival time, travel time, and how long you need to get ready.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wake-Up Time Calculator",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A free calculator that tells you what time to wake up based on your destination, arrival time, travel time, and morning routine.",
  url: "https://www.ontimer.app/wake-up-time-calculator",
  author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
};

const faqItems = [
  {
    question: "How do I figure out what time to wake up?",
    answer:
      "Work backwards from when you need to arrive. Subtract your travel time, then how long you need to get ready, then any buffer for unexpected delays. That gives you the latest time you can wake up and still arrive on time.",
  },
  {
    question: "How long should I budget to get ready in the morning?",
    answer:
      "This varies significantly by person and situation. A quick workday morning might take 30 minutes. Getting ready for an important meeting or event might take 60 minutes or more. Be honest with yourself about how long you actually take, not how long you want to take.",
  },
  {
    question: "Should I build in extra time in the morning?",
    answer:
      "Almost always yes. Small delays compound in the morning — a slow shower, a spilled coffee, a missing item. A 10-minute buffer rarely costs you anything when everything goes right, but it prevents a lot of stress when something small goes wrong.",
  },
  {
    question: "What if I do not know the travel time?",
    answer:
      "Enter your starting location and destination and the calculator will estimate it using Google Maps. If you prefer, you can skip those fields and enter your travel time manually.",
  },
  {
    question: "Can OnTimer wake me up at the right time automatically?",
    answer:
      "OnTimer does not replace your alarm clock, but it can alert you when it is time to leave based on travel time and live traffic — for any event in your calendar with a location. Pair it with your existing alarm for a complete morning routine.",
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
      name: "Wake-Up Time Calculator",
      item: "https://www.ontimer.app/wake-up-time-calculator",
    },
  ],
};

export default function WakeUpTimeCalculatorPage() {
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
          <ol className="flex items-center gap-1.5 text-xs text-zinc-500">
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
            <li className="text-zinc-300">Wake-Up Time Calculator</li>
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
            Wake-Up Time{" "}
            <span className="text-green-500">Calculator</span>
          </h1>
          <p className="mt-2.5 max-w-xl text-base leading-relaxed text-zinc-400">
            Calculate what time to wake up based on your arrival time, travel time, and
            how long you need to get ready.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-green-400"
            >
              Calculate wake-up time
            </a>
            <Link
              href="/what-time-should-i-leave"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Leave time calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="border-t border-zinc-800 py-6 md:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <WakeUpCalculator />
        </div>
      </section>

      {/* ── CONVERSION CTA ── */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            The harder problem: actually getting out the door
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">
            Knowing when to wake up is step one. Knowing exactly when to leave — based
            on real-time traffic — is what determines whether you arrive on time.
            OnTimer handles the leave-time calculation automatically for any calendar
            event with a location.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Leave-time alerts based on live travel time and traffic",
              "Connects to Google Calendar and Microsoft Outlook",
              "Stronger alerts that are harder to sleep through or dismiss",
              "Works for work, appointments, flights, and more",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-400">
                <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AppStoreButton size="lg" location="wakeup_calculator_conversion" />
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How to figure out when to wake up
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              The math is simple but it is easy to get wrong. Start from when you need
              to arrive, then subtract travel time, then subtract how long you need to
              get ready, then add a buffer. What is left is your wake-up time.
            </p>
            <p>
              Most people underestimate at least one variable. Getting ready almost
              always takes longer than expected. Traffic during morning commute hours is
              often significantly worse than mid-day. And the buffer almost never feels
              necessary — until it is.
            </p>
            <p>
              This calculator does that math for you, using Google&apos;s live traffic
              data for the travel estimate. Enter your destination and arrival time and
              it handles the rest.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Common reasons people still end up late
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Woke up on time but still arrived late? A few patterns show up
              consistently.
            </p>
            <p>
              Getting ready took longer than planned. Most people have an optimistic
              mental model of their morning routine that does not match reality. If you
              consistently take 50 minutes to get ready, plan for 50 minutes, not 30.
            </p>
            <p>
              Traffic was worse than expected. Morning commute traffic is predictable in
              aggregate but variable on any given day. An accident, a lane closure, or
              unusually high volume can add meaningful time. A 10-minute buffer absorbs
              most of this.
            </p>
            <p>
              Too many small tasks at the end. Packing a bag, finding keys, letting a
              dog out — these tasks do not take long individually, but they add up when
              stacked right before you leave. If you find yourself doing these at the
              last minute, account for them in the extra time field.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            How stronger reminders can help
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Knowing the right wake-up time solves one problem. Actually getting up and
              leaving on time is a different one. Standard calendar reminders are quiet
              and easy to dismiss — which is fine for low-stakes events but not for
              anything you cannot afford to miss.
            </p>
            <p>
              OnTimer is designed to be harder to ignore. For any calendar event with a
              location, it alerts you when it is actually time to leave — calculated from
              real travel time, not a fixed offset. The alert is louder and more
              persistent than a standard notification.
            </p>
            <p>
              It is not a replacement for an alarm clock. But paired with your morning
              routine, it handles the part most people struggle with most: knowing
              exactly when to stop what you are doing and walk out the door.
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
          <h2 className="mb-6 text-xl font-bold text-white">Related calculators and guides</h2>
          <ul className="space-y-3">
            {[
              {
                href: "/what-time-should-i-leave",
                label: "What Time Should I Leave Calculator →",
              },
              {
                href: "/airport-time-to-leave-calculator",
                label: "Airport Time-to-Leave Calculator →",
              },
              {
                href: "/time-to-leave-reminders",
                label: "How to Get a Reminder When It's Time to Leave →",
              },
              {
                href: "/how-to-never-be-late-to-meetings",
                label: "How to Never Be Late to Meetings →",
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
            Start your mornings without the rush
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Download OnTimer and get automatic leave-time reminders for meetings,
            appointments, and every event in your calendar.
          </p>
          <div className="mt-8">
            <AppStoreButton size="lg" location="wakeup_calculator_final_cta" />
          </div>
        </div>
      </section>
    </>
  );
}
