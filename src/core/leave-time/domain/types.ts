export type DestinationTypeId = "airport" | "cruise-terminal" | "venue" | (string & {});

export type EventTypeId = string;

export type TimingRuleKey = string;

export type TransportationMode = "drive" | "walk" | "transit" | "rideshare" | "dropoff" | (string & {});

export type TravelSource = "google" | "manual";

export type PlanningMode = "today" | "future";

export type TrafficBasis = "live" | "predicted" | "scheduled" | "none";

export type PlanningConfidence = "comfortable" | "tight" | "risk";

export interface Destination {
  id: string;
  type: DestinationTypeId;
  slug?: string;
  name: string;
  shortName?: string;
  canonicalName?: string;
  routeBasePath?: string;
  aliases?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  popularity?: number;
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
  };
  supportedEventTypeIds?: EventTypeId[];
  localArrivalDefaults?: Record<string, number>;
  transportationSupport?: TransportationMode[];
  metadata?: Record<string, string | number | boolean | string[]>;
}

export interface EventType {
  id: EventTypeId;
  label: string;
  destinationType: DestinationTypeId;
}

export interface CalculationFactor {
  key: string;
  label: string;
  minutes: number;
  source?: TravelSource | "estimate" | "override" | "rule" | (string & {});
  ruleKey?: TimingRuleKey;
  priority?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface TimingRule<Context = unknown> {
  key: TimingRuleKey;
  label: string;
  priority: number;
  calculate: (context: Context) => CalculationFactor | null;
}

export interface PlanningRequest<Context = unknown> {
  destination: Destination;
  eventType: EventType;
  targetTime: Date;
  context: Context;
}

export interface PlanningResult {
  destination: Destination;
  eventType: EventType;
  targetTime: Date;
  arriveBy: Date;
  leaveAt: Date;
  travelMinutes: number;
  totalBufferMinutes: number;
  factors: CalculationFactor[];
  confidence: PlanningConfidence;
  metadata?: Record<string, string | number | boolean>;
}

export interface LeaveTimePlugin<Context = unknown> {
  id: DestinationTypeId;
  supportedEventTypes: EventType[];
  rules: TimingRule<Context>[];
  plan: (request: PlanningRequest<Context>) => PlanningResult | null;
}

export interface PlannerFieldDefinition {
  key: string;
  label: string;
  kind: "date" | "time" | "location" | "select" | "toggle" | "number" | "text";
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface TrustIndicatorDefinition {
  key: string;
  label: string;
}

export interface ResultSectionDefinition {
  key: string;
  label: string;
  factorKeys: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoMetadataDefinition {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

export interface InternalLinkDefinition {
  href: string;
  label: string;
}

export interface DestinationTypeDefinition<Profile = unknown> {
  id: DestinationTypeId;
  label: string;
  routeBasePath: string;
  parentPath: string;
  parentLabel: string;
  supportedEventTypes: EventType[];
  supportedTransportationModes: TransportationMode[];
  plannerFields: PlannerFieldDefinition[];
  validateDestination: (profile: unknown) => profile is Profile;
  buildDestination: (profile: Profile) => Destination;
  buildTrustIndicators: (profile: Profile) => TrustIndicatorDefinition[];
  buildResultSections: (profile: Profile) => ResultSectionDefinition[];
  buildFaqItems: (profile: Profile) => FaqItem[];
  buildSeoMetadata: (profile: Profile) => SeoMetadataDefinition;
  buildStructuredData: (profile: Profile) => Record<string, unknown>[];
  buildInternalLinks: (profile: Profile) => InternalLinkDefinition[];
  getDestinationPath: (profile: Profile) => string;
}
