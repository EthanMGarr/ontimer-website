export const CALCULATOR_CTA_EXPERIMENT_ID = "calculator_app_primary_v1";

export type CalculatorCtaVariant = "control" | "app_primary";

export interface CalculatorCtaExperimentAssignment {
  experiment_id: typeof CALCULATOR_CTA_EXPERIMENT_ID;
  experiment_variant: CalculatorCtaVariant;
  assignment_method: "stable_local_storage" | "preview_override";
}

const ASSIGNMENT_KEY = `ontimer_experiment_${CALCULATOR_CTA_EXPERIMENT_ID}`;
const ASSIGNMENT_EVENT_KEY = `ontimer_experiment_assignment_sent_${CALCULATOR_CTA_EXPERIMENT_ID}`;
let fallbackAssignment: CalculatorCtaVariant | null = null;
let fallbackAssignmentEventSent = false;

export function isCalculatorExperimentPath(pathname: string): boolean {
  return pathname.includes("calculator")
    || pathname.includes("/what-time-should-i-leave")
    || pathname.includes("/days-until")
    || pathname.includes("/airport-time-to-leave/")
    || pathname.includes("/when-to-leave")
    || pathname.includes("/cruise-time-to-leave");
}

export function calculatorCtaVariantForBucket(bucket: number): CalculatorCtaVariant {
  return bucket < 0.5 ? "control" : "app_primary";
}

function isEligibleDevice(userAgent: string): boolean {
  return !/Android/i.test(userAgent);
}

function randomBucket(): number {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const value = new Uint32Array(1);
    crypto.getRandomValues(value);
    return value[0] / 0x1_0000_0000;
  }
  return Math.random();
}

/**
 * Return a stable 50/50 assignment for measurable, non-Android calculator traffic.
 * Visitors who have not allowed analytics stay on the control experience so the
 * treatment population always has observable assignment and outcome events.
 */
export function getCalculatorCtaExperimentAssignment(
  analyticsAllowed: boolean,
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
    !analyticsAllowed
    || typeof window === "undefined"
    || !isCalculatorExperimentPath(window.location.pathname)
    || !isEligibleDevice(window.navigator.userAgent)
  ) {
    return null;
  }

  let variant = fallbackAssignment;
  try {
    const stored = window.localStorage.getItem(ASSIGNMENT_KEY);
    if (stored === "control" || stored === "app_primary") variant = stored;
  } catch {
    // Privacy-restricted browsing still receives a stable in-memory assignment.
  }

  if (!variant) {
    variant = calculatorCtaVariantForBucket(randomBucket());
    fallbackAssignment = variant;
    try {
      window.localStorage.setItem(ASSIGNMENT_KEY, variant);
    } catch {
      // The in-memory value keeps the current page internally consistent.
    }
  }

  return {
    experiment_id: CALCULATOR_CTA_EXPERIMENT_ID,
    experiment_variant: variant,
    assignment_method: "stable_local_storage",
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
