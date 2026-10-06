import assert from "node:assert/strict";
import {
  CALCULATOR_CTA_EXPERIMENT_ID,
  calculatorCtaVariantForBucket,
  isCalculatorExperimentPath,
} from "../calculator-cta-experiment";

assert.equal(CALCULATOR_CTA_EXPERIMENT_ID, "calculator_app_primary_v1");
assert.equal(calculatorCtaVariantForBucket(0), "control");
assert.equal(calculatorCtaVariantForBucket(0.499999), "control");
assert.equal(calculatorCtaVariantForBucket(0.5), "app_primary");
assert.equal(calculatorCtaVariantForBucket(0.999999), "app_primary");

for (const path of [
  "/what-time-should-i-leave",
  "/airport-time-to-leave-calculator",
  "/airport-time-to-leave/newark-ewr",
  "/wake-up-time-calculator",
  "/cruise-time-to-leave",
  "/days-until/christmas",
  "/events/yankees/when-to-leave",
]) {
  assert.equal(isCalculatorExperimentPath(path), true, `${path} should participate`);
}

assert.equal(isCalculatorExperimentPath("/"), false);
assert.equal(isCalculatorExperimentPath("/best-calendar-alarm-app"), false);

console.log("calculator CTA experiment tests passed");
