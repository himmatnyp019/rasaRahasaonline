import React, { useContext } from 'react'
import './MainItems.css'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
import { assets } from '../../src/assets/assets'
import FoodItem from '../FoodItem/FoodItem'



const MainItems = () => {
  const { food_list, } = useContext(StoreContext)
  return (
    <div className='main-items-container'>
      <div className="vegetable-section" id="vegetable-section">
        <div  data-aos='fade-up' className="rs-slide s">
          <div className="top-image">
            <img src={assets.vegetable} alt="" />
          </div>
          <div className="bottom-contents">
            <h1>Vegetables & Fruits</h1>
            <p>All fresh vegetables and fruits from motherland.</p>
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
            <h1>Species, Masala</h1>
            <p>masala, turmeric, oils, sauces kitchen things</p>
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
            <h1>Meat and Fish</h1>
            <p>All fresh meats & fishes delivery with safety</p>
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
                    <h1>Cold Drinks</h1>
                    <p>All delicous and sweet drinks pup and drink.</p>
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
