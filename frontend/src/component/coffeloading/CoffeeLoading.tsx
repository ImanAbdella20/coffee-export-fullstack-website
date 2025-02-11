import React, { useState, useEffect } from 'react';
import './CoffeeLoading.css'; // Make sure you import the CSS

const CoffeeLoading = () => {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    // After animation ends, show the tick
    const timer = setTimeout(() => {
      setShowTick(true);
    }, 2500); // Adjust based on animation duration
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
      {/* Add the hand element here */}
      <div className="hand"></div>

      {showTick && <div className="tick">✔</div>}
    </div>
  );
};

export default CoffeeLoading;
