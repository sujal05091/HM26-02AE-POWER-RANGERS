import React from 'react';
import { useApp } from '../../context/AppContext';
import { NeuCard, NeuBadge } from '../../components/NeumorphicUI';
import { Building, ShieldCheck, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

export const AdminOverview = () => {
  const { complaints } = useApp();

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const active = complaints.filter(c => ['Reported', 'Assigned', 'In Progress'].includes(c.status)).length;
  const escalated = complaints.filter(c => ['Escalated', 'Overdue'].includes(c.status)).length;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 85;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Total Civic Complaints</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginTop: '0.2rem' }}>{total}</h2>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>↑ 12% from last week</span>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Resolution Rate</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#16a34a', marginTop: '0.2rem' }}>{resolutionRate}%</h2>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>Avg SLA: 14.2 Hours</span>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Active Open Tickets</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706', marginTop: '0.2rem' }}>{active}</h2>
          <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700 }}>In Dispatch / Field</span>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Escalated Breaches</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626', marginTop: '0.2rem' }}>{escalated}</h2>
          <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700 }}>Action Required</span>
        </NeuCard>
      </div>

      <NeuCard style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Mysuru City Governance Summary</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Automated routing platform managing MCC Zone 3, 4, 5 and MUDA jurisdiction boundaries.
        </p>
      </NeuCard>
    </div>
  );
};
