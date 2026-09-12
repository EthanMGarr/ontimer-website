import { isAnalyticsFreeMedicationPath } from "./medication-route-privacy";

export type ConsentRegion = "regulated" | "other";
export type AnalyticsConsent = "granted" | "denied" | null;

export const CONSENT_REQUIRED_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
]);

export function consentRequiredForCountry(country: string): boolean {
  return CONSENT_REQUIRED_COUNTRIES.has(country.toUpperCase());
}

export function analyticsAllowedForState({
  pathname,
  region,
  consent,
}: {
  pathname: string;
  region: ConsentRegion;
  consent: AnalyticsConsent;
}): boolean {
  if (isAnalyticsFreeMedicationPath(pathname)) return false;
  if (region !== "regulated") return true;
  return consent === "granted";
}
