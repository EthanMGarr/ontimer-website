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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <DirectoryShell
        eyebrow="Cruise terminal time calculators"
        title="Cruise-terminal calculators for when to leave."
        description="Cruise timing is not just drive time. These calculators help plan around boarding windows, port traffic, parking, luggage, document checks and terminal movement."
      >
        <section className="border-b border-zinc-900 bg-black py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
              <div>
                <p className="text-sm font-semibold text-white">
                  Popular cruise terminals
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Start with major cruise departure points, or scan the full
                  directory below.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredCruiseTerminals.map((terminal) => (
                  <Link
                    key={terminal.slug}
                    href={`/cruise-time-to-leave/${terminal.slug}`}
                    className="group border-t border-zinc-800 pt-4"
                  >
                    <span className="block text-lg font-black text-white transition-colors group-hover:text-emerald-300">
                      {terminal.shortName}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-500">
                      {terminal.city}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <LocationDirectory
          locations={cruiseLocations}
          intro="Every cruise-terminal calculator is linked here, organized alphabetically so the system can grow without making the top navigation heavy."
        />
      </DirectoryShell>
    </>
  );
}
