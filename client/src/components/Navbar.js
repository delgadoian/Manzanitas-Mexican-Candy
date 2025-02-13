import React, {useState, useEffect} from 'react';
import './Navbar.css';
// Our shopping cart counter
import { useCart } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom'
import ManzanitasLogo from './images/Manzanitas_Logo1.jpg'
import axios from 'axios';
// Navbar of the application, will be constant in all pages
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
  const navigate = useNavigate();

  

  useEffect(() => {
    // Check login state on mount
    setIsLoggedIn(!!localStorage.getItem('username'));

    // Update login state when localStorage changes
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('username'));
    };
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  },[]);

  const handleLogout = async () => {
    // Save cart data to the backend before logging out
    const userId = localStorage.getItem('userId');
    const cartData = localStorage.getItem('cart');
    console.log(`Userid: ${userId}`);
    if (userId) {
      try {
        // Parse cart data safely
        const parsedCart = cartData ? JSON.parse(cartData) : [];

        // Ensure it is an array before sending
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          await axios.post('http://localhost:5000/api/cart/save-cart', {
            userId,
            cartItems: parsedCart
          });
          console.log('Cart saved successfully');
          
        } else {
          console.error("Cart data is not an array: ", parsedCart);
        }
      } catch (error) {
        console.error('Error saving cart: ', error.message);
      }
      
    }
    // Clear user data from LocalStorage
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('cart');
    localStorage.removeItem('welcomeMessage');
    // Trigger an event so that our cart updates 
    window.dispatchEvent(new Event('logout'));
    // Trigger an event so Hero.js updates

    window.dispatchEvent(new Event('storage'));

    // Update state to reflect logout
    setIsLoggedIn(false);
   
    navigate('/');
  }

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
          {!isLoggedIn && <Link to="/login" className="nav-login-button">Login</Link>}
          {!isLoggedIn && <Link to="/signup" className="signup-button">Sign Up</Link>}
          {isLoggedIn && <button className="logout-button" onClick={handleLogout}>Logout</button>}
          <div className='cart-icon'><Link to="/cart">🛒</Link> ({totalItems})</div>
        </div>
       
      </nav>
    </div>
    

    
  );
}

export default Navbar;
