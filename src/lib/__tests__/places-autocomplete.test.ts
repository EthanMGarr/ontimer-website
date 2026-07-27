import assert from "node:assert/strict";
import {
  AUTOCOMPLETE_FIELD_MASK,
  includedPrimaryTypesFor,
  isAutocompleteInputEligible,
  requestAutocomplete,
} from "../places-autocomplete";

async function main() {
  assert.equal(isAutocompleteInputEligible("ab"), false);
  assert.equal(isAutocompleteInputEligible("  ab  "), false);
  assert.equal(isAutocompleteInputEligible("abc"), true);
  assert.equal(includedPrimaryTypesFor("not-a-google-type"), null);
  assert.deepEqual(includedPrimaryTypesFor("geocode"), ["geocode"]);

  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;
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
  }
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

  assert.deepEqual(
    await requestAutocomplete("Newark", ["geocode"], "key", async () =>
      new Response("upstream error", { status: 500 })
    ),
    []
  );

  assert.deepEqual(
    await requestAutocomplete("Newark", ["geocode"], "key", async () => {
      throw new Error("network failure");
    }),
    []
  );

  console.log("places-autocomplete tests passed");
}

void main();
