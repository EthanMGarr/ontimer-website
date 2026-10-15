import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import { Homepage2DownloadCTA } from "@/components/Homepage2DownloadCTA";
import { ANDROID_WAITLIST_URL, APP_STORE_URL } from "@/lib/constants";
import { homepageFaqs, productFacts } from "@/lib/product-facts";
import "./homepage2-page.css";

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
    "OnTimer turns iPhone calendar events into persistent alarms with custom sounds, event controls, Early Warning, Time To Leave, and Time To Fly.",
  alternates: { canonical: "https://www.ontimer.app/" },
  robots: { index: false, follow: true },
};

const faqs = [
  ...homepageFaqs.map((faq) => ({ ...faq, link: undefined })),
  {
    question: "Is OnTimer available for Android?",
    answer:
      "OnTimer is currently available for iPhone. Android users can join the waitlist and be notified when an Android version is ready.",
    link: { href: ANDROID_WAITLIST_URL, label: "Join the Android waitlist" },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.ontimer.app/#organization",
      name: "OnTimer",
      url: "https://www.ontimer.app/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.ontimer.app/#logo",
        url: "https://www.ontimer.app/images/homepage2/ontimer-icon-blue.png",
      },
      sameAs: [APP_STORE_URL],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@ontimer.app",
        contactType: "customer support",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.ontimer.app/#app",
      name: "OnTimer",
      operatingSystem: "iOS",
      applicationCategory: "ProductivityApplication",
      applicationSubCategory: "Calendar Alarm App",
      description:
        "OnTimer turns iPhone calendar events into persistent alarms with custom sounds, event controls, Early Warning, Time To Leave, and Time To Fly.",
      url: "https://www.ontimer.app/",
      installUrl: APP_STORE_URL,
      sameAs: [APP_STORE_URL],
      publisher: { "@id": "https://www.ontimer.app/#organization" },
      brand: { "@id": "https://www.ontimer.app/#organization" },
      availableOnDevice: "iPhone",
      image: { "@id": "https://www.ontimer.app/#logo" },
      screenshot: [
        "https://www.ontimer.app/images/homepage2/persistent-alarm-v4.png",
        "https://www.ontimer.app/images/homepage2/time-to-leave-alarm.png",
        "https://www.ontimer.app/images/homepage2/calendar-connections-v2.png",
        "https://www.ontimer.app/images/homepage2/early-warning.png",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: productFacts.pricing,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ontimer.app/#website",
      name: "OnTimer",
      url: "https://www.ontimer.app/",
      description:
        "OnTimer is an iPhone calendar alarm app that turns existing calendar events into persistent alarms and Time To Leave alerts.",
      publisher: { "@id": "https://www.ontimer.app/#organization" },
      about: { "@id": "https://www.ontimer.app/#app" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.ontimer.app/#faq",
      url: "https://www.ontimer.app/#faq",
      about: { "@id": "https://www.ontimer.app/#app" },
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
              OnTimer turns your calendar into automatic alarms that stay in
              front of you until you respond—so you know when to join, leave,
              or act.
            </p>
            <div className="hp2-hero-actions">
              <Homepage2DownloadCTA location="homepage_hero" />
              <Link className="hp2-text-link" href="#how-it-works">
                See how it works <ArrowIcon />
              </Link>
            </div>
            <p className="hp2-platform-note">
              Available now for iPhone. Android users can{" "}
              <a href={ANDROID_WAITLIST_URL} target="_blank" rel="noopener noreferrer">join the waitlist</a>.
            </p>
          </div>

          <div className="hp2-hero-visual" aria-label="OnTimer alarm examples">
            <Image
              className="hp2-shot hp2-shot-main"
              src="/images/homepage2/persistent-alarm-v4.png"
              alt="OnTimer persistent meeting alarm on an iPhone"
              width={853}
              height={1844}
              sizes="(max-width: 639px) 42vw, (max-width: 959px) 18rem, 17rem"
              priority
            />
            <Image
              className="hp2-shot hp2-shot-float"
              src="/images/homepage2/time-to-leave-alarm.png"
              alt="OnTimer time-to-leave alarm for a doctor's appointment"
              width={1242}
              height={2688}
              sizes="(max-width: 639px) 42vw, (max-width: 959px) 18rem, 17rem"
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
                Bring Apple Calendar, Google Calendar, and Outlook Calendar
                together, including work and school accounts.
              </p>
            </div>
            <Image
              src="/images/homepage2/calendar-connections-v2.png"
              alt="OnTimer options for connecting Google, Outlook, and Apple calendars"
              width={853}
              height={1844}
              sizes="(max-width: 959px) 72vw, 19rem"
            />
          </article>

          <article className="hp2-stage hp2-stage-alarm">
            <div className="hp2-stage-copy">
              <h3>Turn important events into alarms</h3>
              <p>
                OnTimer creates alarms automatically from your upcoming events.
                Each alarm stays on screen until you dismiss it, and Early
                Warning gives you time to wrap up before the main alarm.
              </p>
            </div>
            <div className="hp2-pair">
              <Image
                src="/images/homepage2/persistent-alarm-v4.png"
                alt="OnTimer calendar alarm that stays on screen until dismissed"
                width={853}
                height={1844}
                sizes="(max-width: 959px) 54vw, 17rem"
              />
              <Image
                src="/images/homepage2/early-warning.png"
                alt="OnTimer early warning alarm settings"
                width={1242}
                height={2688}
                sizes="(max-width: 959px) 54vw, 17rem"
              />
            </div>
          </article>

          <article className="hp2-stage hp2-stage-leave">
            <div className="hp2-stage-copy">
              <h3>Know when it is really time to leave</h3>
              <p>
                Time To Leave adjusts for traffic and how you travel.
              </p>
              <p>
                Time To Fly finds flights in your calendar and works backward
                from your trip to the airport and airline-recommended arrival
                time. No extra flight entry required.
              </p>
            </div>
            <div className="hp2-pair">
              <Image
                src="/images/homepage2/time-to-fly.png"
                alt="OnTimer Time To Fly controls for a flight to Boston"
                width={853}
                height={1844}
                sizes="(max-width: 959px) 54vw, 17rem"
              />
              <Image
                src="/images/homepage2/traffic-adjustments.png"
                alt="OnTimer Time To Leave automatically adjusts for traffic"
                width={1242}
                height={2688}
                sizes="(max-width: 959px) 54vw, 17rem"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="hp2-control" aria-labelledby="control-title">
        <div className="hp2-shell hp2-control-grid">
          <div>
            <p className="hp2-kicker">Automatic does not mean rigid</p>
            <h2 id="control-title">Your schedule. Your rules.</h2>
            <p>
              Home-screen event cards let you turn each alarm on or off, choose
              its sound, set an Early Warning, or open the original calendar
              event. Repeating meeting you don't need? Turn it off once or for
              the whole series. Prefer alarms off by default? Choose Only
              meetings I choose in Which Meetings Ring, then tap the bell on
              the meetings you want.
            </p>
            <Homepage2DownloadCTA compact location="homepage_controls" />
          </div>
          <div className="hp2-control-pair">
            <Image
              src="/images/homepage2/event-controls-v2.png"
              alt="OnTimer Home-screen event card with alarm, sound, timing, Early Warning, and calendar controls"
              width={853}
              height={1844}
              sizes="(max-width: 959px) 54vw, 17rem"
            />
            <Image
              src="/images/homepage2/custom-sounds.png"
              alt="OnTimer custom alarm sound picker"
              width={853}
              height={1844}
              sizes="(max-width: 959px) 54vw, 17rem"
            />
          </div>
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
                  {faq.answer}{faq.link ? <> <a href={faq.link.href} target="_blank" rel="noopener noreferrer">{faq.link.label}</a>.</> : null}
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
            sizes="88px"
          />
          <div>
            <p className="hp2-kicker">One less thing to remember</p>
            <h2 id="final-title">Relax. You are on time.</h2>
            <p>Turn the calendar you already trust into alarms that keep you on time.</p>
          </div>
          <Homepage2DownloadCTA location="homepage_final" />
        </div>
      </section>
    </div>
  );
}
