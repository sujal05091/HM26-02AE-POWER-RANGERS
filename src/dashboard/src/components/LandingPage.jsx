import React, { useState } from 'react';
import { Shield, MapPin, Cpu, Clock, CheckCircle2, ArrowRight, Lock, Download, Smartphone, Layers, BarChart3, AlertTriangle, Users, FileText, Globe, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { NeuButton, NeuBadge } from './NeumorphicUI';

export const LandingPage = ({ onOpenLogin }) => {
  const [showApkModal, setShowApkModal] = useState(false);
  const [apkDownloadUrl, setApkDownloadUrl] = useState('https://drive.google.com/file/d/YOUR_APK_DRIVE_ID/view?usp=sharing');

  return (
    <div style={{ minHeight: '100vh', background: '#e6ecf5', color: '#1e293b', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. TOP STICKY GLASSMORPHIC NAVBAR */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(230, 236, 245, 0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
        padding: '0.9rem 2rem'
      }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Brand Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="neu-card-sm" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              color: '#2563eb'
            }}>
              <Shield size={26} />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.02em', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                CivicRoute <span style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 800, background: '#eff6ff', padding: '0.15rem 0.6rem', borderRadius: '999px', border: '1px solid #bfdbfe' }}>GOVERNANCE PORTAL</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                Mysuru City Corporation (MCC) • Polygon Jurisdiction Engine V3
              </div>
            </div>
          </div>

          {/* Nav Links & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <NeuBadge status="Team HM26-02AE" />
              <NeuBadge status="SMVITM Udupi AI & DS" />
            </div>

            <NeuButton
              onClick={() => setShowApkModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.1rem',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#16a34a'
              }}
            >
              <Smartphone size={16} />
              Download Mobile App (.APK)
            </NeuButton>
            
            <NeuButton
              primary
              onClick={onOpenLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.35rem',
                fontWeight: 800,
                fontSize: '0.88rem'
              }}
            >
              <Lock size={16} />
              Sign In to Portal →
            </NeuButton>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{ padding: '4rem 1.5rem 3.5rem 1.5rem', textAlign: 'center', maxWidth: '1140px', margin: '0 auto' }}>
        
        {/* Status Beacon */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', padding: '0.4rem 1rem', borderRadius: '999px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 10px #16a34a', display: 'inline-block' }} />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.02em' }}>
            LIVE MYSURU DISPATCH ENGINE ACTIVE • 14 WARDS SYNCED WITH FIREBASE
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'clamp(2.3rem, 5.2vw, 4rem)',
          fontWeight: 900,
          lineHeight: 1.12,
          letterSpacing: '-0.035em',
          color: '#0f172a',
          marginBottom: '1.4rem'
        }}>
          Autonomous Civic Infrastructure <br />
          <span style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0284c7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Routing & SLA Accountability Platform
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: '1.15rem',
          color: '#475569',
          maxWidth: '840px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.65,
          fontWeight: 500
        }}>
          Empowering citizens and municipal officers in Mysuru through 5-second AI Vision defect classification, dynamic OpenStreetMap spatial geofencing, automatic Senior AEE dispatch, and transparent 24-hour SLA escrow clock monitoring.
        </p>

        {/* Hero Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', marginBottom: '3.5rem' }}>
          
          <NeuButton
            primary
            onClick={onOpenLogin}
            style={{
              padding: '1.05rem 2.25rem',
              fontSize: '1.02rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <Shield size={20} />
            Officer & Admin Portal Sign In
            <ArrowRight size={18} />
          </NeuButton>

          <NeuButton
            onClick={() => setShowApkModal(true)}
            style={{
              padding: '1.05rem 2.25rem',
              fontSize: '1.02rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: '#16a34a'
            }}
          >
            <Download size={20} />
            Download Citizen App (.APK)
          </NeuButton>

        </div>

        {/* 3. LIVE SYSTEM METRICS COUNTER CARD */}
        <div className="neu-card" style={{
          borderRadius: '28px',
          padding: '1.75rem 2.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1.75rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#2563eb' }}>14 Wards</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, marginTop: '0.2rem' }}>
              Synced MCC Jurisdictions
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#16a34a' }}>94% Score</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, marginTop: '0.2rem' }}>
              AI Vision Classifier Accuracy
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#d97706' }}>24 Hours</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, marginTop: '0.2rem' }}>
              Enforced SLA Resolution Clock
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#7c3aed' }}>Schema V3</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, marginTop: '0.2rem' }}>
              Polygon Boundary Engine
            </div>
          </div>
        </div>

      </section>

      {/* 4. THE 4-STEP CIVIC ACCOUNTABILITY JOURNEY */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem 4rem 1.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#2563eb', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            END-TO-END CIVIC PIPELINE
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>
            How CivicRoute Eliminates Bounced Complaints
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', marginTop: '0.4rem', maxWidth: '640px', margin: '0.4rem auto 0 auto' }}>
            From citizen photo capture to officer verification and escrow resolution.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          
          <div className="neu-card" style={{ borderRadius: '24px', padding: '1.75rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '1.8rem', fontWeight: 900, color: '#cbd5e1' }}>01</div>
            <div className="neu-card-sm" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', color: '#2563eb', marginBottom: '1.25rem' }}>
              <Cpu size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
              1. Snap & AI Vision Scan
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Citizen captures pothole or garbage evidence in Flutter app. 5-second AI Vision Classifier extracts defect features and scores 94% confidence.
            </p>
          </div>

          <div className="neu-card" style={{ borderRadius: '24px', padding: '1.75rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '1.8rem', fontWeight: 900, color: '#cbd5e1' }}>02</div>
            <div className="neu-card-sm" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', color: '#16a34a', marginBottom: '1.25rem' }}>
              <MapPin size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
              2. OpenStreetMap Geofence
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Device GPS locks on interactive map, uploads photo to Cloudinary CDN, and maps coordinates to MCC Ward 42 polygon boundaries (V3 Schema).
            </p>
          </div>

          <div className="neu-card" style={{ borderRadius: '24px', padding: '1.75rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '1.8rem', fontWeight: 900, color: '#cbd5e1' }}>03</div>
            <div className="neu-card-sm" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', color: '#d97706', marginBottom: '1.25rem' }}>
              <Clock size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
              3. Officer Dispatch & SLA Clock
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Ticket `#HM-1024` auto-assigns to Senior AEE Eng. Rajesh Kumar with active Tender `RM-2042` and starts the 24-hour resolution SLA clock.
            </p>
          </div>

          <div className="neu-card" style={{ borderRadius: '24px', padding: '1.75rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '1.8rem', fontWeight: 900, color: '#cbd5e1' }}>04</div>
            <div className="neu-card-sm" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', color: '#7c3aed', marginBottom: '1.25rem' }}>
              <CheckCircle2 size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
              4. Verified Resolution
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Field team repairs defect, uploads resolution proof photo, and updates ticket status to "Resolved" across mobile and web dashboards in real time.
            </p>
          </div>

        </div>

      </section>

      {/* 5. DEMO LOGIN CREDENTIALS DIRECTORY CARD */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 4rem auto', padding: '0 1.5rem' }}>
        
        <div className="neu-card" style={{ borderRadius: '32px', padding: '2.5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="neu-card-sm" style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', color: '#2563eb', marginBottom: '0.75rem' }}>
              <Users size={32} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
              Official Demonstration Login Credentials
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.3rem' }}>
              Use these credentials on the Governance Portal Login Screen to test officer and administrator role views.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            {/* Officer Credentials Box */}
            <div className="neu-card-sm" style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>👮</span>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#1e293b' }}>Senior AEE Ward Officer</h4>
                  <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700 }}>Ward 42 — Road Engineering Division</div>
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.4rem' }}>
                <strong>Email:</strong> <code>officer.rajesh@mysuru.gov.in</code>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '1rem' }}>
                <strong>Password:</strong> <code>officer123</code>
              </div>
              <NeuButton
                primary
                onClick={onOpenLogin}
                style={{ width: '100%', fontSize: '0.85rem', fontWeight: 700 }}
              >
                Sign In as Officer Rajesh →
              </NeuButton>
            </div>

            {/* Admin Credentials Box */}
            <div className="neu-card-sm" style={{ padding: '1.5rem', background: '#f5f3ff', borderRadius: '20px', border: '1px solid #ddd6fe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>👑</span>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', color: '#1e293b' }}>Chief Governance Director</h4>
                  <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700 }}>Mysuru Municipal Administration</div>
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.4rem' }}>
                <strong>Email:</strong> <code>admin.governance@mysuru.gov.in</code>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '1rem' }}>
                <strong>Password:</strong> <code>admin123</code>
              </div>
              <NeuButton
                onClick={onOpenLogin}
                style={{ width: '100%', fontSize: '0.85rem', fontWeight: 700, color: '#7c3aed' }}
              >
                Sign In as Admin Director →
              </NeuButton>
            </div>

          </div>

        </div>

      </section>

      {/* 6. TEAM CREDITS & ACCREDITATION FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.7)',
        background: '#dbe3ee',
        padding: '3rem 1.5rem 2rem 1.5rem',
        color: '#475569'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                Team Power Rangers (`HM26-02AE`)
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#64748b' }}>
                Developed for HackMysuru 1.0 (72-Hour Civic Hackathon). Built using Flutter 3.x, React 18, Vite, FastAPI Python, Firebase Firestore REST API, and Cloudinary Storage CDN.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                Institution & Department
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#64748b' }}>
                <strong>Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM)</strong><br />
                Bantakal, Udupi, Karnataka.<br />
                Department of Artificial Intelligence & Data Science (AI & DS, 4th Year B.E.).
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                Team Roster
              </div>
              <ul style={{ fontSize: '0.82rem', lineHeight: 1.8, listStyle: 'none', padding: 0, margin: 0, color: '#334155' }}>
                <li>• <strong>Sujal</strong> (Lead) — Full-Stack & Spatial Routing</li>
                <li>• <strong>Hitesh A</strong> (`@Hiteshacu`) — Web Governance Portal</li>
                <li>• <strong>Shama Patwardhan</strong> (`@Shama-patwardhan`) — FastAPI & Firebase</li>
                <li>• <strong>Yathika P Amin</strong> (`@yathikapamin`) — Mobile App & AI Classifier</li>
              </ul>
            </div>

          </div>

          <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.78rem', color: '#64748b' }}>
            CivicRoute Governance Platform • Mysuru City Corporation (MCC) Ward Boundary Schema V3 • 2026
          </div>

        </div>
      </footer>

      {/* 7. APK DOWNLOAD MODAL DIALOG */}
      {showApkModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '1.5rem'
        }}>
          <div className="neu-card" style={{ maxWidth: '520px', width: '100%', padding: '2.5rem', borderRadius: '32px', position: 'relative' }}>
            
            <button
              onClick={() => setShowApkModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                border: 'none',
                background: 'transparent',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#64748b',
                fontWeight: 800
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div className="neu-card-sm" style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', color: '#16a34a', marginBottom: '1rem' }}>
                <Smartphone size={38} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>
                Download Citizen Mobile App (.APK)
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                Install the official CivicRoute Android application on your smartphone.
              </p>
            </div>

            <div className="neu-card-sm" style={{ padding: '1.25rem', background: '#f0fdf4', borderRadius: '16px', border: '1px solid #bbf7d0', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534', marginBottom: '0.4rem' }}>
                📦 App Package Specifications:
              </div>
              <ul style={{ fontSize: '0.8rem', color: '#15803d', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                <li>Package Name: <code>org.civicroute.mobile</code></li>
                <li>Build Version: <code>1.0.0+1 (Release APK)</code></li>
                <li>Requires: Android 8.0 (API level 26) or higher</li>
                <li>Features: Camera capture, 5s AI scan, OpenStreetMap offline pin</li>
              </ul>
            </div>

            <a
              href={apkDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <NeuButton primary style={{ width: '100%', padding: '0.95rem', fontSize: '0.98rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                <Download size={20} />
                Download APK from Google Drive →
              </NeuButton>
            </a>

            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setShowApkModal(false)}
                style={{ border: 'none', background: 'transparent', color: '#64748b', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
