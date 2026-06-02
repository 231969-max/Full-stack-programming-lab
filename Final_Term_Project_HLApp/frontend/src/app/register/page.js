'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  
  const { register, user } = useAuth();
  const router = useRouter();

  // Redirect if logged in
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
    if (!name || !email || !password) return;
    
    setFormLoading(true);
    const extraFields = {
      age: age ? parseInt(age) : null,
      gender,
      phone,
      address,
      medicalHistory: [],
    };
    
    await register(name, email, password, 'Patient', extraFields);
    setFormLoading(false);
  };

  return (
    <div className="auth-container" style={{ padding: '40px 24px' }}>
      <div className="ambient-glow" style={{ top: '10%', right: '10%' }}></div>
      <div className="ambient-glow" style={{ bottom: '10%', left: '10%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(20, 184, 166, 0.05) 50%, rgba(0,0,0,0) 100%)' }}></div>
      
      <div className="auth-box glass-card" style={{ maxWidth: '560px' }}>
        <div className="auth-header">
          <h1 className="auth-title">Patient Registration</h1>
          <p className="auth-subtitle">Create a secure medical record and book appointments</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="input-field"
                placeholder="e.g. Alice Cooper"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="e.g. alice@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                className="input-field"
                placeholder="e.g. +1-555-0201"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="input-field"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={0}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="input-field select-field"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male" style={{ background: '#1e293b' }}>Male</option>
                <option value="Female" style={{ background: '#1e293b' }}>Female</option>
                <option value="Other" style={{ background: '#1e293b' }}>Other</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="address">Residential Address</label>
            <input
              type="text"
              id="address"
              className="input-field"
              placeholder="e.g. 123 Main St, Springfield"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={formLoading}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {formLoading ? 'Creating Secure Profile...' : 'Complete Registration'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>
            Sign In here
          </Link>
        </p>

      </div>
    </div>
  );
}
