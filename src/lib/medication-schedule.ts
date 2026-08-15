export type MedicationFrequency = 1 | 2 | 3 | 4 | "custom";
export type MedicationTimePeriod = "AM" | "PM";

export function medicationTimeParts(time: string): {
  hour: number;
  minute: number;
  period: MedicationTimePeriod;
} {
  const match = /^(?:[01]\d|2[0-3]):[0-5]\d$/.exec(time);
  if (!match) return { hour: 8, minute: 0, period: "AM" };
  const [hours, minutes] = time.split(":").map(Number);
  return {
    hour: hours % 12 || 12,
    minute: minutes,
    period: hours >= 12 ? "PM" : "AM",
  };
}

export function medicationTimeFromParts(
  hour: number,
  minute: number,
  period: MedicationTimePeriod,
): string {
  const safeHour = Math.min(12, Math.max(1, Math.trunc(hour)));
  const safeMinute = Math.min(59, Math.max(0, Math.trunc(minute)));
  const hours24 = (safeHour % 12) + (period === "PM" ? 12 : 0);
  return `${String(hours24).padStart(2, "0")}:${String(safeMinute).padStart(2, "0")}`;
}

export function generateMedicationTimes(
  startTime: string,
  frequency: MedicationFrequency,
): string[] {
  if (frequency === "custom") return [startTime];

  const [hours, minutes] = startTime.split(":").map(Number);
  const startMinutes = hours * 60 + minutes;
  const gap = Math.floor(1440 / frequency);

  return Array.from({ length: frequency }, (_, index) => {
    const total = (startMinutes + index * gap) % 1440;
    const hour = String(Math.floor(total / 60)).padStart(2, "0");
    const minute = String(total % 60).padStart(2, "0");
    return `${hour}:${minute}`;
  });
}

export function isOvernightTime(time: string): boolean {
  const [hours] = time.split(":").map(Number);
  return hours >= 23 || hours < 6;
}

export function formatMedicationTime(time: string): string {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) return "Choose a valid time";
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const hour = hours % 12 || 12;
  const formatted = `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
  return time === "00:00" ? "12:00 midnight" : formatted;
}
