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
      <section className="site-hero site-hero--compact">
        <div className="site-shell site-hero__content">
          <p className="site-kicker">{eyebrow}</p>
          <h1 className="site-title">{title}</h1>
          <p className="site-lede">{description}</p>
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
    <section className="site-directory-section">
      <div className="site-shell site-directory-grid">
          <div className="site-directory-intro">
            <p>{locations.length} calculators</p>
            <p>{intro}</p>
          </div>

          <div className="site-directory-groups">
            {letters.map((letter) => (
              <div
                key={letter}
                id={idPrefix ? `${idPrefix}-${letter}` : undefined}
                className="site-letter-group"
              >
                <h2>{letter}</h2>
                <div className="site-location-grid">
                  {groups[letter].map((location) => (
                    <Link
                      key={location.slug}
                      href={getTravelLocationPath(location)}
                      className="site-location-link"
                    >
                      <strong>
                        {location.shortName}
                        {location.kind === "airport" ? ` (${location.code})` : ""}
                      </strong>
                      <span>{location.city}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
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
      className="site-category-link"
    >
      <span className="site-category-link__top">
        <strong>{label}</strong>
        <span>View</span>
      </span>
      <span>{description}</span>
      {typeof count === "number" ? (
        <span className="site-category-link__count">
          {count} calculators
        </span>
      ) : null}
    </Link>
  );
}
