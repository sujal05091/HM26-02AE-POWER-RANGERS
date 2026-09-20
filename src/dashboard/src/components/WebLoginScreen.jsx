import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, Mail, CheckCircle2, AlertCircle, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { NeuButton } from './NeumorphicUI';

export const WebLoginScreen = ({ onBackToLanding }) => {
  const { loginWebUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your official email address and password.');
      return;
    }

    setIsSubmitting(true);

    // Simulate brief authentication verification delay (600ms)
    setTimeout(() => {
      const res = loginWebUser(email, password);
      setIsSubmitting(false);

      if (!res.success) {
        setErrorMsg(res.message);
      }
    }, 600);
  };

  const handleSelectPreset = (presetEmail, presetPassword, roleName) => {
    setErrorMsg(null);
    setEmail(presetEmail);
    setPassword(presetPassword);
    setInfoMsg(`Credentials for ${roleName} pre-filled. Click 'Sign In to Dashboard' below to log in.`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e6ecf5',
      padding: '1.5rem',
      position: 'relative'
    }}>
      
      {/* Back to Public Portal Top Link */}
      {onBackToLanding && (
        <button
          type="button"
          onClick={onBackToLanding}
          className="neu-button-sm"
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            padding: '0.6rem 1rem',
            color: '#475569'
          }}
        >
          <ArrowLeft size={16} />
          Back to Landing Page
        </button>
      )}

      <div className="neu-card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem', borderRadius: '32px' }}>
        
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="neu-card-sm" style={{
            display: 'inline-flex',
            padding: '1rem',
            borderRadius: '50%',
            color: '#2563eb',
            marginBottom: '1rem'
          }}>
            <Shield size={40} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
            Governance Portal Login
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
            Mysuru City Corporation — Official Officer & Admin Sign In
          </p>
        </div>

        {/* Quick Role Credentials Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', display: 'block' }}>
            SELECT CREDENTIALS TO PRE-FILL:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            
            <button
              type="button"
              onClick={() => handleSelectPreset('officer.rajesh@mysuru.gov.in', 'officer123', 'Eng. Rajesh (Officer)')}
              className="neu-button-sm"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.75rem',
                textAlign: 'left',
                border: email.includes('officer') ? '2px solid #2563eb' : '1px solid transparent',
                background: email.includes('officer') ? '#eff6ff' : undefined
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                👮 Officer Login
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>
                officer.rajesh@mysuru.gov.in
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset('admin.governance@mysuru.gov.in', 'admin123', 'Admin Governance')}
              className="neu-button-sm"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0.75rem',
                textAlign: 'left',
                border: email.includes('admin') ? '2px solid #2563eb' : '1px solid transparent',
                background: email.includes('admin') ? '#eff6ff' : undefined
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                👑 Admin Governance
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>
                admin.governance@mysuru.gov.in
              </div>
            </button>

          </div>
        </div>

        {/* Info Banner when preset clicked */}
        {infoMsg && (
          <div style={{
            background: '#eff6ff',
            color: '#1e40af',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid #bfdbfe'
          }}>
            <CheckCircle2 size={16} color="#2563eb" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMsg && (
          <div style={{
            background: '#fef2f2',
            color: '#991b1b',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid #fecaca'
          }}>
            <AlertCircle size={18} color="#dc2626" style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          
          {/* Email Input */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem', display: 'block' }}>
              Official Email Address
            </label>
            <div className="neu-input-wrapper" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', background: '#e6ecf5', borderRadius: '14px' }}>
              <Mail size={18} color="#64748b" style={{ marginRight: '0.75rem' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                placeholder="officer.rajesh@mysuru.gov.in"
                required
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontWeight: 600,
                  color: '#1e293b',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem', display: 'block' }}>
              Password
            </label>
            <div className="neu-input-wrapper" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', background: '#e6ecf5', borderRadius: '14px' }}>
              <Lock size={18} color="#64748b" style={{ marginRight: '0.75rem' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                placeholder="••••••••"
                required
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontWeight: 600,
                  color: '#1e293b',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <NeuButton
            primary
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Verifying Credentials...
              </>
            ) : (
              'Sign In to Dashboard →'
            )}
          </NeuButton>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: '#64748b' }}>
          Mysuru City Corporation Civic Infrastructure Routing Hub
        </div>
      </div>
    </div>
  );
};
