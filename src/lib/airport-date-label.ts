function parseLocalDate(date: string): Date | null {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return null;

  const parsed = new Date(year, month - 1, day, 12);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatAirportDateLabel(
  selectedDate: string,
  todayDate: string,
  locale: "en" | "es" = "en",
): string {
  const parsed = parseLocalDate(selectedDate);
  if (!parsed) return locale === "es" ? "Selecciona una fecha" : "Select a date";

  const formatted = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(parsed);

  return selectedDate === todayDate
    ? `${locale === "es" ? "Hoy" : "Today"}, ${formatted}`
    : formatted;
}
