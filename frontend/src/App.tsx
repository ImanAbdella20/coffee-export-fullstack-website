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
import CartsPage from './pages/cart/cartsPage';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import CheckoutPage from './pages/checkout/ShippingForm';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/fireBaseConfig';
import ShippingForm from './pages/checkout/ShippingForm';
import OrderHistory from './pages/account/OrderHistory';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // First useEffect for authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);  // Empty dependency array ensures this only runs once on mount

  // Second useEffect for loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulating a loading delay
    }, 2500); // 2.5 second delay

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this only runs once on mount


  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Show loading screen */}
        {loading ? (
          <CoffeeLoading />
        ) : (
          <>
            <Header user={user} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />

                {/* About routes */}
                <Route path="/about" element={<AboutPage />}/>

                {/* Products routes */}
                <Route path="/products" element={<ProductPage />}/>
                 
                {/* Blog routes */}
                <Route path="/blog" element={<BlogPage />}>
                  <Route path="recipes" element={<Recipes />} />
                  <Route path="stories" element={<BlogStories />} />
                </Route>

                {/* Contact route */}
                <Route path="/contacts" element={<Contact />} />
                <Route path="/cart" element={<CartsPage  user={user} setCartCount={function (value: React.SetStateAction<number>): void {
                    throw new Error('Function not implemented.');
                  } } />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart-history" element={< OrderHistory/>} />
                {/* Pass the onSubmit function to ShippingForm */}
                <Route path="/shippingform" element={<ShippingForm />} />
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
