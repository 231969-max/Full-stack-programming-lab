import React, { useState } from 'react';
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setSubmittedData({ name, email });
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">User Form</h1>
        <p className="form-subtitle">State & Event Handling Demo</p>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>

        {submittedData && (
          <div className="submitted-data">
            <h3>Submitted Data</h3>
            <div className="data-row">
              <span className="data-label">Name:</span>
              <span className="data-value">{submittedData.name}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Email:</span>
              <span className="data-value">{submittedData.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;
