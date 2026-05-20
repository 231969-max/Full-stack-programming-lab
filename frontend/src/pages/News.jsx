import React, { useState, useEffect } from "react";
import axios from "axios";
import { Newspaper, ExternalLink, Calendar, ShieldAlert } from "lucide-react";

export default function News({ token }) {
  const [country, setCountry] = useState("US");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const countries = [
    { code: "US", name: "United States" },
    { code: "PK", name: "Pakistan" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" }
  ];

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/news/${country.toLowerCase()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArticles(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Failed to fetch top news headlines. Please verify server connectivity."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [country, token]);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="animate-fade-in" style={{ flex: 1 }}>
      {/* Country Selection Pill Row */}
      <div className="news-country-bar">
        {countries.map((c) => (
          <button
            key={c.code}
            onClick={() => setCountry(c.code)}
            className={`country-pill ${country === c.code ? "active" : ""}`}
          >
            {c.name} ({c.code})
          </button>
        ))}
      </div>

      {/* Error Indicator */}
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

      {/* Headline Cards List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <span style={{ fontSize: "1.1rem", color: "hsl(var(--text-secondary))" }}>Loading top headlines...</span>
        </div>
      ) : articles.length > 0 ? (
        <div className="news-grid">
          {articles.map((article, idx) => (
            <div key={idx} className="glass-panel news-card animate-fade-in">
              <div>
                <h3 className="news-title">{article.title}</h3>
              </div>

              <div>
                <div className="news-meta">
                  <span className="news-source-tag">{article.sourceName}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={12} />
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    width: "100%",
                    marginTop: "16px",
                    padding: "8px 12px",
                    fontSize: "0.85rem",
                    gap: "6px"
                  }}
                >
                  <ExternalLink size={14} />
                  Read Full Article
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Newspaper size={48} color="hsl(var(--text-muted))" style={{ marginBottom: "16px" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "6px" }}>No Headlines Available</h3>
          <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem" }}>
            We could not pull the latest news feeds for this country code right now.
          </p>
        </div>
      )}
    </div>
  );
}
