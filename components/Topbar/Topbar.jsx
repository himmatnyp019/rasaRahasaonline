import React from 'react'
import './Topbar.css'
import { useTranslation } from 'react-i18next';

const Topbar = () => {
  const { t } = useTranslation();
  return (
    <div className='topbar-container'>
      <div className="topbar-background-main">
      </div>
      <div className="topbar-buttons-container">
        <div className="right-tbc">
          <ul>
            <li><a href="../../public/docs/privacypolicy.html" target="_blank" rel="noopener noreferrer">{t("privacyPolicy")}</a></li>
            <li><a href="../../public/docs/termsofuse.html" target='_blank'>{t("termsOfUse")}</a></li>

          </ul>
        </div>
        <div className="left-tbc">
          <ul>
            <li><a href="#exploreMenu">{t("categoriesAll")}</a></li>
            <li><a href="#food-display">{t("menu")}</a></li>
            <li><a href="#footer">{t("contact")}</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Topbar;
