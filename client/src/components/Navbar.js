import React from 'react'
import './Navbar.css';

function Navbar() {
  return (
    <div>
      <nav className='navbar'>
        <h1>Manzanitas Mexican Candy</h1>

        <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='cart-icon'>🛒 (0)</div>
      </nav>
    </div>
    

    
  );
}

export default Navbar;
