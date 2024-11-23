import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
function Footer() {
  return (
    <footer className="footer">
        <p>Follow us on Social Media</p>
        <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook}/> Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram}/> Instagram</a></li>
            <li><a href="https://x.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter}/></a></li>
        </ul>

        <p>&copy; 2024 Manzanitas Mexican Candy. All rights reserved.</p>
    </footer>
  )
}

export default Footer
