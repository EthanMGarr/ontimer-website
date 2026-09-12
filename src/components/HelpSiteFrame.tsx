"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { isAnalyticsFreeMedicationPath } from "@/lib/medication-route-privacy";
import { localeForPathname } from "@/lib/i18n";
import { SpanishFooter, SpanishHeader } from "@/components/SpanishSiteChrome";
import { Homepage2Header } from "@/components/Homepage2Header";
import { Homepage2Footer } from "@/components/Homepage2Footer";

export default function HelpSiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHelpPage = pathname.startsWith("/help");
  const isAnalyticsFreeMedicationPage = isAnalyticsFreeMedicationPath(pathname);
  const isSpanishPage = localeForPathname(pathname) === "es";
  const preservesLegacyChrome = pathname === "/homepage-legacy" || pathname === "/homescreen2";
  const usesEnglishSiteChrome = !isSpanishPage && !preservesLegacyChrome;
  const usesModernPageSystem = !preservesLegacyChrome;

  if (isHelpPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <GoogleAnalytics />
      {usesEnglishSiteChrome ? <Homepage2Header /> : isSpanishPage ? <SpanishHeader /> : <Header />}
      <main className={`flex-1 ${usesModernPageSystem ? "site-modern" : ""}`}>{children}</main>
      {usesEnglishSiteChrome ? <Homepage2Footer /> : isSpanishPage ? <SpanishFooter /> : <Footer />}
      {!isAnalyticsFreeMedicationPage && <CookieConsentBanner />}
    </>
  );
}
