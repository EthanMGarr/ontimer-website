import { ANALYTICS_FREE_MEDICATION_PATHS, isAnalyticsFreeMedicationPath, MEDICATION_ROUTE_PRIVACY_HEADERS } from "../medication-route-privacy";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const requiredPaths = [
  "/provider-medication-schedule",
  "/caregiver-medication-schedule",
  "/medication-schedule",
  "/how-to-remember-medication-on-time",
];

for (const path of requiredPaths) {
  assert(ANALYTICS_FREE_MEDICATION_PATHS.includes(path as never), `${path} must remain analytics-free`);
  assert(isAnalyticsFreeMedicationPath(path), `${path} must block analytics`);
  assert(isAnalyticsFreeMedicationPath(`${path}/nested`), `${path} descendants must block analytics`);
}

assert(!isAnalyticsFreeMedicationPath("/"), "the general marketing site should retain its normal analytics behavior");
assert(!MEDICATION_ROUTE_PRIVACY_HEADERS["Content-Security-Policy"].includes("https:"), "medication CSP must not allow third-party scripts or connections");
assert(MEDICATION_ROUTE_PRIVACY_HEADERS["Content-Security-Policy"].includes("script-src 'self'"), "medication CSP must limit scripts to OnTimer");
assert(MEDICATION_ROUTE_PRIVACY_HEADERS["Content-Security-Policy"].includes("connect-src 'self'"), "medication CSP must limit browser connections to OnTimer");
assert(MEDICATION_ROUTE_PRIVACY_HEADERS["Referrer-Policy"] === "no-referrer", "medication routes must not send referrers");
assert(MEDICATION_ROUTE_PRIVACY_HEADERS["Cache-Control"].includes("no-store"), "medication route responses must not be stored");

console.log("Medication route privacy tests passed.");
