export interface MapboxPrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface MapboxSelectedPlace extends MapboxPrediction {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface MapboxSuggestion {
  mapbox_id?: string;
  name?: string;
  full_address?: string;
  place_formatted?: string;
}

interface MapboxSuggestResponse {
  suggestions?: MapboxSuggestion[];
}

interface MapboxFeature {
  geometry?: { coordinates?: unknown };
  properties?: {
    mapbox_id?: string;
    name?: string;
    full_address?: string;
    place_formatted?: string;
  };
}

interface MapboxRetrieveResponse {
  features?: MapboxFeature[];
}

type Fetcher = typeof fetch;

const MAPBOX_SEARCH_BASE = "https://api.mapbox.com/search/searchbox/v1";

function displayDescription(
  name: string,
  fullAddress?: string,
  placeFormatted?: string
): string {
  if (fullAddress?.trim()) {
    const full = fullAddress.trim();
    return full.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())
      ? full
      : `${name}, ${full}`;
  }
  const place = placeFormatted?.trim() ?? "";
  if (!place || place.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())) return name;
  return `${name}, ${place}`;
}

function requireSuccessfulResponse(response: Response, service: string): void {
  if (!response.ok) throw new Error(`${service} returned HTTP ${response.status}`);
}

export function isValidMapboxSessionToken(value: string): boolean {
  return /^[A-Za-z0-9-]{8,80}$/.test(value);
}

export async function requestMapboxSuggestions(
  input: string,
  sessionToken: string,
  language: "en" | "es",
  accessToken: string,
  fetcher: Fetcher = fetch
): Promise<MapboxPrediction[]> {
  const params = new URLSearchParams({
    q: input,
    session_token: sessionToken,
    access_token: accessToken,
    language,
    limit: "6",
  });
  const response = await fetcher(`${MAPBOX_SEARCH_BASE}/suggest?${params}`, {
    cache: "no-store",
  });
  requireSuccessfulResponse(response, "Mapbox Search Box suggest");
  const data = await response.json() as MapboxSuggestResponse;

  return (data.suggestions ?? []).flatMap((suggestion) => {
    const placeId = suggestion.mapbox_id?.trim();
    const mainText = suggestion.name?.trim();
    if (!placeId || !mainText) return [];
    return [{
      placeId,
      description: displayDescription(
        mainText,
        suggestion.full_address,
        suggestion.place_formatted
      ),
      mainText,
      secondaryText: suggestion.place_formatted?.trim() ?? "",
    }];
  });
}

export async function retrieveMapboxPlace(
  placeId: string,
  sessionToken: string,
  language: "en" | "es",
  accessToken: string,
  fetcher: Fetcher = fetch
): Promise<MapboxSelectedPlace> {
  const params = new URLSearchParams({
    session_token: sessionToken,
    access_token: accessToken,
    language,
  });
  const response = await fetcher(
    `${MAPBOX_SEARCH_BASE}/retrieve/${encodeURIComponent(placeId)}?${params}`,
    { cache: "no-store" }
  );
  requireSuccessfulResponse(response, "Mapbox Search Box retrieve");
  const data = await response.json() as MapboxRetrieveResponse;
  const feature = data.features?.[0];
  const properties = feature?.properties;
  const coordinates = feature?.geometry?.coordinates;
  const longitude = Array.isArray(coordinates) ? Number(coordinates[0]) : NaN;
  const latitude = Array.isArray(coordinates) ? Number(coordinates[1]) : NaN;
  const mainText = properties?.name?.trim();

  if (
    !mainText ||
    !Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
    !Number.isFinite(longitude) || longitude < -180 || longitude > 180
  ) {
    throw new Error("Mapbox Search Box retrieve returned an invalid feature");
  }

  return {
    placeId: properties?.mapbox_id?.trim() || placeId,
    description: displayDescription(
      mainText,
      properties?.full_address,
      properties?.place_formatted
    ),
    mainText,
    secondaryText: properties?.place_formatted?.trim() ?? "",
    coordinates: { latitude, longitude },
  };
}
