import assert from "node:assert/strict";
import {
  analyticsAllowedForState,
  consentRequiredForCountry,
} from "../consent-policy";

assert.equal(consentRequiredForCountry("DE"), true);
assert.equal(consentRequiredForCountry("gb"), true);
assert.equal(consentRequiredForCountry("CH"), true);
assert.equal(consentRequiredForCountry("US"), false);
assert.equal(consentRequiredForCountry("MX"), false);

assert.equal(analyticsAllowedForState({ pathname: "/", region: "other", consent: null }), true);
assert.equal(analyticsAllowedForState({ pathname: "/", region: "regulated", consent: null }), false);
assert.equal(analyticsAllowedForState({ pathname: "/", region: "regulated", consent: "denied" }), false);
assert.equal(analyticsAllowedForState({ pathname: "/", region: "regulated", consent: "granted" }), true);
assert.equal(analyticsAllowedForState({ pathname: "/medication-schedule", region: "other", consent: "granted" }), false);
assert.equal(analyticsAllowedForState({ pathname: "/caregiver-medication-schedule", region: "regulated", consent: "granted" }), false);

console.log("Consent policy tests passed.");
