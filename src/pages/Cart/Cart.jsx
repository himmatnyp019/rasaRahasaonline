import { useContext, useEffect } from 'react';
import "./Cart.css";
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import DiscountText from '../../../components/DiscountText/DiscountText';
import FoodItem from '../../../components/FoodItem/FoodItem';
import { useLocation } from 'react-router-dom';

const Cart = ({ setShowBill, setShowLogin, setBillData }) => {
  let itemCount = 0;
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, getTotalDiscount, url } = useContext(StoreContext);
  const [totalAmount, amountBeforeDiscount, deliveryPrice] = getTotalCartAmount();
  const navigate = useNavigate();
  let Category = 'noodles' //default but not fixed (should be changed)
  const handleShowBill = () => {
    setBillData({
      items: cartItems,
      totalPrice: totalAmount,
      discount: getTotalDiscount(),
      date: "2024-79-12, wed",
      deliveryCharge: 3000
    });
    setShowBill(true);
  };

  const checkLogin = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setShowLogin(true)
    }
  }
  useEffect(() => {

    checkLogin()
  }, [cartItems]);
  const onClickPHandler = () =>{
    const token = localStorage.getItem("token")
    if (!token) {
      setShowLogin(true)
    }else{
      navigate('/PlaceOrder')
    }
  }
 
  return (
    <div className='cart'>
      <div className="cart-items">
        <h2 data-aos="fade-right">Cart ({Object.keys(cartItems).length})</h2>
        <div data-aos="fade-up" className="cart-items-title cart-item-naming">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              itemCount += cartItems[item._id];
              Category = item.category
              return (
                <div key={item._id}>
                  <div data-aos="fade-up" data-aos-delay={0 + index * 20} className="cart-items-title cart-items-item">

                    <img src={url + "/images/" + item.image} alt="" />
                    <p className='title-name'>{item.name}</p>
                    <DiscountText key={item._id} price={item.price} discount={item.discount} ></DiscountText>
                    <p className='sr-1' >x{cartItems[item._id]}</p>
                    <p className='sr-1' >= ₩{(item.price - item.discount) * cartItems[item._id]}</p>

                    <div className="food-item-counter">
                      <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                      <p>{cartItems[item._id]}</p>
                      <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                    </div>

                  </div>
                </div>

              )
            }

          })
        }
      </div>
      <div className="cart-bottom">

        <div data-aos="fade-right" className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Total Items</p>
              <p className='bill-count'>{itemCount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>

              <div className='bill-count'>{totalAmount === 0 ? 0 : <DiscountText key={1} price={amountBeforeDiscount} discount={getTotalDiscount()}></DiscountText>}</div>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Price</p>
              <p className='bill-count'>₩{totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <div className='bill-count'>{deliveryPrice === 0 ? <DiscountText key={2} price={(3000)} discount={3000}></DiscountText> : deliveryPrice}</div>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b className='bill-count'>₩{totalAmount === 0 ? 0 : totalAmount + deliveryPrice}</b>
            </div>
          </div>
          <div className="cart-order-btns">
            <button onClick={() => onClickPHandler() }>CHECKOUT</button>
            <button onClick={handleShowBill} >VIEW RECEIPT</button>
          </div>
        </div>

        <div className="cart-promocode">
          <div data-aos="fade-right" className="delivery-charge-discount">
            <h4>orders ₩10,0000 + </h4>
            <DiscountText price={3000} discount={3000}></DiscountText>
            <br />
            <div className="hr"></div>
            <h2>Free Delivery</h2>
          </div>
          <div data-aos="fade-left" className="delivery-charge-discount">
            <h4>orders ₩10,0000 + </h4>
            <DiscountText price={3000} discount={3000}></DiscountText>
            <br />
            <div className="hr"></div>
            <h2>Free Delivery</h2>
          </div>
          <div data-aos="fade-up" className="delivery-charge-discount">

            <h4>Our Commitment</h4>
            Refund if package lost <br />

            Refund if items damaged <br />

            Refund if no delivery in 30 days
          </div>

        </div>
      </div><br />
      <br />

      <h2 className='food-display-title'>Find related items</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (Category === "All" || Category === item.category) {
            return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} category={item.category} discount={item.discount}></FoodItem>)
          }
        })}
      </div>
    </div>

  )
}

export default Cart;
