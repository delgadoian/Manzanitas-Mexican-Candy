import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "./Hero.css"
function Hero() { 
  const [welcomeMessage, setWelcomeMessage] = useState('');


  // Grab the welcome message and the username from local storage
  useEffect(() => {
    // Get the welcome message
    const storedMessage = localStorage.getItem('welcomeMessage');
    if(storedMessage) setWelcomeMessage(storedMessage);
  }, []);
  
  // Returns true if username exists
  const isLoggedIn = !!localStorage.getItem('username');

  return (
    <section className="hero">
        <div className="hero-content">
            <h2>Delicious Mexican Candy</h2>
            {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}
            {!isLoggedIn && <p>Enjoy sweet, spicy, and traditional Mexican treats!</p>}
            
            <Link to={"/shop"}><button className="shop-now">Shop Now</button></Link>
        </div>
    </section>
  )
}

export default Hero
