import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Layers, RefreshCw, LogOut, UserCheck } from 'lucide-react';
import { NeuPillTabs, NeuButton } from './NeumorphicUI';

export const Navbar = () => {
  const { activeRole, setActiveRole, jurisdictionVersion, setJurisdictionVersion, fetchComplaints, currentUser, logoutWebUser } = useApp();

  const roleTabs = [
    { id: 'officer', label: '👮 Officer Dashboard' },
    { id: 'admin', label: '👑 Admin Governance' },
    { id: 'citizen_sim', label: '📱 Citizen Mobile Simulator' }
  ];

  return (
    <header className="neu-card-sm" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="neu-card-sm" style={{ padding: '0.5rem', borderRadius: '50%', color: '#2563eb' }}>
          <Shield size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#1e293b' }}>
            CivicRoute <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#2563eb', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '999px', marginLeft: '0.4rem' }}>Phase 1 MVP</span>
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Dynamic Complaint Routing & Accountability • Mysuru</p>
        </div>
      </div>

      {/* Role Switcher */}
      <NeuPillTabs tabs={roleTabs} activeTab={activeRole} onChange={setActiveRole} />

      {/* Jurisdiction Boundary & User Auth Control Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
          <Layers size={16} color="#2563eb" />
          <span>Boundary Schema:</span>
        </div>
        <select
          value={jurisdictionVersion}
          onChange={(e) => setJurisdictionVersion(e.target.value)}
          className="neu-select"
          style={{ fontWeight: 700, color: '#2563eb' }}
        >
          <option value="V3">V3 — Current (2026)</option>
          <option value="V2">V2 — 2024 Split</option>
          <option value="V1">V1 — 2022 Legacy</option>
        </select>

        <NeuButton onClick={fetchComplaints} className="neu-button-sm">
          <RefreshCw size={14} />
        </NeuButton>

        {currentUser && (
          <div className="neu-card-sm" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eff6ff' }}>
            <UserCheck size={16} color="#2563eb" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e293b' }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.68rem', color: '#2563eb', fontWeight: 600 }}>{currentUser.designation}</div>
            </div>
          </div>
        )}

        <NeuButton onClick={logoutWebUser} className="neu-button-sm" style={{ color: '#dc2626' }}>
          <LogOut size={14} />
          <span style={{ fontSize: '0.75rem', marginLeft: '0.3rem', fontWeight: 700 }}>Sign Out</span>
        </NeuButton>
      </div>
    </header>
  );
};

