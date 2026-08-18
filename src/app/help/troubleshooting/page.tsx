import type { Metadata } from "next";
import Link from "next/link";
import { getHelpDocument } from "@/lib/help-documents";

export const metadata: Metadata = {
  title: "OnTimer Help & Troubleshooting",
  description: "Troubleshoot OnTimer alarms, notifications, calendar syncing, Time to Leave, and more.",
  alternates: { canonical: "/help/troubleshooting" },
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default async function TroubleshootingPage() {
  const content = await getHelpDocument("ontimer-help-and-troubleshooting.md");

  return (
    <div className="help-page">
      <article className="help-container help-document">
        <Link href="/help" className="help-back">‹ OnTimer Help</Link>
        <div className="help-prose" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}
