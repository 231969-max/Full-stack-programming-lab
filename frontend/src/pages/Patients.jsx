import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Edit2, Trash2, X, Phone, ShieldAlert, Heart, Calendar } from "lucide-react";

export default function Patients({ user, token }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  
  // Form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [contact, setContact] = useState("");

  const isAdmin = user?.role === "admin";

  const fetchPatients = async () => {
    try {
      setError("");
      const response = await axios.get("http://localhost:5000/api/patients", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch patients. Make sure backend is running.");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [token]);

  const handleOpenAddModal = () => {
    setEditingPatient(null);
    setName("");
    setAge("");
    setDisease("");
    setContact("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (patient) => {
    setEditingPatient(patient);
    setName(patient.name);
    setAge(patient.age);
    setDisease(patient.disease);
    setContact(patient.contact);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !age || !disease || !contact) {
      setError("Please fill in all fields.");
      return;
    }

    const payload = { name, age: Number(age), disease, contact };

    try {
      if (editingPatient) {
        // UPDATE patient
        const response = await axios.put(
          `http://localhost:5000/api/patients/${editingPatient._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Patient updated successfully!");
      } else {
        // CREATE patient
        const response = await axios.post(
          "http://localhost:5000/api/patients",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Patient added successfully!");
      }
      setIsModalOpen(false);
      fetchPatients();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to perform operation.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient record?")) {
      return;
    }
    setError("");
    setSuccess("");

    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Patient deleted successfully!");
      fetchPatients();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete patient.");
    }
  };

  // Filter patients by search query
  const filteredPatients = patients.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      p.disease?.toLowerCase().includes(term) ||
      p.contact?.includes(term)
    );
  });

  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Utility Notifications */}
      {error && (
        <div style={{
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#f87171",
          padding: "14px 18px",
          borderRadius: "10px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <ShieldAlert size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#34d399",
          padding: "14px 18px",
          borderRadius: "10px",
          marginBottom: "24px"
        }}>
          {success}
        </div>
      )}

      {/* Control Row */}
      <div className="search-bar-row">
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={18} style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "hsl(var(--text-muted))"
          }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, disease or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "46px" }}
          />
        </div>

        {isAdmin && (
          <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ gap: "6px" }}>
            <Plus size={18} />
            Add Patient
          </button>
        )}
      </div>

      {/* Patient Directory Grid */}
      {filteredPatients.length > 0 ? (
        <div className="patients-grid">
          {filteredPatients.map((patient) => (
            <div key={patient._id} className="glass-panel patient-card animate-fade-in">
              <div>
                <div className="patient-header">
                  <div className="flex-center patient-avatar">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "white" }}>
                      {patient.name}
                    </h3>
                    <span style={{ fontSize: "0.8rem", color: "hsl(var(--secondary))", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                      <Calendar size={12} />
                      Age {patient.age}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span className="form-label" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Diagnosed Condition</span>
                    <span style={{ color: "white", fontSize: "0.95rem", fontWeight: 500 }}>{patient.disease}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span className="form-label" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Emergency Contact</span>
                    <span style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Phone size={14} color="hsl(var(--text-muted))" />
                      {patient.contact}
                    </span>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <div className="patient-actions">
                  <button
                    onClick={() => handleOpenEditModal(patient)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: "8px 12px", fontSize: "0.85rem", gap: "6px" }}
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="btn btn-danger"
                    style={{ padding: "8px 14px" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={48} color="hsl(var(--text-muted))" style={{ marginBottom: "16px" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "6px" }}>No Patient Records Found</h3>
          <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem" }}>
            {patients.length === 0 
              ? "There are currently no patients in the database directory." 
              : "No search results match your criteria."}
          </p>
        </div>
      )}

      {/* glass edit/add Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                {editingPatient ? "Edit Patient Record" : "Add New Patient"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 45"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Disease/Condition</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Diabetes, Hypertension"
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. +92 300 1234567"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  {editingPatient ? "Save Changes" : "Create Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
