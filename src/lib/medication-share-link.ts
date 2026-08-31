export interface SharedMedicationSchedule {
  version: 1;
  medication: string;
  practiceName?: string;
  senderRole?: "provider" | "caregiver";
  instructions: string;
  startDate: string;
  days: number | "ongoing";
  times: Array<{ time: string; dayOffset?: number }>;
  timeZone?: string;
  takenWithFood?: boolean;
}

const TIME_ZONE_LABELS: Record<string, string> = {
  "America/New_York": "ET",
  "America/Chicago": "CT",
  "America/Denver": "MT",
  "America/Los_Angeles": "PT",
  "America/Phoenix": "AZ",
  "America/Anchorage": "AK",
  "Pacific/Honolulu": "HI",
  UTC: "UTC",
};

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
      (parsed.senderRole !== undefined && parsed.senderRole !== "provider" && parsed.senderRole !== "caregiver") ||
      typeof parsed.instructions !== "string" || parsed.instructions.length > 500 ||
      typeof parsed.startDate !== "string" || !DATE_PATTERN.test(parsed.startDate) ||
      (parsed.days !== "ongoing" && (typeof parsed.days !== "number" || !Number.isInteger(parsed.days) || parsed.days < 1 || parsed.days > 365)) ||
      !Array.isArray(parsed.times) || parsed.times.length < 1 || parsed.times.length > 12 ||
      !parsed.times.every((item) => item && typeof item.time === "string" && TIME_PATTERN.test(item.time) && (item.dayOffset === undefined || (Number.isInteger(item.dayOffset) && item.dayOffset >= 0 && item.dayOffset <= 7))) ||
      (parsed.timeZone !== undefined && (typeof parsed.timeZone !== "string" || parsed.timeZone.length > 100)) ||
      (parsed.takenWithFood !== undefined && typeof parsed.takenWithFood !== "boolean")
    ) return null;
    return parsed as SharedMedicationSchedule;
  } catch {
    return null;
  }
}

export function scheduleDurationLabel(days: number | "ongoing"): string {
  return days === "ongoing" ? "Ongoing (no end date)" : `${days} ${days === 1 ? "day" : "days"}`;
}

export function scheduleFromHash(hash: string): SharedMedicationSchedule | null {
  const fragment = hash.replace(/^#/, "");
  const encoded = fragment.startsWith("v1_") ? fragment : new URLSearchParams(fragment).get("schedule");
  return encoded ? decodeMedicationSchedule(encoded) : null;
}

export function medicationShareCopy(practiceName?: string, senderRole: "provider" | "caregiver" = "provider") {
  const sender = practiceName?.trim();
  const caregiver = senderRole === "caregiver";
  return {
    title: sender ? `Your medication schedule from ${sender}` : "Your medication schedule",
    text: `${sender ? `${sender} sent you a medication schedule. ` : caregiver ? "A family member made a medication schedule for you. " : "Here’s the medication schedule we discussed. "}Open this private link to review it, then add it to your calendar. No account needed.`,
    emailBody: caregiver
      ? "I made this medication schedule to help keep the dose times in one place. Open the link below to review it and add it to your calendar. No account needed."
      : "Here’s the medication schedule we discussed. Open the link below to review it and add it to your calendar. No account needed.",
  };
}

function readableDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function readableTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  if (hours === 0 && minutes === 0) return "12:00 midnight";
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function medicationEmailDraft(schedule: SharedMedicationSchedule, url: string) {
  const sender = schedule.practiceName?.trim();
  const caregiver = schedule.senderRole === "caregiver";
  const subject = caregiver
    ? "A medication schedule to help you stay on track"
    : sender ? `Your medication schedule from ${sender}` : "Your medication schedule";
  const introduction = caregiver
    ? "I put this medication schedule together to help keep your dose times in one place."
    : sender ? `${sender} created this medication schedule for you.` : "Here’s the medication schedule we discussed.";
  const scheduleLines = [
    `Medication: ${schedule.medication}`,
    ...(schedule.instructions ? [`Instructions: ${schedule.instructions}`] : []),
    ...(schedule.takenWithFood ? ["Take with food: Yes"] : []),
    `Starts: ${readableDate(schedule.startDate)}`,
    `Duration: ${scheduleDurationLabel(schedule.days)}`,
    `Dose ${schedule.times.length === 1 ? "time" : "times"}: ${schedule.times.map(({ time }) => readableTime(time)).join(", ")}${schedule.timeZone ? ` ${TIME_ZONE_LABELS[schedule.timeZone] || schedule.timeZone}` : ""}`,
  ];
  const review = caregiver
    ? "Please compare these details with the prescription or confirm them with a healthcare provider before adding the schedule. If anything differs or is unclear, contact the prescribing healthcare professional."
    : `Please review the medication, instructions, and dose times before adding the schedule. If anything looks wrong or is unclear, contact ${sender || "the healthcare provider who sent this schedule"}.`;
  const limitation = "This schedule is for organization only. It does not change or replace the medication label, prescription, or advice from a healthcare professional. OnTimer is not a medical device and does not provide medical advice.";

  return {
    subject,
    body: [
      "Hello,",
      introduction,
      `REVIEW AND ADD IT TO YOUR CALENDAR\n${url}`,
      `YOUR SCHEDULE\n${scheduleLines.join("\n")}`,
      review,
      limitation,
    ].join("\n\n"),
  };
}

export function changedDoseTimeIndexes(currentTimes: string[], originalTimes: string[]): number[] {
  return currentTimes.flatMap((time, index) => time !== originalTimes[index] ? [index] : []);
}
