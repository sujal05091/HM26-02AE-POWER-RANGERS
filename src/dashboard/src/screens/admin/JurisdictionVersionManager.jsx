import React from 'react';
import { useApp } from '../../context/AppContext';
import { NeuCard, NeuButton } from '../../components/NeumorphicUI';
import { Layers, RefreshCw, CheckCircle, Info } from 'lucide-react';

export const JurisdictionVersionManager = () => {
  const { jurisdictionVersion, setJurisdictionVersion } = useApp();

  const versions = [
    {
      id: "V3",
      title: "V3 — Current Active (2026 Schema)",
      date: "Effective 01 Jan 2026",
      desc: "Updated Ward 42 Agrahara limits mapped to MCC Zone 4 Administration with active tender RM-2042."
    },
    {
      id: "V2",
      title: "V2 — 2024 Split Jurisdiction",
      date: "Effective 01 Jan 2024",
      desc: "Suburban boundary division where Ward 42 outer ring was managed under MUDA Development Zone."
    },
    {
      id: "V1",
      title: "V1 — 2022 Historical Legacy",
      date: "Effective 01 Jan 2022",
      desc: "Historical legacy mapping for retrospective audit verification of older complaints."
    }
  ];

  return (
    <NeuCard style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Layers size={22} color="#2563eb" />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
          Dynamic Jurisdiction & Time-Versioned Boundary Manager
        </h3>
      </div>

      <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
        CivicRoute avoids hardcoded authority mappings. When administrative boundaries change over time, select or simulate different active version schemas below:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {versions.map((ver) => (
          <div
            key={ver.id}
            className="neu-card-sm"
            style={{
              background: jurisdictionVersion === ver.id ? '#dbeafe' : '#e6ecf5',
              border: jurisdictionVersion === ver.id ? '2px solid #2563eb' : 'none',
              padding: '1rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>{ver.title}</h4>
                {jurisdictionVersion === ver.id && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#2563eb', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>
                    ACTIVE SCHEMA
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{ver.date}</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem' }}>{ver.desc}</p>

            {jurisdictionVersion !== ver.id && (
              <NeuButton onClick={() => setJurisdictionVersion(ver.id)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
                Switch to {ver.id} Boundary Engine
              </NeuButton>
            )}
          </div>
        ))}
      </div>
    </NeuCard>
  );
};
