export type AirportPickupInput = {
  arrival: Date;
  deplaneMinutes: number;
  airportWalkMinutes: number;
  bagMinutes: number;
  immigrationMinutes: number;
  driveMinutes: number;
  parkingMinutes: number;
  curbTimingMinutes: number;
};

export type AirportPickupPlan = {
  passengerReady: Date;
  leaveAt: Date;
  landingToReadyMinutes: number;
};

export function calculateAirportPickup(input: AirportPickupInput): AirportPickupPlan {
  const values = [input.arrival.getTime(), input.deplaneMinutes, input.airportWalkMinutes, input.bagMinutes, input.immigrationMinutes, input.driveMinutes, input.parkingMinutes, input.curbTimingMinutes];
  if (values.some((value) => !Number.isFinite(value)) || values.slice(1).some((value) => value < 0)) {
    throw new Error("Airport pickup inputs must be valid non-negative values.");
  }
  const landingToReadyMinutes = input.deplaneMinutes + input.airportWalkMinutes + input.bagMinutes + input.immigrationMinutes;
  const passengerReady = new Date(input.arrival.getTime() + landingToReadyMinutes * 60_000);
  const leaveAt = new Date(passengerReady.getTime() - (input.driveMinutes + input.parkingMinutes - input.curbTimingMinutes) * 60_000);
  return { passengerReady, leaveAt, landingToReadyMinutes };
}
