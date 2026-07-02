import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AirportCalculator from "@/app/airport-time-to-leave-calculator/AirportCalculator";
import LocationSectionTracker from "@/components/LocationSectionTracker";
import { AppStoreCTA } from "@/components/CTAButton";
import {
  getTravelLocation,
  indexableTravelLocations,
} from "@/lib/travel-locations";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return indexableTravelLocations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = getTravelLocation((await params).slug);
  if (!location || !location.indexable || location.kind !== "airport") {
    return { robots: { index: false, follow: false } };
  }

  const title = `${location.shortName} Time-to-Leave Calculator (${location.code})`;
  const description = `Calculate when to leave for ${location.name} using traffic, airport transfers, parking, bags and your flight time.`;
  const url = `https://www.ontimer.app/airport-time-to-leave/${location.slug}`;

  return {
    title,
    description,
    keywords: [],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = getTravelLocation((await params).slug);
  if (!location || !location.indexable || location.kind !== "airport") notFound();

  const url = `https://www.ontimer.app/airport-time-to-leave/${location.slug}`;
  const faqItems = [
    {
      question: `What time should I leave for ${location.shortName} (${location.code})?`,
      answer: location.directAnswer,
    },
    {
      question: `How early should I arrive at ${location.code}?`,
      answer:
        `Use about ${location.airport.domesticArrivalMinutes / 60} hours before a domestic flight and ${location.airport.internationalArrivalMinutes / 60} hours before an international flight as a planning baseline. Add time for parking, rail or terminal transfers, and follow any earlier deadline supplied by your airline.`,
    },
    {
      question: `Does the ${location.code} calculator include traffic?`,
      answer:
        "Yes. Enter your starting location and flight time to estimate the trip for your travel window. The result also includes airport-processing assumptions and the arrival method you select.",
    },
    {
      question: `What local airport timing details matter at ${location.code}?`,
      answer: location.airport.localTimingFaq,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${location.shortName} Time-to-Leave Calculator`,
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: `A free calculator for planning when to leave for ${location.name}.`,
      url,
      dateModified: location.reviewedOn,
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
        { "@type": "ListItem", position: 3, name: location.shortName, item: url },
      ],
    },
  ];

  return (
    <>
      <LocationSectionTracker locationCode={location.code} />
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
            <li>
              <Link href="/airport-time-to-leave-calculator" className="hover:text-zinc-200">
                Airport calculator
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-zinc-300">{location.code}</li>
          </ol>
        </div>
      </nav>

      <section className="relative overflow-hidden pb-5 pt-6 md:pt-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-500">
              {location.code} · {location.city}
            </p>
            <p className="text-xs text-zinc-500">{location.reviewedLabel}</p>
          </div>
          <h1 className="mt-2 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
            What Time Should I Leave for{" "}
            <span className="text-green-500">{location.shortName} ({location.code})?</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
            {location.directAnswer}
          </p>
        </div>
      </section>

      <section
        id="calculator"
        data-location-section="calculator"
        className="border-t border-zinc-800 pb-8 pt-4"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <AirportCalculator
            initialAirport={location.calculatorDestination}
            locationCode={location.code}
            example={location.calculatorExample}
            genericRedesign
          />
        </div>
      </section>

      <section
        data-location-section={`${location.code.toLowerCase()}-planning-facts`}
        className="border-t border-zinc-800 bg-zinc-900/50 py-14"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white">
            {location.shortName}-specific planning details that change when you should leave
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
            {location.authorityIntro}
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
            Operational details can change, so verify your terminal and travel schedule before departure.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {location.modules.map((module) => (
              <article key={module.title} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6">
                <h3 className="text-xl font-bold text-white">{module.title}</h3>
                <ul className="mt-5 space-y-4">
                  {module.facts.map((fact) => (
                    <li key={fact} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-green-500" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-location-section="worked-examples" className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Worked examples for leaving for {location.code}
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
            Each example is illustrative, not live traffic guidance. The assumptions are shown so
            you can see the calculation and replace them with your own details above.
          </p>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {location.workedExamples.map((example) => (
              <article key={example.title} className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm font-semibold text-green-500">{example.title}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{example.subtitle}</h3>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Assumptions
                  </p>
                  <ul className="mt-2 space-y-2">
                    {example.assumptions.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-zinc-400">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 border-t border-zinc-800 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Work backward
                  </p>
                  <ol className="mt-2 space-y-2">
                    {example.calculation.map((item) => (
                      <li key={item} className="text-sm text-zinc-300">{item}</li>
                    ))}
                  </ol>
                </div>
                <p className="mt-5 border-t border-zinc-800 pt-5 text-lg font-bold text-white">
                  {example.result}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Traffic and service conditions vary. Use the live calculator for your trip and check
            official transportation schedules before leaving.
          </p>
        </div>
      </section>

      <section
        data-location-section="official-sources"
        className="border-y border-zinc-800 bg-zinc-900/50 py-14"
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-black text-white">
              How to use this page safely
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-zinc-300">
              <p>
                Stable planning facts—such as terminal names and airport transfer options—belong in
                this guide. Traffic, security waits, airline terminals and
                service disruptions are volatile, so the calculator or official operator should
                supply the current answer.
              </p>
              <p>
                Recheck your airline terminal, bag-drop deadline, airport transit schedule and
                transfer service on the day you travel.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Planning and traffic sources</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Facts on this page were checked against airport, transit, security and traffic sources. {location.reviewedLabel}.
            </p>
            <ul className="mt-5 space-y-3">
              {location.sources.map((source) => (
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

      <section data-location-section="faq" className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            {location.shortName} leave-time questions
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
            <AppStoreCTA location={`airport_${location.code.toLowerCase()}_final`} />
          </div>
        </div>
      </section>
    </>
  );
}
