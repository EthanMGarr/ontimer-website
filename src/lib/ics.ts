/// ICS calendar file generator for medication schedules.
///
/// ## Purpose
/// Generates RFC 5545-compliant ICS content and triggers browser downloads.
///
/// ## Include
/// - One VEVENT per medication time slot
/// - Daily recurrence via RRULE
/// - Timezone-aware next-occurrence selection
/// - A standard calendar alert at dose time
/// - Client-side download trigger
///
/// ## Don't Include
/// - Server-side logic
/// - External libraries

export interface MedTime {
  name: string;
  time: string; // "HH:MM" 24h format
  dayOffset?: number;
  description?: string;
}

function escapeText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
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

function fmtStamp(now: Date): string {
  return fmtDateTime(now, `${now.getHours()}:${now.getMinutes()}`);
}

function datePartsInTimeZone(date: Date, timeZone?: string) {
  if (!timeZone) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: value("hour"),
    minute: value("minute"),
  };
}

function nextEventStart(
  startDate: Date,
  time: string,
  dayOffset: number,
  now: Date,
  timeZone?: string,
): string {
  const [hour, minute] = time.split(":").map(Number);
  const intended = new Date(Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + dayOffset,
  ));
  const current = datePartsInTimeZone(now, timeZone);
  const currentDay = Date.UTC(current.year, current.month - 1, current.day);

  if (
    intended.getTime() < currentDay ||
    (intended.getTime() === currentDay && hour * 60 + minute <= current.hour * 60 + current.minute)
  ) {
    intended.setUTCDate(intended.getUTCDate() + Math.max(
      1,
      Math.ceil((currentDay - intended.getTime()) / 86_400_000),
    ));
    if (
      intended.getTime() === currentDay &&
      hour * 60 + minute <= current.hour * 60 + current.minute
    ) {
      intended.setUTCDate(intended.getUTCDate() + 1);
    }
  }

  const year = intended.getUTCFullYear();
  const month = String(intended.getUTCMonth() + 1).padStart(2, "0");
  const day = String(intended.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}T${String(hour).padStart(2, "0")}${String(minute).padStart(2, "0")}00`;
}

export function generateICS(
  times: MedTime[],
  startDate: Date,
  days: number,
  timeZone?: string,
  now = new Date(),
): string {
  const stamp = fmtStamp(now);
  const events = times.map((t) => {
    const dtstart = nextEventStart(startDate, t.time, t.dayOffset || 0, now, timeZone);
    const summary = t.name.trim() || "Medication";
    const description = t.description?.trim() || summary;
    return [
      "BEGIN:VEVENT",
      `UID:${uid()}`,
      `DTSTAMP:${stamp}`,
      timeZone ? `DTSTART;TZID=${timeZone}:${dtstart}` : `DTSTART:${dtstart}`,
      "DURATION:PT5M",
      `RRULE:FREQ=DAILY;COUNT=${days}`,
      `SUMMARY:${escapeText(summary)}`,
      `DESCRIPTION:${escapeText(description)}`,
      "BEGIN:VALARM",
      "TRIGGER:PT0M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(description)}`,
      "END:VALARM",
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

export function prefersNativeCalendarHandoff(userAgent: string): boolean {
  return /Safari/i.test(userAgent) && !/(Chrome|Chromium|CriOS|Edg|EdgiOS|FxiOS|OPR|Android)/i.test(userAgent);
}

export function openICSInCalendar(content: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.location.assign(url);
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
