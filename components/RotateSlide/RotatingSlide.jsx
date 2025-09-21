import React from 'react'
import "./RotatingSlide.css"
import { assets } from '../../src/assets/assets'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const RotatingSlide = () => {
  const {t} = useTranslation();
  return (
    <div className="rotator-slide-container">
      <div className="slide-contents">

        <a href='#vegetable-section' state={{ category: "vegetable" }} data-aos='fade-up' className="rs-slide">
          <div className="top-image">
            <img src={assets.vegetable} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>{t("vegetablesFruits")}</h1>
            <p>{t("descVegFruits")}</p>
          </div>
        </a>

        <a href='#masala-section' state={{ category: "spices" }} data-aos='fade-up' data-aos-delay="300" className="rs-slide">
          <div className="top-image">
            <img src={assets.species} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>{t("spicesMasala")}</h1>
            <p>{t("descSpices")}</p>
          </div>
        </a>

        <a href="#meat-section" state={{ category: "meat" }} data-aos='fade-up' data-aos-delay="600" className="rs-slide">
          <div className="top-image">
            <img src={assets.meat} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>{t("meatFish")}</h1>
            <p>{t("descMeatFish")}</p>
          </div>
        </a>

        <a href="#drink-section" state={{ category: "drinks" }} data-aos='fade-up' data-aos-delay='900' className="rs-slide">
          <div className="top-image">
            <img src={assets.drinks} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>{t("coldDrinks")}</h1>
            <p>{t("descDrinks")}</p>
          </div>
        </a>

      </div>
    </div>
  )
}

export default RotatingSlide
