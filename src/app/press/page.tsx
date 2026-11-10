import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import "./press.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-press-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-press-body",
  display: "swap",
});

const ktvuStoryUrl = "https://www.ktvu.com/video/fmc-c62rzvs90bao7eq2";
const ktvuImageUrl =
  "https://images.foxtv.com/static-media.fox.com/fmcv3/prod/fts/2xdght5mxvoq57cf/1200/630/39oytjhks223hani.jpg?ve=1&tl=1";
const ktvuContentUrl =
  "https://static-clips.fox.com/proxy/fts_clip/svc_hf_fts_clip_prod/WM_KTVU_49535707661_49535707770/49535707770/hf-uuid-e6e52838-c4e1-405d-a298-143381943f82/49535707770_lowres.mp4";

export const metadata: Metadata = {
  title: { absolute: "OnTimer Press | Featured on KTVU FOX 2" },
  description:
    "Watch KTVU FOX 2's feature on OnTimer founder Ethan Garr and the app's free airport leave-time calculator.",
  alternates: { canonical: "https://www.ontimer.app/press" },
  openGraph: {
    title: "OnTimer featured on KTVU FOX 2",
    description:
      "KTVU FOX 2 spoke with OnTimer founder Ethan Garr about taking the stress out of deciding when to leave for the airport.",
    url: "https://www.ontimer.app/press",
    siteName: "OnTimer",
    type: "website",
    images: [
      {
        url: ktvuImageUrl,
        width: 1280,
        height: 720,
        alt: "OnTimer founder Ethan Garr discussing the airport leave-time calculator on KTVU FOX 2",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnTimer featured on KTVU FOX 2",
    description:
      "Watch KTVU FOX 2's feature on OnTimer and its free airport leave-time calculator.",
    images: [ktvuImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.ontimer.app/press#webpage",
      url: "https://www.ontimer.app/press",
      name: "OnTimer Press",
      description:
        "Independent news coverage and media resources for OnTimer, the iPhone calendar alarm app.",
      isPartOf: { "@id": "https://www.ontimer.app/#website" },
      about: { "@id": "https://www.ontimer.app/#app" },
      mainEntity: { "@id": `${ktvuStoryUrl}#video` },
      dateModified: "2026-11-10",
    },
    {
      "@type": "VideoObject",
      "@id": `${ktvuStoryUrl}#video`,
      name: "App relieving holiday airport stress",
      description:
        "KTVU FOX 2 speaks with OnTimer founder Ethan Garr about the app's airport leave-time calculator.",
      url: ktvuStoryUrl,
      contentUrl: ktvuContentUrl,
      thumbnailUrl: [ktvuImageUrl],
      uploadDate: "2026-11-09T18:09:47Z",
      publisher: {
        "@type": "NewsMediaOrganization",
        name: "KTVU FOX 2",
        url: "https://www.ktvu.com/",
      },
      about: { "@id": "https://www.ontimer.app/#app" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.ontimer.app/press#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.ontimer.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Press",
          item: "https://www.ontimer.app/press",
        },
      ],
    },
  ],
};

export default function PressPage() {
  return (
    <div className={`${display.variable} ${body.variable} press-page`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="press-hero" aria-labelledby="press-title">
        <div className="press-shell">
          <nav className="press-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Press</span>
          </nav>
          <p className="press-kicker">OnTimer in the press</p>
          <h1 id="press-title">“App relieving holiday airport stress”</h1>
          <p className="press-attribution">
            KTVU FOX 2 <span aria-hidden="true">·</span>{" "}
            <time dateTime="2026-11-09">November 9, 2026</time>
          </p>
          <a className="press-story-link" href={ktvuStoryUrl} rel="external">
            Watch the KTVU FOX 2 segment <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="press-coverage" aria-labelledby="coverage-title">
        <div className="press-shell press-coverage-grid">
          <a
            className="press-story-image"
            href={ktvuStoryUrl}
            rel="external"
            aria-label="Watch App relieving holiday airport stress on KTVU FOX 2"
          >
            {/* The source image remains hosted by KTVU and links directly to its original story. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ktvuImageUrl}
              alt="OnTimer founder Ethan Garr discussing the airport leave-time calculator on KTVU FOX 2"
              width="1280"
              height="720"
            />
            <span aria-hidden="true">Watch on KTVU FOX 2 ↗</span>
          </a>

          <div className="press-story-copy">
            <p className="press-kicker">Featured coverage</p>
            <h2 id="coverage-title">A more specific answer to “When should I leave?”</h2>
            <p>
              KTVU FOX 2 spoke with OnTimer founder Ethan Garr about the app&apos;s free
              airport calculator, which helps travelers work backward from a flight and
              calculate a specific time to leave for the airport.
            </p>
            <p>
              OnTimer is an iPhone calendar alarm app. It turns events from Google
              Calendar, Apple Calendar, and Outlook Calendar into automatic, persistent
              alarms that require a response.
            </p>
            <div className="press-related-links" aria-label="Related OnTimer resources">
              <Link href="/airport-time-to-leave-calculator">
                Try the airport calculator <span aria-hidden="true">→</span>
              </Link>
              <Link href="/features">
                Explore OnTimer features <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="press-contact" aria-labelledby="press-contact-title">
        <div className="press-shell press-contact-inner">
          <div>
            <p className="press-kicker">Media inquiries</p>
            <h2 id="press-contact-title">Interested in doing a story?</h2>
            <p>
              For interviews, product background, or media assets, contact OnTimer directly.
            </p>
          </div>
          <a className="press-contact-link" href="mailto:support@ontimer.app">
            Email OnTimer <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
