import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./homepage2/homepage2.css";
import "./site-system.css";
import HelpSiteFrame from "@/components/HelpSiteFrame";
import { ANALYTICS_FREE_MEDICATION_PATHS } from "@/lib/medication-route-privacy";
import { createAnalyticsBootstrapScript, isWebsiteAnalyticsEnabled } from "@/lib/analytics-config";

const gaBootstrapScript = isWebsiteAnalyticsEnabled(process.env.NODE_ENV)
  ? createAnalyticsBootstrapScript(ANALYTICS_FREE_MEDICATION_PATHS)
  : null;

// Travelpayouts requires its Drive loader to verify site ownership. Keep it
// constrained to the public homepage and behind the existing regional consent
// gate; calculator monetization continues to use explicit affiliate links.
const travelpayoutsVerificationScript = `
  (function () {
    var started = false;
    function cookie(name) {
      var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
    function allowed() {
      if (window.location.pathname !== '/') return false;
      return cookie('ontimer_region') !== 'regulated' || cookie('ontimer_consent') === 'granted';
    }
    function start() {
      if (started || !allowed()) return;
      started = true;
      var script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cmp-ab', '2');
      script.src = 'https://tpembars.com/NTY5Njgw.js?t=569680';
      document.head.appendChild(script);
    }
    window.addEventListener('ontimer-consent', function (event) {
      if (event && event.detail === 'granted') start();
    });
    start();
  }());
`;

// Set the document language before hydration for explicit localized routes.
// English remains the default and there are deliberately no automatic redirects.
const documentLanguageScript = `
  (function () {
    if (window.location.pathname === '/es' || window.location.pathname.indexOf('/es/') === 0) {
      document.documentElement.lang = 'es';
    }
  }());
`;

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: documentLanguageScript }} />
        {gaBootstrapScript ? <script dangerouslySetInnerHTML={{ __html: gaBootstrapScript }} /> : null}
        <script dangerouslySetInnerHTML={{ __html: travelpayoutsVerificationScript }} />
      </head>
      <body className="bg-zinc-950 text-white min-h-screen flex flex-col">
        <HelpSiteFrame>{children}</HelpSiteFrame>
      </body>
    </html>
  );
}
