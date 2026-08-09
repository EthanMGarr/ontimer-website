/// Centralized GA4 event tracking for OnTimer marketing site.
///
/// ## Purpose
/// Single source of truth for all conversion and intent events fired to GA4.
/// Removes duplicated window.gtag calls scattered across components.
///
/// ## Include
/// - Device type detection
/// - Core event fire function (with dev-only console logging)
/// - Named tracker functions for each event type
///
/// ## Don't Include
/// - Page view tracking (handled by GoogleAnalytics.tsx / PageViewTracker)
/// - Navigation logic
/// - Any UI or React code
///
/// ## Usage
/// Import named trackers directly:
///   import { trackAppStoreClick } from "@/lib/analytics";
///   onClick={() => trackAppStoreClick("hero")}

type DeviceType = "mobile" | "tablet" | "desktop";

export function getDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent;
  // iPads report as Macintosh in Safari 13+ — use maxTouchPoints as fallback
  if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) {
    return "tablet";
  }
  if (/iPhone|iPod|Android/i.test(ua)) return "mobile";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
}

export type AnalyticsParams = Record<string, string | number>;

const ATTRIBUTION_TOKEN_KEY = "ontimer_attribution_token";
let fallbackAttributionToken: string | null = null;

function getAttributionToken(): string {
  if (typeof window === "undefined") return "server";
  try {
    const existing = window.localStorage.getItem(ATTRIBUTION_TOKEN_KEY);
    if (existing) return existing;
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
  if (fallbackAttributionToken) return fallbackAttributionToken;
  const token = typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  fallbackAttributionToken = token;
  try {
    window.localStorage.setItem(ATTRIBUTION_TOKEN_KEY, token);
  } catch {
    // The in-memory token still keeps this page session internally consistent.
  }
  return token;
}

function acquisitionParams(): AnalyticsParams {
  const search = new URLSearchParams(window.location.search);
  let source = search.get("utm_source") || "direct";
  if (source === "direct" && document.referrer) {
    try {
      source = new URL(document.referrer).hostname || source;
    } catch {
      // Keep the conservative direct fallback for malformed referrers.
    }
  }
  return {
    attribution_token: getAttributionToken(),
    landing_page: window.location.pathname,
    traffic_source: source,
    search_query: search.get("utm_term") || "unavailable",
  };
}

export function fireEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.log(`[GA4] ${eventName}`, params);
  }

  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, { ...acquisitionParams(), ...params });
}

function baseParams(location: string): AnalyticsParams {
  return {
    page_path: window.location.pathname,
    button_location: location,
    device_type: getDeviceType(),
  };
}

// ─── Conversion events ──────────────────────────────────────────────────────

/** Fire when any App Store CTA is clicked (mobile button, desktop link, or QR). */
export function trackAppStoreClick(
  location: string,
  context: AnalyticsParams = {}
): void {
  const params = { ...baseParams(location), ...context };
  fireEvent("app_store_click", params);
  fireEvent("app_store_outbound_click", params);
  if (context.cta_variant) fireEvent("automatic_alert_cta_clicked", params);
}

export function trackCalculatorStarted(
  calculatorType: string,
  context: AnalyticsParams = {}
): void {
  fireEvent("calculator_started", { calculator_type: calculatorType, ...context });
}

export function trackCalculatorCompleted(
  calculatorType: string,
  context: AnalyticsParams = {}
): void {
  fireEvent("calculator_completed", { calculator_type: calculatorType, ...context });
}

export function trackAutomaticAlertCTAViewed(
  calculatorType: string,
  ctaVariant: string
): void {
  fireEvent("automatic_alert_cta_viewed", {
    calculator_type: calculatorType,
    cta_variant: ctaVariant,
  });
}

export function trackCalendarHandoffOpened(
  calculatorType: string,
  provider: string,
  context: AnalyticsParams = {}
): void {
  fireEvent("calendar_handoff_opened", {
    calculator_type: calculatorType,
    calendar_provider: provider,
    ...context,
  });
}

/** Fire when the Android waitlist CTA is clicked. */
export function trackAndroidWaitlistClick(location: string): void {
  fireEvent("android_waitlist_click", baseParams(location));
}

// ─── QR code impression / interaction events ─────────────────────────────────

/** Fire when a QR code becomes visible to the user (impression). */
export function trackQRCodeVisible(location: string): void {
  fireEvent("qr_code_visible", baseParams(location));
}

/**
 * Fire when a QR code is physically clicked/tapped.
 * Also fires app_store_click so QR-driven installs appear in the main funnel.
 */
export function trackQRCodeClick(location: string): void {
  fireEvent("app_store_click", baseParams(location));
  fireEvent("qr_code_click", baseParams(location));
}

// ─── Extensibility ────────────────────────────────────────────────────────────
// To add a new event, export a typed wrapper:
//
//   export function trackFeatureHighlightClick(location: string): void {
//     fireEvent("feature_highlight_click", baseParams(location));
//   }
//
// Then import and call it from the relevant component. No other changes needed.
