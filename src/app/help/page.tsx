import type { Metadata } from "next";
import Link from "next/link";
import { HelpFooter, HelpNavigation } from "@/components/HelpShell";

export const metadata: Metadata = {
  title: "OnTimer Help",
  description: "Get help with OnTimer and learn how to get the most out of your calendar alarms.",
  alternates: { canonical: "/help" },
  openGraph: { images: [] },
  twitter: { images: [] },
};

const guides = [
  {
    href: "/help/getting-the-most-out",
    title: "Get the Most Out of OnTimer",
    description: "Set up OnTimer so your calendar keeps you on time with less to manage.",
  },
  {
    href: "/help/troubleshooting",
    title: "Help & Troubleshooting",
    description: "Solve common issues with alarms, notifications, calendars, and Time to Leave.",
  },
];

export default function HelpPage() {
  return (
    <div className="help-page">
      <div className="help-container help-hub">
        <header className="help-header">
          <HelpNavigation />
          <h1>OnTimer Help</h1>
        </header>

        <p className="help-intro">Find a quick answer or learn how to make OnTimer work best for you.</p>

        <nav className="help-card-list" aria-label="Help guides">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="help-card">
              <span>
                <strong>{guide.title}</strong>
                <span>{guide.description}</span>
              </span>
              <span className="help-card-arrow" aria-hidden="true">›</span>
            </Link>
          ))}
        </nav>

        <p className="help-contact">Need a hand? <a href="mailto:support@ontimer.app">Contact Support</a></p>
        <HelpFooter />
      </div>
    </div>
  );
}
