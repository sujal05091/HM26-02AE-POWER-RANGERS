import React, { useState } from 'react';
import { NeuCard, NeuButton, NeuPillTabs } from '../../components/NeumorphicUI';
import { Building, UserCheck, FileText, AlertTriangle, Settings, History, Search } from 'lucide-react';

export const GovernanceManagement = () => {
  const [activeTab, setActiveTab] = useState('depts');

  const tabs = [
    { id: 'depts', label: 'Departments & Authorities' },
    { id: 'officers', label: 'Officer Assignments' },
    { id: 'contracts', label: 'Contract Registry (Tenders)' },
    { id: 'manual_review', label: 'Manual Routing Queue' },
    { id: 'sla_config', label: 'SLA Rules' },
    { id: 'audit_log', label: 'Audit Log' }
  ];

  return (
    <NeuCard style={{ marginBottom: '1.5rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>
          Civic Governance Directory & Configuration Center
        </h3>
        <NeuPillTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === 'depts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Mysuru City Corporation (MCC) — Road Engineering & Infrastructure</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Jurisdiction: Ward 42, 38, 41 | Categories: Potholes, Damaged Roads | Default SLA: 24h</p>
          </div>
          <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Mysuru City Corporation (MCC) — Solid Waste Management (SWM)</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Jurisdiction: Ward 42, 38, 41 | Categories: Garbage Overflow, Illegal Dumping | Default SLA: 12h</p>
          </div>
        </div>
      )}

      {activeTab === 'officers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Eng. Rajesh Kumar — Senior AEE (Ward 42)</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Department: Road Engineering | Active Complaints: 4 | Performance Rating: 4.8 / 5.0</p>
          </div>
          <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Officer S. Lakshmi — Chief Sanitary Inspector (Ward 38)</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Department: SWM | Active Complaints: 2 | Performance Rating: 4.6 / 5.0</p>
          </div>
        </div>
      )}

      {activeTab === 'contracts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Contract RM-2042 — Ward 42 Road Patchwork Tender</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Contractor: Mysore Infrastructure & Paving Pvt Ltd | Valid Until: 31 Dec 2026</p>
          </div>
        </div>
      )}

      {activeTab === 'manual_review' && (
        <div className="neu-card-sm" style={{ background: '#e6ecf5', textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>
          <AlertTriangle size={24} style={{ marginBottom: '0.5rem', color: '#16a34a' }} />
          <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Zero Complaints Pending Manual Review</p>
          <span style={{ fontSize: '0.75rem' }}>All incoming complaints successfully auto-routed with &gt;90% confidence.</span>
        </div>
      )}

      {activeTab === 'sla_config' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Potholes / Road Damage</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>SLA Limit: 24 Hours | Auto-Escalation: Executive Engineer at 100% breach</p>
          </div>
          <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Garbage Overflow</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>SLA Limit: 12 Hours | Auto-Escalation: Health Officer at 100% breach</p>
          </div>
        </div>
      )}

      {activeTab === 'audit_log' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#475569' }}>• [12:15 PM] Jurisdiction Boundary schema V3 verified by Admin.</div>
          <div style={{ fontSize: '0.78rem', color: '#475569' }}>• [10:30 AM] Ticket #HM-1024 status updated to 'In Progress' by Eng. Rajesh Kumar.</div>
          <div style={{ fontSize: '0.78rem', color: '#475569' }}>• [09:02 AM] Auto-routing engine evaluated Ticket #HM-1025 to Ward 38 SWM Dept.</div>
        </div>
      )}
    </NeuCard>
  );
};
