export type MedicationFrequency = 1 | 2 | 3 | 4 | "custom";

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
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const hour = hours % 12 || 12;
  const formatted = `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
  return time === "00:00" ? "12:00 midnight" : formatted;
}
