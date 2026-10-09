/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 · macrostructure: Index-First / Reviewed Airport Index · theme: locked design.md */
import type { Metadata } from "next";
import Link from "next/link";
import AirportDirectorySearch from "@/components/airport/AirportDirectorySearch";
import { buildAirportSearchName } from "@/lib/airport-answer-seo";
import {
  airportPickupProfiles,
  getAirportPickupPath,
} from "@/lib/airport-pickup-profiles";
import { getTravelLocation } from "@/lib/travel-locations";

export const metadata: Metadata = {
  title: "Airport Pickup Calculators by Airport",
  description:
    "Choose an airport-specific pickup calculator with local terminal, curb, waiting-lot and road guidance, or calculate a pickup at any airport.",
  alternates: { canonical: "https://www.ontimer.app/airport-pickup-calculators" },
  openGraph: {
    title: "Airport Pickup Calculators by Airport",
    description:
      "Choose an airport-specific pickup calculator with local terminal, curb, waiting-lot and road guidance, or calculate a pickup at any airport.",
    url: "https://www.ontimer.app/airport-pickup-calculators",
    type: "website",
  },
  twitter: {
    title: "Airport Pickup Calculators by Airport",
    description:
      "Choose an airport-specific pickup calculator with local terminal, curb, waiting-lot and road guidance, or calculate a pickup at any airport.",
  },
};

const pickupAirports = airportPickupProfiles.flatMap((profile) => {
  const location = getTravelLocation(profile.slug);
  return location?.kind === "airport" ? [{ profile, location }] : [];
});

const pickupGuides = pickupAirports.map(({ profile, location }) => ({
  code: profile.code,
  name: location.shortName,
  city: location.city,
  href: getAirportPickupPath(profile.slug),
}));

const pageUrl = "https://www.ontimer.app/airport-pickup-calculators";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Airport pickup calculators by airport",
      description:
        "A directory of airport-specific pickup calculators with reviewed local curb, waiting-lot, terminal and road guidance.",
      url: pageUrl,
      mainEntity: { "@id": `${pageUrl}#airport-pickup-calculators` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#airport-pickup-calculators`,
      numberOfItems: pickupAirports.length,
      itemListElement: pickupAirports.map(({ profile, location }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Pickup at ${buildAirportSearchName(location)}`,
        url: `https://www.ontimer.app${getAirportPickupPath(profile.slug)}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Time calculators",
          item: "https://www.ontimer.app/time-calculators",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Airport pickup calculators",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function AirportPickupCalculatorsDirectory() {
  return (
    <div className="site-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="site-hero site-hero--compact site-hero--airport-directory">
        <div className="site-shell">
          <div className="site-directory-grid">
            <div>
              <p className="site-kicker">Airport pickup calculators</p>
              <h1 className="site-title">Choose an airport pickup calculator</h1>
              <p className="site-lede">
                Find out exactly when to leave using the passenger&apos;s landing time,
                deplaning, bags, immigration and your drive—plus reviewed local pickup guidance.
              </p>
            </div>

            <div>
              <AirportDirectorySearch guides={pickupGuides} mode="pickup" />
              <div className="site-directory-intro">
                <div>
                  <p>{pickupAirports.length} reviewed airports</p>
                  <p>
                    Each airport page adds local terminal, curb, waiting-lot and road details
                    to the same pickup calculator.
                  </p>
                </div>
                <div className="site-featured-grid site-featured-grid--spaced">
                  {pickupAirports.slice(0, 6).map(({ profile, location }) => (
                    <Link
                      key={profile.slug}
                      href={getAirportPickupPath(profile.slug)}
                      className="site-location-link"
                    >
                      <strong>Pickup at {buildAirportSearchName(location)}</strong>
                      <span>{location.city}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-directory-section">
        <div className="site-shell site-directory-grid">
          <div className="site-directory-intro">
            <p>All airport pickup calculators</p>
            <p>
              Choose the passenger&apos;s arrival airport. Every page keeps the calculator first
              and places the reviewed local instructions afterward.
            </p>
          </div>
          <div className="site-location-grid">
            {pickupAirports.map(({ profile, location }) => (
              <Link
                key={profile.slug}
                href={getAirportPickupPath(profile.slug)}
                className="site-location-link"
              >
                <strong>Pickup at {buildAirportSearchName(location)}</strong>
                <span>{location.city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-directory-section site-directory-section--tint">
        <div className="site-shell site-directory-grid">
          <div className="site-directory-intro">
            <p>Any airport</p>
            <p>
              If the airport is not in the reviewed list yet, use the general pickup calculator.
              It supports any airport without inventing local instructions we have not verified.
            </p>
          </div>
          <div>
            <h2 className="site-section-title">Calculate an airport pickup</h2>
            <p className="site-note">
              Enter the landing time and your starting point to get a specific time to leave.
            </p>
            <div className="site-actions">
              <Link href="/airport-pickup-time-calculator" className="site-secondary-action">
                Calculate any airport pickup
              </Link>
              <Link href="/airport-time-calculators" className="site-text-action">
                Browse airport departure calculators <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
