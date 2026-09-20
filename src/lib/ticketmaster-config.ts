const DISABLED_VALUES = new Set(["0", "false", "off", "disabled"]);

export function ticketmasterProviderEnabled(value: string | undefined): boolean {
  return !value || !DISABLED_VALUES.has(value.trim().toLowerCase());
}
