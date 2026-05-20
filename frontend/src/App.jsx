import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Weather from "./pages/Weather";
import News from "./pages/News";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("patients");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for cached user session on mount
    const cachedUser = localStorage.getItem("user");
    const cachedToken = localStorage.getItem("accessToken");
    
    if (cachedUser && cachedToken) {
      setUser(JSON.parse(cachedUser));
      setToken(cachedToken);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    setActiveTab("patients"); // Reset to home tab on login
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken("");
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--bg-base))" }}>
        <span style={{ fontSize: "1.1rem", color: "hsl(var(--text-secondary))" }}>Initializing Platform...</span>
      </div>
    );
  }

  // Render Auth screen if not authenticated
  if (!user || !token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="dashboard-layout">
      {/* Visual Navigation Sidebar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        user={user} 
      />

      {/* Main Workspace */}
      <main className="main-content">
        {/* Workspace Profile Header */}
        <header className="dashboard-header">
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, textTransform: "capitalize" }}>
              {activeTab} Workspace
            </h1>
            <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", marginTop: "4px" }}>
              HealthStream Integrated Services Portal
            </p>
          </div>

          <div className="user-badge">
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "white" }}>
              Hi, <strong>{user.username}</strong>
            </span>
            <span className={`role-indicator ${user.role}`}>
              {user.role}
            </span>
          </div>
        </header>

        {/* Dynamic Workspace Workspace Rendering */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {activeTab === "patients" && <Patients user={user} token={token} />}
          {activeTab === "weather" && <Weather token={token} />}
          {activeTab === "news" && <News token={token} />}
        </div>
      </main>
    </div>
  );
}
