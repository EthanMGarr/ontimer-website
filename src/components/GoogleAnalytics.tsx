"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { initializeAnalytics } from "@/lib/analytics";
import { CONSENT_EVENT } from "@/lib/consent";
import { isAnalyticsFreeMedicationPath } from "@/lib/medication-route-privacy";
import { localeForPathname } from "@/lib/i18n";
import { capturePostHogPageView } from "@/lib/posthog";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
    __ontimerAnalyticsStarted?: boolean;
    __ontimerAnalyticsConfigured?: boolean;
    __ontimerStartAnalytics?: () => void;
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPathRef = useRef(true);

  useEffect(() => {
    if (isAnalyticsFreeMedicationPath(pathname)) {
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied" });
      }
      return;
    }
    window.__ontimerStartAnalytics?.();
    const pagePath = pathname + (searchParams.toString() ? `?${searchParams}` : "");
    const pageProperties = {
      page_path: pagePath,
      page_title: document.title,
      content_language: localeForPathname(pathname),
      locale: localeForPathname(pathname),
    };
    capturePostHogPageView(pageProperties);
    if (initialPathRef.current) {
      initialPathRef.current = false;
      return;
    }
    if (!initializeAnalytics()) return;
    window.gtag("consent", "update", { analytics_storage: "granted" });

    window.gtag("event", "page_view", {
      page_location: window.location.href,
      ...pageProperties,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const captureAfterConsent = (event: Event) => {
      if (!(event instanceof CustomEvent) || event.detail !== "granted") return;
      if (isAnalyticsFreeMedicationPath(window.location.pathname)) return;
      capturePostHogPageView({
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
        content_language: localeForPathname(window.location.pathname),
        locale: localeForPathname(window.location.pathname),
      });
    };
    window.addEventListener(CONSENT_EVENT, captureAfterConsent);
    return () => window.removeEventListener(CONSENT_EVENT, captureAfterConsent);
  }, []);

  return null;
}

export default function GoogleAnalytics() {
  return <Suspense fallback={null}><PageViewTracker /></Suspense>;
}
