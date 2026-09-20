import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NeuCard, NeuBadge, NeuButton } from '../../components/NeumorphicUI';
import { Shield, Smartphone, Clock, CheckCircle2, AlertTriangle, Eye, ArrowRight, RefreshCw, Radio, FileText, Image as ImageIcon } from 'lucide-react';

export const OfficerLiveSubmissions = ({ onSelectComplaint }) => {
  const { complaints, fetchComplaints, createComplaint, loading } = useApp();
  const [selectedImg, setSelectedImg] = useState(null);
  const [showDispatchForm, setShowDispatchForm] = useState(false);
  const [newCat, setNewCat] = useState('Pothole');
  const [newDesc, setNewDesc] = useState('');
  const [newAddress, setNewAddress] = useState('Agrahara Circle, Ward 42, Mysuru');
  const [newImgUrl, setNewImgUrl] = useState('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

  // Filter live complaints submitted by citizens or tagged as live citizen reports
  const liveComplaints = complaints.filter(c => c.is_live_citizen || c.id.startsWith('HM-') || c.status === 'In Progress' || c.status === 'Reported');

  const handleCreateLiveReport = async (e) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    setIsSubmitting(true);
    setSubmitSuccessMsg('');

    const sessionToken = `SES-DISPATCH-${Math.floor(100000 + Math.random() * 900000)}`;

    const res = await createComplaint({
      category: newCat,
      description: newDesc,
      address: newAddress,
      before_image_url: newImgUrl,
      session_token: sessionToken,
      ward_name: 'Ward 42 — Devaraja / Agrahara',
      department_name: newCat === 'Garbage Overflow' ? 'Solid Waste Management' : newCat === 'Water Leakage' ? 'Water Supply & Sewage Board' : 'Road Engineering & Infrastructure'
    });

    setIsSubmitting(false);
    if (res && res.success) {
      setSubmitSuccessMsg(`✅ Report successfully created! ID: ${res.complaint?.id || 'HM-NEW'} | Session: ${sessionToken}`);
      setNewDesc('');
      setShowDispatchForm(false);
      setTimeout(() => setSubmitSuccessMsg(''), 6000);
    }
  };

  return (
    <div>
      {/* Live Header Banner */}
      <NeuCard className="neu-card-convex" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #e6ecf5, #d9e2ec)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="neu-card-sm" style={{ padding: '0.85rem', color: '#16a34a', borderRadius: '16px' }}>
              <Radio size={28} className="animate-pulse" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
                  Live Citizen Submissions & Session Audit History
                </h2>
                <NeuBadge status="REALTIME FIREBASE SYNC" />
              </div>
              <p style={{ fontSize: '0.83rem', color: '#64748b' }}>
                Real-time stream of defect reports submitted by citizens via Flutter Mobile App or Web Simulator. Polled every 3s.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <NeuButton
              primary
              onClick={() => setShowDispatchForm(!showDispatchForm)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700 }}
            >
              <FileText size={16} />
              {showDispatchForm ? 'Close Form' : '+ File New Live Citizen Report'}
            </NeuButton>

            <NeuButton
              onClick={fetchComplaints}
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700 }}
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Sync Stream
            </NeuButton>
          </div>
        </div>

        {submitSuccessMsg && (
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', color: '#166534', fontWeight: 700, fontSize: '0.85rem' }}>
            {submitSuccessMsg}
          </div>
        )}
      </NeuCard>

      {/* Quick Citizen Dispatch Simulator Form */}
      {showDispatchForm && (
        <NeuCard className="neu-card-convex" style={{ marginBottom: '1.5rem', borderLeft: '5px solid #2563eb' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            ➕ Dispatch New Live Citizen Defect Report (Simulator)
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            Submit a new report dynamically. It will capture a real-time session token, upload image metadata to Cloudinary, store in persistent localStorage, and sync to Firebase!
          </p>

          <form onSubmit={handleCreateLiveReport} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                Defect Category
              </label>
              <select
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="neu-select"
                style={{ width: '100%', fontWeight: 700 }}
              >
                <option value="Pothole">Pothole / Road Damage</option>
                <option value="Garbage Overflow">Garbage Overflow / Solid Waste</option>
                <option value="Water Leakage">Water Pipe Leakage / Supply</option>
                <option value="Streetlight Failure">Streetlight Outage / Electrical</option>
                <option value="Drainage Blockage">Drainage Overflow / Sewage</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                Location / Geofence Address
              </label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="neu-input"
                style={{ width: '100%' }}
                required
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                Issue Description & Details
              </label>
              <input
                type="text"
                placeholder="e.g. Deep pothole right near Agrahara main junction, urgent repair needed."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="neu-input"
                style={{ width: '100%' }}
                required
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                Evidence Image URL (Cloudinary / Preset URL)
              </label>
              <input
                type="text"
                value={newImgUrl}
                onChange={(e) => setNewImgUrl(e.target.value)}
                className="neu-input"
                style={{ width: '100%', fontSize: '0.8rem' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <NeuButton type="button" onClick={() => setShowDispatchForm(false)}>
                Cancel
              </NeuButton>
              <NeuButton primary type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Dispatching...' : '🚀 Submit Live Citizen Report'}
              </NeuButton>
            </div>
          </form>
        </NeuCard>
      )}

      {/* Metric Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Total Live Citizen Submissions</p>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb', marginTop: '0.2rem' }}>
            {liveComplaints.length}
          </h3>
          <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700 }}>● Active Session Storage</span>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>AI Defect Scan Confidence</p>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#16a34a', marginTop: '0.2rem' }}>
            94%
          </h3>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Feature Vector Classifier</span>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Assigned Ward Division</p>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#d97706', marginTop: '0.2rem' }}>
            Ward 42
          </h3>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Devaraja / Agrahara MCC</span>
        </NeuCard>

        <NeuCard className="neu-card-convex">
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Active SLA Escrow Clocks</p>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#7c3aed', marginTop: '0.2rem' }}>
            24 Hours
          </h3>
          <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700 }}>On-Track Escalation Monitoring</span>
        </NeuCard>
      </div>

      {/* Live Citizen Submissions List */}
      <NeuCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              Citizen Dispatches & Persistent Session Log ({liveComplaints.length})
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
              All submitted evidence reports remain stored across sessions and logouts.
            </p>
          </div>
          <NeuBadge status="PERSISTENT LOCALSTORAGE + FIREBASE" />
        </div>

        {liveComplaints.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            <Smartphone size={40} style={{ margin: '0 auto 1rem auto', color: '#94a3b8' }} />
            <h4 style={{ fontWeight: 700 }}>No live citizen reports ingested yet</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Open the Flutter Mobile App and capture photo evidence to see it pop up here dynamically.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {liveComplaints.map((c, idx) => (
              <div
                key={c.id || idx}
                className="neu-card-sm"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  borderLeft: '4px solid #2563eb',
                  background: '#ffffff'
                }}
              >
                {/* Left: Thumbnail & Details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '280px', flex: 1 }}>
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#f1f5f9',
                      cursor: 'pointer',
                      border: '1px solid #cbd5e1'
                    }}
                    onClick={() => setSelectedImg(c.before_image_url)}
                  >
                    <img
                      src={c.before_image_url}
                      alt="Citizen Evidence"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                        {c.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '0.1rem 0.5rem', borderRadius: '6px' }}>
                        Ticket #{c.id}
                      </span>
                      {idx === 0 && <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff', background: '#16a34a', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>🆕 LATEST DISPATCH</span>}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600, marginBottom: '0.3rem' }}>
                      📍 {c.address}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#1e293b', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                        👤 Citizen: <strong>{c.user_name || 'Citizen Mysuru'}</strong>
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.72rem' }}>
                        📧 {c.user_email || 'citizen@civicroute.org'}
                      </span>
                      {c.user_phone && (
                        <span style={{ color: '#64748b', fontSize: '0.72rem' }}>
                          📞 {c.user_phone}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.73rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span>🔑 Session Token: <code style={{ color: '#2563eb', fontWeight: 700 }}>{c.session_token || `SES-${c.id}`}</code></span>
                      <span>• AI Score: <strong>{c.ai_confidence || 94}%</strong></span>
                      <span>• Dept: <strong>{c.department_name || 'Road Engineering'}</strong></span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>• 🔒 10-Day Audit Persisted</span>
                    </div>
                  </div>
                </div>

                {/* Right: Status & Action Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <NeuBadge status={c.status || 'In Progress'} />
                    <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 800, marginTop: '0.3rem' }}>
                      ⏱️ {c.sla_info?.remaining_formatted || '24h SLA remaining'}
                    </div>
                  </div>

                  <NeuButton
                    primary
                    onClick={() => onSelectComplaint(c.id)}
                    style={{ padding: '0.65rem 1.1rem', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    Inspect & Dispatch
                    <ArrowRight size={16} />
                  </NeuButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </NeuCard>

      {/* Image Preview Modal */}
      {selectedImg && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '1.5rem'
        }}>
          <div className="neu-card" style={{ maxWidth: '600px', width: '100%', padding: '1.5rem', borderRadius: '24px', position: 'relative' }}>
            <button
              onClick={() => setSelectedImg(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 800 }}
            >
              ✕
            </button>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
              Citizen Evidence Photograph (Cloudinary CDN)
            </h3>
            <img src={selectedImg} alt="Evidence" style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '16px' }} />
          </div>
        </div>
      )}
    </div>
  );
};
