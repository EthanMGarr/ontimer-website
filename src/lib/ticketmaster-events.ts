import "server-only";

import type { EventCategory, EventRecord, EventStatus, VenueProfile } from "@/lib/event-time-to-leave";
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
    status?: { code?: string };
  };
  classifications?: Array<{ segment?: { name?: string } }>;
  _embedded?: { venues?: TicketmasterVenue[] };
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

function eventSlug(title: string, venue: string, startDateTime: string, sourceId: string): string {
  const date = startDateTime.slice(0, 10);
  const readable = `${title}-${venue}-${date}`
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
  return `${readable}--tm-${sourceId}`;
}

function normalizeEvent(raw: TicketmasterEvent, venueProfile: VenueProfile, checkedAt: string): EventRecord | null {
  const id = raw.id?.trim();
  const title = raw.name?.trim();
  const venue = raw._embedded?.venues?.[0];
  const flags = raw.dates?.start;
  const startDateTime = flags?.dateTime;
  if (!id || !title || !startDateTime) return null;

  return {
    id: `ticketmaster-${id}`,
    slug: eventSlug(title, venue?.name || venueProfile.name, startDateTime, id),
    title,
    category: eventCategory(raw.classifications?.[0]?.segment?.name),
    venueId: venueProfile.id,
    startDateTime,
    timezone: venue?.timezone || venueProfile.timezone,
    status: eventStatus(raw.dates?.status?.code),
    dateTBD: Boolean(flags?.dateTBD || flags?.dateTBA),
    timeTBA: Boolean(flags?.timeTBA),
    noSpecificTime: Boolean(flags?.noSpecificTime),
    source: { label: "Ticketmaster", url: raw.url || `https://www.ticketmaster.com/event/${id}` },
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
  const response = await fetch(`${API_ROOT}${path}?${params.toString()}`, {
    next: { revalidate },
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Ticketmaster request failed with HTTP ${response.status}`);
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

export async function getTicketmasterEventById(sourceEventId: string, venue: VenueProfile): Promise<EventRecord | null> {
  if (!isTicketmasterConfigured() || !/^[A-Za-z0-9_-]{3,80}$/.test(sourceEventId)) return null;
  const response = await ticketmasterFetch<TicketmasterEvent>(
    `/events/${encodeURIComponent(sourceEventId)}.json`,
    new URLSearchParams({ locale: "en-us" }),
    EVENT_REVALIDATE_SECONDS,
  );
  return normalizeEvent(response.data, venue, response.checkedAt);
}
