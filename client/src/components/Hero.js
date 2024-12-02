import React from 'react'
import { Link } from 'react-router-dom';
import "./Hero.css"
function Hero() {
  return (
    <section className="hero">
        <div className="hero-content">
            <h2>Delicious Mexican Candy</h2>
            <p>Enjoy sweet, spicy, and traditional Mexican treats!</p>
            <Link to={"/shop"}><button className="shop-now">Shop Now</button></Link>
        </div>
    </section>
  )
}

export default Hero
