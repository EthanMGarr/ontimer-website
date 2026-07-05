import type { Metadata } from "next";
import Link from "next/link";
import {
  airportLocations,
  DirectoryShell,
  LocationDirectory,
} from "@/components/CalculatorDirectory";

export const metadata: Metadata = {
  title: "Airport Time Calculators | OnTimer",
  description:
    "Browse OnTimer airport time calculators for EWR, JFK, LGA, LAX, ATL, ORD and more airport-specific leave-time pages.",
  alternates: { canonical: "https://www.ontimer.app/airport-time-calculators" },
};

const featuredCodes = ["EWR", "JFK", "LGA", "LAX", "ATL", "ORD"];
const featuredAirports = featuredCodes
  .map((code) => airportLocations.find((location) => location.code === code))
  .filter((location): location is (typeof airportLocations)[number] => Boolean(location));

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Airport Time Calculators",
  description:
    "A directory of airport-specific leave-time calculators from OnTimer.",
  url: "https://www.ontimer.app/airport-time-calculators",
};

export default function AirportTimeCalculatorsDirectory() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <DirectoryShell
        eyebrow="Airport time calculators"
        title="Airport-specific calculators for when to leave."
        description="Each airport page works backward from your flight and adds the timing details that change by airport: traffic, parking, transit, terminal movement, security and arrival buffers."
      >
        <section className="border-b border-zinc-900 bg-black py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
              <div>
                <p className="text-sm font-semibold text-white">
                  Popular airports
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Quick paths to high-traffic airport calculators, with the full
                  directory below.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredAirports.map((airport) => (
                  <Link
                    key={airport.slug}
                    href={`/airport-time-to-leave/${airport.slug}`}
                    className="group border-t border-zinc-800 pt-4"
                  >
                    <span className="block text-lg font-black text-white transition-colors group-hover:text-emerald-300">
                      {airport.shortName}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-500">
                      {airport.code} - {airport.city}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <LocationDirectory
          locations={airportLocations}
          intro="Every airport-specific calculator is linked here, organized alphabetically so the directory scales as more airports are added."
        />
      </DirectoryShell>
    </>
  );
}
