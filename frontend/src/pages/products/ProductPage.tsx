import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OurCoffees from './OurCoffees';

const ProductPage = () => {
  return (
    <Router>
       <Routes>
              <Route path="/coffees" element={<OurCoffees />} />
             
            </Routes>
    </Router>
  )
}

export default ProductPage