export type PlanType = 'monthly' | 'annual' | 'weekly' | 'quarterly';

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'manual' | 'error';

export interface PlanValues<T> {
  monthly: T;
  annual: T;
  weekly: T;
  quarterly: T;
}

export interface CalculatorState {
  // Section 1: Connection
  apiKey: string;
  projectId: string | null;
  availableProjects: Array<{ id: string; name: string }>;
  connectionStatus: ConnectionStatus;
  connectionError: string;
  apiPulledFields: string[];

  // Section 2: App setup
  category: string;
  prices: PlanValues<number | null>;
  geoMix: Record<string, number>;

  // Section 3: Numbers
  activeSubscribers: PlanValues<number>;
  monthlyChurnRate: PlanValues<number>;
  actualReactivationRate: PlanValues<number | null>;

  // Section 4: Results config
  campaignTargetRate: number;

  // UI
  activeSection: 1 | 2 | 3 | 4;
}

export type CalculatorAction =
  | { type: 'SET_API_KEY'; payload: string }
  | { type: 'SET_CONNECTION_STATUS'; payload: ConnectionStatus }
  | { type: 'SET_CONNECTION_ERROR'; payload: string }
  | { type: 'SET_PROJECTS'; payload: Array<{ id: string; name: string }> }
  | { type: 'SET_PROJECT_ID'; payload: string }
  | { type: 'SET_API_PULLED_FIELDS'; payload: string[] }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_PRICE'; payload: { plan: PlanType; value: number | null } }
  | { type: 'SET_GEO_MIX'; payload: Record<string, number> }
  | { type: 'SET_GEO_REGION'; payload: { region: string; value: number } }
  | { type: 'SET_ACTIVE_SUBSCRIBERS'; payload: Partial<PlanValues<number>> }
  | { type: 'SET_MONTHLY_CHURN'; payload: Partial<PlanValues<number>> }
  | { type: 'SET_ACTUAL_REACTIVATION'; payload: Partial<PlanValues<number | null>> }
  | { type: 'SET_CAMPAIGN_TARGET'; payload: number }
  | { type: 'SET_ACTIVE_SECTION'; payload: 1 | 2 | 3 | 4 }
  | { type: 'PREFILL_FROM_API'; payload: Partial<CalculatorState> };

export interface CalcResults {
  // Per plan
  churnedPool: PlanValues<number>;
  organicReactivations: PlanValues<number>;
  organicRevenue: PlanValues<number>;
  additionalReactivations: PlanValues<number>;
  additionalRevenue: PlanValues<number>;
  benchmarkRate: PlanValues<number>;
  effectiveRate: PlanValues<number>;

  // Totals
  totalChurnedPool: number;
  totalOrganicReactivations: number;
  totalOrganicRevenue: number;
  totalAdditionalReactivations: number;
  totalAdditionalRevenue: number;
  totalRecoverable: number;
}
