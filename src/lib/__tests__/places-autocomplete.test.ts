import assert from "node:assert/strict";
import {
  AUTOCOMPLETE_FIELD_MASK,
  AUTOCOMPLETE_PASTE_DEBOUNCE_MS,
  AUTOCOMPLETE_TYPING_DEBOUNCE_MS,
  includedPrimaryTypesFor,
  isAirportCodeQuery,
  isAutocompleteInputEligible,
  requestAutocomplete,
  shouldRequestPaidAutocomplete,
} from "../places-autocomplete";

async function main() {
  assert.equal(AUTOCOMPLETE_TYPING_DEBOUNCE_MS, 650);
  assert.equal(AUTOCOMPLETE_PASTE_DEBOUNCE_MS, 750);
  assert.equal(isAutocompleteInputEligible("ab"), false);
  assert.equal(isAutocompleteInputEligible("  ab  "), false);
  assert.equal(isAutocompleteInputEligible("abc"), false);
  assert.equal(isAutocompleteInputEligible("abcd"), true);
  assert.equal(isAirportCodeQuery("BWI"), true);
  assert.equal(isAirportCodeQuery(" bw "), true);
  assert.equal(isAirportCodeQuery("BWI Airport"), false);
  assert.equal(shouldRequestPaidAutocomplete("BWI", "airport"), false);
  assert.equal(shouldRequestPaidAutocomplete("Baltimore", "airport"), true);
  assert.equal(shouldRequestPaidAutocomplete("MIA", "cruise-terminal"), false);
  assert.equal(shouldRequestPaidAutocomplete("PortMiami", "cruise-terminal"), true);
  assert.equal(shouldRequestPaidAutocomplete("BWI", "place"), false);
  assert.equal(includedPrimaryTypesFor("not-a-google-type"), null);
  assert.deepEqual(includedPrimaryTypesFor("geocode"), ["geocode"]);

  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;
  const healthReports: Array<{ outcome: string; predictionCount: number }> = [];
  const predictions = await requestAutocomplete(
  "Newark",
  ["geocode"],
  "server-key",
  async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(JSON.stringify({
      suggestions: [
        {
          placePrediction: {
            placeId: "ChIJ-test",
            text: { text: "Newark, NJ, USA" },
            structuredFormat: {
              mainText: { text: "Newark" },
              secondaryText: { text: "NJ, USA" },
            },
          },
        },
        { queryPrediction: { text: { text: "ignored query" } } },
      ],
    }), { status: 200 });
  },
  (health) => healthReports.push(health)
  );

  assert.deepEqual(predictions, [{
  placeId: "ChIJ-test",
  description: "Newark, NJ, USA",
  mainText: "Newark",
  secondaryText: "NJ, USA",
  }]);
  assert.equal(capturedUrl, "https://places.googleapis.com/v1/places:autocomplete");
  assert.equal(capturedInit?.method, "POST");
  assert.equal(
  (capturedInit?.headers as Record<string, string>)["X-Goog-FieldMask"],
  AUTOCOMPLETE_FIELD_MASK
  );
  const body = JSON.parse(String(capturedInit?.body)) as Record<string, unknown>;
  assert.equal(body.sessionToken, undefined);
  assert.equal(capturedUrl.includes("session"), false);
  assert.equal(healthReports.length, 1);
  assert.equal(healthReports[0]?.outcome, "succeeded");
  assert.equal(healthReports[0]?.predictionCount, 1);

  const originalConsoleError = console.error;
  const errorLogs: string[] = [];
  console.error = (message?: unknown) => errorLogs.push(String(message));
  try {
    assert.deepEqual(
      await requestAutocomplete("Newark", ["geocode"], "key", async () =>
        new Response(JSON.stringify({
          error: {
            code: 429,
            status: "RESOURCE_EXHAUSTED",
            details: [{ reason: "RATE_LIMIT_EXCEEDED" }],
          },
        }), { status: 429 })
      ),
      []
    );

    assert.deepEqual(
      await requestAutocomplete("Newark", ["geocode"], "key", async () => {
        throw new TypeError("network failure");
      }),
      []
    );
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(errorLogs.length, 2);
  assert.match(errorLogs[0], /"statusCode":429/);
  assert.match(errorLogs[0], /"providerStatus":"RESOURCE_EXHAUSTED"/);
  assert.match(errorLogs[0], /"providerReason":"RATE_LIMIT_EXCEEDED"/);
  assert.match(errorLogs[1], /"failureType":"TypeError"/);
  assert.equal(errorLogs.some((entry) => entry.includes("Newark")), false);
  assert.equal(errorLogs.some((entry) => entry.includes("key")), false);

  console.log("places-autocomplete tests passed");
}

void main();
