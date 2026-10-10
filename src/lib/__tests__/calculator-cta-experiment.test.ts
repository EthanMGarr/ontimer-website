import assert from "node:assert/strict";
import {
  CALCULATOR_CTA_EXPERIMENT_ID,
  getCalculatorCtaEligibility,
  isCalculatorExperimentPath,
} from "../calculator-cta-experiment";

assert.equal(CALCULATOR_CTA_EXPERIMENT_ID, "calculator_app_primary_v1");

for (const path of [
  "/what-time-should-i-leave",
  "/airport-time-to-leave-calculator",
  "/airport-time-to-leave/newark-ewr",
  "/airport-pickup/newark-ewr",
  "/wake-up-time-calculator",
  "/cruise-time-to-leave",
  "/days-until/christmas",
  "/events/yankees/when-to-leave",
  "/es/aeropuerto/madrid-barajas-mad",
  "/es/calculadora-a-que-hora-salir",
  "/es/calculadora-cuando-salir-al-aeropuerto",
  "/es/calculadora-hora-de-despertar",
]) {
  assert.equal(isCalculatorExperimentPath(path), true, `${path} should participate`);
}

assert.equal(isCalculatorExperimentPath("/"), false);
assert.equal(isCalculatorExperimentPath("/best-calendar-alarm-app"), false);

const originalWindow = globalThis.window;
Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: {
    location: { pathname: "/airport-time-to-leave/newark-ewr", search: "" },
    navigator: { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X)" },
  },
});
assert.equal(getCalculatorCtaEligibility(), "eligible_non_android");

Object.defineProperty(globalThis.window, "navigator", {
  configurable: true,
  value: { userAgent: "Mozilla/5.0 (Linux; Android 15; Pixel 9) Mobile" },
});
assert.equal(getCalculatorCtaEligibility(), "android_excluded");

Object.defineProperty(globalThis.window, "location", {
  configurable: true,
  value: { pathname: "/", search: "" },
});
assert.equal(getCalculatorCtaEligibility(), null);

if (originalWindow === undefined) {
  Reflect.deleteProperty(globalThis, "window");
} else {
  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
}

console.log("calculator CTA experiment tests passed");
