import React, { useContext } from 'react'
import './MainItems.css'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
import { assets } from '../../src/assets/assets'
import FoodItem from '../FoodItem/FoodItem'
import { useTranslation } from 'react-i18next'


const MainItems = () => {
  const { food_list, } = useContext(StoreContext)
  const {t} = useTranslation();
  return (
    <div className='main-items-container'>
      <div className="vegetable-section" id="vegetable-section">
        <div  data-aos='fade-up' className="rs-slide s">
          <div className="top-image">
            <img src={assets.vegetable} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>{t("vegetablesFruits")}</h1>
            <p>{t("descVegFruits")}</p>
          </div>
        </div>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if ("Vegetables & Fruits" === item.category) {

              return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} image3={item.image3} image2={item.image2} category={item.category} discount={item.discount}>

              </FoodItem>
              )
            }
          })}
        </div>
      </div>

      <div className="masala-section" id="masala-section">
        <div data-aos='fade-up' data-aos-delay="300" className="rs-slide s">
          <div className="top-image">
            <img src={assets.species} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>{t("spicesMasala")}</h1>
            <p>{t("descSpices")}</p>
          </div>
        </div>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if ("Spices" === item.category) {
              return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} image3={item.image3} image2={item.image2} category={item.category} discount={item.discount}>
              </FoodItem>
              )
            }
          })}
        </div>
      </div>
      <br />
      <div className="meat-section" id="meat-section">
        <div data-aos='fade-up' data-aos-delay="600" className="rs-slide s">
          <div className="top-image">
            <img src={assets.meat} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>{t("meatFish")}</h1>
            <p>{t('descMeatFish')}</p>
          </div>
        </div>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if ("Meat & Fish" === item.category) {
              return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} image3={item.image3} image2={item.image2} category={item.category} discount={item.discount}>
              </FoodItem>
              )
            }
          })}
        </div>
      </div>
      <br />
        <div className="drink-section" id="drink-section">
         <div data-aos='fade-up' data-aos-delay='900' className="rs-slide s">
                  <div className="top-image">
                    <img src={assets.drinks} alt="" />
                  </div>
                  <div className="bottom-contents">
                    <h1>{t("coldDrinks")}</h1>
                    <p>{t("descDrinks")}</p>
                  </div>
                </div>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if ("Drinks" === item.category) {
              return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} image3={item.image3} image2={item.image2} category={item.category} discount={item.discount}>
              </FoodItem>
              )
            }
          })}
        </div>
      </div>
        <br />
    </div>
  )
}

export default MainItems
