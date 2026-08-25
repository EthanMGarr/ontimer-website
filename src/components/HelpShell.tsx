import Link from "next/link";
import { APP_STORE_URL } from "@/lib/constants";

export function HelpNavigation() {
  return (
    <header className="help-site-header">
      <Link href="/" className="help-wordmark" aria-label="OnTimer home">
        OnTimer
      </Link>
      <a className="help-download-link" href={APP_STORE_URL}>
        Get OnTimer
      </a>
    </header>
  );
}

export function HelpProductHandoff() {
  return (
    <aside className="help-product-handoff" aria-labelledby="new-to-ontimer-heading">
      <h2 id="new-to-ontimer-heading">New to OnTimer?</h2>
      <p>OnTimer automatically turns calendar events into persistent alarms that help you stay on time.</p>
      <div className="help-product-actions">
        <a className="help-download-button" href={APP_STORE_URL}>Download on the App Store</a>
        <Link href="/how-it-works" className="help-secondary-link">How it works</Link>
      </div>
    </aside>
  );
}

export function HelpFooter() {
  return (
    <footer className="help-site-footer">
      <nav aria-label="OnTimer support links">
        <Link href="/">OnTimer</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/help">Help</Link>
        <a href="mailto:support@ontimer.app">Contact Support</a>
      </nav>
    </footer>
  );
}
