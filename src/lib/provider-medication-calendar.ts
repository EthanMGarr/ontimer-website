import { downloadICS, openICSInCalendar, prefersNativeCalendarHandoff } from "./ics";

export interface ProviderMedicationSchedule {
  medication: string;
  instructions: string;
  startDate: string;
  days: number | "ongoing";
  times: Array<{ time: string; dayOffset?: number; mealLabel?: "Breakfast" | "Lunch" | "Dinner" | "Evening"; doseLabel?: "Breakfast" | "Lunch" | "Dinner" | "Evening" | "Wake-up" | "Midday" | "Bedtime" }>;
  timeZone?: string;
  takenWithFood?: boolean;
}

// Marker written to every generated medication event's LOCATION field. Distinguishes
// OnTimer medication-schedule events from other OnTimer-generated calendar events (e.g.
// Time-to-Leave alarms), so a future in-app setting could filter/scope alarms to it.
export const MEDICATION_EVENT_LOCATION_MARKER = "OnTimer Medication Schedule";

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function stamp(now: Date): string {
  return now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function startDateTime(startDate: string, time: string, dayOffset = 0): string {
  const date = new Date(`${startDate}T12:00:00`);
  date.setDate(date.getDate() + dayOffset);
  const compactDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `${compactDate}T${time.replace(":", "")}00`;
}

export function generateProviderMedicationICS(schedule: ProviderMedicationSchedule, now = new Date()): string {
  const baseTitle = `Take ${schedule.medication.trim()}`;
  const descriptionParts = [baseTitle];
  if (schedule.instructions.trim()) descriptionParts.push(schedule.instructions.trim());
  if (schedule.takenWithFood) descriptionParts.push("Take with food");
  const description = descriptionParts.join(" — ");
  const events = schedule.times.flatMap(({ time, dayOffset, mealLabel, doseLabel }, index) => {
    const label = doseLabel || mealLabel;
    const title = label ? `${label} dose: ${baseTitle}` : baseTitle;
    return [
    "BEGIN:VEVENT",
    `UID:${now.getTime()}-${index}-${Math.random().toString(36).slice(2)}@ontimer.app`,
    `DTSTAMP:${stamp(now)}`,
    schedule.timeZone
      ? `DTSTART;TZID=${schedule.timeZone}:${startDateTime(schedule.startDate, time, dayOffset)}`
      : `DTSTART:${startDateTime(schedule.startDate, time, dayOffset)}`,
    "DURATION:PT5M",
    schedule.days === "ongoing" ? "RRULE:FREQ=DAILY" : `RRULE:FREQ=DAILY;COUNT=${schedule.days}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(MEDICATION_EVENT_LOCATION_MARKER)}`,
    `DESCRIPTION:${escapeText(description)}`,
    "BEGIN:VALARM",
    "TRIGGER:PT0M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(description)}`,
    "END:VALARM",
    "END:VEVENT",
  ];
  });
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//OnTimer//Provider Medication Schedule//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...events, "END:VCALENDAR", ""].join("\r\n");
}

export function downloadProviderMedicationICS(content: string): void {
  downloadICS(content, "medication-schedule.ics");
}

export function handoffProviderMedicationICS(content: string, userAgent: string): "native" | "download" {
  if (prefersNativeCalendarHandoff(userAgent)) {
    openICSInCalendar(content);
    return "native";
  }
  downloadProviderMedicationICS(content);
  return "download";
}
