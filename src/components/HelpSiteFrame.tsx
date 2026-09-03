"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { isAnalyticsFreeMedicationPath } from "@/lib/medication-route-privacy";

export default function HelpSiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHelpPage = pathname.startsWith("/help");
  const isAnalyticsFreeMedicationPage = isAnalyticsFreeMedicationPath(pathname);

  if (isHelpPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <GoogleAnalytics />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {!isAnalyticsFreeMedicationPage && <CookieConsentBanner />}
    </>
  );
}
