import React from "react";
import { Activity, CloudSun, Newspaper, LogOut, Heart } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, onLogout, user }) {
  const navItems = [
    { id: "patients", label: "Patients Directory", icon: Activity },
    { id: "weather", label: "Weather Forecast", icon: CloudSun },
    { id: "news", label: "News Headlines", icon: Newspaper }
  ];

  return (
    <aside className="glass-panel" style={{
      width: "280px",
      minHeight: "calc(100vh - 40px)",
      margin: "20px 0 20px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "32px 24px",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {/* Brand Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="flex-center" style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            boxShadow: "0 4px 15px var(--primary-glow)"
          }}>
            <Heart size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>HealthStream</h2>
            <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Portal V1.0</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  border: "1px solid transparent",
                  background: isActive ? "rgba(139, 92, 246, 0.08)" : "transparent",
                  borderColor: isActive ? "hsl(var(--primary) / 0.2)" : "transparent",
                  color: isActive ? "white" : "hsl(var(--text-secondary))",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                className={isActive ? "active-nav-link" : ""}
              >
                <Icon size={18} color={isActive ? "hsl(var(--secondary))" : "currentColor"} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile / Logout Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }} />
        
        {/* User Card */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="flex-center" style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "0.9rem",
            fontWeight: 700,
            textTransform: "uppercase"
          }}>
            {user?.username ? user.username.charAt(0) : "U"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "white" }}>{user?.username}</span>
            <span className={`role-indicator ${user?.role}`} style={{ alignSelf: "flex-start", fontSize: "0.65rem", padding: "1px 6px" }}>{user?.role}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="btn btn-secondary"
          style={{ width: "100%", padding: "10px 16px" }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
