'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import API from '../../../services/api';

export default function AdminDashboard() {
  const { user, logout, showToast } = useAuth();
  const router = useRouter();

  // State elements
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('doctors'); // doctors, patients, appointments

  // Doctor Modal Form States
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docEditingId, setDocEditingId] = useState(null); // null means adding, string means editing
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  const [docPassword, setDocPassword] = useState('');
  const [docSpec, setDocSpec] = useState('General');
  const [docPhone, setDocPhone] = useState('');
  const [docExp, setDocExp] = useState(0);
  const [docDept, setDocDept] = useState('General Practice');
  const [docFormLoading, setDocFormLoading] = useState(false);

  // Patient Modal Form States
  const [patModalOpen, setPatModalOpen] = useState(false);
  const [patEditingId, setPatEditingId] = useState(null); // null means adding, string means editing
  const [patName, setPatName] = useState('');
  const [patEmail, setPatEmail] = useState('');
  const [patPassword, setPatPassword] = useState('');
  const [patAge, setPatAge] = useState('');
  const [patGender, setPatGender] = useState('Male');
  const [patPhone, setPatPhone] = useState('');
  const [patAddr, setPatAddr] = useState('');
  const [patDoc, setPatDoc] = useState(''); // Assigned doctor ID
  const [patFormLoading, setPatFormLoading] = useState(false);

  // Protected route check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      router.push('/login');
      return;
    }
    const role = JSON.parse(storedUser).role;
    if (role !== 'Admin') {
      router.push('/login');
    }
  }, [user, router]);

  const loadAdminData = async () => {
    try {
      // 1. Fetch Doctors
      const docRes = await API.get('/users/doctors');
      if (docRes.data.success) setDoctors(docRes.data.data);

      // 2. Fetch Patients
      const patRes = await API.get('/users/patients');
      if (patRes.data.success) setPatients(patRes.data.data);

      // 3. Fetch Appointments
      const appRes = await API.get('/appointments');
      if (appRes.data.success) setAppointments(appRes.data.data);
    } catch (err) {
      console.error('[Admin Load Error]', err);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // =========================================================================
  // DOCTOR CRUD HANDLERS
  // =========================================================================
  const openAddDocModal = () => {
    setDocEditingId(null);
    setDocName('');
    setDocEmail('');
    setDocPassword('');
    setDocSpec('General');
    setDocPhone('');
    setDocExp(0);
    setDocDept('General Practice');
    setDocModalOpen(true);
  };

  const openEditDocModal = (doc) => {
    setDocEditingId(doc._id);
    setDocName(doc.user?.name || '');
    setDocEmail(doc.user?.email || '');
    setDocPassword('password123'); // placeholder
    setDocSpec(doc.specialization);
    setDocPhone(doc.phone || '');
    setDocExp(doc.experience || 0);
    setDocDept(doc.department);
    setDocModalOpen(true);
  };

  const handleDocSubmit = async (e) => {
    e.preventDefault();
    if (!docName || !docEmail || !docSpec || !docDept) return;

    setDocFormLoading(true);
    try {
      if (docEditingId) {
        // Update Doctor
        const res = await API.put(`/users/doctors/${docEditingId}`, {
          name: docName,
          email: docEmail,
          specialization: docSpec,
          phone: docPhone,
          experience: parseInt(docExp),
          department: docDept,
        });

        if (res.data.success) {
          showToast('Doctor record updated successfully!', 'success');
          setDocModalOpen(false);
          loadAdminData();
        }
      } else {
        // Add Doctor
        const res = await API.post('/users/doctors', {
          name: docName,
          email: docEmail,
          password: docPassword || 'password123',
          specialization: docSpec,
          phone: docPhone,
          experience: parseInt(docExp),
          department: docDept,
        });

        if (res.data.success) {
          showToast('Doctor record added successfully!', 'success');
          setDocModalOpen(false);
          loadAdminData();
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Action failed.', 'error');
    } finally {
      setDocFormLoading(false);
    }
  };

  const handleDocDelete = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this doctor? This will also remove their user login credentials.')) return;
    try {
      const res = await API.delete(`/users/doctors/${id}`);
      if (res.data.success) {
        showToast('Doctor record and login deleted.', 'info');
        loadAdminData();
      }
    } catch (err) {
      showToast('Deletion failed.', 'error');
    }
  };

  // =========================================================================
  // PATIENT CRUD HANDLERS
  // =========================================================================
  const openAddPatModal = () => {
    setPatEditingId(null);
    setPatName('');
    setPatEmail('');
    setPatPassword('');
    setPatAge('');
    setPatGender('Male');
    setPatPhone('');
    setPatAddr('');
    setPatDoc(doctors[0]?._id || '');
    setPatModalOpen(true);
  };

  const openEditPatModal = (pat) => {
    setPatEditingId(pat._id);
    setPatName(pat.user?.name || '');
    setPatEmail(pat.user?.email || '');
    setPatPassword('password123'); // placeholder
    setPatAge(pat.age || '');
    setPatGender(pat.gender || 'Male');
    setPatPhone(pat.phone || '');
    setPatAddr(pat.address || '');
    setPatDoc(pat.assignedDoctor?._id || '');
    setPatModalOpen(true);
  };

  const handlePatSubmit = async (e) => {
    e.preventDefault();
    if (!patName || !patEmail) return;

    setPatFormLoading(true);
    try {
      if (patEditingId) {
        // Update Patient
        const res = await API.put(`/users/patients/${patEditingId}`, {
          name: patName,
          email: patEmail,
          age: patAge ? parseInt(patAge) : null,
          gender: patGender,
          phone: patPhone,
          address: patAddr,
          assignedDoctor: patDoc || null,
        });

        if (res.data.success) {
          showToast('Patient record updated successfully!', 'success');
          setPatModalOpen(false);
          loadAdminData();
        }
      } else {
        // Add Patient
        const res = await API.post('/users/patients', {
          name: patName,
          email: patEmail,
          password: patPassword || 'password123',
          age: patAge ? parseInt(patAge) : null,
          gender: patGender,
          phone: patPhone,
          address: patAddr,
          assignedDoctor: patDoc || null,
        });

        if (res.data.success) {
          showToast('Patient record created successfully!', 'success');
          setPatModalOpen(false);
          loadAdminData();
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Action failed.', 'error');
    } finally {
      setPatFormLoading(false);
    }
  };

  const handlePatDelete = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this patient? This will also remove their user login credentials.')) return;
    try {
      const res = await API.delete(`/users/patients/${id}`);
      if (res.data.success) {
        showToast('Patient record deleted.', 'info');
        loadAdminData();
      }
    } catch (err) {
      showToast('Deletion failed.', 'error');
    }
  };

  // =========================================================================
  // APPOINTMENT TRIAGE HANDLERS
  // =========================================================================
  const handleApproveReject = async (appId, status) => {
    try {
      const res = await API.put(`/appointments/${appId}/status`, { status });
      if (res.data.success) {
        showToast(`Appointment successfully ${status}!`, 'success');
        loadAdminData();
      }
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  const handleReassignDoctor = async (appId, doctorId) => {
    try {
      const res = await API.put(`/appointments/${appId}/status`, {
        status: 'Approved', // Auto-approves when re-assigning doctor
        doctorId
      });
      if (res.data.success) {
        showToast('Doctor reassigned & appointment approved!', 'success');
        loadAdminData();
      }
    } catch (err) {
      showToast('Failed to assign doctor.', 'error');
    }
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        Loading administrator workspace details...
      </div>
    );
  }

  // Pending bookings count
  const pendingApps = appointments.filter(a => a.status === 'Pending').length;

  return (
    <div className="layout-wrapper">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>🩺</span> HLApp Admin
        </div>
        
        <ul className="sidebar-menu">
          <li>
            <button 
              className={`sidebar-item-link btn btn-ghost ${activeTab === 'doctors' ? 'active' : ''}`}
              onClick={() => setActiveTab('doctors')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
            >
              🩺 Doctors Registry
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-item-link btn btn-ghost ${activeTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveTab('patients')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
            >
              👤 Patients Registry
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-item-link btn btn-ghost ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
            >
              📅 Consultations Triage {pendingApps > 0 && <span className="notif-badge">{pendingApps}</span>}
            </button>
          </li>
        </ul>

        <div className="sidebar-user">
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user.name}</span>
            <span className="sidebar-user-role">Administrator</span>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-danger" style={{ width: '100%', padding: '10px' }}>
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* MAIN PANEL CONTENT */}
      <main className="main-content">
        <div className="ambient-glow" style={{ top: '10%', right: '10%' }}></div>
        
        {/* STATS HIGHLIGHT */}
        <div className="page-header">
          <div>
            <h2 className="page-title">Hospital Administration Dashboard</h2>
            <p className="page-subtitle">Central registry and clinical appointment mapping controls</p>
          </div>
        </div>

        {/* Global Stats Counter Row */}
        <div className="stat-grid">
          <div className="glass-card stat-card">
            <div>
              <div className="stat-label">Active Doctors</div>
              <div className="stat-val">{doctors.length}</div>
            </div>
            <div className="stat-icon">🩺</div>
          </div>
          <div className="glass-card stat-card">
            <div>
              <div className="stat-label">Registered Patients</div>
              <div className="stat-val">{patients.length}</div>
            </div>
            <div className="stat-icon">👤</div>
          </div>
          <div className="glass-card stat-card">
            <div>
              <div className="stat-label">Pending Bookings</div>
              <div className="stat-val">{pendingApps}</div>
            </div>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' }}>📅</div>
          </div>
          <div className="glass-card stat-card">
            <div>
              <div className="stat-label">Total Appointments</div>
              <div className="stat-val">{appointments.length}</div>
            </div>
            <div className="stat-icon">📊</div>
          </div>
        </div>

        {/* 1. DOCTORS TAB */}
        {activeTab === 'doctors' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>🩺 Specialist Doctors Registry</h3>
              <button onClick={openAddDocModal} className="btn btn-primary">
                ➕ Add Doctor Record
              </button>
            </div>

            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Email Address</th>
                    <th>Specialization</th>
                    <th>Department</th>
                    <th>Exp (yrs)</th>
                    <th>Contact Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc._id}>
                      <td><strong>{doc.user?.name}</strong></td>
                      <td>{doc.user?.email}</td>
                      <td style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{doc.specialization}</td>
                      <td>{doc.department}</td>
                      <td style={{ fontWeight: '600' }}>{doc.experience} yrs</td>
                      <td>{doc.phone || 'N/A'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openEditDocModal(doc)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                            Edit
                          </button>
                          <button onClick={() => handleDocDelete(doc._id)} className="btn btn-ghost btn-danger" style={{ padding: '6px 12px', fontSize: '0.8rem', border: 'none' }}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {doctors.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px' }}>No doctor records in system database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. PATIENTS TAB */}
        {activeTab === 'patients' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>👤 Patients Medical Registry</h3>
              <button onClick={openAddPatModal} className="btn btn-primary">
                ➕ Add Patient Record
              </button>
            </div>

            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Demographics</th>
                    <th>Phone</th>
                    <th>Assigned Primary Doctor</th>
                    <th>Stated History</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((pat) => (
                    <tr key={pat._id}>
                      <td>
                        <strong>{pat.user?.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{pat.user?.email}</div>
                      </td>
                      <td>
                        {pat.age || 'N/A'} yrs &bull; {pat.gender || 'N/A'}
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{pat.address || 'N/A'}</div>
                      </td>
                      <td>{pat.phone || 'N/A'}</td>
                      <td>
                        {pat.assignedDoctor ? (
                          <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                            Dr. {pat.assignedDoctor.user?.name} ({pat.assignedDoctor.specialization})
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No doctor assigned</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {pat.medicalHistory?.map((h, i) => (
                            <span key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>{h}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openEditPatModal(pat)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                            Edit
                          </button>
                          <button onClick={() => handlePatDelete(pat._id)} className="btn btn-ghost btn-danger" style={{ padding: '6px 12px', fontSize: '0.8rem', border: 'none' }}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {patients.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px' }}>No patient records in system database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>📅 Healthcare Appointments & Doctor Assignments Triage</h3>

            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Attending Doctor</th>
                    <th>Preferred Date & Slot</th>
                    <th>Consult Reason</th>
                    <th>Status</th>
                    <th>Triage / Assign Specialist</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id}>
                      <td>
                        <strong>{app.patient?.user?.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>P{app.patient?._id?.substring(15)}</div>
                      </td>
                      <td>
                        <strong>Dr. {app.doctor?.user?.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '600' }}>{app.doctor?.specialization}</div>
                      </td>
                      <td>
                        <strong>{formatDate(app.date)}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Slot: {app.timeSlot}</div>
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{app.reason}</td>
                      <td>
                        <span className={`status-badge status-${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        {app.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => handleApproveReject(app._id, 'Approved')} className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                              Approve
                            </button>
                            <button onClick={() => handleApproveReject(app._id, 'Rejected')} className="btn btn-ghost btn-danger" style={{ padding: '6px 10px', fontSize: '0.75rem', border: 'none' }}>
                              Reject
                            </button>
                          </div>
                        ) : (
                          <select
                            className="input-field"
                            value={app.doctor?._id || ''}
                            onChange={(e) => handleReassignDoctor(app._id, e.target.value)}
                            style={{ padding: '6px 10px', fontSize: '0.8rem', width: '180px', background: '#111827' }}
                            disabled={app.status === 'Completed'}
                          >
                            {doctors.map(d => (
                              <option key={d._id} value={d._id}>{d.user?.name} ({d.specialization})</option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px' }}>No consultations booked in the system.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
           CRUD EDIT/ADD POPUP FORM MODALS
           ========================================================================= */}

        {/* A. DOCTOR ADD/EDIT DIALOG MODAL */}
        {docModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content glass-card">
              <div className="modal-header">
                <h3 className="modal-title">{docEditingId ? '🩺 Edit Doctor Records' : '🩺 Register New specialist Doctor'}</h3>
                <button className="close-btn" onClick={() => setDocModalOpen(false)}>&times;</button>
              </div>

              <form onSubmit={handleDocSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Dr. Nick Riviera"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Login Email</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="e.g. nick@hlapp.com"
                      value={docEmail}
                      onChange={(e) => setDocEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {!docEditingId && (
                  <div className="input-group">
                    <label className="input-label">User Password</label>
                    <input
                      type="password"
                      className="input-field"
                      placeholder="Min 6 characters"
                      value={docPassword}
                      onChange={(e) => setDocPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Specialization Speciality</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Cardiology"
                      value={docSpec}
                      onChange={(e) => setDocSpec(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Hospital Department</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Heart Clinic"
                      value={docDept}
                      onChange={(e) => setDocDept(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Clinical Experience (Years)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={docExp}
                      onChange={(e) => setDocExp(e.target.value)}
                      min={0}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Contact Phone</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. +1-555-0199"
                      value={docPhone}
                      onChange={(e) => setDocPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-primary" disabled={docFormLoading}>
                    {docFormLoading ? 'Saving...' : 'Save Doctor Record'}
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setDocModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* B. PATIENT ADD/EDIT DIALOG MODAL */}
        {patModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content glass-card">
              <div className="modal-header">
                <h3 className="modal-title">{patEditingId ? '👤 Edit Patient Records' : '👤 Register New Patient Record'}</h3>
                <button className="close-btn" onClick={() => setPatModalOpen(false)}>&times;</button>
              </div>

              <form onSubmit={handlePatSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Patient Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Alice Cooper"
                      value={patName}
                      onChange={(e) => setPatName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Login Email</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="e.g. alice@gmail.com"
                      value={patEmail}
                      onChange={(e) => setPatEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {!patEditingId && (
                  <div className="input-group">
                    <label className="input-label">Password</label>
                    <input
                      type="password"
                      className="input-field"
                      placeholder="Min 6 characters"
                      value={patPassword}
                      onChange={(e) => setPatPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Age</label>
                    <input
                      type="number"
                      className="input-field"
                      value={patAge}
                      onChange={(e) => setPatAge(e.target.value)}
                      min={0}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Gender</label>
                    <select
                      className="input-field select-field"
                      value={patGender}
                      onChange={(e) => setPatGender(e.target.value)}
                      style={{ background: '#111827' }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Residential Address</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. 123 Main St, Springfield"
                    value={patAddr}
                    onChange={(e) => setPatAddr(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Contact Phone</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. +1-555-0201"
                      value={patPhone}
                      onChange={(e) => setPatPhone(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Primary Assigned Doctor</label>
                    <select
                      className="input-field select-field"
                      value={patDoc}
                      onChange={(e) => setPatDoc(e.target.value)}
                      style={{ background: '#111827' }}
                    >
                      <option value="">-- Assign Primary Specialist --</option>
                      {doctors.map(d => (
                        <option key={d._id} value={d._id}>{d.user?.name} ({d.specialization})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-primary" disabled={patFormLoading}>
                    {patFormLoading ? 'Saving...' : 'Save Patient Record'}
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setPatModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
