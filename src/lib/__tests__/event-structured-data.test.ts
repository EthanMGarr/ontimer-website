import assert from "node:assert/strict";
import { buildEventStructuredData } from "../event-structured-data";
import { METLIFE_STADIUM, REVIEWED_EVENT_FIXTURES } from "../event-time-to-leave";

const event = REVIEWED_EVENT_FIXTURES[0];
const canonical = `https://www.ontimer.app/events/${event.slug}/when-to-leave`;
const data = buildEventStructuredData(event, METLIFE_STADIUM, canonical);

assert.equal(data["@type"], "Event");
assert.equal(data.name, "AC/DC — Power Up Tour");
assert.match(data.description, /Calculate when to leave/);
assert.deepEqual(data.image, event.imageUrls);
assert.deepEqual(data.performer, [{ "@type": "PerformingGroup", name: "AC/DC" }]);
assert.deepEqual(data.offers, { "@type": "Offer", url: event.offer?.url });
assert.equal("endDate" in data, false, "Unknown event end times must not be inferred");
assert.equal("organizer" in data, false, "Unknown organizers must not be inferred");

console.log("event structured data tests passed");
