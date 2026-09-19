export const WEBSITE_GA_MEASUREMENT_ID = "G-9TLWB0XZVE";

export function isWebsiteAnalyticsEnabled(nodeEnv: string | undefined): boolean {
  return nodeEnv === "production";
}

/**
 * Builds the consent-aware bootstrap that runs before React hydration.
 *
 * The measurement ID is intentionally source controlled. Deployment
 * environment variables must not be able to route website traffic back to a
 * legacy property.
 */
export function createAnalyticsBootstrapScript(analyticsFreePaths: readonly string[]): string {
  return `
    (function () {
      var measurementId = ${JSON.stringify(WEBSITE_GA_MEASUREMENT_ID)};
      var analyticsFreePaths = ${JSON.stringify(analyticsFreePaths)};
      function cookie(name) {
        var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
      }
      function allowed() {
        var pathname = window.location.pathname;
        if (analyticsFreePaths.some(function (path) { return pathname === path || pathname.indexOf(path + '/') === 0; })) return false;
        return cookie('ontimer_region') !== 'regulated' || cookie('ontimer_consent') === 'granted';
      }
      function start() {
        if (window.__ontimerAnalyticsStarted || !allowed()) return;
        window.__ontimerAnalyticsStarted = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        var contentLanguage = window.location.pathname === '/es' || window.location.pathname.indexOf('/es/') === 0 ? 'es' : 'en';
        window.gtag('config', measurementId, { content_language: contentLanguage, locale: contentLanguage });
        window.__ontimerAnalyticsConfigured = true;
        if (!document.getElementById('ontimer-ga4-script')) {
          var tag = document.createElement('script');
          tag.id = 'ontimer-ga4-script';
          tag.async = true;
          tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
          document.head.appendChild(tag);
        }
      }
      window.__ontimerStartAnalytics = start;
      window.addEventListener('ontimer-consent', function (event) {
        if (event && event.detail === 'granted') start();
      });
      start();
    }());
  `;
}
