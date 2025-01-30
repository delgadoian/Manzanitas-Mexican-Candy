import React from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import ProductList from './ProductList';

function Homepage() {

 
  return (
    <div>
      <Hero/>
      <ProductList/>
    </div>
  )
}

export default Homepage
