import { createHash } from "node:crypto";

const SESSION_ID_PATTERN = /^[a-zA-Z0-9-]{12,80}$/;
export const AUTOCOMPLETE_DIAGNOSTICS_END_AT = Date.parse("2026-09-30T14:00:00Z");

export function autocompleteDiagnosticsEnabled(now = Date.now()): boolean {
  return now < AUTOCOMPLETE_DIAGNOSTICS_END_AT;
}

export function hashAutocompleteSession(value: string | null): string | undefined {
  if (!value || !SESSION_ID_PATTERN.test(value)) return undefined;
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

export function autocompleteSourcePath(referer: string | null): string | undefined {
  if (!referer) return undefined;
  try {
    const path = new URL(referer).pathname;
    return path.startsWith("/") ? path.slice(0, 160) : undefined;
  } catch {
    return undefined;
  }
}
