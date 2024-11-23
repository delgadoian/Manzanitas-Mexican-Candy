// Main entry point to the application
// Routes to the different pages
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage.js';
import Shop from './components/Shop.js'
import Contact from './components/Contact.js'
import Footer from './components/Footer.js'
// Pages that we are linking to
import About from './components/About.js';
import './App.css';

function App() {
  return (
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    <Footer/>
   </Router>

    
  );
}

export default App;
