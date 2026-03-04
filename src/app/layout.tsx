import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ontimer.app"),
  title: {
    default: "OnTimer — Calendar Alarm App to Never Be Late for Meetings",
    template: "%s | OnTimer",
  },
  description:
    "OnTimer connects to your calendar and automatically sets alarms before meetings so you're never late again. Free iPhone app.",
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
    title: "OnTimer — Calendar Alarm App to Never Be Late for Meetings",
    description:
      "OnTimer connects to your calendar and automatically sets alarms before meetings so you're never late again. Free iPhone app.",
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
    title: "OnTimer — Calendar Alarm App to Never Be Late for Meetings",
    description:
      "OnTimer connects to your calendar and automatically sets alarms before meetings so you're never late again. Free iPhone app.",
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
      <body className="bg-zinc-950 text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
