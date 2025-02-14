import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import OurCoffees from './OurCoffees';

const ProductPage = () => {
  return (
    <>
    <h1>product page</h1>
    <Outlet/>
    </>
  )
}

export default ProductPage