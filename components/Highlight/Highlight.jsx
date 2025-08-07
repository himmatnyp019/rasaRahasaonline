import React, { useContext } from 'react'
import './Highlight.css'
import { assets } from '../../src/assets/assets'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const Highlight = ({ id, name, price, description, image, category }) => {
  const handleWheel = (e) => {
    const container = e.currentTarget;
    // Prevent vertical scroll
    e.preventDefault();
    // Scroll horizontally based on vertical deltaw
    container.scrollLeft += e.deltaY * 2;
  };

  const { cartItems, addToCart, removeFromCart, our_product } = useContext(StoreContext);
  return (
    <div>
      <div className="highlight-container">
        <div className="highlight-items">
          <h1 className='highlight-title'>Available only in our store ! </h1>
          <div className="top">
            <div className="layer" onWheelCapture={handleWheel}>
              {
                our_product.map((item, index) => {
                  return (<FoodItem className="food-item" key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} category={item.category} discount={item.discount}></FoodItem>)
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
