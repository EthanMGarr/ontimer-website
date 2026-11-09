import type { Metadata } from "next";
import Link from "next/link";
import { ESTIMATED_TAX_DEADLINES_2026, ESTIMATED_TAX_DEADLINES_2027 } from "@/lib/estimated-tax-deadlines";
import EstimatedTaxDeadlineTool from "../estimated-tax-payment-dates/EstimatedTaxDeadlineTool";
import styles from "../estimated-tax-payment-dates/estimated-tax.module.css";

const canonicalUrl = "https://www.ontimer.app/2026-estimated-tax-payment-dates";

export const metadata: Metadata = {
  title: "2026 Estimated Tax Due Dates + Final Payment Alarm Tool",
  description:
    "One 2026 estimated-tax payment remains: January 15, 2027. Put preparation reminders on your calendar and let OnTimer turn them into alarms.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "2026 Estimated Tax Due Dates + Final Payment Alarm Tool",
    description:
      "The final standard 2026 estimated-tax payment is due January 15, 2027. Add the remaining preparation reminders to your calendar.",
    url: canonicalUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 Estimated Tax Due Dates + Final Payment Alarm Tool",
    description: "Add calendar reminders for the final 2026 estimated-tax payment due January 15, 2027.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "2026 Final Estimated Tax Payment Alarm Tool",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A free tool that puts preparation reminders on your calendar for the final 2026 estimated-tax payment due January 15, 2027. OnTimer can turn those calendar events into alarms.",
  url: canonicalUrl,
  author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
    { "@type": "ListItem", position: 2, name: "Deadline tools", item: canonicalUrl },
    { "@type": "ListItem", position: 3, name: "2026 estimated tax due dates", item: canonicalUrl },
  ],
};

export default function EstimatedTaxPaymentDates2026Page() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span>2026 estimated tax due dates</span>
      </nav>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>2026 estimated tax reminder tool</p>
        <h1>When is the final 2026 estimated tax payment due?</h1>
        <p className={styles.lede}>
          Use this tool to set reminders on your calendar before the final due date, and let OnTimer turn each one into a hard-to-miss alarm.
        </p>
        <p className={styles.answer}>
          One standard payment remains: <strong>the fourth 2026 estimated-tax payment is due January 15, 2027.</strong> The April 15, June 15, and September 15, 2026 deadlines have passed.
        </p>
        <div className={styles.status} role="note">
          <span>Official 2026 schedule</span>
          <span>One payment remaining</span>
          <span>Reviewed November 7, 2026</span>
          <Link href="/estimated-tax-payment-dates">See projected 2027 dates</Link>
        </div>
      </section>

      <EstimatedTaxDeadlineTool
        primaryDeadlines={ESTIMATED_TAX_DEADLINES_2026}
        rolloverDeadlines={ESTIMATED_TAX_DEADLINES_2027}
      />

      <section className={styles.explainer}>
        <div>
          <p className={styles.eyebrow}>The remaining payment</p>
          <h2>The fourth installment belongs to the 2026 tax year</h2>
          <p>
            The standard calendar-year schedule covers income periods ending March 31, May 31, August 31, and December 31. The payment for the final 2026 period is due January 15, 2027.
          </p>
          <p>
            The reminder tool automatically leaves out the three payment deadlines that have already passed and creates events only for the remaining January payment.
          </p>
        </div>
        <aside>
          <h3>Check the January-payment exception</h3>
          <p>
            The IRS says you may not need the January 15 payment if you file your 2026 return by February 1, 2027 and pay the entire balance due. Fiscal-year taxpayers, farmers, fishermen, and taxpayers affected by relief may follow different rules.
          </p>
          <a href="https://www.irs.gov/publications/p505" target="_blank" rel="noopener noreferrer">
            Read IRS Publication 505
          </a>
        </aside>
      </section>

      <section className={styles.sourceSection}>
        <p className={styles.eyebrow}>Sources and methodology</p>
        <h2>Official 2026 payment dates</h2>
        <p>
          The IRS’s 2026 schedule lists April 15, June 15, and September 15, 2026, followed by January 15, 2027. This page keeps the full answer visible while the tool adds only reminder events that are still in the future.
        </p>
        <ul>
          <li><a href="https://www.irs.gov/pub/irs-prior/f1040es--2026.pdf" target="_blank" rel="noopener noreferrer">2026 IRS Form 1040-ES</a></li>
          <li><a href="https://www.irs.gov/publications/p505" target="_blank" rel="noopener noreferrer">2026 IRS Publication 505</a></li>
        </ul>
      </section>
    </main>
  );
}
