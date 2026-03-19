/// Airport Theory Calculator landing page — SEO server component.
///
/// ## Purpose
/// Provides metadata, structured data, hero, long-form SEO content, FAQ,
/// and conversion elements for the Airport Theory Calculator tool.
///
/// ## Include
/// - Metadata + OpenGraph + Twitter cards
/// - FAQ JSON-LD schema
/// - Hero with humor-forward framing
/// - Long-form content sections (H2s for SEO)
/// - AirportTheoryCalculator client component
/// - OnTimer app CTA
///
/// ## Don't Include
/// - Interactive calculator logic — lives in AirportTheoryCalculator.tsx
/// - Travel time fetching — handled by /api/travel-time
///
/// ## Lifecycle & Usage
/// Server-rendered page component. No client state.

import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/CTAButton";
import AirportTheoryCalculator from "./AirportTheoryCalculator";

export const metadata: Metadata = {
  title: "Airport Theory Calculator: How Late Can You Leave for a Flight? | OnTimer",
  description:
    "Calculate the absolute minimum time you can leave for the airport at three aggression levels — Responsible Adult, Cutting It Close, and Absolute Maniac. Warning: this is a terrible idea.",
  openGraph: {
    title: "Airport Theory Calculator: How Late Can You Leave for a Flight?",
    description:
      "Calculate the absolute minimum time you can leave for the airport. Three aggression levels. One terrible idea. Warning: this is not a real recommendation.",
  },
  twitter: {
    title: "Airport Theory Calculator: How Late Can You Leave for a Flight?",
    description:
      "Three aggression levels. One terrible idea. Warning: this is not a real recommendation.",
    card: "summary_large_image",
  },
};

const faqItems = [
  {
    question: "What is Airport Theory?",
    answer:
      "Airport Theory is the informal idea that you can leave for the airport much later than official recommendations suggest — if everything goes perfectly. It's based on optimistic assumptions: no traffic, instant security, a nearby gate, and a generous gate agent. In practice, it fails roughly 60–90% of the time.",
  },
  {
    question: "Does Airport Theory actually work?",
    answer:
      "Occasionally, yes. That's what makes it dangerous. When Airport Theory works, it reinforces the behavior. When it fails, you miss your flight. The success rate we calculate ranges from 73% at the most conservative level down to 12% at the most aggressive — and those are generous estimates on a good day.",
  },
  {
    question: "How late can I realistically leave for a domestic flight?",
    answer:
      "For a domestic flight with no checked bag and TSA PreCheck, the realistic minimum is 60–75 minutes before departure plus your drive time. Without PreCheck, add 15–20 minutes. Airlines officially recommend 2 hours before departure — that buffer exists because of the 30–40% of days when security lines are unexpectedly long.",
  },
  {
    question: "What happens if I miss my flight?",
    answer:
      "If you miss your flight, you're typically placed on the next available flight in the same booking class, which may be hours later or the next day. You may owe change fees. If your itinerary includes a connection, missing the first leg often cancels the rest of the booking automatically. Travel insurance rarely covers 'I left too late.'",
  },
  {
    question: "Is there a real calculator for when to leave for the airport?",
    answer:
      "Yes — the Airport Time-to-Leave Calculator uses real TSA wait time data, live traffic estimates, and flight-specific buffers to give you an actual recommended leave time. It's the opposite of Airport Theory.",
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

export default function AirportTheoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-zinc-950 text-white">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-red-950/40 to-zinc-950 px-4 py-20 text-center sm:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-900/60 bg-red-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-400">
              ⚠️ Warning: This is a terrible idea
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Airport Theory Calculator
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              How late can you <em>actually</em> leave for a flight? This calculator finds your theoretical minimum — the leave time that works only if absolutely nothing goes wrong.
            </p>
            <p className="mt-3 text-sm font-semibold text-red-400">
              We built this so you can see exactly how bad the plan is. Please use the{" "}
              <Link href="/airport-time-to-leave-calculator" className="underline underline-offset-2 hover:text-red-300">
                real calculator
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <AirportTheoryCalculator />
          </div>
        </section>

        {/* ── What is Airport Theory ── */}
        <section className="border-t border-zinc-800 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What is Airport Theory?</h2>
            <div className="mt-5 space-y-4 text-zinc-400">
              <p>
                Airport Theory is the informal belief — shared by overconfident travelers everywhere — that official airport arrival recommendations are wildly conservative. The theory goes: if you have no checked bags, TSA PreCheck, and your gate happens to be right after security, you can leave dramatically later than the TSA, your airline, and every travel guide on the internet suggests.
              </p>
              <p>
                In rare, perfectly aligned circumstances, they&apos;re right. Security moves fast. Traffic cooperates. The gate is close. The agent is still scanning. You make it. And the next time, you leave even later.
              </p>
              <p>
                This calculator quantifies that plan. At each of three aggression levels, it calculates the absolute minimum buffer between your departure time and when you need to leave — assuming everything goes right. Then it tells you exactly how many things have to go right.
              </p>
            </div>
          </div>
        </section>

        {/* ── Does it actually work ── */}
        <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Does Airport Theory Actually Work?</h2>
            <div className="mt-5 space-y-4 text-zinc-400">
              <p>
                Sometimes. That&apos;s the problem. Airport Theory doesn&apos;t fail 100% of the time — which is exactly why people keep trying it. A plan that fails 60% of the time feels unlucky. A plan that fails 27% of the time feels like it basically works.
              </p>
              <p>
                But &quot;59% success rate&quot; on a domestic flight means roughly 1 in 2.5 flights ends with you watching the gate close from the wrong side of it. Multiply that by a few trips a year and Airport Theory isn&apos;t a clever system — it&apos;s a game you&apos;re destined to eventually lose.
              </p>
              <p>
                The other issue: the failures are expensive. A missed domestic flight costs hundreds of dollars and hours of your life. A missed international connection can cascade across an entire itinerary. Airport Theory is the kind of optimization that works great until it catastrophically doesn&apos;t.
              </p>
            </div>
          </div>
        </section>

        {/* ── Why it's risky ── */}
        <section className="border-t border-zinc-800 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Why Airport Theory Is Risky</h2>
            <div className="mt-5 space-y-4 text-zinc-400">
              <p>
                The risks compound. Airport Theory assumes independence between all its variables — traffic, security wait, gate distance, boarding close time — but these factors are correlated. The same Friday afternoon that creates traffic also fills TSA with delayed travelers. The same holiday that closes your preferred security lane also packs the terminal. Bad conditions cluster.
              </p>
              <p>
                It also ignores the unpredictable: a security screening that takes twice as long for no apparent reason, a gate change to the opposite terminal, a bag flag, a system outage. None of these are rare. Any of them alone makes Airport Theory fail.
              </p>
              <p>
                The Responsible Adult level on this calculator — 73% success rate — still means you miss roughly 1 in 4 flights. A real responsible adult leaves with enough margin that a bad day at security doesn&apos;t cost them a flight.
              </p>
            </div>
          </div>
        </section>

        {/* ── How to actually not miss your flight ── */}
        <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">How to Actually Avoid Missing Your Flight</h2>
            <div className="mt-5 space-y-4 text-zinc-400">
              <p>
                The practical alternatives to Airport Theory aren&apos;t complicated. Arrive 2 hours early for domestic flights, 3 hours for international. Get TSA PreCheck — it&apos;s $85 for five years and reduces security wait times by 50–70%. Use the{" "}
                <Link href="/airport-time-to-leave-calculator" className="text-green-400 underline underline-offset-2 hover:text-green-300">
                  Airport Time-to-Leave Calculator
                </Link>{" "}
                to account for real traffic, TSA wait estimates, and your specific flight details.
              </p>
              <p>
                And if timing is genuinely difficult — if you have calendar events that make getting to the airport on time stressful — OnTimer can alert you when it&apos;s time to leave based on real travel time to your destination. It won&apos;t let you forget your flight the way a standard calendar reminder will.
              </p>
            </div>

            {/* Stats grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { stat: "2 hrs", label: "before domestic departure", note: "TSA recommendation" },
                { stat: "3 hrs", label: "before international departure", note: "Standard guidance" },
                { stat: "50–70%", label: "shorter security with PreCheck", note: "Average TSA data" },
              ].map(({ stat, label, note }) => (
                <div key={stat} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
                  <p className="text-2xl font-black text-white">{stat}</p>
                  <p className="mt-1 text-xs text-zinc-400">{label}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-zinc-800 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
            <div className="mt-8 space-y-6">
              {faqItems.map((item) => (
                <div key={item.question} className="border-b border-zinc-800 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why this exists (press hook) ── */}
        <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Why This Calculator Exists</h2>
            <div className="mt-5 space-y-4 text-zinc-400">
              <p>
                We built the Airport Time-to-Leave Calculator to give travelers a real, data-backed answer to &quot;when should I leave for the airport.&quot; TSA wait estimates, real-time traffic, and flight-specific buffers — all in one tool.
              </p>
              <p>
                But we know how travelers actually think. People Google &quot;how late can I leave for the airport&quot; and &quot;what&apos;s the minimum time to get to the airport&quot; because they&apos;re trying to push it. So we built the honest version of that calculation too.
              </p>
              <p>
                Airport Theory isn&apos;t a recommendation. It&apos;s a diagnosis. When you see that &quot;Absolute Maniac&quot; mode gives you a 12% success rate and requires 11 things to go perfectly, it clarifies the risk in a way a static &quot;arrive 2 hours early&quot; recommendation never could.
              </p>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="border-t border-zinc-800 px-4 py-16 text-center sm:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Stop leaving this up to chance</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              OnTimer tells you when to leave — for flights, meetings, appointments, anything on your calendar with a location. You pick the buffer; OnTimer fires the alarm.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <AppStoreButton size="lg" location="airport_theory_cta" />
              <Link
                href="/airport-time-to-leave-calculator"
                className="text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-300"
              >
                Or use the real airport calculator →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
