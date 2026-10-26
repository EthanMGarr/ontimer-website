export interface ReverseGeocodeHealth {
  outcome: "succeeded" | "no_result" | "failed";
  durationMs: number;
  statusCode?: number;
  providerStatus?: string;
}

interface GoogleGeocodeResponse {
  status?: string;
  results?: Array<{ formatted_address?: string }>;
}

export function isValidCoordinatePair(latitude: number, longitude: number): boolean {
  return Number.isFinite(latitude)
    && Number.isFinite(longitude)
    && latitude >= -90
    && latitude <= 90
    && longitude >= -180
    && longitude <= 180;
}

export function nearestFormattedAddress(data: GoogleGeocodeResponse): string | null {
  const address = data.results?.find((result) => result.formatted_address?.trim())
    ?.formatted_address
    ?.trim();
  return address || null;
}

export async function requestNearestAddress(
  latitude: number,
  longitude: number,
  language: "en" | "es",
  apiKey: string,
  fetcher: typeof fetch = fetch,
  reportHealth?: (health: ReverseGeocodeHealth) => void
): Promise<string | null> {
  const startedAt = Date.now();
  const params = new URLSearchParams({
    latlng: `${latitude},${longitude}`,
    language,
    key: apiKey,
  });

  try {
    const response = await fetcher(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      reportHealth?.({
        outcome: "failed",
        durationMs: Date.now() - startedAt,
        statusCode: response.status,
      });
      return null;
    }

    const data = (await response.json()) as GoogleGeocodeResponse;
    const address = nearestFormattedAddress(data);
    reportHealth?.({
      outcome: address ? "succeeded" : "no_result",
      durationMs: Date.now() - startedAt,
      statusCode: response.status,
      providerStatus: data.status,
    });
    return address;
  } catch {
    reportHealth?.({
      outcome: "failed",
      durationMs: Date.now() - startedAt,
    });
    return null;
  }
}
