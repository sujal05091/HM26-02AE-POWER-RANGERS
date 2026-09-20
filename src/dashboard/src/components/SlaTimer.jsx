import React from 'react';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { NeuCard, NeuBadge } from './NeumorphicUI';

export const SlaTimer = ({ slaInfo, slaHours = 24 }) => {
  if (!slaInfo) return null;

  const percentage = slaInfo.percentage_remaining ?? 75;
  const isBreached = slaInfo.is_breached;

  return (
    <NeuCard className="sla-timer-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} color={isBreached ? "#dc2626" : "#2563eb"} />
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>SLA Resolution Deadline</h4>
        </div>
        <NeuBadge status={slaInfo.status} />
      </div>

      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isBreached ? '#dc2626' : '#1e293b', marginBottom: '0.5rem' }}>
        {slaInfo.remaining_formatted}
      </div>

      {/* SLA Neumorphic Progress Bar */}
      <div className="neu-card-sm" style={{ padding: '0.25rem', borderRadius: '999px', background: '#e6ecf5', marginBottom: '0.5rem' }}>
        <div
          style={{
            height: '10px',
            borderRadius: '999px',
            width: `${percentage}%`,
            background: isBreached
              ? 'linear-gradient(90deg, #dc2626, #b91c1c)'
              : percentage < 30
              ? 'linear-gradient(90deg, #d97706, #f59e0b)'
              : 'linear-gradient(90deg, #16a34a, #22c55e)',
            transition: 'width 0.4s ease-in-out'
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
        <span>Target Window: {slaHours} Hours</span>
        <span>{isBreached ? 'Breached / Escalated' : `${percentage}% Time Left`}</span>
      </div>
    </NeuCard>
  );
};
