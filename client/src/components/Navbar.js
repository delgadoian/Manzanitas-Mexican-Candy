import React from 'react';
import './Navbar.css';
// Our shopping cart counter
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom'
import ManzanitasLogo from './images/Manzanitas_Logo1.jpg'
// Navbar of the application, will be constant in all pages
function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div>
      <nav className='navbar'>
        <div className='logo-section'>
          <img className="manzanitas-logo" src={ManzanitasLogo}/>
          <h1>Manzanitas Mexican Candy</h1>
        </div>

        <ul className="links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="auth-buttons">
          <Link to="/login" className="nav-login-button">Login</Link>
          <Link to="/signup" className="signup-button">Sign Up</Link>
          <div className='cart-icon'><Link to="/cart">🛒</Link> ({totalItems})</div>
        </div>
       
      </nav>
    </div>
    

    
  );
}

export default Navbar;
