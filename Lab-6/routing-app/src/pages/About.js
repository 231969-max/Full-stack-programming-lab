import React from 'react';

function About() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">About Us</h1>
        <p className="page-desc">Learn more about our mission, values, and what drives us to build amazing products.</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <h3>🚀 Our Mission</h3>
          <p>
            We are dedicated to building innovative web solutions that combine cutting-edge technology 
            with beautiful design. Our goal is to create seamless digital experiences that delight users 
            and empower businesses to grow.
          </p>
        </div>

        <div className="about-card">
          <h3>💡 What We Do</h3>
          <p>
            This website is a demonstration of React Router — a powerful library for building 
            multi-page applications in React. We use modern tools like React, React Router DOM, 
            and CSS to create fast, responsive, and visually stunning web applications.
          </p>
        </div>

        <div className="about-card">
          <h3>🎯 Our Values</h3>
          <p>
            We believe in clean code, elegant design, and user-first thinking. Every component we 
            build is crafted with care, ensuring responsive layouts, smooth transitions, and 
            accessible interfaces for all users.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
