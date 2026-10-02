export interface RouteCoordinates {
  latitude: number;
  longitude: number;
}

export interface MapboxRouteResult {
  durationMinutes: number;
  hasTrafficData: boolean;
}

interface MapboxDirectionsResponse {
  code?: string;
  message?: string;
  routes?: Array<{
    duration?: number;
    duration_typical?: number;
  }>;
}

type Fetcher = typeof fetch;

export function parseRouteCoordinates(
  latitudeValue: string | null,
  longitudeValue: string | null
): RouteCoordinates | null {
  if (!latitudeValue?.trim() || !longitudeValue?.trim()) return null;
  const latitude = Number(latitudeValue);
  const longitude = Number(longitudeValue);
  if (
    !Number.isFinite(latitude) || latitude < -90 || latitude > 90 ||
    !Number.isFinite(longitude) || longitude < -180 || longitude > 180
  ) return null;
  return { latitude, longitude };
}

export async function requestMapboxRoute(
  origin: RouteCoordinates,
  destination: RouteCoordinates,
  departureUnix: number,
  travelMode: "DRIVE" | "WALK",
  accessToken: string,
  fetcher: Fetcher = fetch
): Promise<MapboxRouteResult> {
  const profile = travelMode === "WALK" ? "walking" : "driving-traffic";
  const coordinates = [origin, destination]
    .map(({ latitude, longitude }) => `${longitude},${latitude}`)
    .join(";");
  const params = new URLSearchParams({
    access_token: accessToken,
    alternatives: "false",
    overview: "false",
    steps: "false",
  });
  if (travelMode === "DRIVE") {
    const safeDepartureUnix = Math.max(departureUnix, Math.floor(Date.now() / 1000) + 60);
    // Mapbox accepts whole-second ISO 8601 timestamps; JavaScript's default
    // millisecond suffix causes Directions to reject the request with 422.
    params.set(
      "depart_at",
      new Date(safeDepartureUnix * 1000).toISOString().replace(".000Z", "Z")
    );
  }

  const response = await fetcher(
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?${params}`,
    { cache: "no-store" }
  );
  if (!response.ok) throw new Error(`Mapbox Directions returned HTTP ${response.status}`);
  const data = await response.json() as MapboxDirectionsResponse;
  const route = data.routes?.[0];
  if (data.code !== "Ok" || !route || !Number.isFinite(route.duration)) {
    throw new Error(`Mapbox Directions returned no route${data.message ? `: ${data.message}` : ""}`);
  }

  const duration = route.duration as number;
  const typical = route.duration_typical;
  return {
    durationMinutes: Math.ceil(duration / 60),
    hasTrafficData: travelMode === "DRIVE" && Number.isFinite(typical) && Math.abs(duration - (typical as number)) >= 30,
  };
}
