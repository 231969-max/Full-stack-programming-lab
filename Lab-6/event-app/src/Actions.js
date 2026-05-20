import React, { useState } from 'react';
import './Actions.css';

function Actions() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState(false);

  const colors = [
    'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    'linear-gradient(135deg, #0d1117, #161b22, #21262d)',
    'linear-gradient(135deg, #1b1b2f, #162447, #1f4068)',
    'linear-gradient(135deg, #0c0c1d, #1a1a3e, #2d2d5e)',
  ];

  const [colorIndex, setColorIndex] = useState(0);

  const showMessage = () => {
    setMessage(message ? '' : '🎉 Hello from React! Event handling is awesome!');
  };

  const changeBackground = () => {
    const nextIndex = (colorIndex + 1) % colors.length;
    setColorIndex(nextIndex);
    setBgColor(true);
  };

  const showAlert = () => {
    alert('⚡ This is a React alert triggered by onClick event!');
  };

  return (
    <div className="actions-container" style={{ background: bgColor ? colors[colorIndex] : colors[0] }}>
      <div className="actions-card">
        <h1 className="actions-title">Interactive Buttons</h1>
        <p className="actions-subtitle">Event Handling Demo</p>

        <div className="buttons-grid">
          <button className="action-btn btn-message" onClick={showMessage}>
            <span className="btn-emoji">💬</span>
            Show Message
          </button>

          <button className="action-btn btn-background" onClick={changeBackground}>
            <span className="btn-emoji">🎨</span>
            Change Background
          </button>

          <button className="action-btn btn-alert" onClick={showAlert}>
            <span className="btn-emoji">⚡</span>
            Show Alert
          </button>
        </div>

        {message && (
          <div className="message-display">
            <p>{message}</p>
          </div>
        )}

        <p className="hover-hint">✨ Hover over the buttons to see color change!</p>
      </div>
    </div>
  );
}

export default Actions;
