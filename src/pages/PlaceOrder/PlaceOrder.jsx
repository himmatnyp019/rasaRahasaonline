import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../../context/StoreContext'
import { Link, Links } from 'react-router-dom';
import { assets, food_list } from '../../assets/assets'
import DiscountText from '../../../components/DiscountText/DiscountText';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUpDown
} from "@fortawesome/free-solid-svg-icons";

const PlaceOrder = () => {
  let activeAddress = '';
  const [checked, setChecked] = useState(1);
  const { getTotalCartAmount, cartItems, deliveryAddress, getTotalDiscount,url } = useContext(StoreContext)
  let isActiveAddress = false;
  const [totalAmount, amountBeforeDiscount] = getTotalCartAmount();


  return (
    <form className='place-order'>

      <div className="place-order-left">

<div className="order-info-contact">

        <p data-aos="fade-right" className='title'>Delivery Information</p>
        <p data-aos="fade-right" data-aos-delay="100" className='text-notice'>Receive the delivery updates.</p>
        <div className="multi-fields">
          <input data-aos="fade-right" data-aos-delay="200" type="text" placeholder='First Name' />
          <input data-aos="fade-left" data-aos-delay="200" type="text" placeholder='Last Name' />
        </div>

        <input data-aos="fade-up" data-aos-delay="100" type="phone" placeholder='Phone Number' />
        <input data-aos="fade-up" data-aos-delay="200" type="email" placeholder='Email Address' />
        <br />
        <br />
        <div className="active-address-this">
          <h4 data-aos="fade-right">Your default delivery address :</h4>
          {
            deliveryAddress.map((key, index) => {
              if (deliveryAddress[index].active) {
                isActiveAddress = true;
                activeAddress = deliveryAddress[index].address
                return (<div data-aos="fade-down" data-aos-delay="100" className='active-address-box'>
                  <h4>{activeAddress}</h4>
                  <Link className='change-default-address' to="/Profile"><u> change default address </u> </Link>
                </div>)
              }
              if (!isActiveAddress && index === deliveryAddress.length - 1) {
                return (<div data-aos="fade-down" data-aos-delay="100" className='active-address-box'>
                  <h4>Address not found !</h4>
                  <Link className='change-default-address' to="/Profile"><u> click to add address </u> </Link>
                </div>)
              }

            })

          }

        </div>
</div>

<div className="circle">
  <FontAwesomeIcon icon={faUpDown}></FontAwesomeIcon>
</div>

        <div className="payment-method-container">
          <h3 data-aos="fade-right" data-aos-delay="100" >Select Payment Method</h3>
          <p data-aos="fade-right" >Your payment information is safe.</p>
          <hr style={{
            margin: "0",
            marginTop: "10px",
            marginBottom: "10px",
            height: "2px",
            backgroundColor: "#e2e2e2",
            border: "none"

          }} />
          <div data-aos="fade-right" className="payment-options-container">
            <div onClick={() => setChecked(1)} className={`payment-option-box ${checked === 1 ? "checked" : ""}`}> <div className="img-warper"><img src={assets.kakao_pay} alt="icons" /></div> <p>Pay with Kakao Pay</p> <img className={`checkbox ${checked === 1 ? "checked" : ""}`} src={assets.checkbox} alt="" /></div>
            <div onClick={() => setChecked(2)} className={`payment-option-box ${checked === 2 ? "checked" : ""}`}> <div className="img-warper"><img src={assets.card_pay} alt="icons" /></div><p>Pay with credit / debit Card</p> <img className={`checkbox ${checked === 2 ? "checked" : ""}`} src={assets.checkbox} alt="" /> </div>
            <div onClick={() => setChecked(3)} className={`payment-option-box ${checked === 3 ? "checked" : ""}`}> <div className="img-warper"><img src={assets.cash_pay} alt="icons" /></div> <p>Pay in Cash</p> <img className={`checkbox ${checked === 3 ? "checked" : ""}`} src={assets.checkbox} alt="" /> </div>
          </div>

        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-items-quick">
          {
            food_list.map((item, index) => {

              if (cartItems[item._id] > 0) {
                return (
                  <div key={item._id}>
                    <div className="quick-item-check">
                      <img src={url+"/images/"+item.image} alt="" />
                      <div className="quick-price">
                        <p>₩{item.price}</p>
                        <p>x{cartItems[item._id]}</p>
                      </div>

                    </div>
                  </div>

                )
              }

            })
          }
        </div>


        <div data-aos="fade-left" data-aos-delay="100" className="cart-total">
          <h2>Cart Totals</h2>
          <div>
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
              <p className='bill-count'>₩{totalAmount === 0 ? 0 : 3000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b className='bill-count'>₩{totalAmount === 0 ? 0 : totalAmount + 3000}</b>
            </div>
          </div>
          <div className="cart-order-btns">
            <button data-aos="fade-up" data-aos-delay="100" onClick={() => navigate('/PlaceOrder')}>MAKE PAYMENT</button>

          </div>
        </div>
      </div>


    </form>
  )
}

export default PlaceOrder;
