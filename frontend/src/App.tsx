import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import CoffeeLoading from './component/coffeloading/CoffeeLoading';
import Header from './component/Header';
import Footer from './component/Footer';
import AboutPage from './pages/about/AboutPage';
import ProductPage from './pages/products/ProductPage';
import OurStory from './pages/about/OurStory';
import Team from './pages/about/Team';
import Mission from './pages/about/Mission';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <CoffeeLoading />
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />}>
                <Route path="story" element={<OurStory />} />
                <Route path="team" element={<Team />} />
                <Route path="missionVision" element={<Mission />} />
              </Route>
              <Route path="/products" element={<ProductPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
