import React from 'react';
import './Navbar.css';
// Our shopping cart counter
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom'
// Navbar of the application, will be constant in all pages
function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
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
        <div className='cart-icon'><Link to="/cart">🛒</Link> ({totalItems})</div>
      </nav>
    </div>
    

    
  );
}

export default Navbar;
