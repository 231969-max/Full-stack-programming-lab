import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page">
      <div className="not-found">
        <div className="not-found-code">404</div>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-home">Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
