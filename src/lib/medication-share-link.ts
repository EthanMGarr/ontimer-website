export interface SharedMedicationSchedule {
  version: 1;
  medication: string;
  instructions: string;
  startDate: string;
  days: number;
  times: Array<{ time: string; dayOffset?: number }>;
  timeZone?: string;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export function encodeMedicationSchedule(schedule: SharedMedicationSchedule): string {
  return encodeURIComponent(JSON.stringify(schedule));
}

export function decodeMedicationSchedule(value: string): SharedMedicationSchedule | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<SharedMedicationSchedule>;
    if (
      parsed.version !== 1 ||
      typeof parsed.medication !== "string" || !parsed.medication.trim() || parsed.medication.length > 120 ||
      typeof parsed.instructions !== "string" || parsed.instructions.length > 500 ||
      typeof parsed.startDate !== "string" || !DATE_PATTERN.test(parsed.startDate) ||
      typeof parsed.days !== "number" || !Number.isInteger(parsed.days) || parsed.days < 1 || parsed.days > 365 ||
      !Array.isArray(parsed.times) || parsed.times.length < 1 || parsed.times.length > 12 ||
      !parsed.times.every((item) => item && typeof item.time === "string" && TIME_PATTERN.test(item.time) && (item.dayOffset === undefined || (Number.isInteger(item.dayOffset) && item.dayOffset >= 0 && item.dayOffset <= 7))) ||
      (parsed.timeZone !== undefined && (typeof parsed.timeZone !== "string" || parsed.timeZone.length > 100))
    ) return null;
    return parsed as SharedMedicationSchedule;
  } catch {
    return null;
  }
}

export function scheduleFromHash(hash: string): SharedMedicationSchedule | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const encoded = params.get("schedule");
  return encoded ? decodeMedicationSchedule(encoded) : null;
}

