interface MapboxPilotEnvironment {
  [key: string]: string | undefined;
  MAPBOX_PILOT_ENABLED?: string;
  MAPBOX_ACCESS_TOKEN?: string;
  MAPBOX_PILOT_EXPIRES_AT?: string;
}

/**
 * Fail-closed production gate for the temporary Mapbox pilot.
 *
 * The flag and credential are necessary but not sufficient: a valid future
 * expiry is also required so a forgotten pilot cannot stay enabled forever.
 */
export function isMapboxPilotActive(
  environment: MapboxPilotEnvironment = process.env,
  now = Date.now()
): boolean {
  if (environment.MAPBOX_PILOT_ENABLED !== "true") return false;
  if (!environment.MAPBOX_ACCESS_TOKEN?.trim()) return false;

  const expiresAt = Date.parse(environment.MAPBOX_PILOT_EXPIRES_AT ?? "");
  return Number.isFinite(expiresAt) && now < expiresAt;
}
