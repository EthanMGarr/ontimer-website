import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HelpSiteFrame from "@/components/HelpSiteFrame";
import { ANALYTICS_FREE_MEDICATION_PATHS } from "@/lib/medication-route-privacy";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gaBootstrapScript = gaMeasurementId ? `
  (function () {
    var measurementId = ${JSON.stringify(gaMeasurementId)};
    var analyticsFreePaths = ${JSON.stringify(ANALYTICS_FREE_MEDICATION_PATHS)};
    var started = false;
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
` : null;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ontimer.app"),
  itunes: {
    appId: "6755317601",
  },
  title: {
    default: "OnTimer — Calendar Alarm App to Never Be Late for Meetings",
    template: "%s | OnTimer",
  },
  description:
    "OnTimer is a calendar alarm app for iPhone. Connect Google Calendar, Apple Calendar, or Microsoft Outlook Calendar and every event gets a persistent alarm — not a notification that disappears. Free download.",
  keywords: [
    "OnTimer",
    "never be late",
    "calendar alarm",
    "punctuality app",
    "iOS app",
    "time management",
    "meeting reminders",
    "automatic alarms",
  ],
  authors: [{ name: "OnTimer" }],
  creator: "OnTimer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ontimer.app",
    siteName: "OnTimer",
    description:
      "OnTimer is a calendar alarm app for iPhone. Connect Google Calendar, Apple Calendar, or Microsoft Outlook Calendar and every event gets a persistent alarm — not a notification that disappears.",
    images: [
      {
        url: "/images/NeverBeLateAgain.png",
        width: 1200,
        height: 630,
        alt: "OnTimer — Calendar Alarm App to Never Be Late for Meetings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    description:
      "OnTimer is a calendar alarm app for iPhone. Connect Google Calendar, Apple Calendar, or Microsoft Outlook Calendar and every event gets a persistent alarm — not a notification that disappears.",
    images: ["/images/NeverBeLateAgain.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {gaBootstrapScript ? <script dangerouslySetInnerHTML={{ __html: gaBootstrapScript }} /> : null}
      </head>
      <body className="bg-zinc-950 text-white min-h-screen flex flex-col">
        <HelpSiteFrame>{children}</HelpSiteFrame>
      </body>
    </html>
  );
}
