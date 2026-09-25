import "server-only";

import {
  VENUE_PROFILES,
  eventLocalDateIso,
  isAncillaryEventListingTitle,
  type EventCategory,
  type EventRecord,
  type EventStatus,
  type VenueProfile,
} from "@/lib/event-time-to-leave";
import { ticketmasterProviderEnabled } from "@/lib/ticketmaster-config";
import { ticketmasterDateTime } from "@/lib/ticketmaster-date-time";

const API_ROOT = "https://app.ticketmaster.com/discovery/v2";
const EVENT_REVALIDATE_SECONDS = 6 * 60 * 60;
const VENUE_REVALIDATE_SECONDS = 24 * 60 * 60;

interface TicketmasterVenue {
  id?: string;
  name?: string;
  timezone?: string;
  city?: { name?: string };
  state?: { stateCode?: string };
}

interface TicketmasterEvent {
  id?: string;
  name?: string;
  url?: string;
  dates?: {
    start?: { dateTime?: string; localDate?: string; localTime?: string; noSpecificTime?: boolean; dateTBD?: boolean; dateTBA?: boolean; timeTBA?: boolean };
    end?: { dateTime?: string };
    status?: { code?: string };
  };
  images?: Array<{ url?: string; width?: number; height?: number; ratio?: string }>;
  promoter?: { name?: string };
  sales?: { public?: { startDateTime?: string } };
  classifications?: Array<{ segment?: { name?: string } }>;
  _embedded?: {
    venues?: TicketmasterVenue[];
    attractions?: Array<{ name?: string; url?: string }>;
  };
}

interface TicketmasterCollection<T> {
  _embedded?: { events?: T[]; venues?: T[] };
}

interface TicketmasterResponse<T> {
  data: T;
  checkedAt: string;
}

let ticketmasterRequestChain = Promise.resolve();
let lastTicketmasterRequestAt = 0;

function apiKey(): string | null {
  return process.env.TICKETMASTER_API_KEY?.trim() || null;
}

function providerEnabled(): boolean {
  return ticketmasterProviderEnabled(process.env.TICKETMASTER_EVENTS_ENABLED);
}

function eventStatus(code?: string): EventStatus {
  if (code === "cancelled") return "cancelled";
  if (code === "postponed") return "postponed";
  if (code === "rescheduled") return "rescheduled";
  return "scheduled";
}

function eventCategory(name?: string): EventCategory {
  const value = name?.toLowerCase();
  if (value === "music") return "concert";
  if (value === "sports") return "sports";
  return "other";
}

function eventImages(images: TicketmasterEvent["images"]): string[] {
  const candidates = (images || [])
    .filter((image): image is Required<Pick<NonNullable<TicketmasterEvent["images"]>[number], "url" | "width" | "height">> & { ratio?: string } => (
      Boolean(image.url?.startsWith("https://"))
      && image.url!.toLowerCase().includes(".jpg")
      && (image.width || 0) >= 720
      && (image.width || 0) * (image.height || 0) >= 50_000
    ))
    .sort((left, right) => (right.width * right.height) - (left.width * left.height));

  const seenRatios = new Set<string>();
  const selected: string[] = [];
  for (const image of candidates) {
    const ratio = image.ratio || `${Math.round((image.width / image.height) * 100)}`;
    if (seenRatios.has(ratio)) continue;
    seenRatios.add(ratio);
    selected.push(image.url);
    if (selected.length === 3) break;
  }
  return selected;
}

function credibleOrganizerName(category: EventCategory, name?: string): string | undefined {
  if (category !== "concert") return undefined;
  const trimmed = name?.trim();
  return trimmed || undefined;
}

function eventSlug(title: string, venue: string, localDate: string, sourceId: string): string {
  const readable = `${title}-${venue}-${localDate}`
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
  return `${readable}--tm-${sourceId}`;
}

function normalizedVenueName(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function venueForTicketmasterEvent(raw: TicketmasterEvent): VenueProfile | null {
  const providerVenue = raw._embedded?.venues?.[0];
  const providerName = providerVenue?.name ? normalizedVenueName(providerVenue.name) : "";
  if (!providerName) return null;
  return VENUE_PROFILES.find((venue) => {
    if (providerVenue?.state?.stateCode && providerVenue.state.stateCode !== venue.state) return false;
    const names = [venue.name, ...venue.aliases].map(normalizedVenueName);
    return names.includes(providerName);
  }) || null;
}

function normalizeEvent(raw: TicketmasterEvent, venueProfile: VenueProfile, checkedAt: string): EventRecord | null {
  const id = raw.id?.trim();
  const title = raw.name?.trim();
  const venue = raw._embedded?.venues?.[0];
  const flags = raw.dates?.start;
  const startDateTime = flags?.dateTime;
  if (!id || !title || !startDateTime || isAncillaryEventListingTitle(title)) return null;
  const localDate = flags.localDate || eventLocalDateIso(startDateTime, venue?.timezone || venueProfile.timezone);
  const category = eventCategory(raw.classifications?.[0]?.segment?.name);
  const imageUrls = eventImages(raw.images);
  const performers = (raw._embedded?.attractions || [])
    .map((attraction) => ({
      name: attraction.name?.trim() || "",
      url: attraction.url?.startsWith("https://") ? attraction.url : undefined,
      schemaType: category === "sports" ? "SportsTeam" as const : category === "concert" ? "PerformingGroup" as const : "Organization" as const,
    }))
    .filter((performer) => performer.name);
  const organizerName = credibleOrganizerName(category, raw.promoter?.name);

  return {
    id: `ticketmaster-${id}`,
    slug: eventSlug(title, venue?.name || venueProfile.name, localDate, id),
    title,
    category,
    venueId: venueProfile.id,
    startDateTime,
    endDateTime: raw.dates?.end?.dateTime,
    timezone: venue?.timezone || venueProfile.timezone,
    status: eventStatus(raw.dates?.status?.code),
    dateTBD: Boolean(flags?.dateTBD || flags?.dateTBA),
    timeTBA: Boolean(flags?.timeTBA),
    noSpecificTime: Boolean(flags?.noSpecificTime),
    source: { label: "Ticketmaster", url: raw.url || `https://www.ticketmaster.com/event/${id}` },
    imageUrls: imageUrls.length ? imageUrls : undefined,
    performers: performers.length ? performers : undefined,
    organizerName,
    offer: raw.url ? { url: raw.url, validFrom: raw.sales?.public?.startDateTime } : undefined,
    sourceEventId: id,
    lastVerifiedAt: checkedAt,
  };
}

async function waitForTicketmasterRateLimit(): Promise<void> {
  const previous = ticketmasterRequestChain;
  let release: (() => void) | undefined;
  ticketmasterRequestChain = new Promise<void>((resolve) => { release = resolve; });
  await previous;
  const waitMs = Math.max(0, 500 - (Date.now() - lastTicketmasterRequestAt));
  if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
  lastTicketmasterRequestAt = Date.now();
  release?.();
}

async function ticketmasterFetch<T>(path: string, params: URLSearchParams, revalidate: number): Promise<TicketmasterResponse<T>> {
  const key = apiKey();
  if (!key) throw new Error("TICKETMASTER_API_KEY is not configured");
  params.set("apikey", key);
  await waitForTicketmasterRateLimit();
  const startedAt = Date.now();
  let response: Response;
  try {
    response = await fetch(`${API_ROOT}${path}?${params.toString()}`, {
      next: { revalidate },
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("[ticketmaster] request_failed", JSON.stringify({
      endpoint: path,
      quotaUnits: 1,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    }));
    throw error;
  }
  const quota = {
    limit: response.headers.get("x-rate-limit") || response.headers.get("ratelimit-limit"),
    remaining: response.headers.get("x-rate-limit-available") || response.headers.get("ratelimit-remaining"),
    over: response.headers.get("x-rate-limit-over"),
  };
  if (!response.ok) {
    console.error("[ticketmaster] request_failed", JSON.stringify({
      endpoint: path,
      quotaUnits: 1,
      status: response.status,
      durationMs: Date.now() - startedAt,
      quota,
    }));
    throw new Error(`Ticketmaster request failed with HTTP ${response.status}`);
  }
  console.info("[ticketmaster] request_succeeded", JSON.stringify({
    endpoint: path,
    quotaUnits: 1,
    status: response.status,
    durationMs: Date.now() - startedAt,
    quota,
  }));
  const data = await response.json() as T;
  const providerDate = response.headers.get("date");
  const parsedProviderDate = providerDate ? Date.parse(providerDate) : Number.NaN;
  return {
    data,
    checkedAt: Number.isFinite(parsedProviderDate) ? new Date(parsedProviderDate).toISOString() : new Date().toISOString(),
  };
}

async function resolveVenueId(venue: VenueProfile): Promise<string | null> {
  const params = new URLSearchParams({
    keyword: venue.name,
    countryCode: venue.country,
    stateCode: venue.state,
    size: "5",
    locale: "en-us",
  });
  const response = await ticketmasterFetch<TicketmasterCollection<TicketmasterVenue>>(
    "/venues.json",
    params,
    VENUE_REVALIDATE_SECONDS,
  );
  const matches = response.data._embedded?.venues || [];
  const exact = matches.find((candidate) => candidate.name?.toLowerCase() === venue.name.toLowerCase());
  return (exact || matches[0])?.id || null;
}

export function isTicketmasterConfigured(): boolean {
  return providerEnabled() && Boolean(apiKey());
}

export async function listTicketmasterEvents(venue: VenueProfile): Promise<EventRecord[]> {
  if (!isTicketmasterConfigured()) return [];
  const venueId = await resolveVenueId(venue);
  if (!venueId) return [];
  const params = new URLSearchParams({
    venueId,
    startDateTime: ticketmasterDateTime(new Date()),
    includeTBA: "yes",
    includeTBD: "yes",
    sort: "date,asc",
    size: "50",
    locale: "en-us",
  });
  const response = await ticketmasterFetch<TicketmasterCollection<TicketmasterEvent>>(
    "/events.json",
    params,
    EVENT_REVALIDATE_SECONDS,
  );
  return (response.data._embedded?.events || [])
    .map((event) => normalizeEvent(event, venue, response.checkedAt))
    .filter((event): event is EventRecord => Boolean(event));
}

export async function getTicketmasterEventById(sourceEventId: string): Promise<EventRecord | null> {
  if (!isTicketmasterConfigured() || !/^[A-Za-z0-9_-]{3,80}$/.test(sourceEventId)) return null;
  const response = await ticketmasterFetch<TicketmasterEvent>(
    `/events/${encodeURIComponent(sourceEventId)}.json`,
    new URLSearchParams({ locale: "en-us" }),
    EVENT_REVALIDATE_SECONDS,
  );
  const venue = venueForTicketmasterEvent(response.data);
  if (!venue) {
    console.warn("[ticketmaster] unsupported_event_venue", JSON.stringify({ sourceEventId }));
    return null;
  }
  return normalizeEvent(response.data, venue, response.checkedAt);
}
