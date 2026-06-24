import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import { AppStoreCTA } from "@/components/CTAButton";
import { airports, getAirport } from "@/lib/airports";

interface AirportPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return airports.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: AirportPageProps): Promise<Metadata> {
  const airport = getAirport((await params).slug);
  if (!airport) return {};

  const title = `${airport.shortName} Time-to-Leave Calculator (${airport.code})`;
  const description = `Calculate when to leave for ${airport.name} using traffic, TSA estimates, parking, bags and your flight time.`;
  const url = `https://www.ontimer.app/airport-time-to-leave/${airport.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default async function AirportPage({ params }: AirportPageProps) {
  const airport = getAirport((await params).slug);
  if (!airport) notFound();

  const url = `https://www.ontimer.app/airport-time-to-leave/${airport.slug}`;
  const faqItems = [
    {
      question: `What time should I leave for ${airport.shortName}?`,
      answer: airport.directAnswer,
    },
    {
      question: `How early should I arrive at ${airport.code}?`,
      answer:
        "A common planning baseline is about 2 hours before a domestic flight and 3 hours before an international flight. Your airline, checked bags, travel date and airport conditions may require more time.",
    },
    {
      question: `Does the ${airport.code} calculator include traffic?`,
      answer:
        "Yes. Enter your starting location and flight time to estimate the road trip for your travel window. The result also accounts for airport processing and the arrival method you select.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${airport.shortName} Time-to-Leave Calculator`,
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: `A free calculator for planning when to leave for ${airport.name}.`,
      url,
      author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Airport Calculator",
          item: "https://www.ontimer.app/airport-time-to-leave-calculator",
        },
        { "@type": "ListItem", position: 3, name: airport.shortName, item: url },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <nav aria-label="Breadcrumb" className="border-b border-zinc-800/50 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-2.5 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
            <li><Link href="/" className="hover:text-zinc-200">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/airport-time-to-leave-calculator" className="hover:text-zinc-200">Airport calculator</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-zinc-300">{airport.code}</li>
          </ol>
        </div>
      </nav>

      <section className="relative overflow-hidden pb-5 pt-6 md:pt-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-500">
            {airport.code} · {airport.city}
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            What Time Should I Leave for{" "}
            <span className="text-green-500">{airport.shortName}?</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
            {airport.directAnswer}
          </p>
        </div>
      </section>

      <section id="calculator" className="border-t border-zinc-800 pb-8 pt-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <AirportCalculator initialAirport={airport.calculatorValue} />
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-white">
              Getting to {airport.code} without losing your buffer
            </h2>
            <ul className="mt-5 space-y-4">
              {airport.roadNotes.map((note) => (
                <li key={note} className="flex gap-3 leading-relaxed text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-green-500" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">
              Inside {airport.shortName}
            </h2>
            <ul className="mt-5 space-y-4">
              {airport.airportNotes.map((note) => (
                <li key={note} className="flex gap-3 leading-relaxed text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-green-500" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Example {airport.code} leave-time plans
          </h2>
          <p className="mt-3 max-w-3xl text-zinc-400">
            These examples show the order of operations. Use the calculator for your actual address, flight and travel date.
          </p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {airport.examples.map((example) => (
              <article key={example.flight} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm font-semibold text-green-500">{example.flight}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{example.situation}</h3>
                <p className="mt-3 leading-relaxed text-zinc-400">{example.plan}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/50 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-white">
              Taking transit to {airport.shortName}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-zinc-300">
              {airport.transitNotes.map((note) => <p key={note}>{note}</p>)}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Official planning sources</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Airport details change. Check these official sources before an important trip.
              Page reviewed June 24, 2026.
            </p>
            <ul className="mt-5 space-y-3">
              {airport.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-green-500 underline underline-offset-4 hover:text-green-400"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Frequently asked questions about leaving for {airport.code}
          </h2>
          <div className="mt-7 divide-y divide-zinc-800 border-y border-zinc-800">
            {faqItems.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <h3 className="text-lg font-bold text-white">{question}</h3>
                <p className="mt-2 leading-relaxed text-zinc-400">{answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <AppStoreCTA location={`airport_${airport.code.toLowerCase()}_final`} />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/50 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white">Plan another major airport</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {airports.filter(({ code }) => code !== airport.code).map((other) => (
              <Link
                key={other.code}
                href={`/airport-time-to-leave/${other.slug}`}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 hover:border-green-700 hover:text-white"
              >
                {other.code} · {other.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
