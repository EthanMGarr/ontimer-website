import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ktvuPagePath = path.join(root, "src", "app", "KTVU", "page.tsx");
const ktvuActionsPath = path.join(root, "src", "app", "KTVU", "KTVUActions.tsx");
const ktvuStylesPath = path.join(root, "src", "app", "KTVU", "ktvu.css");
const homepagePath = path.join(root, "src", "app", "homepage2", "page.tsx");
const announcementPath = path.join(root, "src", "components", "KTVUAnnouncementBar.tsx");
const announcementStylesPath = path.join(root, "src", "components", "KTVUAnnouncementBar.module.css");
const middlewarePath = path.join(root, "src", "middleware.ts");

for (const requiredPath of [
  ktvuPagePath,
  ktvuActionsPath,
  ktvuStylesPath,
  homepagePath,
  announcementPath,
  announcementStylesPath,
]) {
  assert.ok(existsSync(requiredPath), `critical KTVU route asset is missing: ${requiredPath}`);
}

const page = readFileSync(ktvuPagePath, "utf8");
const actions = readFileSync(ktvuActionsPath, "utf8");
const styles = readFileSync(ktvuStylesPath, "utf8");
const homepage = readFileSync(homepagePath, "utf8");
const announcement = readFileSync(announcementPath, "utf8");
const announcementStyles = readFileSync(announcementStylesPath, "utf8");
const middleware = readFileSync(middlewarePath, "utf8");

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
  /Watching KTVU\? Calculate when to leave for SFO, OAK or SJC →/,
  "homepage announcement must keep the approved KTVU copy",
);
assert.match(
  announcement,
  /https:\/\/www\.ontimer\.app\/KTVU\?utm_source=ontimer_home&utm_medium=site_banner&utm_campaign=ktvu_interview/,
  "homepage announcement must keep its exact campaign URL",
);
assert.ok(
  homepage.indexOf("<KTVUAnnouncementBar />") < homepage.indexOf('className="hp2-hero"'),
  "homepage announcement must render before the hero",
);
assert.doesNotMatch(
  announcementStyles,
  /position:\s*(?:sticky|fixed)/,
  "homepage announcement must remain in normal document flow",
);

console.log("Critical campaign route regression passed (17 checks).");
