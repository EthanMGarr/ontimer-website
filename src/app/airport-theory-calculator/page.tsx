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
              The latest possible time you can leave for the airport…
              assuming absolutely nothing goes wrong.
            </p>
            <p className="mt-3 text-sm font-semibold text-red-400">
              Please use the{" "}
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

        {/* ── What is Airport Theory (AEO) ── */}
        <section className="border-t border-zinc-800 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">What is Airport Theory?</h2>
            <div className="mt-5 space-y-3 text-zinc-400">
              <p>
                Airport Theory is the idea that you can arrive at the airport at the last possible moment and still make your flight.
              </p>
              <p>
                In reality, it&apos;s extremely risky and often leads to missed flights.
              </p>
              <p>
                It works occasionally — which is exactly why people keep trying it. A plan that fails 59% of the time feels unlucky. A plan that fails 88% of the time is just a bad plan.
              </p>
            </div>
          </div>
        </section>

        {/* ── Does it actually work ── */}
        <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Does Airport Theory Actually Work?</h2>
            <div className="mt-5 space-y-3 text-zinc-400">
              <p>
                Sometimes. That&apos;s the problem.
              </p>
              <p>
                When it works, it reinforces the behavior. When it fails, you miss your flight and spend hundreds of dollars getting rebooked. A missed international connection can cascade across an entire itinerary.
              </p>
              <p>
                The &quot;Responsible Adult&quot; level on this calculator has a 73% success rate. That still means you miss roughly 1 in 4 flights.
              </p>
            </div>
          </div>
        </section>

        {/* ── How to actually not miss your flight ── */}
        <section className="border-t border-zinc-800 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">How to Actually Not Miss Your Flight</h2>
            <div className="mt-5 space-y-3 text-zinc-400">
              <p>
                Arrive 2 hours early for domestic. 3 hours for international. Get TSA PreCheck. Use the{" "}
                <Link href="/airport-time-to-leave-calculator" className="text-green-400 underline underline-offset-2 hover:text-green-300">
                  Airport Time-to-Leave Calculator
                </Link>{" "}
                for a real, traffic-aware leave time.
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

        {/* ── Why this exists (press hook) ── */}
        <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-14 sm:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Why this exists</h2>
            <div className="mt-5 space-y-3 text-zinc-400">
              <p>People are trying to optimize everything — even how late they can get to the airport.</p>
              <p>So we built a calculator to show exactly how risky that is.</p>
              <p>It turns out… it&apos;s worse than you think.</p>
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
