import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <Hero/>
      <ProductList/>
      <Footer/>
    </div>
    
  );
}

export default App;
