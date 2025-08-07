import React, { useContext } from 'react'
import "./FoodItem.css"
import { assets } from '../../src/assets/assets'
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import DiscountText from '../DiscountText/DiscountText';
const FoodItem = ({id, name, price, description, image, category, discount}) => {

  const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
     
      <div data-aos="fade-up"   className="food-item-image-container">
        <Link to="/Details" state={{id, name, price, description, image, category, discount}}>
        <div className="redirect-button">
          <h6> View More</h6>
          <img src={assets.redirect} alt="" />
        </div>
        <img src={url+"/images/"+image} className='food-item-image' alt="item-image" />
        </Link>
        
        {!cartItems[id]
        
        ? <div onClick={()=> addToCart(id)} data-aos="fade-up"   className="add-to-cart">
           <img className='add'  src={assets.add_icon_white} alt="" />
          <h3 className='add-to-cart-text'>Add To Cart</h3>
          </div> 
        :  <div   className="food-item-counter">
         
          <img  onClick={() => removeFromCart(id)}src={assets.remove_icon_red} alt="" /> 
          <p>{cartItems[id]}</p>

          <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
        </div>
        }
      </div>
      <div data-aos="fade-up"   className="food-item-info">
        <div data-aos="fade-up"   className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p data-aos="fade-up"   className="food-item-desc">{description}</p>
        
      <DiscountText key={id} price={price} discount={discount}></DiscountText>
      </div>
    </div>
    
  )
}

export default FoodItem;
