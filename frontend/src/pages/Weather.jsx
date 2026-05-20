import React, { useState } from "react";
import axios from "axios";
import { Search, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Info, ShieldAlert } from "lucide-react";

export default function Weather({ token }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWeather(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Failed to fetch weather forecast. Make sure city is valid and server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const cond = condition?.toLowerCase() || "";
    if (cond.includes("sunny") || cond.includes("clear")) {
      return <Sun size={80} color="#fbbf24" />;
    }
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("storm")) {
      return <CloudRain size={80} color="#60a5fa" />;
    }
    if (cond.includes("snow")) {
      return <CloudSnow size={80} color="#93c5fd" />;
    }
    if (cond.includes("wind")) {
      return <Wind size={80} color="#a5f3fc" />;
    }
    return <Cloud size={80} color="#cbd5e1" />;
  };

  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Search Row */}
      <form onSubmit={handleSearch} className="weather-search-box">
        <input
          type="text"
          className="form-input"
          placeholder="Search live weather for any city (e.g., Karachi, London, Tokyo, Paris)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: "0 28px", height: "46px" }}>
          {loading ? "Searching..." : <Search size={18} />}
        </button>
      </form>

      {/* Error Banner */}
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
          gap: "10px",
          maxWidth: "600px"
        }}>
          <ShieldAlert size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Dashboard Panels */}
      {weather ? (
        <div className="weather-dashboard animate-fade-in">
          {/* Left panel: Core atmospheric details */}
          <div className="glass-panel weather-hero">
            <span style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "hsl(var(--secondary))"
            }}>Current Weather</span>
            
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "8px", color: "white" }}>
              {weather.cityName}
            </h2>

            <div className="weather-icon-lg flex-center">
              {getWeatherIcon(weather.condition)}
            </div>

            <div className="weather-temp">{weather.temp}°C</div>
            
            <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "white", textTransform: "capitalize" }}>
              {weather.condition}
            </h3>

            {weather.isSimulated && (
              <span style={{
                fontSize: "0.75rem",
                color: "hsl(var(--text-muted))",
                background: "rgba(255,255,255,0.03)",
                padding: "4px 10px",
                borderRadius: "4px",
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <Info size={12} />
                Offline High-Fidelity Simulation
              </span>
            )}
          </div>

          {/* Right panel: Auxiliary statistics grids */}
          <div className="weather-stats">
            <div className="glass-panel weather-stat-card">
              <div className="flex-center" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "hsl(var(--secondary) / 0.15)", margin: "0 auto 12px auto" }}>
                <Thermometer size={18} color="hsl(var(--secondary))" />
              </div>
              <span className="form-label" style={{ fontSize: "0.75rem" }}>Feels Like</span>
              <div className="weather-stat-value">{weather.feelsLike}°C</div>
              <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>Atmospheric sensible</span>
            </div>

            <div className="glass-panel weather-stat-card">
              <div className="flex-center" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "hsl(var(--primary) / 0.15)", margin: "0 auto 12px auto" }}>
                <Droplets size={18} color="hsl(var(--primary))" />
              </div>
              <span className="form-label" style={{ fontSize: "0.75rem" }}>Humidity Level</span>
              <div className="weather-stat-value">{weather.humidity}%</div>
              <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>Water vapor ratio</span>
            </div>

            <div className="glass-panel weather-stat-card" style={{ gridColumn: "span 2" }}>
              <div className="flex-center" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "hsl(var(--accent) / 0.15)", margin: "0 auto 12px auto" }}>
                <Wind size={18} color="hsl(var(--accent))" />
              </div>
              <span className="form-label" style={{ fontSize: "0.75rem" }}>Wind Velocity</span>
              <div className="weather-stat-value">{weather.windSpeed} m/s</div>
              <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>Horizontal speed of moving air currents</span>
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="empty-state" style={{ maxWidth: "600px" }}>
            <Sun size={48} color="hsl(var(--text-muted))" style={{ marginBottom: "16px" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "6px" }}>Weather System Ready</h3>
            <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem" }}>
              Enter a city name above to inspect live temperature and weather records dynamically from our REST API.
            </p>
          </div>
        )
      )}
    </div>
  );
}
