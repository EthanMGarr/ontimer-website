import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";
import { APP_STORE_URL } from "@/lib/constants";
import "./homepage2.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-hp-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hp-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Never Be Late Again | OnTimer Calendar Alarm App",
  description:
    "OnTimer turns your iPhone calendar events into persistent alarms and time-to-leave alerts, so you know when to join, leave, or act.",
  alternates: { canonical: "https://www.ontimer.app/homepage2" },
  robots: { index: false, follow: true },
};

const faqs = [
  {
    question: "What does OnTimer do?",
    answer:
      "OnTimer turns events from the calendars you already use into alarms on your iPhone. It helps you know when to join, leave, or act before the moment passes.",
  },
  {
    question: "How is an OnTimer alarm different from a calendar notification?",
    answer:
      "Calendar notifications can appear once and disappear. OnTimer creates persistent, customizable alarms designed to get your attention when it is time to act.",
  },
  {
    question: "Which calendars work with OnTimer?",
    answer:
      "OnTimer connects with Apple Calendar, Google Calendar, and Outlook calendars through Microsoft 365. It works with your existing schedule, so there is nothing new to rebuild.",
  },
  {
    question: "Does OnTimer know when I should leave?",
    answer:
      "Yes. Time-to-leave alerts can account for an event location, your travel method, and changing traffic conditions.",
  },
  {
    question: "Is OnTimer free?",
    answer:
      "Yes. OnTimer is free to download and includes automatic calendar alarms for one calendar. An optional upgrade adds Time To Leave alerts, Early Warning alarms, multiple calendar connections, and more.",
  },
  {
    question: "Is OnTimer available for Android?",
    answer:
      "OnTimer is currently available for iPhone. Android users can join the waitlist and be notified when an Android version is ready.",
    link: { href: "/android", label: "Join the Android waitlist" },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.ontimer.app/#organization",
      name: "OnTimer",
      url: "https://www.ontimer.app",
      logo: "https://www.ontimer.app/images/homepage2/ontimer-icon-blue.png",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.ontimer.app/#app",
      name: "OnTimer",
      operatingSystem: "iOS",
      applicationCategory: "ProductivityApplication",
      applicationSubCategory: "Calendar Alarm App",
      description:
        "OnTimer turns iPhone calendar events into persistent alarms and time-to-leave alerts.",
      url: "https://www.ontimer.app/homepage2",
      installUrl: APP_STORE_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free to download with optional paid features.",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ToolIcon({ kind }: { kind: "leave" | "travel" | "medication" | "all" }) {
  const paths = {
    leave: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    travel: <><path d="m3 13 8-2 5-6 2 1-3 6 5 3-1 2-6-2-5 6-2-1 3-6-6 1Z" /></>,
    medication: <><path d="M8 4h8v16H8zM5 9h3m8 6h3" /><path d="M12 8v8m-4-4h8" /></>,
    all: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  };

  return <span className="hp2-tool-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{paths[kind]}</svg></span>;
}

export default function Homepage2() {
  return (
    <div className={`${display.variable} ${body.variable} homepage2`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hp2-hero" aria-labelledby="hp2-title">
        <div className="hp2-shell hp2-hero-grid">
          <div className="hp2-hero-copy">
            <p className="hp2-kicker">Automatic calendar alarms</p>
            <h1 id="hp2-title">Never be late again.</h1>
            <p className="hp2-lede">
              OnTimer turns your calendar events into alarms, so you know when
              to join, when to leave, and when it is time to act.
            </p>
            <div className="hp2-hero-actions">
              <Homepage2DownloadCTA location="homepage2_hero" />
              <Link className="hp2-text-link" href="#how-it-works">
                See how it works <ArrowIcon />
              </Link>
            </div>
            <p className="hp2-platform-note">
              Available now for iPhone. Android users can{" "}
              <Link href="/android">join the waitlist</Link>.
            </p>
          </div>

          <div className="hp2-hero-visual" aria-label="OnTimer alarm examples">
            <Image
              className="hp2-shot hp2-shot-main"
              src="/images/homepage2/persistent-alarm.png"
              alt="OnTimer persistent meeting alarm on an iPhone"
              width={1242}
              height={2688}
              priority
            />
            <Image
              className="hp2-shot hp2-shot-float"
              src="/images/homepage2/time-to-leave-alarm.png"
              alt="OnTimer time-to-leave alarm for a doctor's appointment"
              width={1242}
              height={2688}
              priority
            />
          </div>
        </div>
      </section>

      <section className="hp2-problem" aria-labelledby="problem-title">
        <div className="hp2-shell hp2-problem-grid">
          <p className="hp2-moment">“Are you joining?”</p>
          <div>
            <p className="hp2-kicker">The problem is not your calendar</p>
            <h2 id="problem-title">You knew about the meeting. The reminder disappeared.</h2>
            <p>
              Schedules change. Traffic builds. A notification appears while
              you are doing something else. OnTimer closes the gap between
              knowing what is next and acting on time.
            </p>
          </div>
        </div>
      </section>

      <section className="hp2-workflow" id="how-it-works" aria-labelledby="workflow-title">
        <div className="hp2-shell">
          <div className="hp2-section-intro">
            <p className="hp2-kicker">How OnTimer works</p>
            <h2 id="workflow-title">Your calendar becomes your alarm system.</h2>
            <p>Connect once. OnTimer automatically keeps your alarms aligned with your day.</p>
          </div>

          <article className="hp2-stage hp2-stage-calendar">
            <div className="hp2-stage-copy">
              <h3>Connect the calendars you already use</h3>
              <p>
                Bring Apple Calendar, Google Calendar, and Outlook calendars
                together. Microsoft work and school accounts connect through Microsoft 365.
              </p>
            </div>
            <Image
              src="/images/homepage2/calendar-connections.png"
              alt="OnTimer options for connecting Google, Microsoft 365, and Apple calendars"
              width={1242}
              height={2688}
            />
          </article>

          <article className="hp2-stage hp2-stage-alarm">
            <div className="hp2-stage-copy">
              <h3>Turn important events into alarms</h3>
              <p>
                Get an alarm that demands a response, plus an optional early
                warning when you need time to wrap up.
              </p>
            </div>
            <div className="hp2-pair">
              <Image
                src="/images/homepage2/persistent-alarm.png"
                alt="A persistent OnTimer meeting alarm"
                width={1242}
                height={2688}
              />
              <Image
                src="/images/homepage2/early-warning.png"
                alt="OnTimer early warning alarm settings"
                width={1242}
                height={2688}
              />
            </div>
          </article>

          <article className="hp2-stage hp2-stage-leave">
            <div className="hp2-stage-copy">
              <h3>Know when it is really time to leave</h3>
              <p>
                For events with a location, OnTimer can account for traffic and
                how you travel. If the road changes, your timing changes too.
              </p>
            </div>
            <Image
              src="/images/homepage2/traffic-adjustments.png"
              alt="OnTimer time-to-leave alerts based on traffic"
              width={1242}
              height={2688}
            />
          </article>
        </div>
      </section>

      <section className="hp2-control" aria-labelledby="control-title">
        <div className="hp2-shell hp2-control-grid">
          <div>
            <p className="hp2-kicker">Automatic does not mean rigid</p>
            <h2 id="control-title">Your schedule. Your rules.</h2>
            <p>
              Choose recurring meetings, set business hours, pause alerts, and
              decide how much warning each kind of event deserves.
            </p>
            <Homepage2DownloadCTA compact location="homepage2_controls" />
          </div>
          <Image
            src="/images/homepage2/control-settings.png"
            alt="OnTimer controls for travel alerts, recurring meetings, business hours, and pausing"
            width={1242}
            height={2688}
          />
        </div>
      </section>

      <section className="hp2-tools" id="tools" aria-labelledby="tools-title">
        <div className="hp2-shell">
          <div className="hp2-section-intro hp2-section-intro-left">
            <p className="hp2-kicker">Need an answer right now?</p>
            <h2 id="tools-title">Start with the moment you are planning.</h2>
            <p>
              Use a free planning tool now. When the moment matters every day,
              let OnTimer keep watch automatically.
            </p>
          </div>

          <div className="hp2-tool-grid">
            <Link className="hp2-tool-card" href="/what-time-should-i-leave">
              <ToolIcon kind="leave" />
              <span>
                <strong>Calculate when to leave</strong>
                <small>Plan any meeting, appointment, or arrival.</small>
              </span>
              <ArrowIcon />
            </Link>
            <Link className="hp2-tool-card" href="/airport-time-to-leave-calculator">
              <ToolIcon kind="travel" />
              <span>
                <strong>I am planning travel</strong>
                <small>Choose an airport or cruise port and plan your timing.</small>
              </span>
              <ArrowIcon />
            </Link>
            <Link className="hp2-tool-card" href="/medication-schedule">
              <ToolIcon kind="medication" />
              <span>
                <strong>I need a medication schedule</strong>
                <small>Personal, caregiver, and veterinary planners.</small>
              </span>
              <ArrowIcon />
            </Link>
            <Link className="hp2-tool-card" href="/time-calculators">
              <ToolIcon kind="all" />
              <span>
                <strong>Show me every free tool</strong>
                <small>Browse the complete OnTimer tool library.</small>
              </span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="hp2-faq" id="faq" aria-labelledby="faq-title">
        <div className="hp2-shell hp2-faq-grid">
          <div className="hp2-faq-intro">
            <p className="hp2-kicker">The useful details</p>
            <h2 id="faq-title">A few things worth knowing.</h2>
            <p>OnTimer works with your calendar. It does not ask you to replace it.</p>
          </div>
          <div className="hp2-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>
                  {faq.answer}{faq.link ? <> <Link href={faq.link.href}>{faq.link.label}</Link>.</> : null}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="hp2-final" aria-labelledby="final-title">
        <div className="hp2-shell hp2-final-card">
          <Image
            src="/images/homepage2/ontimer-icon-blue.png"
            alt=""
            width={200}
            height={200}
          />
          <div>
            <p className="hp2-kicker">One less thing to remember</p>
            <h2 id="final-title">Relax. You are on time.</h2>
            <p>Turn the calendar you already trust into alarms you will not miss.</p>
          </div>
          <Homepage2DownloadCTA location="homepage2_final" />
        </div>
      </section>
    </div>
  );
}
