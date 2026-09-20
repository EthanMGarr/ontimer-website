/** Ticketmaster Discovery API requires ISO-8601 timestamps without milliseconds. */
export function ticketmasterDateTime(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}
