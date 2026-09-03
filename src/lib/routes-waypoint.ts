export interface RoutesWaypoint {
  address?: string;
  location?: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
}

/** Convert browser geolocation coordinates into a Routes API waypoint. */
export function buildRoutesWaypoint(value: string): RoutesWaypoint {
  const trimmed = value.trim();
  const match = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);

  if (match) {
    const latitude = Number(match[1]);
    const longitude = Number(match[2]);
    if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
      return { location: { latLng: { latitude, longitude } } };
    }
  }

  const address = /^[a-zA-Z]{2,4}$/.test(trimmed) ? `${trimmed} airport` : trimmed;
  return { address };
}
