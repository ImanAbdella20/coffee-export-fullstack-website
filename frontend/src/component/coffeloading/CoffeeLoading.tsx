import React, { useState, useEffect } from 'react';
import './CoffeeLoading.css';

const CoffeeLoading = () => {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTick(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="coffee-loading">
      <div className="coffee-cup">
        <div className="coffee-fill"></div>
      </div>
      <div className="steam">
        <div className="steam-line steam-line1"></div>
        <div className="steam-line steam-line2"></div>
        <div className="steam-line steam-line3"></div>
      </div>
      <div className="hand"></div>
      {showTick && <div className="tick">✔</div>}
    </div>
  );
};

export default CoffeeLoading;
