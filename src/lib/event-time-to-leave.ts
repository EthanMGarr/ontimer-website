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
  streetAddress: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
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
  streetAddress: "One MetLife Stadium Drive",
  address: "One MetLife Stadium Drive, East Rutherford, NJ 07073",
  city: "East Rutherford",
  state: "NJ",
  postalCode: "07073",
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

export const YANKEE_STADIUM: VenueProfile = {
  id: "yankee-stadium",
  slug: "yankee-stadium",
  name: "Yankee Stadium",
  aliases: ["Yankees Stadium", "New York Yankees stadium", "Yankee ballpark", "Bronx baseball stadium"],
  streetAddress: "One East 161st Street",
  address: "One East 161st Street, Bronx, NY 10451",
  city: "Bronx",
  state: "NY",
  postalCode: "10451",
  country: "US",
  timezone: "America/New_York",
  coordinates: { latitude: 40.8296, longitude: -73.9262 },
  reviewedAt: "2026-09-20",
  lastMileMinutes: { DRIVE: 25, TRANSIT: 10, WALK: 5 },
  insights: [
    "Event traffic and garage access can add time after the route estimate. Drivers should include time to park and walk to the assigned gate.",
    "The 161 St–Yankee Stadium subway station and Yankees–E. 153rd St Metro-North station are both close to the ballpark. Check live service before leaving.",
    "Gate locations differ around the stadium, and the best approach depends on the entrance shown for your ticket or event.",
    "Gate times and entry policies can vary for games, matches, concerts, and special events. Review the event-specific guidance before departing.",
  ],
  sources: [
    { label: "Know before you go", url: "https://www.mlb.com/yankees/ballpark/information/know-before-you-go" },
    { label: "Yankee Stadium guide", url: "https://www.mlb.com/yankees/ballpark/information/guide" },
    { label: "Ballpark information", url: "https://www.mlb.com/yankees/ballpark" },
  ],
};

export const MADISON_SQUARE_GARDEN: VenueProfile = {
  id: "madison-square-garden",
  slug: "madison-square-garden",
  name: "Madison Square Garden",
  aliases: ["MSG", "The Garden", "Madison Square Garden NYC", "Penn Station arena"],
  streetAddress: "4 Pennsylvania Plaza",
  address: "4 Pennsylvania Plaza, New York, NY 10001",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "US",
  timezone: "America/New_York",
  coordinates: { latitude: 40.7505, longitude: -73.9934 },
  reviewedAt: "2026-09-20",
  lastMileMinutes: { DRIVE: 20, TRANSIT: 10, WALK: 5 },
  insights: [
    "Madison Square Garden sits above Penn Station. Build in time to move through the station or surrounding blocks and reach the entrance listed for your ticket.",
    "Subway, commuter rail, and intercity rail serve the area, but service changes and station crowds can affect the last part of the trip.",
    "Driving into Midtown can add unpredictable approach and parking time beyond the route estimate. Reserve parking separately when needed.",
    "Entrance instructions and event policies can differ by show or game. Check the event details and current venue guidance before leaving.",
  ],
  sources: [
    { label: "Directions", url: "https://www.msg.com/madison-square-garden/directions" },
    { label: "Madison Square Garden FAQ", url: "https://www.msg.com/madison-square-garden/faqs" },
    { label: "Venue information", url: "https://www.msg.com/madison-square-garden" },
  ],
};

export const BARCLAYS_CENTER: VenueProfile = {
  id: "barclays-center",
  slug: "barclays-center",
  name: "Barclays Center",
  aliases: ["Barclays", "Brooklyn Nets arena", "New York Liberty arena", "Atlantic Terminal arena"],
  streetAddress: "620 Atlantic Avenue",
  address: "620 Atlantic Avenue, Brooklyn, NY 11217",
  city: "Brooklyn",
  state: "NY",
  postalCode: "11217",
  country: "US",
  timezone: "America/New_York",
  coordinates: { latitude: 40.6826, longitude: -73.9754 },
  reviewedAt: "2026-09-20",
  lastMileMinutes: { DRIVE: 20, TRANSIT: 10, WALK: 5 },
  insights: [
    "Barclays Center is next to the Atlantic Terminal transit complex. Include time to exit the station, orient to the plaza, and reach the correct entrance.",
    "Driving and rideshare traffic can build around Atlantic and Flatbush avenues before major events, so the route estimate is only part of the arrival.",
    "Security screening can take longer for guests carrying bags. Review the current size limits and prohibited-items guidance before leaving.",
    "The venue does not offer bag check, and event requirements can change. Confirm the rules for your specific event in advance.",
  ],
  sources: [
    { label: "Getting here", url: "https://www.barclayscenter.com/home/getting-here" },
    { label: "A–Z guide", url: "https://www.barclayscenter.com/a-z-guide" },
    { label: "Prohibited items", url: "https://www.barclayscenter.com/center-info/prohibited-items" },
  ],
};

export const CITI_FIELD: VenueProfile = {
  id: "citi-field",
  slug: "citi-field",
  name: "Citi Field",
  aliases: ["Mets Stadium", "New York Mets stadium", "Mets ballpark", "Willets Point stadium"],
  streetAddress: "41 Seaver Way",
  address: "41 Seaver Way, Flushing, NY 11368",
  city: "Flushing",
  state: "NY",
  postalCode: "11368",
  country: "US",
  timezone: "America/New_York",
  coordinates: { latitude: 40.7571, longitude: -73.8458 },
  reviewedAt: "2026-09-20",
  lastMileMinutes: { DRIVE: 25, TRANSIT: 10, WALK: 5 },
  insights: [
    "The route estimate does not include the full stadium approach. Drivers should allow time for event traffic, parking direction, and the walk from the assigned lot.",
    "The 7 train and Port Washington Branch LIRR serve Mets–Willets Point. Check live service and allow time for the walk across the boardwalk to the gates.",
    "Parking access and lot availability can change for games and concerts. Review event-specific parking information before relying on a particular entrance.",
    "Bag and security policies affect entry time. Check the latest venue rules and arrive with enough time for screening.",
  ],
  sources: [
    { label: "Getting to Citi Field", url: "https://www.mlb.com/mets/ballpark/transportation" },
    { label: "Public transportation", url: "https://www.mlb.com/mets/ballpark/transportation/public" },
    { label: "Bag policy", url: "https://www.mlb.com/mets/ballpark/information/bag-policy" },
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

export const VENUE_PROFILES: VenueProfile[] = [
  METLIFE_STADIUM,
  YANKEE_STADIUM,
  MADISON_SQUARE_GARDEN,
  BARCLAYS_CENTER,
  CITI_FIELD,
];

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

/** Excludes Ticketmaster inventory products that are not events a visitor travels to. */
export function isAncillaryEventListingTitle(title: string): boolean {
  const normalized = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return [
    /\bpremium seating\b/,
    /\bseason ticket memberships?\b/,
    /\bvip packages?\b/,
    /\bclub access\b/,
    /\blounge access\b/,
    /\bsuite tickets?\b/,
    /^(?:parking|prepaid parking)\b/,
    /\b(?:arena|center|garden|stadium|field) tours?\b/,
  ].some((pattern) => pattern.test(normalized));
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

export function eventLocalDateIso(startDateTime: string, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(startDateTime));
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value || "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function eventLocalDate(event: EventRecord): string {
  return eventLocalDateIso(event.startDateTime, event.timezone);
}

export type EventLifecycle = "upcoming" | "past" | "cancelled" | "postponed" | "rescheduled" | "unavailable";

export function eventLifecycle(event: EventRecord, now = new Date()): EventLifecycle {
  if (event.status !== "scheduled") return event.status;
  if (!isEventTimeUsable(event)) return "unavailable";
  return Date.parse(event.startDateTime) > now.getTime() ? "upcoming" : "past";
}

export function isEventIndexable(event: EventRecord, now = new Date()): boolean {
  return eventLifecycle(event, now) === "upcoming";
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
      !isEventIndexable(event, now)
      || isAncillaryEventListingTitle(event.title)
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
