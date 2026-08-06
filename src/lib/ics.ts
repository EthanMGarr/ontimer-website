/// ICS calendar file generator for medication schedules.
///
/// ## Purpose
/// Generates RFC 5545-compliant ICS content and triggers browser downloads.
///
/// ## Include
/// - One VEVENT per medication time slot
/// - Daily recurrence via RRULE
/// - Client-side download trigger
///
/// ## Don't Include
/// - Timezone conversions (floating local time only)
/// - Server-side logic
/// - External libraries

export interface MedTime {
  name: string;
  time: string; // "HH:MM" 24h format
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}@ontimer.app`;
}

function fmtDateTime(date: Date, timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(h).padStart(2, "0");
  const min = String(m).padStart(2, "0");
  return `${year}${month}${day}T${hour}${min}00`;
}

function fmtStamp(): string {
  const now = new Date();
  return fmtDateTime(now, `${now.getHours()}:${now.getMinutes()}`);
}

export function generateICS(
  times: MedTime[],
  startDate: Date,
  days: number,
  timeZone?: string,
): string {
  const stamp = fmtStamp();
  const events = times.map((t) => {
    const dtstart = fmtDateTime(startDate, t.time);
    const summary = t.name.trim() || "Medication";
    return [
      "BEGIN:VEVENT",
      `UID:${uid()}`,
      `DTSTAMP:${stamp}`,
      timeZone ? `DTSTART;TZID=${timeZone}:${dtstart}` : `DTSTART:${dtstart}`,
      `RRULE:FREQ=DAILY;COUNT=${days}`,
      `SUMMARY:${summary}`,
      "END:VEVENT",
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OnTimer//Medication Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
