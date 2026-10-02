import assert from "node:assert/strict";
import {
  isValidMapboxSessionToken,
  requestMapboxSuggestions,
  retrieveMapboxPlace,
} from "../mapbox-location";
import { parseRouteCoordinates, requestMapboxRoute } from "../mapbox-routing";
import { isMapboxPilotActive } from "../mapbox-pilot";

async function main() {
  const future = "2026-10-09T16:00:00.000Z";
  const beforeExpiry = Date.parse("2026-10-09T15:59:59.000Z");
  const atExpiry = Date.parse(future);
  assert.equal(isMapboxPilotActive({
    MAPBOX_PILOT_ENABLED: "true",
    MAPBOX_ACCESS_TOKEN: "server-token",
    MAPBOX_PILOT_EXPIRES_AT: future,
  }, beforeExpiry), true);
  assert.equal(isMapboxPilotActive({
    MAPBOX_PILOT_ENABLED: "true",
    MAPBOX_ACCESS_TOKEN: "server-token",
    MAPBOX_PILOT_EXPIRES_AT: future,
  }, atExpiry), false, "the pilot must fail closed at its expiry");
  assert.equal(isMapboxPilotActive({
    MAPBOX_PILOT_ENABLED: "true",
    MAPBOX_ACCESS_TOKEN: "server-token",
  }, beforeExpiry), false, "a missing expiry must keep the pilot disabled");
  assert.equal(isMapboxPilotActive({
    MAPBOX_PILOT_ENABLED: "false",
    MAPBOX_ACCESS_TOKEN: "server-token",
    MAPBOX_PILOT_EXPIRES_AT: future,
  }, beforeExpiry), false);

  assert.equal(isValidMapboxSessionToken("12345678-abcd-efgh"), true);
  assert.equal(isValidMapboxSessionToken("short"), false);
  assert.equal(isValidMapboxSessionToken("unsafe/token/value"), false);

  let suggestUrl = "";
  const suggestions = await requestMapboxSuggestions(
    "Michigan Stadium",
    "12345678-abcd-efgh",
    "en",
    "server-token",
    async (url) => {
      suggestUrl = String(url);
      return new Response(JSON.stringify({
        suggestions: [{
          mapbox_id: "mapbox.test",
          name: "Michigan Stadium",
          full_address: "1201 S Main St, Ann Arbor, Michigan 48104, United States",
          place_formatted: "Ann Arbor, Michigan 48104, United States",
        }],
      }), { status: 200 });
    }
  );
  assert.deepEqual(suggestions, [{
    placeId: "mapbox.test",
    description: "Michigan Stadium, 1201 S Main St, Ann Arbor, Michigan 48104, United States",
    mainText: "Michigan Stadium",
    secondaryText: "Ann Arbor, Michigan 48104, United States",
  }]);
  const suggestRequest = new URL(suggestUrl);
  assert.equal(suggestRequest.pathname, "/search/searchbox/v1/suggest");
  assert.equal(suggestRequest.searchParams.get("session_token"), "12345678-abcd-efgh");
  assert.equal(suggestRequest.searchParams.get("access_token"), "server-token");
  assert.equal(suggestRequest.searchParams.has("eta_type"), false, "suggestions must not trigger Matrix API charges");

  const selected = await retrieveMapboxPlace(
    "mapbox.test",
    "12345678-abcd-efgh",
    "en",
    "server-token",
    async () => new Response(JSON.stringify({
      features: [{
        geometry: { coordinates: [-83.7487, 42.2658] },
        properties: {
          mapbox_id: "mapbox.test",
          name: "Michigan Stadium",
          full_address: "1201 S Main St, Ann Arbor, Michigan 48104, United States",
          place_formatted: "Ann Arbor, Michigan 48104, United States",
        },
      }],
    }), { status: 200 })
  );
  assert.deepEqual(selected.coordinates, { latitude: 42.2658, longitude: -83.7487 });
  assert.equal(
    selected.description,
    "Michigan Stadium, 1201 S Main St, Ann Arbor, Michigan 48104, United States"
  );

  assert.deepEqual(parseRouteCoordinates("40.7", "-74"), { latitude: 40.7, longitude: -74 });
  assert.equal(parseRouteCoordinates("91", "-74"), null);
  assert.equal(parseRouteCoordinates(null, null), null);

  let routeUrl = "";
  const route = await requestMapboxRoute(
    { latitude: 40.7128, longitude: -74.006 },
    { latitude: 40.758, longitude: -73.9855 },
    Math.floor(Date.now() / 1000) + 3_600,
    "DRIVE",
    "server-token",
    async (url) => {
      routeUrl = String(url);
      return new Response(JSON.stringify({
        code: "Ok",
        routes: [{ duration: 1_020, duration_typical: 840 }],
      }), { status: 200 });
    }
  );
  assert.deepEqual(route, { durationMinutes: 17, hasTrafficData: true });
  const routeRequest = new URL(routeUrl);
  assert.match(routeRequest.pathname, /\/directions\/v5\/mapbox\/driving-traffic\//);
  assert.equal(routeRequest.searchParams.get("overview"), "false");
  assert.ok(routeRequest.searchParams.get("depart_at"));
  assert.doesNotMatch(
    routeRequest.searchParams.get("depart_at") ?? "",
    /\.\d{3}Z$/,
    "Mapbox depart_at must use whole seconds"
  );

  console.log("mapbox pilot tests passed");
}

void main();
