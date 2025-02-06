import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "./Hero.css"
function Hero() { 
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // Grab the welcome message and the username from local storage
  useEffect(() => {
    // Function to update the welcome message
    const updateWelcomeMessage = () => {
      const storedMessage = localStorage.getItem('welcomeMessage');
      setWelcomeMessage(storedMessage || '');      
    };

    // Run function on mount
    updateWelcomeMessage();

    // Listen for changes to localStorage
    window.addEventListener('storage', updateWelcomeMessage);
  
    
    // Update login state when localStorage changes
    return () => window.removeEventListener('storage', updateWelcomeMessage);
  }, []);

  
  const isLoggedIn = !!localStorage.getItem('username');
  return (
    <section className="hero">
        <div className="hero-content">
            <h2>Delicious Mexican Candy</h2>
            {welcomeMessage ? (
              <p className="welcome-message">{welcomeMessage}</p>
            ): (
              !isLoggedIn && <p> Enjoy sweet, spicy, and traditional Mexican treats!</p>
            )}
            
            <Link to={"/shop"}><button className="shop-now">Shop Now</button></Link>
        </div>
    </section>
  )
}

export default Hero
