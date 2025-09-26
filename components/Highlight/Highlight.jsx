import React, { useContext } from 'react'
import './Highlight.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { useTranslation } from 'react-i18next'

const Highlight = ({ id, name, price, description, image, category }) => {
  const {t} = useTranslation();
  const handleWheel = (e) => {
    const container = e.currentTarget;
    // Prevent vertical scroll
    e.preventDefault();
    // Scroll horizontally based on vertical deltaw
    container.scrollLeft += e.deltaY * 2;
  };
  const {food_list} = useContext(StoreContext);

  const { cartItems, addToCart, removeFromCart, our_product } = useContext(StoreContext);
  return (
    <div>
      <div className="highlight-container">
        <div className="highlight-items">
          <h1 className='highlight-title'>{t("availableOnly")} </h1>
          <div className="top">
            <div className="layer" onWheelCapture={handleWheel}>
              {
                food_list.map((item, index) => {
                  if (item.category === "Our product") {
                    return (<FoodItem className="food-item" key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} category={item.category} discount={item.discount}></FoodItem>)
                  }

                })
              }
            </div>


          </div>

        </div>
        

      </div>
    </div>
  )
}

export default Highlight
