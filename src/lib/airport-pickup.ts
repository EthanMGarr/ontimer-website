export type AirportPickupInput = {
  arrival: Date;
  deplaneMinutes: number;
  airportWalkMinutes: number;
  bagMinutes: number;
  immigrationMinutes: number;
  driveMinutes: number;
  trafficCushionMinutes: number;
  parkingMinutes: number;
  curbTimingMinutes: number;
};

export type AirportPickupPlan = {
  passengerReady: Date;
  leaveAt: Date;
  landingToReadyMinutes: number;
  trafficCushionMinutes: number;
};

/** Adds a visible planning cushion around a provider ETA without hiding it in the drive time. */
export function recommendedPickupTrafficCushion(driveMinutes: number): number {
  if (!Number.isFinite(driveMinutes) || driveMinutes <= 0) {
    throw new Error("Drive time must be a positive number.");
  }
  return Math.min(60, Math.max(30, Math.ceil((driveMinutes * 0.25) / 5) * 5));
}

/**
 * Uses a single paid route lookup in a plausible leave window. Ninety minutes
 * before landing is deliberately earlier than the old passenger-ready lookup
 * and captures airport-bound rush-hour conditions for medium and long drives.
 */
export function pickupTrafficEstimateAt(arrival: Date): Date {
  if (!Number.isFinite(arrival.getTime())) throw new Error("Arrival time must be valid.");
  return new Date(arrival.getTime() - 90 * 60_000);
}

export function calculateAirportPickup(input: AirportPickupInput): AirportPickupPlan {
  const values = [input.arrival.getTime(), input.deplaneMinutes, input.airportWalkMinutes, input.bagMinutes, input.immigrationMinutes, input.driveMinutes, input.trafficCushionMinutes, input.parkingMinutes, input.curbTimingMinutes];
  if (values.some((value) => !Number.isFinite(value)) || values.slice(1).some((value) => value < 0)) {
    throw new Error("Airport pickup inputs must be valid non-negative values.");
  }
  const landingToReadyMinutes = input.deplaneMinutes + input.airportWalkMinutes + input.bagMinutes + input.immigrationMinutes;
  const passengerReady = new Date(input.arrival.getTime() + landingToReadyMinutes * 60_000);
  const leaveAt = new Date(passengerReady.getTime() - (input.driveMinutes + input.trafficCushionMinutes + input.parkingMinutes - input.curbTimingMinutes) * 60_000);
  return { passengerReady, leaveAt, landingToReadyMinutes, trafficCushionMinutes: input.trafficCushionMinutes };
}
