import assert from "node:assert/strict";
import {
  invalidAddressMessage,
  isInvalidTravelTimeLocation,
  readTravelTimeResponse,
  travelTimeErrorCodeFromMessage,
} from "../travel-time-errors";

assert.equal(travelTimeErrorCodeFromMessage("Routes API returned no routes"), "invalid_location");
assert.equal(travelTimeErrorCodeFromMessage("HTTP 503"), "service_unavailable");
assert.equal(invalidAddressMessage(), "Enter a valid address.");
assert.equal(invalidAddressMessage("es"), "Introduce una dirección válida.");

async function main() {
  const invalidResponse = new Response(JSON.stringify({
    error: "Routes API returned no routes",
    code: "invalid_location",
  }), { status: 422, headers: { "Content-Type": "application/json" } });

  await assert.rejects(
    () => readTravelTimeResponse(invalidResponse),
    (error: unknown) => isInvalidTravelTimeLocation(error)
  );

  console.log("travel-time error tests passed");
}

void main();
