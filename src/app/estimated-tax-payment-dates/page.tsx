import type { Metadata } from "next";
import Link from "next/link";
import { ESTIMATED_TAX_DEADLINES_2027, ESTIMATED_TAX_DEADLINES_2028 } from "@/lib/estimated-tax-deadlines";
import EstimatedTaxDeadlineTool from "./EstimatedTaxDeadlineTool";
import styles from "./estimated-tax.module.css";

const canonicalUrl = "https://www.ontimer.app/estimated-tax-payment-dates";

export const metadata: Metadata = {
  title: "2027 Estimated Tax Due Dates + Automatic Alarm Tool",
  description:
    "Use this tool to set calendar reminders before every 2027 estimated-tax due date. OnTimer turns each event into a hard-to-miss alarm.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "2027 Estimated Tax Due Dates + Automatic Alarm Tool",
    description:
      "Set reminders on your calendar before every 2027 estimated-tax due date, then let OnTimer turn each event into a hard-to-miss alarm.",
    url: canonicalUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2027 Estimated Tax Due Dates + Automatic Alarm Tool",
    description: "Set 20 calendar reminders for the four projected 2027 estimated-tax deadlines.",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "2027 Estimated Tax Deadline Alarm Tool",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A free tool that puts five reminders on your calendar before each projected 2027 U.S. estimated tax deadline. OnTimer can turn those calendar events into alarms.",
  url: canonicalUrl,
  author: { "@type": "Organization", name: "OnTimer", url: "https://www.ontimer.app" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ontimer.app" },
    { "@type": "ListItem", position: 2, name: "Deadline tools", item: canonicalUrl },
    { "@type": "ListItem", position: 3, name: "2027 estimated tax due dates", item: canonicalUrl },
  ],
};

export default function EstimatedTaxPaymentDatesPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span>2027 estimated tax due dates</span>
      </nav>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>2027 estimated tax reminder tool</p>
        <h1>When are 2027 estimated tax payments due?</h1>
        <p className={styles.lede}>
          Use this tool to set reminders on your calendar before each due date, and let OnTimer turn each one into a hard-to-miss alarm.
        </p>
        <p className={styles.answer}>
          Projected due dates: <strong>April 15, June 15, and September 15, 2027, plus January 18, 2028.</strong> The IRS has not yet published the 2027 Form 1040-ES.
        </p>
        <div className={styles.status} role="note">
          <span>Projected schedule</span>
          <span>Reviewed November 7, 2026</span>
          <Link href="/2026-estimated-tax-payment-dates">See the final 2026 payment</Link>
        </div>
      </section>

      <EstimatedTaxDeadlineTool
        primaryDeadlines={ESTIMATED_TAX_DEADLINES_2027}
        rolloverDeadlines={ESTIMATED_TAX_DEADLINES_2028}
      />

      <section className={styles.explainer}>
        <div>
          <p className={styles.eyebrow}>What this schedule covers</p>
          <h2>Four payments, but not four equal quarters</h2>
          <p>
            The standard calendar-year schedule divides income into periods ending March 31, May 31, August 31, and December 31. That is why the payments do not land every three months.
          </p>
          <p>
            January 15, 2028 falls on a Saturday, and the following Monday is a federal holiday. Under the IRS weekend-and-holiday rule, the projected fourth deadline moves to Tuesday, January 18.
          </p>
        </div>
        <aside>
          <h3>Confirm before you pay</h3>
          <p>
            This tool does not calculate whether you owe estimated tax or how much to pay. Fiscal-year taxpayers, farmers, fishermen, people who file early in January, and taxpayers affected by disaster relief may have different timing.
          </p>
          <a href="https://www.irs.gov/faqs/estimated-tax" target="_blank" rel="noopener noreferrer">
            Read IRS estimated-tax guidance
          </a>
        </aside>
      </section>

      <section className={styles.sourceSection}>
        <p className={styles.eyebrow}>Sources and methodology</p>
        <h2>Why these dates are marked projected</h2>
        <p>
          The schedule applies the IRS’s published general due-date and next-business-day rules to the 2027 calendar. We will update this page when the IRS publishes the 2027 Form 1040-ES.
        </p>
        <ul>
          <li><a href="https://www.irs.gov/faqs/estimated-tax" target="_blank" rel="noopener noreferrer">IRS estimated tax FAQs</a></li>
          <li><a href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf" target="_blank" rel="noopener noreferrer">Current IRS Form 1040-ES</a></li>
        </ul>
      </section>
    </main>
  );
}
