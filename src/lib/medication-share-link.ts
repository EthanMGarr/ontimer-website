export interface SharedMedicationSchedule {
  version: 1;
  medication: string;
  practiceName?: string;
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
    let json: string;
    if (value.startsWith("v1_") || value.startsWith("v1.")) {
      const base64 = value.slice(3).replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
      const binary = atob(padded);
      json = new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
    } else {
      json = decodeURIComponent(value);
    }
    const parsed = JSON.parse(json) as Partial<SharedMedicationSchedule>;
    if (
      parsed.version !== 1 ||
      typeof parsed.medication !== "string" || !parsed.medication.trim() || parsed.medication.length > 120 ||
      (parsed.practiceName !== undefined && (typeof parsed.practiceName !== "string" || parsed.practiceName.length > 120)) ||
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
  const fragment = hash.replace(/^#/, "");
  const encoded = fragment.startsWith("v1_") ? fragment : new URLSearchParams(fragment).get("schedule");
  return encoded ? decodeMedicationSchedule(encoded) : null;
}

export function medicationShareCopy(practiceName?: string) {
  const sender = practiceName?.trim();
  return {
    title: sender ? `Your medication schedule from ${sender}` : "Your medication schedule",
    text: `${sender ? `${sender} sent you a medication schedule. ` : "Here’s the medication schedule we discussed. "}Open this private link to review it, then add it to your calendar. No account needed.`,
    emailBody: "Here’s the medication schedule we discussed. Open the link below to review it and add it to your calendar. No account needed.",
  };
}

export function changedDoseTimeIndexes(currentTimes: string[], originalTimes: string[]): number[] {
  return currentTimes.flatMap((time, index) => time !== originalTimes[index] ? [index] : []);
}
