export const SOSA_CATEGORIES = [
  'Education',
  'Media & Entertainment',
  'Utilities',
  'Productivity',
  'Social & Lifestyle',
  'Photo & Video',
  'Health & Fitness',
  'Gaming',
  'Business',
  'Shopping',
  'Travel',
] as const;

export type SOSACategory = (typeof SOSA_CATEGORIES)[number];

// SOSA 2026 reactivation benchmarks by category and plan type (as decimals)
export const SOSA_CATEGORY_DATA: Record<string, { monthly: number; annual: number; weekly: number }> = {
  'Education':             { monthly: 0.108, annual: 0.036, weekly: 0.091 },
  'Media & Entertainment': { monthly: 0.158, annual: 0.070, weekly: 0.118 },
  'Utilities':             { monthly: 0.105, annual: 0.051, weekly: 0.064 },
  'Productivity':          { monthly: 0.361, annual: 0.048, weekly: 0.102 },
  'Social & Lifestyle':    { monthly: 0.139, annual: 0.045, weekly: 0.102 },
  'Photo & Video':         { monthly: 0.202, annual: 0.084, weekly: 0.115 },
  'Health & Fitness':      { monthly: 0.124, annual: 0.048, weekly: 0.081 },
  'Gaming':                { monthly: 0.064, annual: 0.042, weekly: 0.077 },
  'Business':              { monthly: 0.103, annual: 0.064, weekly: 0.079 },
  'Shopping':              { monthly: 0.103, annual: 0.036, weekly: 0.157 },
  'Travel':                { monthly: 0.034, annual: 0.087, weekly: 0.094 },
  'All Categories':        { monthly: 0.201, annual: 0.052, weekly: 0.090 },
};

// SOSA 2026 price tier reactivation rates by plan type
export const SOSA_PRICE_TIERS = {
  monthly: { low: 0.154, mid: 0.124, high: 0.289 },
  annual:  { low: 0.058, mid: 0.056, high: 0.044 },
  weekly:  { low: 0.084, mid: 0.094, high: 0.087 },
  quarterly: { low: 0.154, mid: 0.124, high: 0.289 }, // use monthly as proxy
} as const;

// Price tier thresholds
export const PRICE_TIER_THRESHOLDS = {
  monthly:   { low: 7,  high: 13.50 },
  annual:    { low: 20, high: 58 },
  weekly:    { low: 4,  high: 8 },
  quarterly: { low: 20, high: 58 }, // annualise ×4 then use annual thresholds
} as const;

// SOSA 2026 regional reactivation benchmarks
export const SOSA_GEO_DATA: Record<string, { monthly: number; annual: number }> = {
  'Asia-Pacific':   { monthly: 0.239, annual: 0.051 },
  'IN / SEA':       { monthly: 0.212, annual: 0.055 },
  'Latin America':  { monthly: 0.197, annual: 0.049 },
  'MEA':            { monthly: 0.213, annual: 0.033 },
  'North America':  { monthly: 0.180, annual: 0.050 },
  'ROW':            { monthly: 0.228, annual: 0.059 },
  'Western Europe': { monthly: 0.217, annual: 0.054 },
};

export const GEO_REGIONS = Object.keys(SOSA_GEO_DATA);

// Default equal-split geo mix
export const DEFAULT_GEO_MIX: Record<string, number> = Object.fromEntries(
  GEO_REGIONS.map((r) => [r, parseFloat((1 / GEO_REGIONS.length).toFixed(4))])
);

// Hold period assumptions post-reactivation (in months, except annual = full price)
export const HOLD_PERIOD_MONTHS = {
  monthly: 4,
  annual: 1,   // multiplier is 1 — annual price used directly (full price, no hold multiplier)
  weekly: 2,
  quarterly: 3,
} as const;
