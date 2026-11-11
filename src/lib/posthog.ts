import posthog from "posthog-js";
import { isWebsiteAnalyticsEnabled } from "@/lib/analytics-config";
import { isAnalyticsAllowed } from "@/lib/consent";
import { isAnalyticsFreeMedicationPath } from "@/lib/medication-route-privacy";

const POSTHOG_PROJECT_TOKEN = "phc_kqgX4bZ6FRuWnBxU4HW9kRepERo2GJn4JGC7QLF7U4VU";
const POSTHOG_HOST = "https://us.i.posthog.com";

let initialized = false;

/**
 * Initialize PostHog only in production and only after the same consent gate
 * used by GA4. Autocapture and replay remain off so calculator text, addresses,
 * and medication-related content cannot be collected accidentally.
 */
export function initializePostHog(): boolean {
  if (!isWebsiteAnalyticsEnabled(process.env.NODE_ENV)) return false;
  if (typeof window === "undefined" || !isAnalyticsAllowed()) return false;
  if (isAnalyticsFreeMedicationPath(window.location.pathname)) return false;

  if (!initialized) {
    posthog.init(POSTHOG_PROJECT_TOKEN, {
      api_host: POSTHOG_HOST,
      defaults: "2026-08-30",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      disable_session_recording: true,
      capture_exceptions: false,
      person_profiles: "identified_only",
    });
    initialized = true;
  }

  return true;
}

export function capturePostHogEvent(
  eventName: string,
  properties: Record<string, string | number> = {},
): void {
  if (!initializePostHog()) return;
  posthog.capture(eventName, properties);
}

export function capturePostHogPageView(properties: Record<string, string | number>): void {
  capturePostHogEvent("$pageview", {
    $current_url: window.location.href,
    ...properties,
  });
}

