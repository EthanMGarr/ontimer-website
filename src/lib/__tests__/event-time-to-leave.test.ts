import {
  BARCLAYS_CENTER,
  CITI_FIELD,
  MADISON_SQUARE_GARDEN,
  METLIFE_STADIUM,
  REVIEWED_EVENT_FIXTURES,
  VENUE_PROFILES,
  YANKEE_STADIUM,
  calculateEventLeavePlan,
  entranceTargetFor,
  eventLifecycle,
  eventLocalDateIso,
  eventsRepresentSameListing,
  isEventIndexable,
  isAncillaryEventListingTitle,
  isEventTimeUsable,
  mergeUpcomingEvents,
} from "../event-time-to-leave";
import { findVenueOptions, venueRouteWaypoint } from "../venue-catalog";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function iso(date: Date): string {
  return date.toISOString();
}

const event = REVIEWED_EVENT_FIXTURES[0];

assert(isEventTimeUsable(event), "reviewed fixture should have a usable event time");
assert(iso(entranceTargetFor(event, "comfortable")) === "2026-09-25T21:30:00.000Z", "comfortable should target doors open");
assert(iso(entranceTargetFor(event, "just-in-time")) === "2026-09-25T22:15:00.000Z", "just-in-time should target 45 minutes before start");
assert(iso(entranceTargetFor(event, "extra-early")) === "2026-09-25T21:00:00.000Z", "extra-early should target 30 minutes before doors");

const comfortableDrive = calculateEventLeavePlan({
  event,
  venue: METLIFE_STADIUM,
  preference: "comfortable",
  travelMode: "DRIVE",
  travelMinutes: 60,
});
assert(iso(comfortableDrive.leaveAt) === "2026-09-25T19:45:00.000Z", "comfortable drive should leave at 3:45 PM ET");
assert(iso(comfortableDrive.venueArrivalAt) === "2026-09-25T21:00:00.000Z", "venue arrival should precede doors by parking and walk time");
assert(comfortableDrive.totalBufferMinutes === 135, "total non-route buffer should include entrance, last mile, and uncertainty");

const transit = calculateEventLeavePlan({
  event,
  venue: METLIFE_STADIUM,
  preference: "just-in-time",
  travelMode: "TRANSIT",
  travelMinutes: 75,
});
assert(iso(transit.leaveAt) === "2026-09-25T20:35:00.000Z", "transit plan should include station walk and uncertainty");

let rejected = false;
try {
  calculateEventLeavePlan({ event, venue: METLIFE_STADIUM, preference: "comfortable", travelMode: "DRIVE", travelMinutes: 0 });
} catch {
  rejected = true;
}
assert(rejected, "zero-minute travel should be rejected");

for (const query of ["MetLife", "met life stadium", "East Rutherford", "Meadowlands Stadium"]) {
  const match = findVenueOptions(query)[0];
  assert(match?.id === METLIFE_STADIUM.id, `static venue catalog should match ${query}`);
}
const metLifeMatch = findVenueOptions("MetLife")[0];
assert(metLifeMatch, "MetLife should be present in the venue catalog");
assert(venueRouteWaypoint(metLifeMatch) === "40.8135,-74.0745", "known venues should route by stored coordinates");

const venueQueries = [
  ["Yankees Stadium", YANKEE_STADIUM.id],
  ["MSG", MADISON_SQUARE_GARDEN.id],
  ["Atlantic Terminal arena", BARCLAYS_CENTER.id],
  ["Mets Stadium", CITI_FIELD.id],
] as const;
for (const [query, expectedId] of venueQueries) {
  assert(findVenueOptions(query)[0]?.id === expectedId, `static venue catalog should match ${query}`);
}
assert(VENUE_PROFILES.length === 5, "the launch catalog should contain five reviewed venues");
assert(
  eventLocalDateIso("2026-11-13T01:15:00Z", "America/New_York") === "2026-11-12",
  "event URLs should use the venue-local calendar date rather than the UTC date",
);
assert(eventLifecycle(event, new Date("2026-09-20T12:00:00Z")) === "upcoming", "future scheduled events should be upcoming");
assert(isEventIndexable(event, new Date("2026-09-20T12:00:00Z")), "future scheduled events should be indexable");
assert(eventLifecycle(event, new Date("2026-09-26T12:00:00Z")) === "past", "started events should retire");
assert(!isEventIndexable(event, new Date("2026-09-26T12:00:00Z")), "retired events should not remain indexable");
for (const title of [
  "New York Yankees v. Tampa Bay Rays * Premium Seating *",
  "2026-27 Rangers Season Ticket Memberships",
  "Barclays Center Tours - New York Liberty v. Atlanta Dream",
  "Parking - Example Concert",
]) {
  assert(isAncillaryEventListingTitle(title), `${title} should be excluded as ancillary inventory`);
}
assert(!isAncillaryEventListingTitle("AC/DC — Power Up Tour"), "a real concert tour must remain supported");

const providerDuplicate = {
  ...event,
  id: "ticketmaster-acdc",
  slug: "ac-dc-power-up-tour-2026--tm-example",
  title: "AC/DC - POWER UP TOUR 2026",
  subtitle: undefined,
  source: { label: "Ticketmaster", url: "https://www.ticketmaster.com/event/example" },
  sourceEventId: "example",
};
assert(eventsRepresentSameListing(event, providerDuplicate), "reviewed and provider AC/DC listings should match despite title punctuation and year");

const distinctSameDayEvent = {
  ...providerDuplicate,
  id: "ticketmaster-football",
  slug: "football--tm-example-2",
  title: "New York Giants vs. Example Team",
  sourceEventId: "example-2",
};
assert(!eventsRepresentSameListing(event, distinctSameDayEvent), "different same-day events must not be collapsed");

const mergedEvents = mergeUpcomingEvents(
  [event],
  [providerDuplicate, distinctSameDayEvent],
  new Date("2026-09-20T12:00:00Z"),
);
assert(mergedEvents.length === 2, "reviewed fixture should replace only its matching provider duplicate");
assert(mergedEvents[0].id === event.id, "reviewed event should win duplicate resolution");

console.log("event-time-to-leave tests passed");
