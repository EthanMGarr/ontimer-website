#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function requireText(source, expected, description) {
  if (!source.includes(expected)) {
    throw new Error(`PostHog release guard failed: ${description}`);
  }
}

const packageJson = JSON.parse(read("package.json"));
const postHog = read("src/lib/posthog.ts");
const analytics = read("src/lib/analytics.ts");
const pageViews = read("src/components/GoogleAnalytics.tsx");
const medicationPrivacy = read("src/lib/medication-route-privacy.ts");
const privacyPolicy = read("public/OnTimer_Privacy_Policy.html");
const terms = read("public/OnTimer_Terms_of_Service.html");
const deployWorkflow = read("scripts/vercel-local.mjs");

if (!packageJson.dependencies?.["posthog-js"]) {
  throw new Error("PostHog release guard failed: posthog-js dependency is missing");
}

requireText(postHog, "posthog.init", "SDK initialization is missing");
requireText(postHog, "autocapture: false", "autocapture must remain disabled");
requireText(postHog, "disable_session_recording: true", "session replay must remain disabled");
requireText(postHog, "person_profiles: \"identified_only\"", "anonymous person profiles must remain disabled");
requireText(postHog, "isAnalyticsAllowed()", "the consent gate is missing");
requireText(postHog, "isAnalyticsFreeMedicationPath", "medication-route exclusion is missing");
requireText(analytics, "capturePostHogEvent(eventName, enrichedParams)", "conversion events are not sent to PostHog");
requireText(pageViews, "capturePostHogPageView(pageProperties)", "pageviews are not sent to PostHog");
requireText(medicationPrivacy, "/medication-schedule", "the medication privacy boundary is missing");
requireText(privacyPolicy, "PostHog", "the Privacy Policy does not disclose PostHog");
requireText(terms, "PostHog", "the Terms do not name PostHog as a third-party service");
requireText(deployWorkflow, "test:posthog-release", "production deploys do not run this guard");

console.log("PostHog production release guard passed.");
