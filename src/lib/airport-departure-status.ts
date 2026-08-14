export type AirportTimingConfidence = "comfortable" | "tight" | "risk";
export type AirportDepartureTone = "positive" | "caution" | "urgent";

export interface AirportDepartureStatus {
  tone: AirportDepartureTone;
  label: string;
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder === 0 ? `${hours} hr` : `${hours} hr ${remainder} min`;
}

export function getAirportDepartureStatus(
  leaveTime: Date,
  confidence: AirportTimingConfidence,
  now = new Date()
): AirportDepartureStatus {
  const millisecondsUntilLeave = leaveTime.getTime() - now.getTime();

  if (millisecondsUntilLeave < 0) {
    const minutesLate = Math.max(1, Math.floor(Math.abs(millisecondsUntilLeave) / 60_000));
    return {
      tone: "urgent",
      label: `You should have left ${formatMinutes(minutesLate)} ago`,
    };
  }

  const minutesUntilLeave = Math.max(1, Math.ceil(millisecondsUntilLeave / 60_000));
  if (minutesUntilLeave <= 15) {
    return {
      tone: "urgent",
      label: minutesUntilLeave <= 1 ? "Leave now" : `Leave in ${formatMinutes(minutesUntilLeave)}`,
    };
  }

  if (confidence === "risk") {
    return {
      tone: "urgent",
      label: `Leave in ${formatMinutes(minutesUntilLeave)} · your airport buffer may be risky`,
    };
  }

  if (confidence === "tight") {
    return {
      tone: "caution",
      label: `Leave in ${formatMinutes(minutesUntilLeave)} · timing may be tight`,
    };
  }

  return {
    tone: minutesUntilLeave <= 45 ? "caution" : "positive",
    label: `Leave in ${formatMinutes(minutesUntilLeave)}`,
  };
}
