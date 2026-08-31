import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Starts GA4 independently of React hydration. The production site must still
 * collect the first page view and queued calculator events if a client tree
 * recovers from a hydration mismatch.
 */
export default function GoogleAnalyticsBootstrap() {
  if (!measurementId) return null;

  const script = `
    (function () {
      var measurementId = ${JSON.stringify(measurementId)};
      var started = false;
      function cookie(name) {
        var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
      }
      function allowed() {
        return cookie('ontimer_region') !== 'regulated' || cookie('ontimer_consent') === 'granted';
      }
      function start() {
        if (started || !allowed()) return;
        started = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', measurementId);
        window.__ontimerAnalyticsConfigured = true;
        var tag = document.createElement('script');
        tag.async = true;
        tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
        document.head.appendChild(tag);
      }
      window.__ontimerStartAnalytics = start;
      window.addEventListener('ontimer-consent', function (event) {
        if (event && event.detail === 'granted') start();
      });
      start();
    }());
  `;

  return (
    <Script id="ga4-bootstrap" strategy="beforeInteractive">
      {script}
    </Script>
  );
}
