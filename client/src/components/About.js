import React from 'react'
import './About.css'
import shopImage from './images/about_page_image.png';

function About() {
  return (
    <section className="about-page">
      <h1>About Manzanitas Mexican Candy</h1>
      <div className="about-content">

        <img src={shopImage} className="about-image"/>
        <div className="about-text">
          <p>
            Welcome to <strong>Manzanitas Mexican Candy</strong>! Our shop is dedicated to bringing the vibrant
            and irresistible flavors of traditional Mexican candy to your doorstep. From the sweet and tangy tamarind to the spicy kick of chili-covered treats, every bite is 
            a celebration of Mexico's rich culinary tradition.

          </p>

          <p>
            At Manzanitas Mexican Candy, we believe candy is more than a treat -- it's a way to connect people to culture, tradition, and joy. Whether you're revisiting 
            childhood favorites or discovering new flavors, our mission is to deliver a taste of authentic Mexican tradition, one sweet at a time.

          </p>
        </div>
      </div>
    </section>
  )
}

export default About
