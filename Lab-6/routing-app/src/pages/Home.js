import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Our Website</h1>
        <p className="hero-subtitle">
          A modern multi-page React application powered by React Router. 
          Explore our pages to learn more about us, our products, and get in touch.
        </p>
        <Link to="/products" className="hero-cta">Explore Products</Link>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Lightning Fast</h3>
          <p>Built with React for blazing fast performance and seamless navigation between pages.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎨</span>
          <h3>Modern Design</h3>
          <p>Clean and elegant UI with glassmorphism effects, gradients, and smooth animations.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔗</span>
          <h3>React Router</h3>
          <p>Client-side routing with React Router DOM for a single-page application experience.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
