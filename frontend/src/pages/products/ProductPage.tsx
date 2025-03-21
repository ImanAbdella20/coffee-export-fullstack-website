import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import OurCoffees from './OurCoffees';
import Header from '../../component/Header';
import Specialedition from './Specialedition';
import Subscription from './Subscription';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../lib/fireBaseConfig';

const ProductPage = () => {

   const [user, setUser] = useState<User | null>(null);
   const [cartCount, setCartCount] = useState<number>(0);

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
  return (
    <>
  
    <section id="coffees">
        <OurCoffees user={user} setCartCount={setCartCount} />
      </section>

      <section id="special-editions">
      <Specialedition/>
      </section>

      <section id="subscription">
      <Subscription user={null} />
      </section>

    </>
  )
}

export default ProductPage