"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsentBanner from "@/components/CookieConsentBanner";

export default function HelpSiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHelpPage = pathname.startsWith("/help");

  if (isHelpPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <GoogleAnalytics />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
