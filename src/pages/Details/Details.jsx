import { useContext } from 'react'
import "./Details.css"
import { useLocation } from "react-router-dom";
import { StoreContext } from '../../../context/StoreContext';
import { assets } from '../../assets/assets';
import FoodItem from '../../../components/FoodItem/FoodItem';
import Offer from '../../../components/Offer/Offer';
import Reviews from '../../../components/Reviews/Reviews';
import DiscountText from '../../../components/DiscountText/DiscountText';



const Details = () => {
  const location = useLocation();
  const { name, id, description, image, price, category, discount } = location.state || {};
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
  const { cartItems, addToCart, food_list, removeFromCart } = useContext(StoreContext);

  return (
    <div className='product-detail'>
      <div className="about-product-detail">
        <div className="left">
          
          <div className="main-product-image">
          <div className="image-index">
            <img className='image-i' src={image} alt="" />
            <img className='image-i' src={image} alt="" />
          </div>
          <div className="main-product-img">
              <img className='main-big-img' src={image} alt="" />
          </div>
          </div>

          <div className="box product-info">
            <div className="weekday-text">
              <h2>{days[today]} Deal</h2>
            </div>
              <h1 className="item-title"> {name}</h1>
            <div className="price-area">
              <DiscountText key={id} price={price} discount={discount}></DiscountText>
            
            </div>
            <div className="description-area">
              <p>{description}</p>
            </div>
            <div className="offer-area">
              <Offer key="no" status="no"></Offer>
            </div>
            
            <div className="product-buttons">

             
                {cartItems[id]

                ?<div className="food-item-counterrrr">
                  <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartItems[id]}</p>
                  <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
                

                : <button onClick={() => addToCart(id)}>
                  Add to Cart <img src={assets.add_icon_white} alt="" />
                </button>
              }
           
              
              <button>
                Chat with supplier <img src={assets.chat} alt="" />
              </button>

            </div>
          </div>
        </div>



      </div>
      <br />
      <div className="bottom">
        <div className="reviews">
          <hr style={{
          margin: "0",
          marginTop:"20px",
          marginBottom:"20px",
          height: "2px",
          backgroundColor: "#e2e2e2",
          border: "none"

        }} />
          <Reviews></Reviews>
        </div>
        <div className='food-display' id='food-display'>
          <h2>Related Items</h2>
          <br />
          <hr style={{
            border: "none", height: "2px", backgroundColor: "#e2e2e2", margin: "0",
          }} />
          <br />
          <div className="food-display-list">
            {food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}></FoodItem>
                )
              }
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Details
