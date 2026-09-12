import type { Metadata } from "next";
import Link from "next/link";
import {
  cruiseLocations,
  DirectoryShell,
  LocationDirectory,
} from "@/components/CalculatorDirectory";

export const metadata: Metadata = {
  title: "Cruise Terminal Time Calculators | OnTimer",
  description:
    "Browse OnTimer cruise terminal time calculators for PortMiami, Port Canaveral, Port Everglades, Manhattan, Brooklyn and more.",
  alternates: {
    canonical: "https://www.ontimer.app/cruise-terminal-time-calculators",
  },
};

const featuredSlugs = [
  "portmiami",
  "port-canaveral",
  "port-everglades",
  "manhattan-cruise-terminal",
  "brooklyn-cruise-terminal",
  "seattle-cruise-terminal",
];

const featuredCruiseTerminals = featuredSlugs
  .map((slug) => cruiseLocations.find((location) => location.slug === slug))
  .filter((location): location is (typeof cruiseLocations)[number] => Boolean(location));

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cruise Terminal Time Calculators",
  description:
    "A directory of cruise-terminal leave-time calculators from OnTimer.",
  url: "https://www.ontimer.app/cruise-terminal-time-calculators",
};

export default function CruiseTerminalTimeCalculatorsDirectory() {
  return (
    <div className="site-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <DirectoryShell
        eyebrow="Cruise terminal time calculators"
        title="Cruise-terminal calculators for when to leave."
        description="Cruise timing is not just drive time. These calculators help plan around boarding windows, port traffic, parking, luggage, document checks and terminal movement."
      >
        <section className="site-directory-section site-directory-section--tint">
          <div className="site-shell site-directory-grid">
              <div className="site-directory-intro">
                <p>
                  Popular cruise terminals
                </p>
                <p>
                  Start with major cruise departure points, or scan the full
                  directory below.
                </p>
              </div>
              <div className="site-featured-grid">
                {featuredCruiseTerminals.map((terminal) => (
                  <Link
                    key={terminal.slug}
                    href={`/cruise-time-to-leave/${terminal.slug}`}
                    className="site-location-link"
                  >
                    <strong>{terminal.shortName}</strong>
                    <span>{terminal.city}</span>
                  </Link>
                ))}
              </div>
          </div>
        </section>
        <LocationDirectory
          locations={cruiseLocations}
          intro="Every cruise-terminal calculator is linked here, organized alphabetically so the system can grow without making the top navigation heavy."
        />
      </DirectoryShell>
    </div>
  );
}
