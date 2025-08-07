import React from 'react';
import './Footer.css'
import { assets } from '../../src/assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} width='200px' alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem ab temporibus error nisi vitae consequuntur tenetur nesciunt nostrum quam possimus.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />

                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+82 000 0000 0000</li>
                    <li>example@gmail.com</li>
                </ul>
            </div>
        </div>
      <p className="footer-copyright"> Copyright 2025 c localhost.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
