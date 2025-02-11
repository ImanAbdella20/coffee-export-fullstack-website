import React, { useState, useEffect } from 'react';
import './index.css';
import HomePage from './pages/HomePage';
import CoffeeLoading from './component/coffeloading/CoffeeLoading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., data fetching, or content rendering)
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading screen after coffee animation completes
    }, 2500); // Matches the duration of the coffee animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      {loading ? <CoffeeLoading /> : <HomePage />}
    </div>
  );
}

export default App;
