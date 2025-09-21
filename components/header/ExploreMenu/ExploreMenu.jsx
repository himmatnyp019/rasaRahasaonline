import React from 'react'
import './ExploreMenu.css'
import { useTranslation } from "react-i18next";
import "../../../src/i18n";
import { assets } from '../../../src/assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const { t, i18n } = useTranslation();

  const menu_list = [
    {
      menu_name: t("menuKitchenItems"),
      menu_image: assets.menu_1
    },
    {
      menu_name: t("menuSoyaStringHoppers"),
      menu_image: assets.menu_2
    },
    {
      menu_name: t("menuSpices"),
      menu_image: assets.menu_3
    },
    {
      menu_name: t("menuNoodles"),
      menu_image: assets.menu_4
    },
    {
      menu_name: t("menuTea"),
      menu_image: assets.menu_5
    },
    {
      menu_name: t("menuBiscuit"),
      menu_image: assets.menu_6
    },
    {
      menu_name: t("menuVegetables"),
      menu_image: assets.menu_7
    },
    {
      menu_name: t("menuMeatAndFish"),
      menu_image: assets.menu_8
    },
    {
      menu_name: t("menuGrainsAndRice"),
      menu_image: assets.menu_9
    },
    {
      menu_name: t("menuFruits"),
      menu_image: assets.menu_10
    },
    {
      menu_name: t("menuDrinksAndCans"),
      menu_image: assets.menu_11
    }, {
      menu_name: t("menuChocolate"),
      menu_image: assets.menu_12
    },
    {
      menu_name: t("menuRotiParathaFrozen"),
      menu_image: assets.menu_13
    }
  ]

  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1 data-aos="fade-up" className='explore-title-text'>{t("explore")}</h1>
      <p data-aos="fade-up" className='exploreMenu-text'>
        {t("organized")}
      </p>
      <div className="exploreMenu-List">
        {menu_list.map((item, index) => {
          return (
            <a data-aos="fade-up" data-aos-delay={index * 100} href='#food-display' onClick={() => { setCategory(prev => prev === item.menu_name ? "All" : item.menu_name) }} key={index} className="exploreMenu-List-Item">
              <img className={category === item.menu_name ? "active" : " "} src={item.menu_image} alt={`${item.menu_name}-img`} />
              <p className={category === item.menu_name ? "active2" : " "}>{item.menu_name}</p>
            </a>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu;
