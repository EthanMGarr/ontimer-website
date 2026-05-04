'use client';

import { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CalculatorState, CalculatorAction, PlanType } from '../types/calculator';
import type { CalcResults } from '../types/calculator';
import { calculateResults, getPriceTier } from '../hooks/useCalculator';
import { SOSA_CATEGORY_DATA } from '../data/sosa2026';
import HeroNumber from './HeroNumber';

interface ResultsPanelProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  results: CalcResults; // driven by custom (slider) rate
}

const PLAN_LABELS: Record<PlanType, string> = {
  monthly: 'Monthly', annual: 'Annual', weekly: 'Weekly', quarterly: 'Quarterly',
};
const PLAN_LABELS_LOWER: Record<PlanType, string> = {
  monthly: 'monthly', annual: 'annual', weekly: 'weekly', quarterly: 'quarterly',
};
const PLAN_ORDER: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

function fmt(n: number) { return Math.round(n).toLocaleString(); }
function fmtUSD(n: number) { return '$' + Math.round(n).toLocaleString(); }
function fmtPct(n: number) { return (n * 100).toFixed(1) + '%'; }
function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ── Rate summary block (Change 2) ─────────────────────────────────────────────

function RateSummary({ results }: { results: CalcResults }) {
  const current = results.currentBlendedRate;
  const adj     = results.adjustedBenchmark;

  return (
    <div style={{
      marginBottom: 32,
      padding: '16px 20px',
      background: 'rgba(173,230,237,0.25)',
      borderLeft: '3px solid #3A39FF',
    }}>
      {current !== null && (
        <div style={{ marginBottom: 8, fontSize: 14, color: '#1A1A2E' }}>
          <strong>Your current blended reactivation rate:</strong>{' '}
          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1A1A2E' }}>
            {(current * 100).toFixed(1)}%
          </span>
        </div>
      )}
      <div style={{ fontSize: 14, color: '#1A1A2E' }}>
        <strong>Category + price tier adjusted benchmark:</strong>{' '}
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1A1A2E' }}>
          {adj !== null ? (adj * 100).toFixed(1) + '%' : '—'}
        </span>
      </div>
      {current === null && (
        <div style={{ marginTop: 8, fontSize: 12, fontStyle: 'italic', color: '#666' }}>
          Enter avg reactivated / month in Section 2 to calculate your current rate.
        </div>
      )}
    </div>
  );
}

// ── Scenario card ─────────────────────────────────────────────────────────────

function ScenarioCard({
  label, rate, state, highlight, note,
}: {
  label: string;
  rate: number;
  state: CalculatorState;
  highlight: boolean;
  note?: string;
}) {
  const r = calculateResults({ ...state, campaignTargetRate: rate });
  const alreadyAbove = r.totalAdditionalReactivations === 0;

  return (
    <div style={{
      background: highlight ? '#1A1A2E' : '#f8f9fb',
      border: `2px solid ${highlight ? '#3A39FF' : '#e5e7eb'}`,
      padding: '24px 20px',
      boxShadow: highlight ? '0 4px 16px rgba(58,57,255,0.18)' : 'none',
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: highlight ? '#ADE6ED' : '#888', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 13, color: highlight ? '#ADE6ED' : '#666', marginBottom: note ? 6 : 16 }}>
        {(rate * 100).toFixed(1)}% target
      </div>
      {note && (
        <div style={{ fontSize: 11, color: highlight ? '#ADE6ED' : '#999', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.4 }}>
          {note}
        </div>
      )}
      {alreadyAbove ? (
        <div style={{ fontSize: 12, color: highlight ? '#ADE6ED' : '#888', fontStyle: 'italic', lineHeight: 1.5, paddingTop: 4 }}>
          You&apos;re already at or above this benchmark
        </div>
      ) : (
        <>
          <div style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 700, color: highlight ? '#FF5B23' : '#3A39FF', lineHeight: 1, marginBottom: 6 }}>
            +{fmt(r.totalAdditionalReactivations)}
          </div>
          <div style={{ fontSize: 12, color: highlight ? '#ADE6ED' : '#888', marginBottom: 16 }}>subs / year</div>
          <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: highlight ? '#FF5B23' : '#1A1A2E', lineHeight: 1, marginBottom: 4 }}>
            +{fmtUSD(r.totalAdditionalRevenue)}
          </div>
          <div style={{ fontSize: 12, color: highlight ? '#ADE6ED' : '#888' }}>additional revenue</div>
        </>
      )}
    </div>
  );
}

// ── Four scenario cards (no slider inside — Change 6) ─────────────────────────

function ScenarioCards({ state, results, customRate }: {
  state: CalculatorState;
  results: CalcResults;
  customRate: number;
}) {
  const adj = results.adjustedBenchmark;
  if (adj === null) return null;

  const conservativeRate = adj * 0.80;
  const realisticRate    = adj;
  const optimisticRate   = adj * 1.20;
  const sliderMax        = Math.min(adj * 2, 0.75);
  const clampedRate      = Math.min(customRate, sliderMax);
  const customAlreadyAbove = results.totalAdditionalReactivations === 0;

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        <ScenarioCard label="Conservative" rate={conservativeRate} state={state} highlight={false} />
        <ScenarioCard label="Realistic"    rate={realisticRate}    state={state} highlight={true} />
        <ScenarioCard
          label="Optimistic"
          rate={optimisticRate}
          state={state}
          highlight={false}
          note="Based on 20% above category benchmark"
        />

        {/* Custom card — display only, slider is standalone below (Change 6) */}
        <div style={{ background: '#f0f0ff', border: '2px solid #3A39FF', padding: '24px 20px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#3A39FF', marginBottom: 4 }}>
            Custom
          </div>
          <div style={{ fontSize: 13, color: '#3A39FF', marginBottom: 16 }}>
            {(clampedRate * 100).toFixed(1)}% target
          </div>
          {customAlreadyAbove ? (
            <div style={{ fontSize: 12, color: '#888', fontStyle: 'italic', lineHeight: 1.5, paddingTop: 4 }}>
              You&apos;re already at or above this rate
            </div>
          ) : (
            <>
              <div style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 700, color: '#3A39FF', lineHeight: 1, marginBottom: 6 }}>
                +<HeroNumber value={results.totalAdditionalReactivations} format="integer" />
              </div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>subs / year</div>
              <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#1A1A2E', lineHeight: 1, marginBottom: 4 }}>
                +<HeroNumber value={results.totalAdditionalRevenue} format="currency" />
              </div>
              <div style={{ fontSize: 12, color: '#666' }}>additional revenue</div>
            </>
          )}
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#888', marginTop: 12, fontStyle: 'italic' }}>
        * Optimistic is 20% above your category-adjusted benchmark. Use as an upper-bound estimate only.
      </p>
    </div>
  );
}

// ── Standalone custom slider (Change 6) ───────────────────────────────────────

function CustomSlider({ customRate, sliderMax, optimisticRate, onSliderChange }: {
  customRate: number;
  sliderMax: number;
  optimisticRate: number;
  onSliderChange: (rate: number) => void;
}) {
  const clampedRate = Math.min(customRate, sliderMax);
  const aboveOptimistic = clampedRate > optimisticRate;

  return (
    <div style={{ margin: '24px 0 40px', padding: '20px 24px', background: '#f8f9fb', border: '1px solid #e5e7eb' }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A2E', marginBottom: 12 }}>
        Custom target rate:{' '}
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#FF5B23' }}>
          {(clampedRate * 100).toFixed(1)}%
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={Math.round(sliderMax * 100)}
        step={1}
        value={Math.max(1, Math.round(clampedRate * 100))}
        onChange={(e) => onSliderChange(parseInt(e.target.value) / 100)}
        style={{ width: '100%', accentColor: '#FF5B23', cursor: 'pointer', marginBottom: 4 }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#999', marginBottom: aboveOptimistic ? 10 : 0 }}>
        <span>0%</span>
        <span>{(optimisticRate * 100).toFixed(1)}% optimistic</span>
        <span>{(sliderMax * 100).toFixed(0)}%</span>
      </div>
      {aboveOptimistic && (
        <div style={{ padding: '8px 12px', background: '#fffbeb', border: '1px solid #fcd34d', fontSize: 13, color: '#92400e', lineHeight: 1.5 }}>
          ⚠ Above the optimistic scenario rate — treat as hypothetical
        </div>
      )}
    </div>
  );
}

// ── Methodology summary (Change 3) ───────────────────────────────────────────

function MethodologyBox({ state, results }: { state: CalculatorState; results: CalcResults }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const catData = SOSA_CATEGORY_DATA[state.category] ?? SOSA_CATEGORY_DATA['All Categories'];

  // Active plans (price > 0 AND active subscribers > 0)
  const activePlans = PLAN_ORDER.filter(
    (p) => (state.prices[p] ?? 0) > 0 && state.activeSubscribers[p] > 0
  );
  const totalSubs = activePlans.reduce((s, p) => s + state.activeSubscribers[p], 0);

  // Subscription mix string: "80% monthly / 20% annual"
  const mixStr = totalSubs > 0
    ? activePlans.map((p) => `${Math.round((state.activeSubscribers[p] / totalSubs) * 100)}% ${PLAN_LABELS_LOWER[p]}`).join(' / ')
    : '—';

  // Price tier string: "Mid monthly / High annual"
  const tierStr = activePlans.map((p) => {
    const price = state.prices[p];
    const tier = price ? getPriceTier(p, price) : '—';
    return `${capitalize(tier)} ${PLAN_LABELS_LOWER[p]}`;
  }).join(' / ');

  // Plans with full data (for current rate explanation)
  const plansWithFullData = PLAN_ORDER.filter(
    (p) => (state.avgChurnedPerMonth[p] ?? 0) > 0 && (state.avgReactivatedPerMonth[p] ?? 0) > 0 && (state.prices[p] ?? 0) > 0
  );
  const totalReactivated = plansWithFullData.reduce((s, p) => s + (state.avgReactivatedPerMonth[p] ?? 0), 0);
  const totalChurned     = plansWithFullData.reduce((s, p) => s + (state.avgChurnedPerMonth[p] ?? 0), 0);

  // SOSA category rates for active plans
  const sosaRatesStr = activePlans.map((p) => {
    const rate = p === 'quarterly' ? catData.monthly : catData[p as keyof typeof catData];
    return `${PLAN_LABELS_LOWER[p]} ${((rate as number) * 100).toFixed(1)}%`;
  }).join(' / ');

  // Benchmark values
  const adj     = results.adjustedBenchmark;
  const bCat    = results.blendedCategoryBenchmark;
  const bTier   = results.blendedPriceTierMultiplier;
  const current = results.currentBlendedRate;

  const conservativeRate = adj !== null ? adj * 0.80 : null;
  const realisticRate    = adj;
  const optimisticRate   = adj !== null ? adj * 1.20 : null;

  const baselineRate   = current ?? adj;
  const baselineSrc    = current !== null ? 'your current blended rate' : 'the SOSA 2026 adjusted benchmark';
  const baselineStr    = baselineRate !== null ? (baselineRate * 100).toFixed(1) + '%' : '—';

  const paragraph = `Reactivation Opportunity Estimate — Methodology Note

This estimate was calculated using the Reactivation Revenue Opportunity Calculator, based on RevenueCat's State of Subscription Apps 2026 (115,000+ apps, $16B in revenue).

Inputs used:
- App category: ${state.category || '(not set)'}
- Subscription mix: ${mixStr}
- Price tier: ${tierStr}
- Current blended reactivation rate: ${current !== null
    ? `${(current * 100).toFixed(1)}% — calculated from your data (${totalReactivated}/month ÷ ${totalChurned}/month, weighted by subscription mix)`
    : 'not entered — scenarios use SOSA 2026 benchmarks only'}
- Churned subscribers modelled: ${fmt(results.totalChurnedPool)} over 12 months

How the benchmark was calculated:
The SOSA 2026 reactivation benchmark for ${state.category || 'this category'} is: ${sosaRatesStr}
Weighted by your subscription mix, the blended category benchmark is ${bCat !== null ? (bCat * 100).toFixed(2) + '%' : '—'}.
A price tier adjustment of ${bTier !== null ? bTier.toFixed(4) : '—'}× was applied based on your pricing profile, giving an adjusted benchmark of ${adj !== null ? (adj * 100).toFixed(2) + '%' : '—'}.

How the scenarios were calculated:
- Conservative (${conservativeRate !== null ? (conservativeRate * 100).toFixed(1) + '%' : '—'}): adjusted benchmark × 0.80
- Realistic (${realisticRate !== null ? (realisticRate * 100).toFixed(1) + '%' : '—'}): adjusted benchmark — the SOSA 2026 rate for apps with your category and pricing profile
- Optimistic (${optimisticRate !== null ? (optimisticRate * 100).toFixed(1) + '%' : '—'}): adjusted benchmark × 1.20

The additional opportunity in each scenario represents the gap between ${baselineStr} (${baselineSrc}) and the scenario target rate, applied to a churned pool of ${fmt(results.totalChurnedPool)} subscribers.
Revenue is estimated using average hold periods post-reactivation: monthly ~4 months · annual ~12 months · weekly ~2 months · quarterly ~3 months

Important: This is an estimate. The SOSA 2026 benchmark reflects actual reactivation rates across apps in your category — some of which run active win-back campaigns and some of which do not. Actual results will vary based on campaign quality, timing, segmentation, and product improvements.`;

  function handleCopy() {
    navigator.clipboard.writeText(paragraph).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ marginTop: 48, borderTop: '1px solid #e5e7eb', paddingTop: 32 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>
          {open ? '▾' : '▸'} Share this estimate
        </span>
        <span style={{ fontSize: 13, color: '#888' }}>— copy a methodology summary for stakeholders</span>
      </button>

      {open && (
        <div style={{ marginTop: 20 }}>
          <textarea
            readOnly
            value={paragraph}
            rows={24}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: 12,
              lineHeight: 1.7,
              color: '#1A1A2E',
              background: '#f8f9fb',
              border: '1px solid #e5e7eb',
              borderRadius: 0,
              resize: 'vertical',
            }}
          />
          <button
            onClick={handleCopy}
            style={{
              marginTop: 12,
              padding: '10px 24px',
              background: copied ? '#16a34a' : '#1A1A2E',
              color: '#fff',
              border: 'none',
              borderRadius: 0,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {copied ? '✓ Copied!' : 'Copy to clipboard'}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

export default function ResultsPanel({ state, dispatch, results }: ResultsPanelProps) {
  const { prices, campaignTargetRate } = state;
  const activePlans = PLAN_ORDER.filter((p) => prices[p] !== null && (prices[p] as number) > 0);

  // Reset custom rate to adjustedBenchmark when benchmark changes (unless user has moved slider)
  const userHasAdjustedSliderRef = useRef(false);
  const prevBenchmarkRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      results.adjustedBenchmark !== null &&
      results.adjustedBenchmark !== prevBenchmarkRef.current
    ) {
      prevBenchmarkRef.current = results.adjustedBenchmark;
      if (!userHasAdjustedSliderRef.current) {
        dispatch({ type: 'SET_CAMPAIGN_TARGET', payload: results.adjustedBenchmark });
      }
    }
  }, [results.adjustedBenchmark, dispatch]);

  function handleSliderChange(rate: number) {
    userHasAdjustedSliderRef.current = true;
    dispatch({ type: 'SET_CAMPAIGN_TARGET', payload: rate });
  }

  const adj          = results.adjustedBenchmark;
  const sliderMax    = adj !== null ? Math.min(adj * 2, 0.75) : 0.75;
  const optimisticRate = adj !== null ? adj * 1.20 : 0.5;
  const clampedRate  = Math.min(campaignTargetRate, sliderMax);

  const chartData = activePlans.map((plan) => ({
    name: PLAN_LABELS[plan],
    organic: Math.round(results.organicRevenue[plan]),
    campaign: Math.round(results.additionalRevenue[plan]),
  }));

  return (
    <div>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#3A39FF', marginBottom: 8 }}>
        Your reactivation opportunity
      </h2>
      <div style={{ width: 48, height: 3, background: '#FF5B23', marginBottom: 32 }} />

      {/* Change 2 — rate summary */}
      <RateSummary results={results} />

      {/* Scenario cards (no slider inside) */}
      <ScenarioCards
        state={state}
        results={results}
        customRate={clampedRate}
      />

      {/* Change 6 — standalone custom slider */}
      {adj !== null && (
        <CustomSlider
          customRate={clampedRate}
          sliderMax={sliderMax}
          optimisticRate={optimisticRate}
          onSliderChange={handleSliderChange}
        />
      )}

      {/* Breakdown table */}
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>
        Breakdown — Custom scenario ({(clampedRate * 100).toFixed(1)}%)
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f8f9fb' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700, color: '#1A1A2E', borderBottom: '2px solid #e5e7eb' }} />
              {activePlans.map((p) => (
                <th key={p} style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, color: '#3A39FF', borderBottom: '2px solid #e5e7eb' }}>
                  {PLAN_LABELS[p]}
                </th>
              ))}
              <th style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, color: '#1A1A2E', borderBottom: '2px solid #e5e7eb' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {([
              { key: 'churnedPool',              label: 'Churned pool (12m)',                  fmt: 'int', bold: false },
              { key: 'effectiveRate',             label: 'Effective reactivation rate',          fmt: 'pct', bold: false },
              { key: 'organicReactivations',      label: 'Organic reactivations',                fmt: 'int', bold: false },
              { key: 'organicRevenue',            label: 'Organic revenue recovered',            fmt: 'usd', bold: false },
              { key: 'additionalReactivations',   label: 'Additional reactivations (campaign)',  fmt: 'int', bold: true  },
              { key: 'additionalRevenue',         label: 'Additional revenue (campaign)',         fmt: 'usd', bold: true  },
            ] as const).map(({ key, label, fmt: f, bold }, i) => {
              const totals: Record<string, number> = {
                churnedPool: results.totalChurnedPool,
                effectiveRate: 0,
                organicReactivations: results.totalOrganicReactivations,
                organicRevenue: results.totalOrganicRevenue,
                additionalReactivations: results.totalAdditionalReactivations,
                additionalRevenue: results.totalAdditionalRevenue,
              };
              const vals = results[key] as Record<PlanType, number>;
              return (
                <tr key={key} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: bold ? 700 : 400, color: bold ? '#1A1A2E' : '#444' }}>{label}</td>
                  {activePlans.map((p) => {
                    const v = vals[p] ?? 0;
                    const display = f === 'int' ? fmt(Math.round(v)) : f === 'usd' ? fmtUSD(v) : fmtPct(v);
                    return (
                      <td key={p} style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'monospace', fontWeight: bold ? 700 : 400, color: bold ? '#FF5B23' : '#1A1A2E' }}>
                        {display}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'monospace', fontWeight: bold ? 700 : 600, color: bold ? '#FF5B23' : '#1A1A2E' }}>
                    {f === 'pct' ? '—' : f === 'int' ? fmt(Math.round(totals[key])) : fmtUSD(totals[key])}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 20 }}>
            Revenue recovery by plan type
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 4, right: 20, left: 20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#444', fontSize: 13 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#444', fontSize: 12 }} />
              <Tooltip formatter={(v) => fmtUSD(Number(v ?? 0))} />
              <Legend />
              <Bar dataKey="organic"  name="Already recovering (baseline)" fill="#b0bec5" radius={[2,2,0,0]} />
              <Bar dataKey="campaign" name="Additional with campaigns"     fill="#FF5B23" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 0 }}>
        Based on RevenueCat State of Subscription Apps 2026 (115,000+ apps, $16B revenue).
        Revenue assumes monthly ~4 months avg hold post-reactivation, annual full price, weekly ~2 months, quarterly ~3 months.
        SOSA rates reflect all apps in each category regardless of whether they ran active win-back campaigns.
      </p>

      {/* Change 3 — methodology */}
      <MethodologyBox state={state} results={results} />
    </div>
  );
}
