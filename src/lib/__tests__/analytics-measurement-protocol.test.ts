import assert from "node:assert/strict";
import {
  measurementProtocolBatchPayload,
  measurementProtocolPayload,
  parseFirstPartyAnalyticsEvent,
  parseFirstPartyAnalyticsEvents,
  sanitizeAnalyticsParams,
} from "../analytics-measurement-protocol";

const event = parseFirstPartyAnalyticsEvent({
  event_name: "calculator_completed",
  client_id: "5e572021-5bf7-4b5d-9a06-83d13a6f61ba",
  params: {
    calculator_type: "airport_leave_time",
    experiment_variant: "app_primary",
    assignment_method: "full_rollout",
    session_id: 1791468000000,
    ignored_object: { value: "no" },
  },
});

assert.ok(event);
assert.equal(event.event_name, "calculator_completed");
assert.equal(event.params.ignored_object, undefined);

const payload = measurementProtocolPayload(
  event,
  "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36",
);
assert.equal(payload.client_id, event.client_id);
assert.equal(payload.user_agent, "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36");
assert.equal(payload.events[0].name, "calculator_completed");
assert.equal(payload.events[0].params.experiment_variant, "app_primary");
assert.equal(payload.events[0].params.session_id, 1791468000000);
assert.equal(payload.events[0].params.engagement_time_msec, 1);
assert.equal(payload.events[0].params.transport_source, "first_party");

assert.equal(measurementProtocolPayload(event, null).user_agent, undefined);
assert.equal(measurementProtocolPayload(event, "x".repeat(600)).user_agent?.length, 512);

const batch = parseFirstPartyAnalyticsEvents({
  client_id: event.client_id,
  events: [
    { event_name: "experiment_assignment", params: { session_id: 1791468000000 } },
    { event_name: "calculator_completed", params: { calculator_type: "airport_leave_time" } },
  ],
});
assert.ok(batch);
assert.equal(batch.length, 2);
assert.equal(batch[0].client_id, event.client_id);
const batchPayload = measurementProtocolBatchPayload(batch, "test-agent");
assert.equal(batchPayload.client_id, event.client_id);
assert.equal(batchPayload.user_agent, "test-agent");
assert.deepEqual(batchPayload.events.map(({ name }) => name), [
  "experiment_assignment",
  "calculator_completed",
]);
assert.equal(parseFirstPartyAnalyticsEvents(event)?.length, 1, "legacy single-event bodies remain valid");
assert.equal(parseFirstPartyAnalyticsEvents({ client_id: event.client_id, events: [] }), null);
assert.equal(parseFirstPartyAnalyticsEvents({
  client_id: event.client_id,
  events: Array.from({ length: 11 }, () => ({ event_name: "too_many", params: {} })),
}), null);

assert.equal(parseFirstPartyAnalyticsEvent({ event_name: "Bad Event", client_id: "12345678" }), null);
assert.equal(parseFirstPartyAnalyticsEvent({ event_name: "calculator_completed", client_id: "short" }), null);
assert.deepEqual(sanitizeAnalyticsParams({ valid_name: 3, BadName: "no", invalid: true }), {
  valid_name: 3,
});

console.log("Analytics Measurement Protocol tests passed.");
