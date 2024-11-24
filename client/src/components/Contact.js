import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <section className="contact-page">
      
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, feel free to reach out to us!</p>
      <div className="contact-info">
        <p>Email us at: <a href="mailto:support@manzanitascandy.com">support@manzanitascandy.com</a></p>
      </div>
      
      <form className="contact-form">

        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required></input>
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message:</label>
          <textarea id="message" name="message" placeholder="Enter your Message" required></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
 
    </section>
  )
}

export default Contact
