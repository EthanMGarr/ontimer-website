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
