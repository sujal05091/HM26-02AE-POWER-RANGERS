import React from 'react';
import { useApp } from '../../context/AppContext';
import { NeuCard, NeuBadge, NeuButton } from '../../components/NeumorphicUI';
import { Shield, AlertTriangle, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const OfficerOverview = ({ onNavigateToQueue, onSelectComplaint }) => {
  const { complaints } = useApp();

  const assignedCount = complaints.filter(c => ['Reported', 'Assigned'].includes(c.status)).length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const overdueCount = complaints.filter(c => c.sla_info?.is_breached || c.status === 'Overdue').length;
  const escalatedCount = complaints.filter(c => c.status === 'Escalated').length;

  return (
    <div>
      {/* Officer Metric Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <NeuCard className="neu-card-convex">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Assigned Complaints</p>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginTop: '0.2rem' }}>{assignedCount}</h2>
            </div>
            <div className="neu-card-sm" style={{ padding: '0.6rem', color: '#2563eb' }}>
              <FileText size={22} />
            </div>
          </div>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Work In Progress</p>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', marginTop: '0.2rem' }}>{inProgressCount}</h2>
            </div>
            <div className="neu-card-sm" style={{ padding: '0.6rem', color: '#d97706' }}>
              <Clock size={22} />
            </div>
          </div>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Overdue SLA</p>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', marginTop: '0.2rem' }}>{overdueCount}</h2>
            </div>
            <div className="neu-card-sm" style={{ padding: '0.6rem', color: '#dc2626' }}>
              <AlertTriangle size={22} />
            </div>
          </div>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Escalated Tickets</p>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7c3aed', marginTop: '0.2rem' }}>{escalatedCount}</h2>
            </div>
            <div className="neu-card-sm" style={{ padding: '0.6rem', color: '#7c3aed' }}>
              <Shield size={22} />
            </div>
          </div>
        </NeuCard>
      </div>

      {/* Urgent SLA Queue Preview */}
      <NeuCard style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Urgent SLA Priority Queue</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Complaints requiring immediate officer field dispatch</p>
          </div>
          <NeuButton primary onClick={onNavigateToQueue}>
            View All Complaints <ArrowRight size={16} />
          </NeuButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {complaints.slice(0, 3).map(c => (
            <div
              key={c.id}
              className="neu-card-sm"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', cursor: 'pointer' }}
              onClick={() => onSelectComplaint(c.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={c.before_image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{c.category} — Ticket #{c.id}</h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748b' }}>{c.address}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <NeuBadge status={c.status} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: c.sla_info?.is_breached ? '#dc2626' : '#2563eb' }}>
                  {c.sla_info?.remaining_formatted}
                </span>
                <NeuButton style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}>Inspect</NeuButton>
              </div>
            </div>
          ))}
        </div>
      </NeuCard>
    </div>
  );
};
