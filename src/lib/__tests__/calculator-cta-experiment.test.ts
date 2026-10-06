import assert from "node:assert/strict";
import {
  CALCULATOR_CTA_EXPERIMENT_ID,
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

console.log("calculator CTA experiment tests passed");
