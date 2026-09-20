import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { WebLoginScreen } from './components/WebLoginScreen';

import { OfficerOverview } from './screens/officer/OfficerOverview';
import { OfficerQueueTable } from './screens/officer/OfficerQueueTable';
import { OfficerDetailAction } from './screens/officer/OfficerDetailAction';
import { OfficerFieldMap } from './screens/officer/OfficerFieldMap';
import { OfficerLiveSubmissions } from './screens/officer/OfficerLiveSubmissions';

import { AdminOverview } from './screens/admin/AdminOverview';
import { AnalyticsHotspots } from './screens/admin/AnalyticsHotspots';
import { JurisdictionVersionManager } from './screens/admin/JurisdictionVersionManager';
import { GovernanceManagement } from './screens/admin/GovernanceManagement';

import { NeuPillTabs, NeuButton } from './components/NeumorphicUI';
import './styles/neumorphism.css';

const MainDashboard = () => {
  const { activeRole, complaints, createComplaint, selectedComplaintId, setSelectedComplaintId, isAuthenticated } = useApp();
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'login'
  const [officerTab, setOfficerTab] = useState('live_submissions');
  const [adminTab, setAdminTab] = useState('overview');

  // Citizen Simulator State
  const [showSimForm, setShowSimForm] = useState(false);
  const [simCat, setSimCat] = useState('Pothole');
  const [simDesc, setSimDesc] = useState('');
  const [simAddress, setSimAddress] = useState('Agrahara Circle, Ward 42, Mysuru');
  const [simImg, setSimImg] = useState('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');

  // If user is unauthenticated, switch between Landing Page and Login Screen
  if (!isAuthenticated) {
    if (viewMode === 'login') {
      return <WebLoginScreen onBackToLanding={() => setViewMode('landing')} />;
    }
    return <LandingPage onOpenLogin={() => setViewMode('login')} />;
  }

  const officerTabs = [
    { id: 'live_submissions', label: '🆕 Live Submissions & New Reports' },
    { id: 'overview', label: 'Overview Metrics' },
    { id: 'queue', label: 'Complaint Queue' },
    { id: 'detail', label: 'Inspection & Actions' },
    { id: 'field_map', label: 'Field Navigation Map' }
  ];

  const adminTabs = [
    { id: 'overview', label: 'Executive Summary' },
    { id: 'analytics', label: 'Analytics & Hotspots' },
    { id: 'jurisdictions', label: 'Boundary Version Manager (V1/V2/V3)' },
    { id: 'governance', label: 'Governance Directory' }
  ];

  const handleSelectComplaint = (id) => {
    setSelectedComplaintId(id);
    if (activeRole === 'officer') {
      setOfficerTab('detail');
    }
  };

  const handleSimSubmit = async (e) => {
    e.preventDefault();
    if (!simDesc.trim()) return;
    const sessionToken = `SES-SIM-${Math.floor(100000 + Math.random() * 900000)}`;
    await createComplaint({
      category: simCat,
      description: simDesc,
      address: simAddress,
      before_image_url: simImg,
      session_token: sessionToken,
      ward_name: 'Ward 42 — Devaraja / Agrahara',
      department_name: simCat === 'Garbage Overflow' ? 'Solid Waste Management' : 'Road Engineering & Infrastructure'
    });
    setSimDesc('');
    setShowSimForm(false);
  };

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '1.25rem' }}>
      <Navbar />

      {/* OFFICER ROLE VIEWS */}
      {activeRole === 'officer' && (
        <div>
          <div style={{ marginBottom: '1.25rem' }}>
            <NeuPillTabs tabs={officerTabs} activeTab={officerTab} onChange={setOfficerTab} />
          </div>

          {officerTab === 'live_submissions' && (
            <OfficerLiveSubmissions onSelectComplaint={handleSelectComplaint} />
          )}

          {officerTab === 'overview' && (
            <OfficerOverview
              onNavigateToQueue={() => setOfficerTab('queue')}
              onSelectComplaint={handleSelectComplaint}
            />
          )}

          {officerTab === 'queue' && (
            <OfficerQueueTable onSelectComplaint={handleSelectComplaint} />
          )}

          {officerTab === 'detail' && (
            <OfficerDetailAction complaintId={selectedComplaintId} />
          )}

          {officerTab === 'field_map' && (
            <OfficerFieldMap onSelectComplaint={handleSelectComplaint} />
          )}
        </div>
      )}

      {/* ADMIN ROLE VIEWS */}
      {activeRole === 'admin' && (
        <div>
          <div style={{ marginBottom: '1.25rem' }}>
            <NeuPillTabs tabs={adminTabs} activeTab={adminTab} onChange={setAdminTab} />
          </div>

          {adminTab === 'overview' && <AdminOverview />}
          {adminTab === 'analytics' && <AnalyticsHotspots />}
          {adminTab === 'jurisdictions' && <JurisdictionVersionManager />}
          {adminTab === 'governance' && <GovernanceManagement />}
        </div>
      )}

      {/* CITIZEN MOBILE SIMULATOR */}
      {activeRole === 'citizen_sim' && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
          <div
            className="neu-card"
            style={{
              width: '400px',
              height: '780px',
              borderRadius: '40px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '12px 12px 24px #c3cee0, -12px -12px 24px #ffffff',
              border: '8px solid #e6ecf5',
              position: 'relative'
            }}
          >
            {/* Phone Speaker Notch */}
            <div style={{ width: '120px', height: '18px', background: '#cbd5e1', borderRadius: '10px', margin: '0 auto 1rem auto' }} />

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>CivicRoute Citizen App</h3>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Report it. Route it. Track it.</p>
              </div>

              {/* Citizen App Preview Card */}
              <div className="neu-card-sm" style={{ marginBottom: '1rem', background: '#e6ecf5' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Good day 👋</h4>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.75rem' }}>What civic issue needs attention?</p>

                <NeuButton primary style={{ width: '100%', fontSize: '0.85rem' }} onClick={() => setShowSimForm(!showSimForm)}>
                  {showSimForm ? 'Cancel Report' : '+ Report a Civic Issue'}
                </NeuButton>
              </div>

              {/* Interactive Report Form */}
              {showSimForm && (
                <div className="neu-card-sm" style={{ marginBottom: '1rem', background: '#ffffff', borderLeft: '4px solid #2563eb' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>File Citizen Report</h4>
                  <form onSubmit={handleSimSubmit}>
                    <select
                      value={simCat}
                      onChange={(e) => setSimCat(e.target.value)}
                      className="neu-select"
                      style={{ width: '100%', fontSize: '0.8rem', marginBottom: '0.5rem' }}
                    >
                      <option value="Pothole">Pothole / Road Defect</option>
                      <option value="Garbage Overflow">Garbage Overflow</option>
                      <option value="Water Leakage">Water Pipe Leakage</option>
                      <option value="Streetlight Failure">Streetlight Failure</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Location address..."
                      value={simAddress}
                      onChange={(e) => setSimAddress(e.target.value)}
                      className="neu-input"
                      style={{ width: '100%', fontSize: '0.8rem', marginBottom: '0.5rem' }}
                      required
                    />

                    <input
                      type="text"
                      placeholder="Describe the issue..."
                      value={simDesc}
                      onChange={(e) => setSimDesc(e.target.value)}
                      className="neu-input"
                      style={{ width: '100%', fontSize: '0.8rem', marginBottom: '0.75rem' }}
                      required
                    />

                    <NeuButton primary type="submit" style={{ width: '100%', fontSize: '0.8rem' }}>
                      🚀 Dispatch Report
                    </NeuButton>
                  </form>
                </div>
              )}

              {/* Active & Historical Citizen Reports */}
              <div className="neu-card-sm" style={{ marginBottom: '1rem', background: '#e6ecf5' }}>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                  Your Active Reports & History ({complaints.length})
                </h4>
                
                {complaints.length === 0 ? (
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>No reports logged yet.</p>
                ) : (
                  complaints.slice(0, 5).map((c, i) => (
                    <div key={c.id || i} className="neu-card-sm" style={{ background: '#fff', padding: '0.6rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.8rem', color: '#1e293b' }}>{c.category}</strong>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#2563eb' }}>#{c.id}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: c.status === 'Resolved' ? '#16a34a' : '#2563eb', fontWeight: 600 }}>
                        ● {c.status} ({c.sla_info?.remaining_formatted || 'On Track'})
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                        🔑 Session: {c.session_token || `SES-${c.id}`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={{ textAlign: 'center', paddingTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
              Full Flutter Citizen App running in <code>src/mobile</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainDashboard />
    </AppProvider>
  );
}
