'use client';

import type { CalculatorState, CalculatorAction } from '../types/calculator';
import { GEO_REGIONS, SOSA_GEO_DATA } from '../data/sosa2026';

interface GeographyMixerProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

export default function GeographyMixer({ state, dispatch }: GeographyMixerProps) {
  const { geoMix } = state;

  const total = Object.values(geoMix).reduce((s, v) => s + v, 0);
  const totalPct = Math.round(total * 100);
  const isValid = totalPct === 100;

  function handleChange(region: string, rawValue: string) {
    const parsed = parseFloat(rawValue);
    const value = isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed)) / 100;
    dispatch({ type: 'SET_GEO_REGION', payload: { region, value } });
  }

  return (
    <div>
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#3A39FF', marginBottom: 8 }}>
        2c. Geography mix
      </h3>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 20, lineHeight: 1.5 }}>
        Adjust region weights to match your user base. Must total 100%.
        {state.apiPulledFields.includes('geoMix') && (
          <span style={{ marginLeft: 8, color: '#16a34a', fontSize: 12, fontWeight: 600 }}>✓ Pre-filled from RevenueCat</span>
        )}
      </p>

      {/* Total indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.min(totalPct, 100)}%`,
            background: isValid ? '#16a34a' : totalPct > 100 ? '#dc2626' : '#d97706',
            transition: 'width 0.2s, background 0.2s',
          }} />
        </div>
        <span style={{
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: 14,
          color: isValid ? '#16a34a' : '#dc2626',
          minWidth: 44,
        }}>
          {totalPct}%
        </span>
      </div>

      {!isValid && (
        <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 16 }}>
          {totalPct < 100 ? `Add ${100 - totalPct}% more to reach 100%.` : `Remove ${totalPct - 100}% to reach 100%.`}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {GEO_REGIONS.map((region) => {
          const pct = Math.round((geoMix[region] ?? 0) * 100);
          const geo = SOSA_GEO_DATA[region];

          return (
            <div key={region}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#1A1A2E' }}>{region}</span>
                  {geo && (
                    <span style={{ marginLeft: 10, fontSize: 12, color: '#888' }}>
                      {(geo.monthly * 100).toFixed(1)}% monthly · {(geo.annual * 100).toFixed(1)}% annual reactivation benchmark
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={pct}
                    onChange={(e) => handleChange(region, e.target.value)}
                    style={{
                      width: 60,
                      padding: '6px 8px',
                      background: '#FFF1D4',
                      border: '1.5px solid #e0c870',
                      borderRadius: 0,
                      fontFamily: 'monospace',
                      fontSize: 14,
                      textAlign: 'right',
                      color: '#1A1A2E',
                    }}
                  />
                  <span style={{ fontSize: 13, color: '#666' }}>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pct}
                onChange={(e) => handleChange(region, e.target.value)}
                style={{ width: '100%', accentColor: '#3A39FF', cursor: 'pointer' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
