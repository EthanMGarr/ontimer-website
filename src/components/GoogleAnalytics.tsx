"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { isAnalyticsAllowed, CONSENT_EVENT } from "@/lib/consent";
import { initializeAnalytics } from "@/lib/analytics";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
    __ontimerAnalyticsConfigured?: boolean;
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!initializeAnalytics()) return;

    window.gtag("event", "page_view", {
      page_path: pathname + (searchParams.toString() ? `?${searchParams}` : ""),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const initiallyAllowed = isAnalyticsAllowed();
    setAllowed(initiallyAllowed);
    if (initiallyAllowed) initializeAnalytics();

    function onConsent(event: Event) {
      if ((event as CustomEvent<string>).detail === "granted") {
        initializeAnalytics();
        setAllowed(true);
      }
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!id || !allowed || pathname === "/medication-schedule") return null;

  return (
    <>
      <Script id="ga4-bootstrap" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          if (!window.__ontimerAnalyticsConfigured) {
            window.gtag('js', new Date());
            window.gtag('config', '${id}', { send_page_view: false });
            window.__ontimerAnalyticsConfigured = true;
          }
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
