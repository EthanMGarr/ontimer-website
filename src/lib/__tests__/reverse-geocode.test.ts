import assert from "node:assert/strict";
import {
  isValidCoordinatePair,
  nearestFormattedAddress,
  requestNearestAddress,
} from "../reverse-geocode";

assert.equal(isValidCoordinatePair(40.7357, -74.1724), true);
assert.equal(isValidCoordinatePair(91, -74.1724), false);
assert.equal(isValidCoordinatePair(40.7357, -181), false);
assert.equal(isValidCoordinatePair(Number.NaN, -74.1724), false);

assert.equal(
  nearestFormattedAddress({
    status: "OK",
    results: [{ formatted_address: "  123 Main St, Newark, NJ 07102, USA  " }],
  }),
  "123 Main St, Newark, NJ 07102, USA"
);
assert.equal(nearestFormattedAddress({ status: "ZERO_RESULTS", results: [] }), null);

async function main() {
  let requestCount = 0;
  const address = await requestNearestAddress(
    40.7357,
    -74.1724,
    "en",
    "test-key",
    (async (input: string | URL | Request) => {
      requestCount += 1;
      const url = new URL(String(input));
      assert.equal(url.searchParams.get("latlng"), "40.7357,-74.1724");
      assert.equal(url.searchParams.get("language"), "en");
      return new Response(JSON.stringify({
        status: "OK",
        results: [{ formatted_address: "123 Main St, Newark, NJ 07102, USA" }],
      }), { status: 200 });
    }) as typeof fetch
  );
  assert.equal(address, "123 Main St, Newark, NJ 07102, USA");
  assert.equal(requestCount, 1, "one user action must make at most one upstream lookup");

  console.log("reverse-geocode tests passed");
}

void main();
