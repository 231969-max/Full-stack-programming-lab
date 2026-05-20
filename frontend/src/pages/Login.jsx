import React, { useState } from "react";
import axios from "axios";
import { Lock, User, Key, ShieldAlert } from "lucide-react";

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!username || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin 
        ? { username, password } 
        : { username, password, role };

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);

      if (isLogin) {
        const { accessToken, user } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        onLoginSuccess(user, accessToken);
      } else {
        setSuccess("Registration successful! You can now log in.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Something went wrong. Please check if backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-panel auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Lock size={32} />
            <span>HealthStream</span>
          </div>
          <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem" }}>
            {isLogin ? "Welcome back! Enter credentials" : "Create a new medical portal account"}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
          >
            Login
          </button>
          <button 
            type="button" 
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
          >
            Register
          </button>
        </div>

        {/* Notification Blocks */}
        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#34d399",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            marginBottom: "20px"
          }}>
            {success}
          </div>
        )}

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "hsl(var(--text-muted))"
              }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ paddingLeft: "42px" }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Key size={18} style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "hsl(var(--text-muted))"
              }} />
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "42px" }}
              />
            </div>
          </div>

          {/* Role selector on Register tab */}
          {!isLogin && (
            <div className="form-group animate-fade-in">
              <label className="form-label">Account Role</label>
              <select 
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  background: "rgba(10, 15, 28, 0.5)",
                  cursor: "pointer"
                }}
              >
                <option value="user" style={{ background: "hsl(var(--bg-surface))" }}>Standard User (View Only)</option>
                <option value="admin" style={{ background: "hsl(var(--bg-surface))" }}>Administrator (Full Access)</option>
              </select>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: "100%", marginTop: "12px", height: "48px" }}
          >
            {loading ? "Authenticating..." : isLogin ? "Sign In" : "Register Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
