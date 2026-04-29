'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CalculatorState, CalculatorAction, PlanType } from '../types/calculator';
import type { CalcResults } from '../types/calculator';
import HeroNumber from './HeroNumber';

interface ResultsPanelProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  results: CalcResults;
}

const PLAN_LABELS: Record<PlanType, string> = {
  monthly: 'Monthly',
  annual: 'Annual',
  weekly: 'Weekly',
  quarterly: 'Quarterly',
};

const PLAN_ORDER: PlanType[] = ['monthly', 'annual', 'weekly', 'quarterly'];

function fmt(n: number) { return n.toLocaleString(); }
function fmtUSD(n: number) { return '$' + Math.round(n).toLocaleString(); }
function fmtPct(n: number) { return (n * 100).toFixed(1) + '%'; }

export default function ResultsPanel({ state, dispatch, results }: ResultsPanelProps) {
  const { prices, campaignTargetRate } = state;
  const activePlans = PLAN_ORDER.filter((p) => prices[p] !== null && prices[p] !== undefined);

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

      {/* Hero numbers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
        background: '#1A1A2E',
        marginBottom: 40,
      }}>
        <div style={{ background: '#1A1A2E', padding: '36px 40px' }}>
          <p style={{ fontSize: 13, color: '#ADE6ED', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ↑ Additional subscribers you could reactivate
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: 52, fontWeight: 700, color: '#FF5B23', lineHeight: 1 }}>
            <HeroNumber value={results.totalAdditionalReactivations} format="integer" />
          </p>
          <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>per year with active campaigns</p>
        </div>
        <div style={{ background: '#232340', padding: '36px 40px' }}>
          <p style={{ fontSize: 13, color: '#ADE6ED', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ↑ Additional annual revenue from campaigns
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: 52, fontWeight: 700, color: '#FF5B23', lineHeight: 1 }}>
            <HeroNumber value={results.totalAdditionalRevenue} format="currency" />
          </p>
          <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>above your organic baseline</p>
        </div>
      </div>

      {/* Breakdown table */}
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f8f9fb' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700, color: '#1A1A2E', borderBottom: '2px solid #e5e7eb' }}></th>
              {activePlans.map((p) => (
                <th key={p} style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, color: '#3A39FF', borderBottom: '2px solid #e5e7eb' }}>
                  {PLAN_LABELS[p]}
                </th>
              ))}
              <th style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700, color: '#1A1A2E', borderBottom: '2px solid #e5e7eb' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'churnedPool', label: 'Churned pool (12m)', format: 'int', bold: false },
              { key: 'effectiveRate', label: 'Effective reactivation rate', format: 'pct', bold: false },
              { key: 'organicReactivations', label: 'Organic reactivations', format: 'int', bold: false },
              { key: 'organicRevenue', label: 'Organic revenue recovered', format: 'usd', bold: false },
              { key: 'additionalReactivations', label: 'Additional reactivations (campaigns)', format: 'int', bold: true },
              { key: 'additionalRevenue', label: 'Additional revenue (campaigns)', format: 'usd', bold: true },
            ].map(({ key, label, format, bold }, i) => {
              const totals: Record<string, number> = {
                churnedPool: results.totalChurnedPool,
                effectiveRate: 0,
                organicReactivations: results.totalOrganicReactivations,
                organicRevenue: results.totalOrganicRevenue,
                additionalReactivations: results.totalAdditionalReactivations,
                additionalRevenue: results.totalAdditionalRevenue,
              };
              const vals = results[key as keyof CalcResults] as Record<PlanType, number>;

              return (
                <tr key={key} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px', fontWeight: bold ? 700 : 400, color: bold ? '#1A1A2E' : '#444' }}>
                    {label}
                  </td>
                  {activePlans.map((p) => {
                    const v = typeof vals === 'object' && vals !== null ? (vals as Record<string, number>)[p] ?? 0 : 0;
                    const display = format === 'int' ? fmt(Math.round(v))
                      : format === 'usd' ? fmtUSD(v)
                      : fmtPct(v);
                    return (
                      <td key={p} style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'monospace', fontWeight: bold ? 700 : 400, color: bold ? '#FF5B23' : '#1A1A2E' }}>
                        {display}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'right', padding: '12px 16px', fontFamily: 'monospace', fontWeight: bold ? 700 : 600, color: bold ? '#FF5B23' : '#1A1A2E' }}>
                    {format === 'pct' ? '—' : format === 'int' ? fmt(Math.round(totals[key])) : fmtUSD(totals[key])}
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
              <Bar dataKey="organic" name="Already recovering organically" fill="#b0bec5" radius={[2, 2, 0, 0]} />
              <Bar dataKey="campaign" name="Additional with campaigns" fill="#FF5B23" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Campaign target rate */}
      <div style={{ marginBottom: 40, padding: '24px 28px', background: '#f8f9fb', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
          <label style={{ fontWeight: 700, fontSize: 15, color: '#1A1A2E', whiteSpace: 'nowrap' }}>
            Campaign target rate:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(campaignTargetRate * 100)}
              onChange={(e) => dispatch({ type: 'SET_CAMPAIGN_TARGET', payload: parseInt(e.target.value) / 100 })}
              style={{ flex: 1, accentColor: '#FF5B23', cursor: 'pointer' }}
            />
            <span style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 20,
              color: '#FF5B23',
              minWidth: 52,
              textAlign: 'right',
            }}>
              {Math.round(campaignTargetRate * 100)}%
            </span>
          </div>
        </div>
        <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
          Best-in-class benchmark: <strong>35%</strong> by month 6 (RevenueCat win-back data)
        </p>
      </div>

      {/* Methodology note */}
      <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic', lineHeight: 1.6 }}>
        Based on RevenueCat State of Subscription Apps 2026 (115,000+ apps, $16B revenue).
        &lsquo;Additional revenue&rsquo; = uplift above your current organic reactivation, based on gap between your
        effective rate and campaign target. Revenue assumes monthly ~4 months avg hold post-reactivation,
        annual full price, weekly ~2 months, quarterly ~3 months. Adjust campaign target rate above.
      </p>
    </div>
  );
}
