import React from 'react';
import { NeuCard } from './NeumorphicUI';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';

export const Timeline = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <NeuCard>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Clock size={18} color="#2563eb" />
        Complaint Activity Timeline & Audit History
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '0.5rem' }}>
        {timeline.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
            {idx < timeline.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '24px',
                  bottom: '-16px',
                  width: '2px',
                  background: '#cbd5e1'
                }}
              />
            )}
            <div className="led-indicator led-primary" style={{ marginTop: '6px', flexShrink: 0, width: '10px', height: '10px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{item.status}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{item.time}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600 }}>By: {item.actor}</p>
              <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.15rem' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </NeuCard>
  );
};
