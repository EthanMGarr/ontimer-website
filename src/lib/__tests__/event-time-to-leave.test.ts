import {
  METLIFE_STADIUM,
  REVIEWED_EVENT_FIXTURES,
  calculateEventLeavePlan,
  entranceTargetFor,
  eventsRepresentSameListing,
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
