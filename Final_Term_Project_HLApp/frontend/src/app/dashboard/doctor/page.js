'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import API from '../../../services/api';

export default function DoctorDashboard() {
  const { user, profile, logout, showToast } = useAuth();
  const router = useRouter();

  // State elements
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('schedule'); // schedule, patients, treatments, prescriptions
  
  // Selection states
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  // Vitals & Consultation Modal States
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [activeAppId, setActiveAppId] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [temp, setTemp] = useState('');
  const [bp, setBp] = useState('');
  const [hr, setHr] = useState('');
  const [weight, setWeight] = useState('');
  const [consultNotes, setConsultNotes] = useState('');

  // Prescription Modal States
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [prescAppId, setPrescAppId] = useState(null);
  const [medsList, setMedsList] = useState([{ name: '', dosage: '', frequency: 'Twice daily', duration: '7 days' }]);
  const [prescNotes, setPrescNotes] = useState('');

  // Follow-up Modal States
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [followUpTreatId, setFollowUpTreatId] = useState(null);
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');

  // Date Formatting Helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Protected route check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      router.push('/login');
      return;
    }
    const role = JSON.parse(storedUser).role;
    if (role !== 'Doctor') {
      router.push('/login');
    }
  }, [user, router]);

  const loadDoctorData = async () => {
    if (!profile) return;
    try {
      // 1. Fetch appointments
      const appRes = await API.get('/appointments');
      if (appRes.data.success) setAppointments(appRes.data.data);

      // 2. Fetch assigned patients
      const patRes = await API.get('/users/patients');
      if (patRes.data.success) {
        // filter patients that have this doctor assigned
        const assigned = patRes.data.data.filter(p => p.assignedDoctor?._id === profile._id);
        setPatients(assigned);
      }

      // 3. Fetch treatments
      const treatRes = await API.get('/treatments');
      if (treatRes.data.success) setTreatments(treatRes.data.data);

      // 4. Fetch prescriptions
      const prescRes = await API.get('/treatments/prescriptions/all');
      if (prescRes.data.success) setPrescriptions(prescRes.data.data);

    } catch (err) {
      console.error('[Doctor Load Error]', err);
    }
  };

  useEffect(() => {
    loadDoctorData();
  }, [profile]);

  // Appointment Approvals
  const handleAppointmentStatus = async (appId, status) => {
    try {
      const res = await API.put(`/appointments/${appId}/status`, { status });
      if (res.data.success) {
        showToast(`Appointment successfully ${status}!`, 'success');
        loadDoctorData();
      }
    } catch (err) {
      showToast('Action failed.', 'error');
    }
  };

  // Launch Consultation Vitals Form
  const openConsultModal = (appId) => {
    setActiveAppId(appId);
    setDiagnosis('');
    setTemp('');
    setBp('');
    setHr('');
    setWeight('');
    setConsultNotes('');
    setConsultModalOpen(true);
  };

  const submitConsultation = async (e) => {
    e.preventDefault();
    if (!diagnosis) {
      showToast('Diagnosis is required.', 'error');
      return;
    }

    try {
      const res = await API.post('/treatments', {
        appointmentId: activeAppId,
        diagnosis,
        physicalCheckup: {
          temperature: temp,
          bloodPressure: bp,
          heartRate: hr,
          weight,
          notes: consultNotes
        }
      });

      if (res.data.success) {
        showToast('Consultation completed & Treatment cycle initiated!', 'success');
        setConsultModalOpen(false);
        loadDoctorData();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Initiating treatment failed.', 'error');
    }
  };

  // Prescription Management
  const addMedField = () => {
    setMedsList([...medsList, { name: '', dosage: '', frequency: 'Twice daily', duration: '7 days' }]);
  };

  const handleMedChange = (index, field, val) => {
    const updated = [...medsList];
    updated[index][field] = val;
    setMedsList(updated);
  };

  const removeMedField = (index) => {
    if (medsList.length === 1) return;
    setMedsList(medsList.filter((_, idx) => idx !== index));
  };

  const openPrescriptionModal = (appId) => {
    setPrescAppId(appId);
    setMedsList([{ name: '', dosage: '', frequency: 'Twice daily', duration: '7 days' }]);
    setPrescNotes('');
    setPrescriptionModalOpen(true);
  };

  const submitPrescription = async (e) => {
    e.preventDefault();
    if (medsList.some(m => !m.name || !m.dosage)) {
      showToast('Please provide name and dosage for all medications.', 'error');
      return;
    }

    try {
      const res = await API.post('/treatments/prescriptions/new', {
        appointmentId: prescAppId,
        medications: medsList,
        notes: prescNotes
      });

      if (res.data.success) {
        showToast('Prescription added & medication reminders dispatched!', 'success');
        setPrescriptionModalOpen(false);
        loadDoctorData();
      }
    } catch (err) {
      showToast('Failed to add prescription.', 'error');
    }
  };

  // Follow-up visit scheduler
  const openFollowUpModal = (treatId) => {
    setFollowUpTreatId(treatId);
    setFollowUpDate('');
    setFollowUpNotes('');
    setFollowUpModalOpen(true);
  };

  const submitFollowUp = async (e) => {
    e.preventDefault();
    if (!followUpDate) return;

    try {
      const res = await API.post(`/treatments/${followUpTreatId}/followups`, {
        visitDate: followUpDate,
        notes: followUpNotes
      });

      if (res.data.success) {
        showToast('Follow-up scheduled successfully!', 'success');
        setFollowUpModalOpen(false);
        loadDoctorData();
      }
    } catch (err) {
      showToast('Failed to schedule follow-up.', 'error');
    }
  };

  const updateTreatmentStatus = async (treatId, status) => {
    try {
      const res = await API.put(`/treatments/${treatId}`, { treatmentStatus: status });
      if (res.data.success) {
        showToast(`Patient successfully updated to: ${status}`, 'success');
        loadDoctorData();
      }
    } catch (err) {
      showToast('Failed to update treatment status.', 'error');
    }
  };

  const viewPatientHistory = async (patientId) => {
    try {
      const res = await API.get(`/treatments/patient/${patientId}/history`);
      if (res.data.success) {
        setSelectedPatientHistory(res.data.data);
        setHistoryModalOpen(true);
      }
    } catch (err) {
      showToast('Failed to load patient history timeline.', 'error');
    }
  };

  if (!user || !profile) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
        Loading doctor workspace details...
      </div>
    );
  }

  return (
    <div className="layout-wrapper">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>🩺</span> HLApp Clinical
        </div>
        
        <ul className="sidebar-menu">
          <li>
            <button 
              className={`sidebar-item-link btn btn-ghost ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
            >
              📅 Consult Schedule
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-item-link btn btn-ghost ${activeTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveTab('patients')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
            >
              👤 Assigned Patients
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-item-link btn btn-ghost ${activeTab === 'treatments' ? 'active' : ''}`}
              onClick={() => setActiveTab('treatments')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
            >
              🏥 Active Treatments
            </button>
          </li>
          <li>
            <button 
              className={`sidebar-item-link btn btn-ghost ${activeTab === 'prescriptions' ? 'active' : ''}`}
              onClick={() => setActiveTab('prescriptions')}
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
            >
              📋 Prescriptions Issued
            </button>
          </li>
        </ul>

        <div className="sidebar-user">
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user.name}</span>
            <span className="sidebar-user-role">{profile.specialization}</span>
          </div>
          <button onClick={logout} className="btn btn-ghost btn-danger" style={{ width: '100%', padding: '10px' }}>
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <div className="ambient-glow" style={{ top: '10%', right: '10%' }}></div>
        
        {/* PAGE TITLE */}
        <div className="page-header">
          <div>
            <h2 className="page-title">{user.name}</h2>
            <p className="page-subtitle">Department: {profile.department} &bull; Clinical Room</p>
          </div>
        </div>

        {/* 1. CONSULT SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>📅 Consultation Schedule & Appointments Triage</h3>
            
            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id}>
                      <td>
                        <strong>{app.patient?.user?.name || 'Walk-in Patient'}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: P{app.patient?._id?.substring(15)}</div>
                      </td>
                      <td style={{ fontWeight: '600' }}>{formatDate(app.date)}</td>
                      <td>{app.timeSlot}</td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{app.reason}</td>
                      <td>
                        <span className={`status-badge status-${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {app.status === 'Pending' && (
                            <>
                              <button onClick={() => handleAppointmentStatus(app._id, 'Approved')} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                                Approve
                              </button>
                              <button onClick={() => handleAppointmentStatus(app._id, 'Rejected')} className="btn btn-ghost btn-danger" style={{ padding: '6px 12px', fontSize: '0.8rem', border: 'none' }}>
                                Reject
                              </button>
                            </>
                          )}
                          {app.status === 'Approved' && (
                            <button onClick={() => openConsultModal(app._id)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                              🩺 Consult & Checkup
                            </button>
                          )}
                          {app.status === 'Completed' && (
                            <>
                              <button onClick={() => openPrescriptionModal(app._id)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                                💊 Prescribe
                              </button>
                              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', alignSelf: 'center', marginLeft: '10px' }}>Consulted</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px' }}>No appointments booked in your schedule.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. ASSIGNED PATIENTS TAB */}
        {activeTab === 'patients' && (
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>👤 Attending / Assigned Patients</h3>
            
            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Contact Phone</th>
                    <th>Demographics</th>
                    <th>Records</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((pat) => (
                    <tr key={pat._id}>
                      <td>
                        <strong>{pat.user?.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Email: {pat.user?.email}</div>
                      </td>
                      <td>{pat.age || 'N/A'} yrs</td>
                      <td>{pat.gender || 'N/A'}</td>
                      <td>{pat.phone || 'N/A'}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{pat.address || 'N/A'}</td>
                      <td>
                        <button onClick={() => viewPatientHistory(pat._id)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          🗄️ History Vault
                        </button>
                      </td>
                    </tr>
                  ))}
                  {patients.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px' }}>No patients assigned to you yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ACTIVE TREATMENTS TAB */}
        {activeTab === 'treatments' && (
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>🏥 Patients Under Clinical Treatment Supervision</h3>
            
            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Diagnosis</th>
                    <th>Vitals (BP / Temp / Weight)</th>
                    <th>Treatment Status</th>
                    <th>Follow-ups</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.map((t) => (
                    <tr key={t._id}>
                      <td>
                        <strong>{t.patient?.user?.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Init: {new Date(t.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td>
                        <strong>{t.diagnosis}</strong>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        🌡️ {t.physicalCheckup?.temperature || 'N/A'} &bull; 💓 {t.physicalCheckup?.bloodPressure || 'N/A'} &bull; ⚖️ {t.physicalCheckup?.weight || 'N/A'}
                      </td>
                      <td>
                        <select
                          className="input-field"
                          value={t.treatmentStatus}
                          onChange={(e) => updateTreatmentStatus(t._id, e.target.value)}
                          style={{ padding: '6px 12px', fontSize: '0.8rem', width: '160px', background: '#111827' }}
                        >
                          <option value="Under Treatment">Under Treatment</option>
                          <option value="Recovered">Recovered</option>
                          <option value="Discharged">Discharged</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => openFollowUpModal(t._id)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          📅 Schedule ({t.followUps?.length || 0})
                        </button>
                      </td>
                      <td>
                        <button onClick={() => viewPatientHistory(t.patient?._id)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '0.8rem', border: 'none' }}>
                          🗄️ Vault
                        </button>
                      </td>
                    </tr>
                  ))}
                  {treatments.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px' }}>No active treatment cycles recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. PRESCRIPTIONS TAB */}
        {activeTab === 'prescriptions' && (
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>📋 Prescriptions Dispensed Timeline</h3>
            
            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Medications & Dosages</th>
                    <th>Dispensed Date</th>
                    <th>Advice / Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <strong>{p.patient?.user?.name}</strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {p.medications?.map((med, idx) => (
                            <span key={idx} style={{ background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.2)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem' }}>
                              💊 {med.name} - {med.dosage} ({med.frequency})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ fontWeight: '600' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{p.notes || 'No special advice notes.'}</td>
                    </tr>
                  ))}
                  {prescriptions.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px' }}>No prescriptions issued yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
           MODALS RENDER ENGINE
           ========================================================================= */}

        {/* A. CONSULTATION / VITALS RECORDING MODAL */}
        {consultModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content glass-card">
              <div className="modal-header">
                <h3 className="modal-title">🩺 Vitals Recording & Diagnosis Consultation</h3>
                <button className="close-btn" onClick={() => setConsultModalOpen(false)}>&times;</button>
              </div>

              <form onSubmit={submitConsultation}>
                <div className="input-group">
                  <label className="input-label">Clinical Diagnosis</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Acute Bronchitis / High blood pressure flare-up"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Body Temperature (🌡️ °F/°C)</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. 98.6 °F"
                      value={temp}
                      onChange={(e) => setTemp(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Blood Pressure (💓 BP)</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. 120/80 mmHg"
                      value={bp}
                      onChange={(e) => setBp(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Heart Rate (🫀 bpm)</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. 72 bpm"
                      value={hr}
                      onChange={(e) => setHr(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Weight (⚖️ kg/lbs)</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. 70 kg"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Consultation Assessment / Treatment Notes</label>
                  <textarea
                    className="input-field"
                    placeholder="Describe patient condition, clinical findings, etc..."
                    rows={3}
                    value={consultNotes}
                    onChange={(e) => setConsultNotes(e.target.value)}
                    style={{ resize: 'none', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-primary">
                    Initiate Treatment Cycle
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setConsultModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* B. PRESCRIPTION WRITING MODAL */}
        {prescriptionModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content glass-card" style={{ maxWidth: '680px' }}>
              <div className="modal-header">
                <h3 className="modal-title">💊 Medical Prescription Compiler</h3>
                <button className="close-btn" onClick={() => setPrescriptionModalOpen(false)}>&times;</button>
              </div>

              <form onSubmit={submitPrescription}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Medication Schedule List</p>
                  <button type="button" onClick={addMedField} className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    ➕ Add Drug Row
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
                  {medsList.map((med, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 32px', gap: '8px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                      <input
                        type="text"
                        placeholder="Drug (e.g. Paracetamol)"
                        className="input-field"
                        value={med.name}
                        onChange={(e) => handleMedChange(idx, 'name', e.target.value)}
                        required
                        style={{ padding: '8px' }}
                      />
                      <input
                        type="text"
                        placeholder="Dose (e.g. 500mg)"
                        className="input-field"
                        value={med.dosage}
                        onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                        required
                        style={{ padding: '8px' }}
                      />
                      <select
                        className="input-field"
                        value={med.frequency}
                        onChange={(e) => handleMedChange(idx, 'frequency', e.target.value)}
                        style={{ padding: '8px', background: '#111827' }}
                      >
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="As needed (PRN)">As needed (PRN)</option>
                      </select>
                      <select
                        className="input-field"
                        value={med.duration}
                        onChange={(e) => handleMedChange(idx, 'duration', e.target.value)}
                        style={{ padding: '8px', background: '#111827' }}
                      >
                        <option value="3 days">3 days</option>
                        <option value="5 days">5 days</option>
                        <option value="7 days">7 days</option>
                        <option value="14 days">14 days</option>
                        <option value="30 days">30 days</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeMedField(idx)}
                        disabled={medsList.length === 1}
                        style={{ background: 'transparent', border: 'none', color: 'var(--color-danger)', fontSize: '1.2rem', cursor: 'pointer' }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="input-group">
                  <label className="input-label">Dosage intake advice notes</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Take after meals, stay hydrated."
                    value={prescNotes}
                    onChange={(e) => setPrescNotes(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-primary">
                    Issue Prescription
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setPrescriptionModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* C. FOLLOW-UP SCHEDULING MODAL */}
        {followUpModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content glass-card">
              <div className="modal-header">
                <h3 className="modal-title">📅 Schedule Patient Follow-Up Visit</h3>
                <button className="close-btn" onClick={() => setFollowUpModalOpen(false)}>&times;</button>
              </div>

              <form onSubmit={submitFollowUp}>
                <div className="input-group">
                  <label className="input-label">Select Follow-Up Date</label>
                  <input
                    type="date"
                    className="input-field"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Follow-Up Consult Instructions</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Check vital response to hypertension medication."
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-primary">
                    Schedule Follow-up
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setFollowUpModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* D. PATIENT HISTORY DIALOG MODAL */}
        {historyModalOpen && selectedPatientHistory && (
          <div className="modal-overlay">
            <div className="modal-content glass-card" style={{ maxWidth: '640px' }}>
              <div className="modal-header">
                <h3 className="modal-title">🗄️ Medical Record Vault: {selectedPatientHistory.patient?.user?.name}</h3>
                <button className="close-btn" onClick={() => setHistoryModalOpen(false)}>&times;</button>
              </div>

              <div style={{ fontSize: '0.9rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
                <div><strong>Age:</strong> {selectedPatientHistory.patient?.age || 'N/A'} yrs</div>
                <div><strong>Gender:</strong> {selectedPatientHistory.patient?.gender || 'N/A'}</div>
                <div><strong>Phone:</strong> {selectedPatientHistory.patient?.phone || 'N/A'}</div>
                <div><strong>Address:</strong> {selectedPatientHistory.patient?.address || 'N/A'}</div>
              </div>

              <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '6px' }}>
                <h4 style={{ color: 'var(--color-primary)', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '16px' }}>Previous Diagnoses & Vitals</h4>
                
                <div className="timeline" style={{ paddingLeft: '20px', marginTop: '0' }}>
                  {selectedPatientHistory.treatments?.map((t) => (
                    <div key={t._id} className="timeline-item" style={{ marginBottom: '24px' }}>
                      <div className="timeline-dot" style={{ left: -18 }}></div>
                      <div className="timeline-time" style={{ fontSize: '0.7rem' }}>{new Date(t.createdAt).toLocaleDateString()}</div>
                      <h5 style={{ fontWeight: '700', fontSize: '0.95rem' }}>{t.diagnosis}</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Status: {t.treatmentStatus}</p>
                      {t.physicalCheckup && (
                        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', padding: '8px', borderRadius: '6px', fontSize: '0.8rem', marginTop: '6px' }}>
                          Temp: {t.physicalCheckup.temperature || 'N/A'} | BP: {t.physicalCheckup.bloodPressure || 'N/A'} | Heart Rate: {t.physicalCheckup.heartRate || 'N/A'}
                          {t.physicalCheckup.notes && <div style={{ borderTop: '1px solid var(--border-glass)', marginTop: '4px', paddingTop: '4px' }}>Notes: {t.physicalCheckup.notes}</div>}
                        </div>
                      )}
                    </div>
                  ))}
                  {selectedPatientHistory.treatments?.length === 0 && (
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No clinical treatments recorded.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
