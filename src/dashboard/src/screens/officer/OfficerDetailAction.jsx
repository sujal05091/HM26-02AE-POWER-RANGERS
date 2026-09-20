import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NeuCard, NeuBadge, NeuButton } from '../../components/NeumorphicUI';
import { ResponsibilityChain } from '../../components/ResponsibilityChain';
import { SlaTimer } from '../../components/SlaTimer';
import { Timeline } from '../../components/Timeline';
import { EvidenceModal } from '../../components/EvidenceModal';
import { Shield, MapPin, UserCheck, FileText, CheckCircle, AlertTriangle, Upload, HelpCircle } from 'lucide-react';

export const OfficerDetailAction = ({ complaintId }) => {
  const { complaints, updateStatus } = useApp();
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [afterUrl, setAfterUrl] = useState('');
  const [notes, setNotes] = useState('');

  const complaint = complaints.find(c => c.id === complaintId) || complaints[0];

  if (!complaint) return null;

  const handleMarkResolved = () => {
    const fakeAfter = afterUrl || "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80";
    updateStatus(complaint.id, "Resolved", notes || "Work completed and verified on site.", fakeAfter);
    setShowUploadModal(false);
  };

  return (
    <div>
      {/* Action Header Card */}
      <NeuCard style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>
                {complaint.category} — Ticket #{complaint.id}
              </h2>
              <NeuBadge status={complaint.status} />
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>📍 {complaint.address}</p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <NeuButton onClick={() => updateStatus(complaint.id, 'In Progress', 'Field team dispatched.')} style={{ color: '#d97706' }}>
              Dispatch & Start Work
            </NeuButton>

            <NeuButton primary onClick={() => setShowUploadModal(true)}>
              <Upload size={16} /> Mark Resolved & Upload Proof
            </NeuButton>

            <NeuButton onClick={() => setShowEvidenceModal(true)}>
              View Evidence Proof
            </NeuButton>

            <NeuButton onClick={() => updateStatus(complaint.id, 'Escalated', 'Escalated to Executive Engineer due to technical complexity.')} style={{ color: '#dc2626' }}>
              Escalate
            </NeuButton>
          </div>
        </div>
      </NeuCard>

      {/* Main 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left Column: Complaint Details & Citizen Evidence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <NeuCard>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>Citizen Evidence & Problem Description</h3>
            <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '1rem', lineHeight: '1.5' }}>
              "{complaint.description}"
            </p>

            <div className="neu-card-sm" style={{ padding: '0.5rem', borderRadius: '12px', height: '220px', overflow: 'hidden' }}>
              <img
                src={complaint.before_image_url || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"}
                alt="Citizen Evidence"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          </NeuCard>

          <SlaTimer slaInfo={complaint.sla_info} slaHours={complaint.sla_hours} />
          
          <Timeline timeline={complaint.timeline} />
        </div>

        {/* Right Column: Accountability Chain & Transparent Routing Rationale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ResponsibilityChain complaint={complaint} />

          {/* Transparent Routing Rationale Checklist */}
          <NeuCard>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={18} color="#2563eb" />
              Why Was This Complaint Routed Here?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
                <strong style={{ fontSize: '0.82rem', color: '#16a34a' }}>✓ Geographic Boundary Match</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569' }}>GPS pins directly inside Ward 42 Agrahara limits.</p>
              </div>

              <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
                <strong style={{ fontSize: '0.82rem', color: '#16a34a' }}>✓ Category Regulation Rule</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569' }}>Issue type '{complaint.category}' maps to MCC Road Engineering Department.</p>
              </div>

              <div className="neu-card-sm" style={{ background: '#e6ecf5' }}>
                <strong style={{ fontSize: '0.82rem', color: '#16a34a' }}>✓ Active Contractor Assignment</strong>
                <p style={{ fontSize: '0.78rem', color: '#475569' }}>Covered under active tender contract RM-2042.</p>
              </div>
            </div>
          </NeuCard>
        </div>
      </div>

      {/* Upload Resolution Modal */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <NeuCard style={{ width: '100%', maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Upload Resolution Proof & Notes</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>After Repair Photo Image URL</label>
              <input
                type="text"
                className="neu-input"
                placeholder="https://... (or leave blank for sample)"
                value={afterUrl}
                onChange={(e) => setAfterUrl(e.target.value)}
                style={{ marginTop: '0.25rem' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Action Notes</label>
              <textarea
                className="neu-input"
                rows="3"
                placeholder="Describe ground repair details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ marginTop: '0.25rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <NeuButton onClick={() => setShowUploadModal(false)}>Cancel</NeuButton>
              <NeuButton primary onClick={handleMarkResolved}>Submit Resolution Proof</NeuButton>
            </div>
          </NeuCard>
        </div>
      )}

      {/* Before/After Evidence Inspection Modal */}
      {showEvidenceModal && (
        <EvidenceModal
          complaint={complaint}
          onClose={() => setShowEvidenceModal(false)}
          onReopen={() => {
            updateStatus(complaint.id, "Reopened", "Citizen flagged issue as persisting.");
            setShowEvidenceModal(false);
          }}
        />
      )}
    </div>
  );
};
