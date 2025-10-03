import React from 'react';
import './Footer.css'
import { assets } from '../../src/assets/assets';
import { useTranslation } from 'react-i18next';
import Language from '../Language/Language';


const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logoMain} width='100px' />
          <p>라스라하스 SDS <br />
            대표: WEERASURIYA MUDIYANSELAGE SRIMALI</p>
          <p>주소: 부산시 강서구 신호사로64번길 22-11, 1층 101호</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} /><img src={assets.linkedin_icon} alt="" />

          </div>
        </div>
        <div className="footer-content-center">
          <h2>{t("company")}</h2>
          <ul>
            <li><a href="#top">{t("home")}</a></li>
            <li><a href="../../public/docs/privacypolicy.html" target="_blank" rel="noopener noreferrer">{t("privacyPolicy")}</a></li>
            <li><a href="../../public/docs/termsofuse.html" target="_blank" rel="noopener noreferrer">{t("termsOfUse")}</a></li>

            <li><a href="../../public/docs/violation.html" target='_blank' rel='noopener noreferrer'>{t("guidelinesViolationPolicy")}</a></li>
            <li> 사업자등록번호 : 515-81-53560</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>{t("getInTouch")}</h2>
          <ul>
            <li>+82 010-8013-0054</li>
            <li>sdsrasarahasa77@gmail.com</li>
          </ul>
          <Language />
        </div>
      </div>
      <p className="footer-copyright"> Copyright 2025 - All Right Reserved.</p>
      <div className="image-direct">
        <img src="https://res.cloudinary.com/dqvv7yahd/image/upload/v1758769710/food_uploads/oofpgplx8zmh1dktiusw.jpg" />
      </div>
    </div>
  )
}

export default Footer;
