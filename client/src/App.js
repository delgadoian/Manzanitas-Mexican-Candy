// Main entry point to the application
// Routes to the different pages
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage.js';
import Shop from './components/Shop.js'
import Contact from './components/Contact.js'
import Footer from './components/Footer.js'
import Signup from './components/Signup.js';
import Login from './components/Login.js';
// Pages that we are linking to
import About from './components/About.js';
import './App.css';
import CartPage from './components/CartPage.js';
import NoPage from './components/NoPage.js';

function App() {
  return (
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NoPage/>}/>
    </Routes>
    <Footer/>
   </Router>

    
  );
}

export default App;
