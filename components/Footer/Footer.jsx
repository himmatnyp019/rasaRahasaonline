import React from 'react';
import './Footer.css'
import { assets } from '../../src/assets/assets';
import { useTranslation } from 'react-i18next';


const Footer = () => {
    const {t} = useTranslation();
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
                <h2>{t("company")}</h2>
                <ul>
                    <li>{t("home")}</li>
                    <li>{t("aboutUs")}</li>
                    <li>{t("delivery")}</li>
                    <li>{t("privacyPolicy")}</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>{t("getInTouch")}</h2>
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
