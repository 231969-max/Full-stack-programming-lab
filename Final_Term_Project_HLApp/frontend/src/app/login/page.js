'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // If user is already logged in, redirect them to their respective dashboard
  useEffect(() => {
    if (user) {
      if (user.role === 'Admin') {
        router.push('/dashboard/admin');
      } else if (user.role === 'Doctor') {
        router.push('/dashboard/doctor');
      } else {
        router.push('/dashboard/patient');
      }
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setFormLoading(true);
    const result = await login(email, password);
    setFormLoading(false);
  };

  // Help testers easily log in with pre-seeded credentials!
  const fillCredentials = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('password123');
  };

  return (
    <div className="auth-container">
      <div className="ambient-glow" style={{ top: '10%', left: '10%' }}></div>
      <div className="ambient-glow" style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(20, 184, 166, 0.05) 50%, rgba(0,0,0,0) 100%)' }}></div>
      
      <div className="auth-box glass-card">
        <div className="auth-header">
          <h1 className="auth-title">Healthcare Portal</h1>
          <p className="auth-subtitle">Sign in to manage appointments & consultations</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="e.g. john@hlapp.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={formLoading}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {formLoading ? 'Verifying Credentials...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>
            Register as Patient
          </Link>
        </p>

        {/* Demo Accounts Quick-Click box */}
        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-glass)',
        }}>
          <p style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: '700',
            color: 'var(--color-primary)',
            letterSpacing: '0.05em',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            Quick Seeder Accounts (Password: password123)
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => fillCredentials('admin@hlapp.com')}
              style={{ padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'space-between', display: 'flex', width: '100%' }}
            >
              <span>🔑 Admin: System Admin</span>
              <span style={{ color: 'var(--color-primary)' }}>admin@hlapp.com</span>
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => fillCredentials('doctor1@hlapp.com')}
              style={{ padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'space-between', display: 'flex', width: '100%' }}
            >
              <span>🩺 Doctor: Dr. John Smith (Cardiology)</span>
              <span style={{ color: 'var(--color-primary)' }}>doctor1@hlapp.com</span>
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => fillCredentials('patient1@hlapp.com')}
              style={{ padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'space-between', display: 'flex', width: '100%' }}
            >
              <span>👤 Patient: Alice Cooper (34 yrs)</span>
              <span style={{ color: 'var(--color-primary)' }}>patient1@hlapp.com</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
