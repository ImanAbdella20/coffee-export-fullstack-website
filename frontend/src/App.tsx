import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/about/AboutPage';
import ProductPage from './pages/products/ProductPage';
import CoffeeLoading from './component/coffeloading/CoffeeLoading';
import OurCoffees from './pages/products/OurCoffees';
import BlogPage from './pages/blog/BlogPage';
import OurStory from './pages/about/OurStory';
import Team from './pages/about/Team';
import Mission from './pages/about/Mission';
import Contact from './pages/contact/contact';
import SpecialEdition from './pages/products/Specialedition';
import Recipes from './pages/blog/Recipes';
import BlogStories from './pages/blog/BlogStories';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Simulating a 2.5-second loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Show loading screen */}
        {loading ? (
          <CoffeeLoading />
        ) : (
          <>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />

                {/* About routes */}
                <Route path="/about" element={<AboutPage />}/>   

                {/* Products routes */}
                <Route path="/products" element={<ProductPage />}>
                  <Route path="coffee" element={<OurCoffees />} />
                  <Route path="specialedition" element={<SpecialEdition />} />
                </Route>

                {/* Blog routes */}
                <Route path="/blog" element={<BlogPage />}>
                  <Route path="recipes" element={<Recipes />} />
                  <Route path="stories" element={<BlogStories />} />
                </Route>

                {/* Contact route */}
                <Route path="/contacts" element={<Contact />} />
              </Routes>
              <section id="contact" className="scroll-section">
                <Contact />
              </section>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
