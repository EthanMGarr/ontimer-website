import type { Metadata } from "next";
import Link from "next/link";
import {
  airportLocations,
  groupLocationsAlphabetically,
  LocationDirectory,
} from "@/components/CalculatorDirectory";
import { getTravelLocationPath } from "@/lib/travel-locations";

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <section className="border-b border-zinc-900 bg-black py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Airport guides & calculators
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                What time should you leave for your airport?
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                Choose your airport, enter your flight and route, and get a leave time
                that includes local traffic, parking, terminal movement and security planning.
              </p>

              <div className="mt-7 border-t border-zinc-800 pt-5">
                <p className="text-sm font-semibold text-white">
                  Flying from another airport?
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Use the all-airport planner to get a personalized leave time without
                  choosing an airport guide first.
                </p>
                <Link
                  href="/airport-time-to-leave-calculator"
                  className="mt-4 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
                >
                  Find out when to leave
                </Link>
              </div>
            </div>

            <div>
              <div className="border-t border-zinc-800 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Popular airports
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Start with a high-traffic airport, or jump to the full
                      alphabetical directory.
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
                    {airportLocations.length} airports
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredAirports.map((airport) => (
                    <Link
                      key={airport.slug}
                      href={getTravelLocationPath(airport)}
                      className="group border-t border-zinc-800 pt-3"
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

              <div className="mt-8 border-t border-zinc-800 pt-5">
                <p className="text-sm font-semibold text-white">
                  Browse alphabetically
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {airportLetters.map((letter) => (
                    <Link
                      key={letter}
                      href={`#airport-${letter}`}
                      className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-zinc-800 px-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-emerald-300 hover:text-emerald-300"
                    >
                      {letter}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LocationDirectory
        locations={airportLocations}
        intro="Every airport-specific calculator is linked here, organized alphabetically so you can choose the airport closest to your trip."
        idPrefix="airport"
      />
    </>
  );
}
