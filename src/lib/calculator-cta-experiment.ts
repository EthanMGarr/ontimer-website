export const CALCULATOR_CTA_EXPERIMENT_ID = "calculator_app_primary_v1";

export type CalculatorCtaVariant = "control" | "app_primary";

export interface CalculatorCtaExperimentAssignment {
  experiment_id: typeof CALCULATOR_CTA_EXPERIMENT_ID;
  experiment_variant: CalculatorCtaVariant;
  assignment_method: "full_rollout" | "preview_override";
}

const ASSIGNMENT_EVENT_KEY = `ontimer_experiment_assignment_sent_${CALCULATOR_CTA_EXPERIMENT_ID}`;
let fallbackAssignmentEventSent = false;

export function isCalculatorExperimentPath(pathname: string): boolean {
  return pathname.includes("calculator")
    || pathname.includes("/es/calculadora")
    || pathname.includes("/what-time-should-i-leave")
    || pathname.includes("/days-until")
    || pathname.includes("/airport-time-to-leave/")
    || pathname.includes("/airport-pickup/")
    || pathname.includes("/es/aeropuerto/")
    || pathname.includes("/when-to-leave")
    || pathname.includes("/cruise-time-to-leave");
}

function isEligibleDevice(userAgent: string): boolean {
  return !/Android/i.test(userAgent);
}

/**
 * Return the production rollout variant for non-Android calculator traffic.
 * Analytics consent controls measurement, not which user experience is shown.
 */
export function getCalculatorCtaExperimentAssignment(
  _analyticsAllowed: boolean,
): CalculatorCtaExperimentAssignment | null {
  if (
    process.env.NODE_ENV !== "production"
    && typeof window !== "undefined"
    && isCalculatorExperimentPath(window.location.pathname)
    && isEligibleDevice(window.navigator.userAgent)
  ) {
    const previewVariant = new URLSearchParams(window.location.search).get("calculatorCtaVariant");
    if (previewVariant === "control" || previewVariant === "app_primary") {
      return {
        experiment_id: CALCULATOR_CTA_EXPERIMENT_ID,
        experiment_variant: previewVariant,
        assignment_method: "preview_override",
      };
    }
  }

  if (
    typeof window === "undefined"
    || !isCalculatorExperimentPath(window.location.pathname)
    || !isEligibleDevice(window.navigator.userAgent)
  ) {
    return null;
  }

  return {
    experiment_id: CALCULATOR_CTA_EXPERIMENT_ID,
    experiment_variant: "app_primary",
    assignment_method: "full_rollout",
  };
}

/** Fire the assignment event once per browser tab session. */
export function shouldTrackCalculatorExperimentAssignment(): boolean {
  if (fallbackAssignmentEventSent) return false;
  try {
    if (window.sessionStorage.getItem(ASSIGNMENT_EVENT_KEY) === "1") return false;
    window.sessionStorage.setItem(ASSIGNMENT_EVENT_KEY, "1");
  } catch {
    // Fall back to the module-level guard when session storage is unavailable.
  }
  fallbackAssignmentEventSent = true;
  return true;
}
