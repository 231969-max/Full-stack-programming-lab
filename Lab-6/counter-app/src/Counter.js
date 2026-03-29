import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h1 className="counter-title">Counter App</h1>
        <p className="counter-subtitle">Built with React useState</p>

        <div className="counter-display">
          <span className={`count-value ${count === 0 ? 'zero' : ''}`}>{count}</span>
        </div>

        <div className="counter-buttons">
          <button className="btn btn-decrement" onClick={decrement} disabled={count === 0}>
            <span className="btn-icon">−</span>
            Decrement
          </button>
          <button className="btn btn-reset" onClick={reset}>
            <span className="btn-icon">↺</span>
            Reset
          </button>
          <button className="btn btn-increment" onClick={increment}>
            <span className="btn-icon">+</span>
            Increment
          </button>
        </div>

        <p className="counter-info">
          {count === 0 ? '✨ Count cannot go below zero' : `Current count: ${count}`}
        </p>
      </div>
    </div>
  );
}

export default Counter;
