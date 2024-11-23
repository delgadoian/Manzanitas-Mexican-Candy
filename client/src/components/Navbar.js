import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom'
// Navbar of the application, will be constant in all pages
function Navbar() {
  return (
    <div>
      <nav className='navbar'>
        <h1>Manzanitas Mexican Candy</h1>

        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className='cart-icon'>🛒 (0)</div>
      </nav>
    </div>
    

    
  );
}

export default Navbar;
