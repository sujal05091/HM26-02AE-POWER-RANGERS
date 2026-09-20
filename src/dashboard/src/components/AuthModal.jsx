import React, { useState } from 'react';
import { NeuCard, NeuButton, NeuInput } from './NeumorphicUI';
import { Shield, Lock, X } from 'lucide-react';

export const AuthModal = ({ onClose, onAuthenticate }) => {
  const [email, setEmail] = useState('officer.rajesh@mcc.gov.in');
  const [password, setPassword] = useState('officer123');
  const [role, setRole] = useState('officer');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        onAuthenticate(data.user);
        onClose();
        return;
      }
    } catch (err) {
      console.warn('API Auth offline, logging in as mock officer');
    }
    setLoading(false);
    onAuthenticate({ email, name: role === 'admin' ? 'Admin Officer' : 'Eng. Rajesh Kumar', role });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <NeuCard style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} color="#2563eb" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>CivicRoute Officer Auth</h3>
          </div>
          <NeuButton onClick={onClose} style={{ padding: '0.3rem' }}><X size={16} /></NeuButton>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Select Role</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
              <NeuButton type="button" active={role === 'officer'} onClick={() => setRole('officer')} style={{ flex: 1, fontSize: '0.8rem' }}>
                Field Officer
              </NeuButton>
              <NeuButton type="button" active={role === 'admin'} onClick={() => setRole('admin')} style={{ flex: 1, fontSize: '0.8rem' }}>
                City Admin
              </NeuButton>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Email Address</label>
            <NeuInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="officer@mcc.gov.in" style={{ marginTop: '0.25rem' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Password</label>
            <NeuInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ marginTop: '0.25rem' }} />
          </div>

          <NeuButton type="submit" primary style={{ width: '100%' }}>
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </NeuButton>
        </form>
      </NeuCard>
    </div>
  );
};
