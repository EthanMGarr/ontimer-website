export type EventCategory = "concert" | "sports" | "other";
export type EventStatus = "scheduled" | "cancelled" | "postponed" | "rescheduled";
export type EventTravelMode = "DRIVE" | "TRANSIT" | "WALK";
export type ArrivalPreference = "just-in-time" | "comfortable" | "extra-early";

export interface EventSource {
  label: string;
  url: string;
}

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: EventCategory;
  venueId: string;
  startDateTime: string;
  endDateTime?: string;
  doorsOpenDateTime?: string;
  parkingOpenDateTime?: string;
  timezone: string;
  status: EventStatus;
  dateTBD: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
  source: EventSource;
  sourceEventId: string;
  lastVerifiedAt: string;
}

export interface VenueProfile {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  address: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  coordinates: { latitude: number; longitude: number };
  reviewedAt: string;
  lastMileMinutes: Record<EventTravelMode, number>;
  insights: string[];
  sources: EventSource[];
}

export interface EventLeavePlan {
  leaveAt: Date;
  venueArrivalAt: Date;
  entranceAt: Date;
  eventStartsAt: Date;
  travelMinutes: number;
  lastMileMinutes: number;
  uncertaintyMinutes: number;
  arrivalBufferMinutes: number;
  totalBufferMinutes: number;
}

export const METLIFE_STADIUM: VenueProfile = {
  id: "metlife-stadium",
  slug: "metlife-stadium",
  name: "MetLife Stadium",
  aliases: ["MetLife", "Met Life Stadium", "Meadowlands Stadium", "New York Giants stadium", "New York Jets stadium", "East Rutherford stadium"],
  address: "One MetLife Stadium Drive, East Rutherford, NJ 07073",
  city: "East Rutherford",
  state: "NJ",
  country: "US",
  timezone: "America/New_York",
  coordinates: { latitude: 40.8135, longitude: -74.0745 },
  reviewedAt: "2026-09-20",
  lastMileMinutes: { DRIVE: 30, TRANSIT: 15, WALK: 5 },
  insights: [
    "For major events, the route is only part of the trip. Leave time also needs to cover the stadium approach, parking or transit arrival, and the walk to your gate.",
    "NJ TRANSIT may operate Meadowlands Rail Service for large events. Most regional rail connections transfer at Secaucus Junction, followed by the Sports Complex station.",
    "Coach USA's 351 Meadowlands Express is another event-day option from Port Authority. Confirm the current event schedule before relying on it.",
    "Entry rules and bag policies can change by event. Review the stadium's current guest policies before leaving.",
  ],
  sources: [
    { label: "Plan your visit", url: "https://www.metlifestadium.com/plan-your-visit" },
    { label: "Public transportation", url: "https://www.metlifestadium.com/plan-your-visit/public-transportation" },
    { label: "Guest policies", url: "https://www.metlifestadium.com/plan-your-visit/guest-policies" },
  ],
};

export const REVIEWED_EVENT_FIXTURES: EventRecord[] = [
  {
    id: "official-metlife-acdc-2026-09-25",
    slug: "ac-dc-power-up-tour-metlife-stadium-september-25-2026",
    title: "AC/DC",
    subtitle: "Power Up Tour",
    category: "concert",
    venueId: METLIFE_STADIUM.id,
    startDateTime: "2026-09-25T19:00:00-04:00",
    doorsOpenDateTime: "2026-09-25T17:30:00-04:00",
    parkingOpenDateTime: "2026-09-25T14:00:00-04:00",
    timezone: METLIFE_STADIUM.timezone,
    status: "scheduled",
    dateTBD: false,
    timeTBA: false,
    noSpecificTime: false,
    source: {
      label: "MetLife Stadium",
      url: "https://www.metlifestadium.com/events/detail/acdc-power-up-tour-2026",
    },
    sourceEventId: "acdc-power-up-tour-2026",
    lastVerifiedAt: "2026-09-20T12:00:00-04:00",
  },
];

export const VENUE_PROFILES: VenueProfile[] = [METLIFE_STADIUM];

const preferenceUncertainty: Record<ArrivalPreference, number> = {
  "just-in-time": 10,
  comfortable: 15,
  "extra-early": 25,
};

const fallbackArrivalBuffer: Record<ArrivalPreference, number> = {
  "just-in-time": 45,
  comfortable: 90,
  "extra-early": 120,
};

export function isEventTimeUsable(event: EventRecord): boolean {
  return !event.dateTBD && !event.timeTBA && !event.noSpecificTime && Number.isFinite(Date.parse(event.startDateTime));
}

function eventIdentityTitle(event: EventRecord): string {
  return `${event.title} ${event.subtitle || ""}`
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(?:19|20)\d{2}\b/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function eventLocalDate(event: EventRecord): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: event.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(event.startDateTime));
}

export function eventsRepresentSameListing(left: EventRecord, right: EventRecord): boolean {
  if (left.venueId !== right.venueId || eventLocalDate(left) !== eventLocalDate(right)) return false;
  const leftTitle = eventIdentityTitle(left);
  const rightTitle = eventIdentityTitle(right);
  return Boolean(leftTitle && rightTitle && (
    leftTitle === rightTitle || leftTitle.startsWith(`${rightTitle} `) || rightTitle.startsWith(`${leftTitle} `)
  ));
}

/** Reviewed records win when the provider returns the same event with a noisier title. */
export function mergeUpcomingEvents(
  reviewedEvents: EventRecord[],
  providerEvents: EventRecord[],
  now = new Date(),
): EventRecord[] {
  const merged: EventRecord[] = [];
  for (const event of [...reviewedEvents, ...providerEvents]) {
    if (
      Date.parse(event.startDateTime) < now.getTime()
      || !isEventTimeUsable(event)
      || event.status !== "scheduled"
      || merged.some((candidate) => eventsRepresentSameListing(candidate, event))
    ) continue;
    merged.push(event);
  }
  return merged.sort((a, b) => Date.parse(a.startDateTime) - Date.parse(b.startDateTime));
}

export function getEventByFixtureSlug(slug: string): EventRecord | undefined {
  return REVIEWED_EVENT_FIXTURES.find((event) => event.slug === slug);
}

export function getVenueProfile(idOrSlug: string): VenueProfile | undefined {
  return VENUE_PROFILES.find((venue) => venue.id === idOrSlug || venue.slug === idOrSlug);
}

export function entranceTargetFor(event: EventRecord, preference: ArrivalPreference): Date {
  const eventStart = new Date(event.startDateTime);
  const doorsOpen = event.doorsOpenDateTime ? new Date(event.doorsOpenDateTime) : null;

  if (preference === "comfortable" && doorsOpen && doorsOpen < eventStart) return doorsOpen;
  if (preference === "extra-early" && doorsOpen && doorsOpen < eventStart) {
    return new Date(doorsOpen.getTime() - 30 * 60_000);
  }

  return new Date(eventStart.getTime() - fallbackArrivalBuffer[preference] * 60_000);
}

export function provisionalDepartureFor(
  event: EventRecord,
  venue: VenueProfile,
  preference: ArrivalPreference,
  travelMode: EventTravelMode,
): Date {
  const entranceAt = entranceTargetFor(event, preference);
  const assumedTravelMinutes = travelMode === "WALK" ? 45 : travelMode === "TRANSIT" ? 75 : 60;
  const totalMinutes = venue.lastMileMinutes[travelMode] + preferenceUncertainty[preference] + assumedTravelMinutes;
  return new Date(entranceAt.getTime() - totalMinutes * 60_000);
}

export function calculateEventLeavePlan({
  event,
  venue,
  preference,
  travelMode,
  travelMinutes,
}: {
  event: EventRecord;
  venue: VenueProfile;
  preference: ArrivalPreference;
  travelMode: EventTravelMode;
  travelMinutes: number;
}): EventLeavePlan {
  if (!isEventTimeUsable(event)) throw new Error("This event does not have a precise start time yet.");
  if (!Number.isFinite(travelMinutes) || travelMinutes <= 0 || travelMinutes > 1_440) {
    throw new Error("Travel time must be between 1 and 1,440 minutes.");
  }

  const eventStartsAt = new Date(event.startDateTime);
  const entranceAt = entranceTargetFor(event, preference);
  const lastMileMinutes = venue.lastMileMinutes[travelMode];
  const uncertaintyMinutes = preferenceUncertainty[preference];
  const venueArrivalAt = new Date(entranceAt.getTime() - lastMileMinutes * 60_000);
  const leaveAt = new Date(venueArrivalAt.getTime() - (travelMinutes + uncertaintyMinutes) * 60_000);
  const arrivalBufferMinutes = Math.round((eventStartsAt.getTime() - entranceAt.getTime()) / 60_000);

  return {
    leaveAt,
    venueArrivalAt,
    entranceAt,
    eventStartsAt,
    travelMinutes,
    lastMileMinutes,
    uncertaintyMinutes,
    arrivalBufferMinutes,
    totalBufferMinutes: arrivalBufferMinutes + lastMileMinutes + uncertaintyMinutes,
  };
}
