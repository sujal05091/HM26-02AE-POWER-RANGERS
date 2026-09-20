import React from 'react';
import { NeuCard, NeuButton } from './NeumorphicUI';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export const EvidenceModal = ({ complaint, onClose, onReopen }) => {
  if (!complaint) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <NeuCard style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>
            Resolution Evidence Verification — Ticket #{complaint.id}
          </h3>
          <NeuButton onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={18} />
          </NeuButton>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.5rem' }}>
              🔴 Citizen Before Evidence
            </h4>
            <div className="neu-card-sm" style={{ padding: '0.4rem', height: '220px', borderRadius: '10px' }}>
              <img
                src={complaint.before_image_url || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"}
                alt="Before repair"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>Captured by Citizen upon filing.</p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a', marginBottom: '0.5rem' }}>
              🟢 Officer After Evidence
            </h4>
            <div className="neu-card-sm" style={{ padding: '0.4rem', height: '220px', borderRadius: '10px' }}>
              {complaint.after_image_url ? (
                <img
                  src={complaint.after_image_url}
                  alt="After repair"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                  <AlertCircle size={32} />
                  <span style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Pending Field Upload</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
              Uploaded by: {complaint.officer_name || "Field Officer"}
            </p>
          </div>
        </div>

        <div className="neu-card-sm" style={{ marginBottom: '1.5rem', background: '#e6ecf5' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Citizen Verification Feedback</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
            Is the civic issue resolved to your satisfaction at the ground location?
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <NeuButton onClick={onReopen} style={{ color: '#dc2626' }}>
            <AlertCircle size={16} />
            Issue Still Exists (Reopen)
          </NeuButton>

          <NeuButton primary onClick={onClose}>
            <CheckCircle size={16} />
            Verified & Satisfied
          </NeuButton>
        </div>
      </NeuCard>
    </div>
  );
};
