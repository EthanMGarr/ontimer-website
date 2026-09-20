import { VENUE_PROFILES, type VenueProfile } from "./event-time-to-leave";

export interface VenueCatalogOption {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  coordinates: VenueProfile["coordinates"];
  timezone: string;
}

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function searchableValues(venue: VenueProfile): string[] {
  return [venue.name, venue.slug, venue.address, venue.city, `${venue.city} ${venue.state}`, ...venue.aliases].map(normalize);
}

function scoreVenue(venue: VenueProfile, query: string): number {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;
  const values = searchableValues(venue);
  if (values.some((value) => value === normalizedQuery)) return 100;
  if (values.some((value) => value.startsWith(normalizedQuery))) return 80;
  if (values.some((value) => value.includes(normalizedQuery))) return 60;
  const terms = normalizedQuery.split(" ");
  const joined = values.join(" ");
  return terms.every((term) => joined.includes(term)) ? 40 : 0;
}

function toOption(venue: VenueProfile): VenueCatalogOption {
  return {
    id: venue.id,
    slug: venue.slug,
    name: venue.name,
    address: venue.address,
    city: venue.city,
    state: venue.state,
    coordinates: venue.coordinates,
    timezone: venue.timezone,
  };
}

/** Static venue lookup for known destinations; no Google Places request is needed. */
export function findVenueOptions(query: string, limit = 8): VenueCatalogOption[] {
  return VENUE_PROFILES
    .map((venue) => ({ venue, score: scoreVenue(venue, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.venue.name.localeCompare(b.venue.name))
    .slice(0, limit)
    .map(({ venue }) => toOption(venue));
}

export function venueRouteWaypoint(venue: Pick<VenueCatalogOption, "coordinates">): string {
  return `${venue.coordinates.latitude},${venue.coordinates.longitude}`;
}
