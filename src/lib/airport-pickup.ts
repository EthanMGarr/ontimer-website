export type AirportPickupInput = {
  arrival: Date;
  exitMinutes: number;
  driveMinutes: number;
  meetMinutes: number;
};

export type AirportPickupPlan = {
  passengerReady: Date;
  leaveAt: Date;
};

export function calculateAirportPickup(input: AirportPickupInput): AirportPickupPlan {
  const values = [input.arrival.getTime(), input.exitMinutes, input.driveMinutes, input.meetMinutes];
  if (values.some((value) => !Number.isFinite(value)) || input.exitMinutes < 0 || input.driveMinutes < 0 || input.meetMinutes < 0) {
    throw new Error("Airport pickup inputs must be valid non-negative values.");
  }
  const passengerReady = new Date(input.arrival.getTime() + input.exitMinutes * 60_000);
  const leaveAt = new Date(passengerReady.getTime() - (input.driveMinutes + input.meetMinutes) * 60_000);
  return { passengerReady, leaveAt };
}
