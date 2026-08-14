export interface AutocompletePrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

interface GoogleAutocompleteResponse {
  suggestions?: Array<{
    placePrediction?: {
      placeId?: string;
      text?: { text?: string };
      structuredFormat?: {
        mainText?: { text?: string };
        secondaryText?: { text?: string };
      };
    };
  }>;
}

export const AUTOCOMPLETE_FIELD_MASK = [
  "suggestions.placePrediction.placeId",
  "suggestions.placePrediction.text.text",
  "suggestions.placePrediction.structuredFormat.mainText.text",
  "suggestions.placePrediction.structuredFormat.secondaryText.text",
].join(",");

export function isAutocompleteInputEligible(input: string): boolean {
  return input.trim().length >= 4;
}

export function isAirportCodeQuery(input: string): boolean {
  return /^[a-z]{2,3}$/i.test(input.trim());
}

export function shouldRequestPaidAutocomplete(
  input: string,
  mode: "place" | "airport" | "cruise-terminal" = "place"
): boolean {
  if (mode !== "place" && isAirportCodeQuery(input)) return false;
  return isAutocompleteInputEligible(input);
}

// These are the only legacy values used or intentionally supported by the
// component interface. `address` has no New API collection equivalent.
const PERMITTED_TYPES: Readonly<Record<string, readonly string[]>> = {
  geocode: ["geocode"],
  establishment: ["establishment"],
  address: ["street_address"],
  "(cities)": ["(cities)"],
  "(regions)": ["(regions)"],
};

export function includedPrimaryTypesFor(types: string): readonly string[] | null {
  return PERMITTED_TYPES[types] ?? null;
}

export function normalizeAutocompleteResponse(
  data: GoogleAutocompleteResponse
): AutocompletePrediction[] {
  return (data.suggestions ?? []).flatMap(({ placePrediction }) => {
    const placeId = placePrediction?.placeId;
    const description = placePrediction?.text?.text;
    if (!placeId || !description) return [];

    return [{
      placeId,
      description,
      mainText:
        placePrediction.structuredFormat?.mainText?.text ?? description,
      secondaryText:
        placePrediction.structuredFormat?.secondaryText?.text ?? "",
    }];
  });
}

export async function requestAutocomplete(
  input: string,
  includedPrimaryTypes: readonly string[],
  apiKey: string,
  fetcher: typeof fetch = fetch
): Promise<AutocompletePrediction[]> {
  try {
    const response = await fetcher(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": AUTOCOMPLETE_FIELD_MASK,
        },
        body: JSON.stringify({
          input,
          languageCode: "en",
          includedPrimaryTypes,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) return [];
    return normalizeAutocompleteResponse(
      (await response.json()) as GoogleAutocompleteResponse
    );
  } catch {
    return [];
  }
}
