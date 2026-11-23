import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ktvuPagePath = path.join(root, "src", "app", "KTVU", "page.tsx");
const ktvuActionsPath = path.join(root, "src", "app", "KTVU", "KTVUActions.tsx");
const ktvuStylesPath = path.join(root, "src", "app", "KTVU", "ktvu.css");
const homepagePath = path.join(root, "src", "app", "homepage2", "page.tsx");
const homepageRoutePath = path.join(root, "src", "app", "page.tsx");
const announcementPath = path.join(root, "src", "components", "TulsaAnnouncementBar.tsx");
const announcementStylesPath = path.join(root, "src", "components", "KTVUAnnouncementBar.module.css");
const middlewarePath = path.join(root, "src", "middleware.ts");
const pressPagePath = path.join(root, "src", "app", "press", "page.tsx");
const pressStylesPath = path.join(root, "src", "app", "press", "press.css");
const sitemapPath = path.join(root, "src", "app", "sitemap.ts");
const footerPath = path.join(root, "src", "components", "Homepage2Footer.tsx");

for (const requiredPath of [
  ktvuPagePath,
  ktvuActionsPath,
  ktvuStylesPath,
  homepagePath,
  announcementPath,
  announcementStylesPath,
  pressPagePath,
  pressStylesPath,
]) {
  assert.ok(existsSync(requiredPath), `critical KTVU route asset is missing: ${requiredPath}`);
}

const page = readFileSync(ktvuPagePath, "utf8");
const actions = readFileSync(ktvuActionsPath, "utf8");
const styles = readFileSync(ktvuStylesPath, "utf8");
const homepage = readFileSync(homepagePath, "utf8");
const homepageRoute = readFileSync(homepageRoutePath, "utf8");
const announcement = readFileSync(announcementPath, "utf8");
const announcementStyles = readFileSync(announcementStylesPath, "utf8");
const middleware = readFileSync(middlewarePath, "utf8");
const pressPage = readFileSync(pressPagePath, "utf8");
const sitemap = readFileSync(sitemapPath, "utf8");
const footer = readFileSync(footerPath, "utf8");

assert.match(
  page,
  /alternates:\s*\{\s*canonical:\s*"https:\/\/www\.ontimer\.app\/KTVU"\s*\}/,
  "KTVU must keep its uppercase canonical URL",
);
assert.match(page, /export default function KTVULandingPage\(\)/, "KTVU must export its landing page");
assert.match(page, /itunes:\s*null/, "KTVU must suppress the app banner before its calculator choices");
assert.ok(
  page.indexOf("<KTVUAirportActions />") < page.indexOf('className="ktvu-hero-app"'),
  "KTVU airport calculators must precede the app-download card",
);
assert.match(page, /Flying somewhere else\?/, "KTVU must offer the all-airports escape hatch");
assert.match(actions, /Calculate for \{airport\.code\}/, "KTVU must expose compact airport CTAs on mobile");
assert.match(
  styles,
  /\.ktvu-airport-mobile-label\s*\{[\s\S]*?white-space:\s*nowrap/,
  "KTVU mobile airport CTAs must remain single-line",
);
assert.match(actions, /utm_source=ktvu/, "KTVU actions must retain campaign attribution");
assert.match(
  middleware,
  /request\.nextUrl\.pathname === "\/ktvu"[\s\S]*?pathname = "\/KTVU"[\s\S]*?NextResponse\.redirect\(canonicalUrl, 308\)/,
  "lowercase /ktvu must permanently redirect to canonical /KTVU",
);
assert.ok(
  middleware.includes('"/ktvu"'),
  "lowercase /ktvu must remain in the unconditional middleware matcher",
);
assert.match(
  announcement,
  /Welcome FOX23 Tulsa viewers: Calculate when to leave for TUL →/,
  "homepage announcement must keep the approved Tulsa copy",
);
assert.match(
  announcement,
  /\/airport-time-to-leave\/tulsa-tul\?utm_source=ontimer_home&utm_medium=site_banner&utm_campaign=tulsa_tv_interview_2026&utm_content=tul_airport_calculator/,
  "homepage announcement must keep its exact campaign-attributed TUL calculator URL",
);
assert.match(announcement, /2026-11-16T05:00:00Z/, "Tulsa announcement must start at midnight Eastern on November 16");
assert.match(announcement, /2026-11-21T05:00:00Z/, "Tulsa announcement must expire exactly five days later");
const [, announcementStart] = announcement.match(/TULSA_ANNOUNCEMENT_START_MS = Date\.parse\("([^"]+)"\)/) ?? [];
const [, announcementEnd] = announcement.match(/TULSA_ANNOUNCEMENT_END_MS = Date\.parse\("([^"]+)"\)/) ?? [];
assert.equal(Date.parse(announcementEnd) - Date.parse(announcementStart), 5 * 24 * 60 * 60 * 1000, "Tulsa announcement window must be exactly five 24-hour days");
assert.match(announcement, /now >= TULSA_ANNOUNCEMENT_START_MS && now < TULSA_ANNOUNCEMENT_END_MS/, "Tulsa announcement must enforce both campaign boundaries");
assert.ok(
  homepage.indexOf("<TulsaAnnouncementBar />") < homepage.indexOf('className="hp2-hero"'),
  "active Tulsa announcement must render before the hero",
);
assert.match(homepage, /isTulsaAnnouncementActive\(\) \? <TulsaAnnouncementBar \/> : null/, "homepage must hide the banner outside its five-day window");
assert.match(homepage, /export const revalidate = 300/, "the homepage component must recheck the server-rendered banner window at least every five minutes");
assert.match(homepageRoute, /export const revalidate = 300/, "the canonical homepage route must opt into five-minute revalidation");
assert.doesNotMatch(homepage, /KTVUAnnouncementBar/, "the retired KTVU announcement must not return to the homepage");
assert.doesNotMatch(
  announcementStyles,
  /position:\s*(?:sticky|fixed)/,
  "homepage announcement must remain in normal document flow",
);

assert.match(
  pressPage,
  /alternates:\s*\{\s*canonical:\s*"https:\/\/www\.ontimer\.app\/press"\s*\}/,
  "press page must keep a self-referencing canonical URL",
);
assert.match(pressPage, /robots:\s*\{[\s\S]*?index:\s*true,[\s\S]*?follow:\s*true/, "press page must remain indexable");
assert.match(pressPage, /https:\/\/www\.ktvu\.com\/video\/fmc-c62rzvs90bao7eq2/, "press page must link to the original KTVU story");
assert.match(pressPage, /Interested in doing a story\?/, "press page must retain the media-inquiry prompt");
assert.match(pressPage, /mailto:support@ontimer\.app/, "press page must link media inquiries to OnTimer support");
assert.match(pressPage, /"@type": "VideoObject"/, "press page must identify the source-backed video in structured data");
assert.match(
  pressPage,
  /contentUrl:\s*ktvuContentUrl/,
  "press page VideoObject must expose the publisher-supplied video file URL",
);
assert.match(sitemap, /url: `\$\{baseUrl\}\/press`/, "press page must remain in the XML sitemap");
assert.match(footer, /\["Press", "\/press"\]/, "the shared English footer must link to the press page");

console.log("Critical public-route regression passed (Tulsa campaign window and KTVU archive checks).");
