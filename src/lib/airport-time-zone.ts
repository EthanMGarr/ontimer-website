import { airportTimeZones } from "./airport-time-zones.generated";

function partsInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

export function airportTimeZoneForCode(code: string | null | undefined): string | null {
  const normalized = code?.trim().toUpperCase();
  return normalized && normalized in airportTimeZones
    ? airportTimeZones[normalized as keyof typeof airportTimeZones]
    : null;
}

export function airportLocalInputParts(date: Date, timeZone: string | null): { date: string; time: string } {
  if (!timeZone) {
    const pad = (value: number) => String(value).padStart(2, "0");
    return {
      date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    };
  }
  const parts = partsInTimeZone(date, timeZone);
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}

/** Converts a wall-clock airport time into the matching instant, including DST. */
export function airportLocalDateTime(
  dateValue: string,
  timeValue: string,
  timeZone: string | null,
): Date {
  if (!timeZone) return new Date(`${dateValue}T${timeValue}`);
  const match = `${dateValue}T${timeValue}`.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) return new Date(Number.NaN);
  const [, year, month, day, hour, minute] = match.map(Number);
  const wallClockUtc = Date.UTC(year, month - 1, day, hour, minute, 0);

  const offsetAt = (instant: number) => {
    const parts = partsInTimeZone(new Date(instant), timeZone);
    const representedAsUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    return representedAsUtc - instant;
  };

  let instant = wallClockUtc - offsetAt(wallClockUtc);
  instant = wallClockUtc - offsetAt(instant);
  return new Date(instant);
}

export function airportTimeZoneLabel(timeZone: string | null, date = new Date()): string {
  if (!timeZone) return "airport local time";
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}
