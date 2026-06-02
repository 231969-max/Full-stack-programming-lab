'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient medical glow effects */}
      <div className="ambient-glow" style={{ top: '-10%', left: '20%', width: '500px', height: '500px', opacity: 0.8 }}></div>
      <div className="ambient-glow" style={{ bottom: '-10%', right: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(20, 184, 166, 0.05) 50%, rgba(0,0,0,0) 100%)', opacity: 0.8 }}></div>

      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        zIndex: 1,
      }}>
        {/* Modern Medical Logo Icon */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'rgba(20, 184, 166, 0.1)',
          border: '1px solid rgba(20, 184, 166, 0.25)',
          color: 'var(--color-primary)',
          fontSize: '2.5rem',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-glow)'
        }}>
          🩺
        </div>

        <h1 style={{
          fontSize: '3.6rem',
          fontWeight: '800',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, var(--color-primary) 100%)',
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          marginBottom: '20px',
          letterSpacing: '-0.02em'
        }}>
          Secure Healthcare <br/>
          <span style={{ color: 'var(--color-primary)' }}>HLApp Ecosystem</span>
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--color-text-muted)',
          maxWidth: '600px',
          margin: '0 auto 40px auto',
          lineHeight: '1.6'
        }}>
          An integrated full-stack clinical platform. Book online appointments with specialist doctors, track real-time physical checkups, view active treatment cycles, and manage medication calendars.
        </p>

        {/* Portal Entry Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '60px'
        }}>
          <Link href="/login" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
            Enter Patient & Staff Portal 🔑
          </Link>
          <Link href="/register" className="btn btn-ghost" style={{ padding: '16px 36px', fontSize: '1.05rem', borderRadius: '10px' }}>
            Register as Patient 👤
          </Link>
        </div>

        {/* Features Bullet Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          textAlign: 'left'
        }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🔐</div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '6px' }}>JWT Secure Auth</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Strict role-based access controls dividing Admin, Doctor, and Patient dashboards.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📈</div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '6px' }}>Treatment Cycles</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Full lifecycle tracking including vital signs checkups and discharge states.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>💊</div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '6px' }}>Prescription Calendar</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Integrated medication calendars, customized dosages, and scheduling feeds.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🔔</div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '6px' }}>Alert Simulation</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Automated in-app push alerts for medication schedules and follow-up reminders.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        Next.js Frontend + Express Node Backend + persistent MongoDB Storage
      </div>
    </div>
  );
}
