import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import OurCoffees from './OurCoffees';
import Header from '../../component/Header';
import Specialedition from './Specialedition';
import Subscription from './Subscription';

const ProductPage = () => {
  return (
    <>
  
    <section id="our-story">
        <OurCoffees/>
      </section>

      <section id="our-team">
      <Specialedition/>
      </section>

      <section id="our-team">
      <Subscription/>
      </section>

    </>
  )
}

export default ProductPage