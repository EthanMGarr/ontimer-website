export const ANALYTICS_FREE_MEDICATION_PATHS = [
  "/provider-medication-schedule",
  "/caregiver-medication-schedule",
  "/medication-schedule",
  "/how-to-remember-medication-on-time",
] as const;

export function isAnalyticsFreeMedicationPath(pathname: string): boolean {
  return ANALYTICS_FREE_MEDICATION_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export const MEDICATION_ROUTE_PRIVACY_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto:",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
} as const;
