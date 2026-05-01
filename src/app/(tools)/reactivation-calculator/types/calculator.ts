export type PlanType = 'monthly' | 'annual' | 'weekly' | 'quarterly';

export interface PlanValues<T> {
  monthly: T;
  annual: T;
  weekly: T;
  quarterly: T;
}

export interface CalculatorState {
  // Section 1: Your App
  category: string;
  prices: PlanValues<number | null>;

  // Section 2: Your Numbers
  activeSubscribers: PlanValues<number>;
  avgChurnedPerMonth: PlanValues<number>;
  avgReactivatedPerMonth: PlanValues<number>;

  // Section 3: Results config
  campaignTargetRate: number;

  // UI
  activeSection: 1 | 2 | 3;
}

export type CalculatorAction =
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_PRICE'; payload: { plan: PlanType; value: number | null } }
  | { type: 'SET_ACTIVE_SUBSCRIBERS'; payload: Partial<PlanValues<number>> }
  | { type: 'SET_AVG_CHURNED'; payload: Partial<PlanValues<number>> }
  | { type: 'SET_AVG_REACTIVATED'; payload: Partial<PlanValues<number>> }
  | { type: 'SET_CAMPAIGN_TARGET'; payload: number }
  | { type: 'SET_ACTIVE_SECTION'; payload: 1 | 2 | 3 };

export interface CalcResults {
  churnedPool: PlanValues<number>;
  organicReactivations: PlanValues<number>;
  organicRevenue: PlanValues<number>;
  additionalReactivations: PlanValues<number>;
  additionalRevenue: PlanValues<number>;
  benchmarkRate: PlanValues<number>;
  effectiveRate: PlanValues<number>;

  totalChurnedPool: number;
  totalOrganicReactivations: number;
  totalOrganicRevenue: number;
  totalAdditionalReactivations: number;
  totalAdditionalRevenue: number;
  totalRecoverable: number;
}
