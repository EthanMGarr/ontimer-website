import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AirportIntentNav from "@/components/airport/AirportIntentNav";
import AirportPickupCalculator from "@/app/airport-pickup-time-calculator/AirportPickupCalculator";
import {
  airportPickupProfiles,
  getAirportPickupPath,
  getAirportPickupProfile,
} from "@/lib/airport-pickup-profiles";
import { buildAirportSearchName } from "@/lib/airport-answer-seo";
import { getTravelLocation } from "@/lib/travel-locations";
import "../../airport-pickup-time-calculator/pickup.css";
import "../pickup-destination.css";

interface AirportPickupPageProps {
  params: Promise<{ slug: string }>;
}

function indefiniteArticleForAirportCode(code: string) {
  return code === "LAX" || code === "JFK" ? "a" : "an";
}

export const dynamicParams = false;

export function generateStaticParams() {
  return airportPickupProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: AirportPickupPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getAirportPickupProfile(slug);
  const location = getTravelLocation(slug);
  if (!profile || !location || location.kind !== "airport") {
    return { robots: { index: false, follow: false } };
  }
  const pickupArticle = indefiniteArticleForAirportCode(profile.code);
  const searchName = buildAirportSearchName(location);
  const title = `When Should I Leave to Pick Someone Up at ${searchName}?`;
  const description = `Calculate when to leave for ${pickupArticle} ${profile.code} airport pickup using scheduled landing time, baggage, international arrival processing, your drive and where you plan to meet.`;
  const url = `https://www.ontimer.app${getAirportPickupPath(slug)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { title, description },
  };
}

export default async function AirportPickupPage({ params }: AirportPickupPageProps) {
  const { slug } = await params;
  const profile = getAirportPickupProfile(slug);
  const location = getTravelLocation(slug);
  if (!profile || !location || location.kind !== "airport") notFound();

  const url = `https://www.ontimer.app${getAirportPickupPath(slug)}`;
  const related = airportPickupProfiles.filter((item) => item.slug !== slug).slice(0, 4);
  const pickupArticle = indefiniteArticleForAirportCode(profile.code);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `${profile.code} Airport Pickup Time Calculator`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url,
        description: profile.directAnswer,
      },
      {
        "@type": "FAQPage",
        mainEntity: profile.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Airport calculators", item: "https://www.ontimer.app/airport-time-calculators" },
          { "@type": "ListItem", position: 2, name: `${profile.code} airport pickup`, item: url },
        ],
      },
    ],
  };

  return (
    <main className="pickup-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="pickup-hero pickup-hero--destination">
        <div className="pickup-shell">
          <nav aria-label="Breadcrumb">
            <Link href="/airport-time-calculators">Airport calculators</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{profile.code} pickup</span>
          </nav>
          <p>Free {profile.code} pickup calculator</p>
          <h1>When should I leave for {pickupArticle} {profile.code} airport pickup?</h1>
          <p>Enter the landing time and where you’re driving from. Get a specific time to leave for this pickup.</p>
        </div>
      </header>

      <section id="calculator" aria-label={`${profile.code} pickup calculator`}>
        <AirportPickupCalculator
          initialAirport={location.calculatorDestination}
          locationCode={profile.code}
          lockAirport
          pageType="airport_pickup"
          intentNav={<AirportIntentNav slug={slug} airportCode={profile.code} currentIntent="pickup" />}
        />
      </section>

      <section className="pickup-destination-guide">
        <div className="pickup-shell">
          <h2>The short answer for a {profile.code} pickup</h2>
          <p>{profile.directAnswer}</p>

          <h2>When the passenger may be ready</h2>
          <div className="pickup-destination-guide__grid">
            <article><h3>Domestic, carry-on only</h3><p>{profile.readyTimeGuidance.domesticNoCheckedBag}</p></article>
            <article><h3>Domestic, checked bag</h3><p>{profile.readyTimeGuidance.domesticCheckedBag}</p></article>
            <article><h3>International arrival</h3><p>{profile.readyTimeGuidance.international}</p></article>
          </div>

          <div className="pickup-destination-guide__grid">
            <article><h2>Pickup rules</h2><ul>{profile.pickupRules.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h2>Where to wait</h2><ul>{profile.waitingOptions.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h2>Terminal details</h2><ul>{profile.terminalConsiderations.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h2>Road access</h2><ul>{profile.groundAccessNotes.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>

          <h2>{profile.code} pickup questions</h2>
          {profile.faqs.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}

          <div className="pickup-destination-sources">
            <h2>Official airport sources</h2>
            <p>{profile.reviewedLabel}. Airport rules and flight operations can change, so confirm current guidance before leaving.</p>
            <ul>{profile.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul>
          </div>

          <h2>More airport pickup calculators</h2>
          <div className="pickup-destination-links">
            {related.map((item) => <Link key={item.slug} href={getAirportPickupPath(item.slug)}>{item.code} pickup calculator</Link>)}
            <Link href="/airport-pickup-time-calculator">Any airport pickup</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
