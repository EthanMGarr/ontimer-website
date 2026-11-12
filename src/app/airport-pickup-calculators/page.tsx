/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 · macrostructure: Searchable Airport Index · theme: locked design.md */
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

const featuredPickupAirports = pickupAirports.slice(0, 6);

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
              <p className="site-kicker">Airport guides &amp; calculators</p>
              <h1 className="site-title">Find out exactly when to leave for an airport pickup</h1>
              <p className="site-lede">
                Choose the passenger&apos;s airport, enter the landing time and your route, and get a
                specific time to leave.
              </p>
            </div>

            <div>
              <AirportDirectorySearch guides={pickupGuides} mode="pickup" />

              <div className="site-actions site-actions--airport-directory">
                <Link href="/airport-pickup-time-calculator" className="site-secondary-action">
                  Any-airport pickup calculator
                </Link>
              </div>

              <div className="site-directory-intro">
                <div>
                  <p>Popular airports</p>
                  <p>Start with a popular airport, or search above by airport, city or code.</p>
                </div>

                <div className="site-featured-grid site-featured-grid--spaced">
                  {featuredPickupAirports.map(({ profile, location }) => (
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

      <section className="site-directory-section site-airport-pickup-reviewed" id="reviewed-airports">
        <div className="site-shell site-directory-grid">
          <div className="site-directory-intro">
            <p>All {pickupAirports.length} airport pickup calculators</p>
            <p>
              Choose the passenger&apos;s arrival airport. Each page combines the pickup calculator
              with local terminal, curb, waiting-lot and road guidance.
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

    </div>
  );
}
