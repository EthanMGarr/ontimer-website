import Link from "next/link";
import type { ReactNode } from "react";
import {
  getTravelLocationPath,
  indexableTravelLocations,
  type TravelLocationProfile,
} from "@/lib/travel-locations";

type LocationKind = TravelLocationProfile["kind"];

export const airportLocations = indexableTravelLocations
  .filter((location) => location.kind === "airport")
  .sort((a, b) => a.name.localeCompare(b.name));

export const cruiseLocations = indexableTravelLocations
  .filter((location) => location.kind === "cruise-terminal")
  .sort((a, b) => a.name.localeCompare(b.name));

export function getLocationsByKind(kind: LocationKind): TravelLocationProfile[] {
  return kind === "airport" ? airportLocations : cruiseLocations;
}

export function groupLocationsAlphabetically(locations: TravelLocationProfile[]) {
  return locations.reduce<Record<string, TravelLocationProfile[]>>((groups, location) => {
    const letter = location.name.charAt(0).toUpperCase();
    return {
      ...groups,
      [letter]: [...(groups[letter] ?? []), location],
    };
  }, {});
}

export function DirectoryShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-zinc-900 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            {description}
          </p>
        </div>
      </section>
      {children}
    </>
  );
}

export function LocationDirectory({
  locations,
  intro,
  idPrefix,
}: {
  locations: TravelLocationProfile[];
  intro: string;
  idPrefix?: string;
}) {
  const groups = groupLocationsAlphabetically(locations);
  const letters = Object.keys(groups).sort();

  return (
    <section className="bg-zinc-950 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-sm font-semibold text-white">{locations.length} calculators</p>
            <p className="mt-3 text-sm leading-6 text-zinc-500">{intro}</p>
          </div>

          <div className="space-y-8">
            {letters.map((letter) => (
              <div
                key={letter}
                id={idPrefix ? `${idPrefix}-${letter}` : undefined}
                className="scroll-mt-24 grid gap-4 border-t border-zinc-800 pt-5 sm:grid-cols-[4rem_1fr]"
              >
                <h2 className="text-2xl font-black text-white">{letter}</h2>
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {groups[letter].map((location) => (
                    <Link
                      key={location.slug}
                      href={getTravelLocationPath(location)}
                      className="group"
                    >
                      <span className="block font-semibold text-zinc-100 transition-colors group-hover:text-emerald-300">
                        {location.shortName}
                        {location.kind === "airport" ? ` (${location.code})` : ""}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-500">
                        {location.city}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryLink({
  href,
  label,
  description,
  count,
}: {
  href: string;
  label: string;
  description: string;
  count?: number;
}) {
  return (
    <Link
      href={href}
      className="group block border-t border-zinc-800 py-6 transition-colors"
    >
      <span className="flex items-center justify-between gap-4">
        <span className="text-xl font-black text-white">{label}</span>
        <span className="text-sm text-zinc-600 transition-colors group-hover:text-emerald-300">
          View
        </span>
      </span>
      <span className="mt-2 block max-w-xl text-sm leading-6 text-zinc-500">
        {description}
      </span>
      {typeof count === "number" ? (
        <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
          {count} calculators
        </span>
      ) : null}
    </Link>
  );
}
