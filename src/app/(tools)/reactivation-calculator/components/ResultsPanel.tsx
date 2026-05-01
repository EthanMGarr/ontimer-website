'use client';

import { useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CalculatorState, CalculatorAction, PlanType } from '../types/calculator';
import type { CalcResults } from '../types/calculator';
import { calculateResults } from '../hooks/useCalculator';
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
const PLAN_ORDER: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

function fmt(n: number) { return Math.round(n).toLocaleString(); }
function fmtUSD(n: number) { return '$' + Math.round(n).toLocaleString(); }
function fmtPct(n: number) { return (n * 100).toFixed(1) + '%'; }

const SCENARIOS = [
  { label: 'Conservative', rate: 0.25, highlight: false, asterisk: false },
  { label: 'Realistic',    rate: 0.35, highlight: true,  asterisk: false },
  { label: 'Optimistic',   rate: 0.50, highlight: false, asterisk: true  },
] as const;

function SliderWarning({ rate }: { rate: number }) {
  const pct = Math.round(rate * 100);
  if (pct <= 35) return null;
  if (pct <= 50) {
    return (
      <div style={{ marginTop: 10, padding: '10px 14px', background: '#fffbeb', border: '1px solid #fcd34d', fontSize: 13, color: '#92400e', lineHeight: 1.5 }}>
        ⚠ Above the 35% best-in-class benchmark — treat as an optimistic scenario.
      </div>
    );
  }
  return (
    <div style={{ marginTop: 10, padding: '10px 14px', background: '#fff7ed', border: '1px solid #fb923c', fontSize: 13, color: '#9a3412', lineHeight: 1.5 }}>
      ⚠ This rate is highly unlikely in practice. Use this for hypothetical modelling only — do not present this to stakeholders as a realistic target.
    </div>
  );
}

function ScenarioCards({ state, customResults, customRate, dispatch }: {
  state: CalculatorState;
  customResults: CalcResults;
  customRate: number;
  dispatch: React.Dispatch<CalculatorAction>;
}) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 0 }}>
        {SCENARIOS.map(({ label, rate, highlight, asterisk }) => {
          const r = calculateResults({ ...state, campaignTargetRate: rate });
          return (
            <div key={label} style={{
              background: highlight ? '#1A1A2E' : '#f8f9fb',
              border: highlight ? '2px solid #3A39FF' : '2px solid #e5e7eb',
              padding: '24px 20px',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: highlight ? '#ADE6ED' : '#888', marginBottom: 4 }}>
                {label}{asterisk && <span style={{ color: '#FB923C' }}> *</span>}
              </div>
              <div style={{ fontSize: 13, color: highlight ? '#ADE6ED' : '#666', marginBottom: 16 }}>
                {Math.round(rate * 100)}% target
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 700, color: highlight ? '#FF5B23' : '#3A39FF', lineHeight: 1, marginBottom: 6 }}>
                +{fmt(r.totalAdditionalReactivations)}
              </div>
              <div style={{ fontSize: 12, color: highlight ? '#ADE6ED' : '#888', marginBottom: 16 }}>subs / year</div>
              <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: highlight ? '#FF5B23' : '#1A1A2E', lineHeight: 1, marginBottom: 4 }}>
                +{fmtUSD(r.totalAdditionalRevenue)}
              </div>
              <div style={{ fontSize: 12, color: highlight ? '#ADE6ED' : '#888' }}>additional revenue</div>
            </div>
          );
        })}

        {/* Custom card */}
        <div style={{ background: '#f0f0ff', border: '2px solid #3A39FF', padding: '24px 20px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#3A39FF', marginBottom: 4 }}>
            Custom
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="range" min={1} max={75} step={1}
              value={Math.round(customRate * 100)}
              onChange={(e) => dispatch({ type: 'SET_CAMPAIGN_TARGET', payload: parseInt(e.target.value) / 100 })}
              style={{ width: '100%', accentColor: '#FF5B23', cursor: 'pointer' }}
            />
            <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 18, color: '#FF5B23', textAlign: 'center' }}>
              {Math.round(customRate * 100)}%
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 700, color: '#3A39FF', lineHeight: 1, marginBottom: 6 }}>
            +<HeroNumber value={customResults.totalAdditionalReactivations} format="integer" />
          </div>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 16 }}>subs / year</div>
          <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#1A1A2E', lineHeight: 1, marginBottom: 4 }}>
            +<HeroNumber value={customResults.totalAdditionalRevenue} format="currency" />
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>additional revenue</div>
        </div>
      </div>

      <SliderWarning rate={customRate} />

      <p style={{ fontSize: 12, color: '#888', marginTop: 12, fontStyle: 'italic' }}>
        * Optimistic scenario is above the 35% best-in-class benchmark. Use as an upper-bound estimate only.
        <br />Best-in-class benchmark: 35% by month 6 (RevenueCat win-back data).
      </p>
    </div>
  );
}

function MethodologyBox({ state, results }: { state: CalculatorState; results: CalcResults }) {
  const [open, setOpen] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const catData = SOSA_CATEGORY_DATA[state.category] ?? SOSA_CATEGORY_DATA['All Categories'];
  const activePlans = PLAN_ORDER.filter((p) => state.prices[p] !== null && (state.prices[p] as number) > 0);

  // Determine effective rate source for first active plan
  const firstPlan = activePlans[0] as PlanType | undefined;
  const fromData = firstPlan
    && (state.avgReactivatedPerMonth[firstPlan] > 0)
    && (state.avgChurnedPerMonth[firstPlan] > 0);
  const effectiveRatePct = firstPlan ? (results.effectiveRate[firstPlan] * 100).toFixed(1) : '—';
  const benchmarkRatePct = firstPlan ? (results.benchmarkRate[firstPlan] * 100).toFixed(1) : '—';
  const rateSource = fromData ? 'based on your data' : 'SOSA 2026 benchmark';

  // Price tier string for monthly if available
  const { getPriceTier } = require('../hooks/useCalculator');
  const monthlyTier = state.prices.monthly ? getPriceTier('monthly', state.prices.monthly) : '—';
  const annualTier  = state.prices.annual  ? getPriceTier('annual',  state.prices.annual)  : '—';

  const paragraph = `Reactivation Opportunity Estimate — Methodology Note

This estimate was calculated using the Reactivation Revenue Opportunity Calculator, based on RevenueCat's State of Subscription Apps 2026 data (115,000+ apps, $16B in revenue).

Inputs used:
• App category: ${state.category || '(not set)'} — SOSA 2026 monthly reactivation benchmark: ${(catData.monthly * 100).toFixed(1)}%
• Price tier: ${monthlyTier} monthly / ${annualTier} annual
• Current reactivation rate: ${effectiveRatePct}% (${rateSource})
• Churned subscribers modelled: ${fmt(results.totalChurnedPool)} over 12 months

How the estimate was calculated:
The SOSA 2026 benchmark rate for ${state.category || 'this category'} apps was adjusted for price tier. This gave a benchmark reactivation rate of ${benchmarkRatePct}%.${fromData ? ` Your actual trailing reactivation rate of ${effectiveRatePct}% was used instead of the benchmark.` : ''}

The additional opportunity (Realistic scenario) represents the gap between ${effectiveRatePct}% (current rate) and 35% (target rate), applied to a churned pool of ${fmt(results.totalChurnedPool)} subscribers. Revenue is estimated using average hold periods post-reactivation: monthly plans ~4 months, annual plans ~12 months, weekly plans ~2 months, quarterly plans ~3 months.

Important: This is an estimate. Actual results will vary based on the quality of win-back campaigns, timing, segmentation, and product improvements. The 35% "realistic" scenario reflects best-in-class performance reported in RevenueCat's win-back research.`;

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
            ref={textRef}
            readOnly
            value={paragraph}
            rows={22}
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

export default function ResultsPanel({ state, dispatch, results }: ResultsPanelProps) {
  const { prices, campaignTargetRate } = state;
  const activePlans = PLAN_ORDER.filter((p) => prices[p] !== null && (prices[p] as number) > 0);

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

      {/* Scenario cards */}
      <ScenarioCards
        state={state}
        customResults={results}
        customRate={campaignTargetRate}
        dispatch={dispatch}
      />

      {/* Breakdown table */}
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 16 }}>
        Breakdown — Custom scenario ({Math.round(campaignTargetRate * 100)}%)
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
              { key: 'churnedPool',              label: 'Churned pool (12m)',               fmt: 'int', bold: false },
              { key: 'effectiveRate',             label: 'Effective reactivation rate',       fmt: 'pct', bold: false },
              { key: 'organicReactivations',      label: 'Organic reactivations',             fmt: 'int', bold: false },
              { key: 'organicRevenue',            label: 'Organic revenue recovered',         fmt: 'usd', bold: false },
              { key: 'additionalReactivations',   label: 'Additional reactivations (campaign)', fmt: 'int', bold: true },
              { key: 'additionalRevenue',         label: 'Additional revenue (campaign)',      fmt: 'usd', bold: true },
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
              <Bar dataKey="organic"   name="Already recovering organically" fill="#b0bec5" radius={[2,2,0,0]} />
              <Bar dataKey="campaign"  name="Additional with campaigns"      fill="#FF5B23" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Methodology note */}
      <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 0 }}>
        Based on RevenueCat State of Subscription Apps 2026 (115,000+ apps, $16B revenue).
        Revenue assumes monthly ~4 months avg hold post-reactivation, annual full price, weekly ~2 months, quarterly ~3 months.
      </p>

      <MethodologyBox state={state} results={results} />
    </div>
  );
}
