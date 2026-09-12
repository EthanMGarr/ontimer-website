import { analyticsAllowedForState } from "@/lib/consent-policy";

export const REGION_COOKIE = "ontimer_region";
export const CONSENT_COOKIE = "ontimer_consent";
export const CONSENT_EVENT = "ontimer-consent";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

/** True when this visitor is in a region requiring consent before analytics cookies load. */
export function isConsentRequired(): boolean {
  return getCookie(REGION_COOKIE) === "regulated";
}

/** True when analytics is currently allowed to load for this visitor. */
export function isAnalyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const storedConsent = getCookie(CONSENT_COOKIE);
  return analyticsAllowedForState({
    pathname: window.location.pathname,
    region: isConsentRequired() ? "regulated" : "other",
    consent: storedConsent === "granted" || storedConsent === "denied" ? storedConsent : null,
  });
}

export function recordConsent(value: "granted" | "denied") {
  setCookie(CONSENT_COOKIE, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
