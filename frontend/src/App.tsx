import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/about/AboutPage';
import ProductPage from './pages/products/ProductPage';
import CoffeeLoading from './component/coffeloading/CoffeeLoading';
import BlogPage from './pages/blog/BlogPage';
import Recipes from './pages/blog/Recipes';
import BlogStories from './pages/blog/BlogStories';
import Contact from './pages/contact/contact';
import CartsPage from './pages/cart/cartsPage';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import ShippingForm from './pages/checkout/ShippingForm';
import OrderHistory from './pages/orderhistory/OrderHistory';
import PaymentProcess from './pages/payment/PaymentProcess';
import Setting from './pages/setting/Setting';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/fireBaseConfig';
import Profile from './pages/setting/Profile';
import ShippingAddress from './pages/setting/ShippingAddress';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState<number>(0); // Define cartCount state

  // Handle user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem('authToken');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {loading ? (
          <CoffeeLoading />
        ) : (
          <>
            <Header user={user} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />

                {/* About Section */}
                <Route path="/about" element={<AboutPage />} />

                {/* Products Section */}
                <Route path="/products" element={<ProductPage />} />

                {/* Contact Section */}
                <Route path="/contact" element={<Contact />} />

                {/* Cart */}
                <Route
                  path="/cart"
                  element={<CartsPage user={user} setCartCount={setCartCount} />} 
                />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Checkout */}
                <Route path="/shippingform" element={<ShippingForm />} />
                <Route path="/paymentprocess" element={<PaymentProcess />} />

                {/* Order History */}
                <Route path="/orderhistory" element={<OrderHistory />} />

                {/* Settings */}
                <Route path="/settings" element={<Setting user={user} />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/settingshipaddress" element={<ShippingAddress/>} />
                <Route path="/contacts" element={<Contact/>} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
