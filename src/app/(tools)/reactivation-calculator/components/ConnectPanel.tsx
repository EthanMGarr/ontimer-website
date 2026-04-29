'use client';

import { useState } from 'react';
import type { CalculatorState, CalculatorAction } from '../types/calculator';

interface ConnectPanelProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  onConnect: (apiKey: string, projectId: string) => Promise<void>;
  onContinue: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  activeSubscribers: 'Active subscribers',
  monthlyChurnRate: 'Churn rate',
  actualReactivationRate: 'Reactivation rate',
  geoMix: 'Geography mix',
};

const MANUAL_FIELDS = ['pricing', 'category'];
const MANUAL_LABELS: Record<string, string> = {
  pricing: 'Pricing',
  category: 'App category',
};

export default function ConnectPanel({ state, dispatch, onConnect, onContinue }: ConnectPanelProps) {
  const [localKey, setLocalKey] = useState('');
  const [localProjectId, setLocalProjectId] = useState('');
  const { connectionStatus, connectionError, apiPulledFields } = state;

  const isConnecting = connectionStatus === 'connecting';
  const isConnected = connectionStatus === 'connected';

  async function handleConnect() {
    const key = localKey.trim();
    const pid = localProjectId.trim();
    if (!key || !pid) return;
    dispatch({ type: 'SET_API_KEY', payload: key });
    dispatch({ type: 'SET_PROJECT_ID', payload: pid });
    await onConnect(key, pid);
  }

  function handleSkip() {
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'manual' });
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: 2 });
  }

  const allFields = Object.keys(STATUS_LABELS);
  const canConnect = localKey.trim().length > 0 && localProjectId.trim().length > 0;

  return (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#3A39FF', marginBottom: 8 }}>
        Connect your RevenueCat account
      </h2>
      <div style={{ width: 48, height: 3, background: '#FF5B23', marginBottom: 24 }} />

      <p style={{ color: '#1A1A2E', marginBottom: 28, lineHeight: 1.6 }}>
        Enter your Secret API key and Project ID to auto-fill your subscriber data.
        Your key is only used in your browser session and never stored.
      </p>

      {/* API Key */}
      {!isConnected && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>
            Secret API key
          </label>
          <input
            type="password"
            placeholder="sk_live_..."
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 16px',
              background: '#FFF1D4',
              border: '1.5px solid #e0c870',
              borderRadius: 0,
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#1A1A2E',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: 12, color: '#888', marginTop: 6, lineHeight: 1.5 }}>
            <strong>Apps &amp; providers</strong> → <strong>API keys</strong> → <strong>+ New secret API key</strong>
            <br />SDK/public keys won&apos;t work — you need a Secret key.
          </p>
        </div>
      )}

      {/* Project ID */}
      {!isConnected && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>
            Project ID
          </label>
          <input
            type="text"
            placeholder="e.g. a1b2c3d4"
            value={localProjectId}
            onChange={(e) => setLocalProjectId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 16px',
              background: '#FFF1D4',
              border: '1.5px solid #e0c870',
              borderRadius: 0,
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#1A1A2E',
              outline: 'none',
            }}
          />
          <p style={{ fontSize: 12, color: '#888', marginTop: 6, lineHeight: 1.5 }}>
            Found in your dashboard URL:{' '}
            <span style={{ fontFamily: 'monospace', background: '#f0f0f0', padding: '1px 4px' }}>
              app.revenuecat.com/projects/<strong>[YOUR-PROJECT-ID]</strong>/...
            </span>
          </p>
        </div>
      )}

      {/* Error */}
      {connectionStatus === 'error' && (
        <div style={{ padding: '12px 16px', background: '#fff0f0', border: '1px solid #fca5a5', marginBottom: 16, color: '#dc2626', fontSize: 14, lineHeight: 1.5 }}>
          {connectionError}
        </div>
      )}

      {/* Connect button */}
      {!isConnected && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <button
            onClick={handleConnect}
            disabled={isConnecting || !canConnect}
            style={{
              padding: '12px 28px',
              background: isConnecting || !canConnect ? '#ccc' : '#FF5B23',
              color: '#fff',
              border: 'none',
              borderRadius: 0,
              fontWeight: 700,
              fontSize: 14,
              cursor: isConnecting || !canConnect ? 'default' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {isConnecting ? 'Connecting…' : 'Connect →'}
          </button>
          <button
            onClick={handleSkip}
            style={{ background: 'none', border: 'none', color: '#3A39FF', cursor: 'pointer', fontSize: 14, textDecoration: 'underline', padding: 0 }}
          >
            Skip — enter data manually →
          </button>
        </div>
      )}

      {/* Status panel after connecting */}
      {isConnected && (
        <div style={{ background: '#f8fffe', border: '1px solid #ADE6ED', padding: '20px 24px', marginBottom: 20 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1A2E', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Data status
          </p>
          {allFields.map((field) => {
            const pulled = apiPulledFields.includes(field);
            return (
              <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 14 }}>
                <span style={{ color: pulled ? '#16a34a' : '#d97706', fontWeight: 700 }}>{pulled ? '✓' : '⚠'}</span>
                <span style={{ color: '#1A1A2E' }}>
                  {STATUS_LABELS[field]}: {pulled ? 'pulled from RevenueCat' : 'enter manually below'}
                </span>
              </div>
            );
          })}
          {MANUAL_FIELDS.map((field) => (
            <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 14 }}>
              <span style={{ color: '#d97706', fontWeight: 700 }}>⚠</span>
              <span style={{ color: '#1A1A2E' }}>{MANUAL_LABELS[field]}: enter manually below</span>
            </div>
          ))}
        </div>
      )}

      {isConnected && (
        <button
          onClick={onContinue}
          style={{ padding: '12px 28px', background: '#3A39FF', color: '#fff', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
        >
          Continue →
        </button>
      )}
    </div>
  );
}
