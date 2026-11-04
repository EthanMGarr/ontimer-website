"use client";

import { QRCodeSVG } from "qrcode.react";
import { appStoreCampaignUrl } from "@/lib/app-store-links";
import { APP_STORE_URL } from "@/lib/constants";
import { fireEvent, trackAppStoreClick } from "@/lib/analytics";

const campaignQuery =
  "utm_source=ktvu&utm_medium=tv&utm_campaign=holiday_travel_2026";

const airports = [
  {
    code: "SFO",
    name: "San Francisco International",
    detail: "San Francisco and the Peninsula",
    href: `/airport-time-to-leave/san-francisco-sfo?${campaignQuery}&utm_content=sfo_calculator`,
  },
  {
    code: "OAK",
    name: "Oakland San Francisco Bay Airport",
    detail: "Oakland and the East Bay",
    href: `/airport-time-to-leave/oakland-oak?${campaignQuery}&utm_content=oak_calculator`,
  },
  {
    code: "SJC",
    name: "San Jose Mineta International",
    detail: "San Jose and Silicon Valley",
    href: `/airport-time-to-leave/san-jose-sjc?${campaignQuery}&utm_content=sjc_calculator`,
  },
] as const;

const appStoreUrl = appStoreCampaignUrl("ktvu_holiday_tv", APP_STORE_URL);

const tools = [
  {
    title: "Picking someone up?",
    description: "Plan when to leave for an airport pickup.",
    href: `/airport-pickup-time-calculator?${campaignQuery}&utm_content=airport_pickup`,
  },
  {
    title: "Going somewhere else?",
    description: "Calculate when to leave for any destination.",
    href: `/what-time-should-i-leave?${campaignQuery}&utm_content=general_leave_time`,
  },
  {
    title: "Taking a cruise?",
    description: "Work backward from your cruise departure.",
    href: `/cruise-terminal-time-calculators?${campaignQuery}&utm_content=cruise_calculators`,
  },
  {
    title: "Explore every free calculator",
    description: "Find the right timing tool for your next plan.",
    href: `/time-calculators?${campaignQuery}&utm_content=all_calculators`,
  },
] as const;

function AppleMark() {
  return (
    <svg viewBox="0 0 814 1000" aria-hidden="true">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.8-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.7-317.3 70.6 0 129.4 46.4 173.5 46.4 42.1 0 108.4-49.2 189.3-49.2 30.2 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}
export function KTVUAirportActions() {
  return (
    <div className="ktvu-airport-grid" aria-label="Bay Area airport calculators">
      {airports.map((airport) => (
        <a
          className="ktvu-airport-card"
          href={airport.href}
          key={airport.code}
          onClick={() =>
            fireEvent("ktvu_airport_calculator_click", {
              airport_code: airport.code,
              campaign: "holiday_travel_2026",
            })
          }
        >
          <span className="ktvu-airport-code">{airport.code}</span>
          <span className="ktvu-airport-name">{airport.name}</span>
          <span className="ktvu-airport-detail">{airport.detail}</span>
          <span className="ktvu-airport-link">
            Calculate my leave time <span aria-hidden="true">→</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function KTVUHeroAppStoreAction() {
  return (
    <a
      className="ktvu-hero-app-button"
      href={appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackAppStoreClick("ktvu_hero", {
          campaign: "holiday_travel_2026",
          cta_variant: "ktvu_above_fold",
        })
      }
    >
      <AppleMark />
      <span>Download free for iPhone</span>
    </a>
  );
}

export function KTVUAppStoreAction() {
  return (
    <div className="ktvu-download-actions">
      <a
        className="ktvu-app-store-button"
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackAppStoreClick("ktvu_landing", {
            campaign: "holiday_travel_2026",
            cta_variant: "ktvu_live_interview",
          })
        }
      >
        <AppleMark />
        <span>
          <small>Download on the</small>
          App Store
        </span>
      </a>

      <a
        className="ktvu-app-qr"
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the OnTimer App Store listing"
        onClick={() =>
          trackAppStoreClick("ktvu_landing_qr", {
            campaign: "holiday_travel_2026",
            cta_variant: "ktvu_live_interview_qr",
          })
        }
      >
        <QRCodeSVG
          title="Scan to download OnTimer from the App Store"
          value={appStoreUrl}
          size={156}
          level="M"
          includeMargin
        />
        <span>Scan with your iPhone</span>
      </a>
    </div>
  );
}

export function KTVUToolActions() {
  return (
    <div className="ktvu-tool-grid" aria-label="More free OnTimer tools">
      {tools.map((tool) => (
        <a
          className="ktvu-tool-card"
          href={tool.href}
          key={tool.title}
          onClick={() =>
            fireEvent("ktvu_tool_click", {
              tool: tool.title,
              campaign: "holiday_travel_2026",
            })
          }
        >
          <span>
            <strong>{tool.title}</strong>
            <small>{tool.description}</small>
          </span>
          <span className="ktvu-tool-arrow" aria-hidden="true">→</span>
        </a>
      ))}
    </div>
  );
}
