import type { Metadata } from "next";
import Link from "next/link";
import { HelpFooter, HelpNavigation, HelpProductHandoff } from "@/components/HelpShell";
import { getHelpDocument } from "@/lib/help-documents";

export const metadata: Metadata = {
  title: "How OnTimer Alarms Work on iPhone",
  description:
    "How OnTimer alarms behave with Silent mode, Focus, High Alert, custom sounds, event controls, Early Warning, Time To Leave, and Time To Fly.",
  alternates: { canonical: "/help/how-alarms-work" },
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default async function HowAlarmsWorkPage() {
  const content = await getHelpDocument("how-ontimer-alarms-work.md");

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
