import type { Metadata } from "next";
import Link from "next/link";
import { HelpFooter, HelpNavigation, HelpProductHandoff } from "@/components/HelpShell";
import { getHelpDocument } from "@/lib/help-documents";

export const metadata: Metadata = {
  title: "Get the Most Out of OnTimer",
  description: "Simple ways to set up OnTimer and get more from your calendar alarms.",
  alternates: { canonical: "/help/getting-the-most-out" },
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default async function GettingTheMostOutPage() {
  const content = await getHelpDocument("get-the-most-out-of-ontimer.md");

  return (
    <div className="help-page">
      <article className="help-container help-document">
        <HelpNavigation />
        <Link href="/help" className="help-back">‹ OnTimer Help</Link>
        <div className="help-prose" dangerouslySetInnerHTML={{ __html: content }} />
        <HelpProductHandoff />
        <HelpFooter />
      </article>
    </div>
  );
}
