export interface GoogleCalendarEvent {
  title: string;
  start: Date;
  end?: Date;
  details?: string;
  location?: string;
}

function formatLocalGoogleDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

export function buildGoogleCalendarLink(event: GoogleCalendarEvent): string {
  const end = event.end ?? new Date(event.start.getTime() + 15 * 60 * 1000);
  const params = new URLSearchParams({
    text: event.title,
    dates: `${formatLocalGoogleDate(event.start)}/${formatLocalGoogleDate(end)}`,
  });
  if (event.details) params.set("details", event.details);
  if (event.location) params.set("location", event.location);
  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
}

function formatUtcIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildIcsCalendarDataUri(event: GoogleCalendarEvent): string {
  const end = event.end ?? new Date(event.start.getTime() + 15 * 60 * 1000);
  const uidTitle = event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OnTimer//Calendar Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.start.getTime()}-${uidTitle}@ontimer.app`,
    `DTSTAMP:${formatUtcIcsDate(event.start)}`,
    `DTSTART:${formatUtcIcsDate(event.start)}`,
    `DTEND:${formatUtcIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    ...(event.details ? [`DESCRIPTION:${escapeIcsText(event.details)}`] : []),
    ...(event.location ? [`LOCATION:${escapeIcsText(event.location)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
