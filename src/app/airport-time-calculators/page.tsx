import type { Metadata } from "next";
import Link from "next/link";
import {
  airportLocations,
  groupLocationsAlphabetically,
  LocationDirectory,
} from "@/components/CalculatorDirectory";
import { getTravelLocationPath } from "@/lib/travel-locations";
import { airportPickupProfiles, getAirportPickupPath } from "@/lib/airport-pickup-profiles";

export const metadata: Metadata = {
  title: "When Should I Leave for the Airport? Airport Guides",
  description:
    "Choose your airport to find out what time to leave for your flight, with local route, parking, terminal, security and arrival guidance.",
  alternates: { canonical: "https://www.ontimer.app/airport-time-calculators" },
};

const featuredCodes = ["EWR", "JFK", "LGA", "LAX", "ATL", "ORD"];
const featuredAirports = featuredCodes
  .map((code) => airportLocations.find((location) => location.code === code))
  .filter((location): location is (typeof airportLocations)[number] => Boolean(location));
const airportLetters = Object.keys(groupLocationsAlphabetically(airportLocations)).sort();

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "When to Leave for the Airport: Airport Guides",
  description:
    "A directory of airport-specific answers and leave-time calculators from OnTimer.",
  url: "https://www.ontimer.app/airport-time-calculators",
};

export default function AirportTimeCalculatorsDirectory() {
  return (
    <div className="site-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <section className="site-hero site-hero--compact">
        <div className="site-shell">
          <div className="site-directory-grid">
            <div>
              <p className="site-kicker">Airport guides &amp; calculators</p>
              <h1 className="site-title">
                What time should you leave for your airport?
              </h1>
              <p className="site-lede">
                Choose your airport, enter your flight and route, and get a leave time
                that includes local traffic, parking, terminal movement and security planning.
              </p>

              <div className="site-alpha-nav">
                <p>
                  Flying from another airport?
                </p>
                <p className="site-note">
                  Use the all-airport planner to get a personalized leave time without
                  choosing an airport guide first.
                </p>
                <Link
                  href="/airport-time-to-leave-calculator"
                  className="site-text-action"
                >
                  Find out when to leave <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="site-directory-intro">
                <div>
                    <p>
                      Popular airports
                    </p>
                    <p>
                      Start with a high-traffic airport, or jump to the full
                      alphabetical directory.
                    </p>
                </div>

                <div className="site-featured-grid site-featured-grid--spaced">
                  {featuredAirports.map((airport) => (
                    <Link
                      key={airport.slug}
                      href={getTravelLocationPath(airport)}
                      className="site-location-link"
                    >
                      <strong>{airport.shortName}</strong>
                      <span>{airport.code} - {airport.city}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <nav className="site-alpha-nav" aria-label="Browse airports alphabetically">
                <p>Browse alphabetically</p>
                <div className="site-alpha-nav__links">
                  {airportLetters.map((letter) => (
                    <Link
                      key={letter}
                      href={`#airport-${letter}`}
                    >
                      {letter}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <LocationDirectory
        locations={airportLocations}
        intro="Every airport-specific calculator is linked here, organized alphabetically so you can choose the airport closest to your trip."
        idPrefix="airport"
      />
      <section className="site-section site-section--tint">
        <div className="site-shell">
          <p className="site-kicker">Meeting an arriving passenger?</p>
          <h2 className="site-section-title">Airport pickup calculators</h2>
          <p className="site-note">Choose a pilot airport for local curb, waiting-lot and terminal guidance, or use the generic pickup calculator for any airport.</p>
          <div className="site-featured-grid site-featured-grid--spaced">
            {airportPickupProfiles.map((profile) => (
              <Link key={profile.slug} href={getAirportPickupPath(profile.slug)} className="site-location-link">
                <strong>{profile.code} pickup</strong>
                <span>When to leave for the pickup</span>
              </Link>
            ))}
          </div>
          <p className="mt-6"><Link href="/airport-pickup-time-calculator" className="site-text-action">Calculate a pickup at any airport <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>
    </div>
  );
}
