import { useContext, useEffect, useState } from 'react'
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
  let { name, id, description, image, image3, image2, price, category, discount } = location.state || {};
  // const transData = { name, id, description, image, image3, image2, price, category, discount };
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
  const { cartItems, addToCart, food_list, removeFromCart, url, setShowChat, showChat, showDetails } = useContext(StoreContext);
  const [bigImg, setBigImg] = useState(image);
  const [productMsg, setProductMsg] = useState({
    productId: "",
    name: "",
    price: "",
    discount: "",
    image: ""
  });
  if (!location.state) {
    let productId = localStorage.getItem("view-product")
    let productInfo = food_list.find((item) => item._id === productId);
    console.log("product info", productInfo);
    
    name = productInfo.name || "error "
    id = productInfo.id
    description = productInfo.description
    image = productInfo.image
    image2 = productInfo.image2
    image3 = productInfo.image3
    price = productInfo.price    
    category = productInfo.category
    discount = productInfo.discount
  }
  useEffect(() => {
    // console.log(transData);
    console.log("id : ", localStorage.getItem('view-product'));


  }, [location.state]);

  const productMsgHandler = async (id, name, image, price, discount) => {
    setProductMsg({
      productId: id,
      name: name,
      image: image,
      price: price,
      discount: discount,
    });
    setShowChat(true)
  };

  const handleImgChange = (index) => {
    if (index === 1) {
      setBigImg(image)
    }
    if (index === 2) {
      setBigImg(image2)
    }
    if (index === 3) {
      setBigImg(image3)
    }
  }

  return (
    <div className='product-detail'>
      <div className="about-product-detail">
        <div className="left">
          <div className="main-product-image">
            <div className="image-index">
              <img className='image-i' onClick={() => handleImgChange(1)} src={url + "/images/" + image} alt="image1" />
              <img className='image-i' onClick={() => handleImgChange(2)} src={url + "/images/" + image2} alt="image2" />
              <img className='image-i' onClick={() => handleImgChange(3)} src={url + "/images/" + image3} alt="image3" />
            </div>
            <div className="main-product-img">
              <img className='main-big-img' src={url + "/images/" + bigImg} alt="image" />
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
                ? <div className="food-item-counterrrr">
                  <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartItems[id]}</p>
                  <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
                : <button onClick={() => addToCart(id)}>
                  Add to Cart <img src={assets.add_icon_white} alt="" />
                </button>
              }
              <button onClick={() => productMsgHandler(id, name, image, price, discount)}>
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
            marginTop: "20px",
            marginBottom: "20px",
            height: "2px",
            backgroundColor: "#e2e2e2",
            border: "none"
          }} />
          <Reviews itemId={id}></Reviews>
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
