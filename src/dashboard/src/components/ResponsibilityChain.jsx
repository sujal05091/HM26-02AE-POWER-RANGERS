import React from 'react';
import { User, MapPin, Building, Shield, UserCheck, FileText, ChevronDown } from 'lucide-react';
import { NeuCard } from './NeumorphicUI';

export const ResponsibilityChain = ({ complaint }) => {
  if (!complaint) return null;

  const steps = [
    {
      level: 1,
      title: "Citizen Report",
      subtitle: `Ticket #${complaint.id}`,
      detail: complaint.description,
      icon: <User size={18} color="#2563eb" />
    },
    {
      level: 2,
      title: "Jurisdiction & Ward Geometry",
      subtitle: complaint.ward_name || "Ward 42 — Devaraja / Agrahara",
      detail: `GPS Pin: ${complaint.latitude?.toFixed(4)}, ${complaint.longitude?.toFixed(4)}`,
      icon: <MapPin size={18} color="#16a34a" />
    },
    {
      level: 3,
      title: "Responsible Authority",
      subtitle: complaint.authority_name || "Mysuru City Corporation (MCC)",
      detail: "Legal Administrative Body",
      icon: <Building size={18} color="#0284c7" />
    },
    {
      level: 4,
      title: "Department Execution",
      subtitle: complaint.department_name || "Road Engineering & Infrastructure",
      detail: `SLA Target: ${complaint.sla_hours} hours`,
      icon: <Shield size={18} color="#d97706" />
    },
    {
      level: 5,
      title: "Assigned Field Officer",
      subtitle: complaint.officer_name || "Eng. Rajesh Kumar",
      detail: "Senior Assistant Executive Engineer",
      icon: <UserCheck size={18} color="#7c3aed" />
    },
    {
      level: 6,
      title: "Service Contract / Tender",
      subtitle: complaint.contract_title || "RM-2042 Road Maintenance Tender",
      detail: "Contractor: Mysore Infrastructure & Paving Pvt Ltd",
      icon: <FileText size={18} color="#059669" />
    }
  ];

  return (
    <NeuCard className="responsibility-chain-container">
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Shield size={18} color="#2563eb" />
        Accountability & Routing Chain
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {steps.map((step, idx) => (
          <React.Fragment key={step.level}>
            <div className="neu-card-sm" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#e6ecf5' }}>
              <div className="neu-card-sm" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                {step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{step.title}</h4>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, background: '#cbd5e1', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    Node #{step.level}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2563eb', marginTop: '0.15rem' }}>{step.subtitle}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{step.detail}</p>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', margin: '-0.3rem 0' }}>
                <ChevronDown size={18} color="#94a3b8" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </NeuCard>
  );
};
