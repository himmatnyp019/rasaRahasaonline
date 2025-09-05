import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../../context/StoreContext'
import { Link, Links } from 'react-router-dom';
import { assets } from '../../assets/assets'
import DiscountText from '../../../components/DiscountText/DiscountText';
import { useToast } from '../../../context/ToastContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpDown
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import PortOne from "@portone/browser-sdk/v2";

const PlaceOrder = () => {
  const [checked, setChecked] = useState(-1);
  const { getTotalCartAmount, token, food_list, activeAddress, cartItems, userData, loadUserData, getTotalDiscount, url } = useContext(StoreContext)
  let mainAddr = ""
  const [totalAmount, amountBeforeDiscount, deliveryPrice] = getTotalCartAmount();
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("")
  const { showToast } = useToast()
  const [tid, setTid] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });

  let userInfo = {};
  let ThreeAddr = [];

  if (Object.keys(userData).length === 0) {
    let savedData = localStorage.getItem("userInfo");
    if (savedData) {
      userInfo = JSON.parse(savedData);  // parse because it's stored as string
      ThreeAddr = userInfo.address
      const index = ThreeAddr.findIndex(obj => obj.active === true);
      console.log(ThreeAddr[index].address);
      mainAddr = ThreeAddr[index].address;

    } else {
      loadUserData(token);
    }
  }
  const startPayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/pay");
      setTid(res.data.tid);
      setPaymentUrl(res.data.redirect_url);
    } catch (err) {
      console.error("Start payment error:", err);
    }
  };
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    setData(prev => ({
      ...prev,
      address: activeAddress,
      userId: userData._id
    }));
  }, []);


  function randomId() {
    return [...crypto.getRandomValues(new Uint32Array(2))]
      .map((word) => word.toString(16).padStart(8, "0"))
      .join("")
  }

  const placeOrder = async (event,paymentMethod) => {
    if (!paymentMethod) {
      showToast("Please select payment method.")
    }else{
      
      event.preventDefault();
      let orderItems = [];
      food_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = {};
          itemInfo['quantity'] = cartItems[item._id];
          itemInfo['id'] = food_list[index]._id;
          itemInfo['name'] = item.name
          itemInfo['discount'] = item.discount,
            itemInfo['price'] = item.price
          itemInfo['image'] = item.image
          orderItems.push(itemInfo);
        }
      })
      let orderData = {
        userId: userData._id,
        info: data,
        items: orderItems,
        deliveryCharge: deliveryPrice,
        paymentMethod: paymentMethod,
        amount: totalAmount + deliveryPrice,
      }
      console.log(orderData);
      let response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: { token: token }
        }
      );
  
      if (response.data.success) {
        let resP = response.data.order
        let price = resP.amount
        let currency = "krw"
        let id = resP._id;
        const name = resP.items.map((item) => item.name).join(',');
        handlePayment(name, price, currency, id)
  
      } else {
        alert("something went wrong.")
      }
    }
  }

  const handlePayment = async (e, name, price, currency, id) => {
    e.preventDefault();
    setPaymentStatus({ status: "PENDING" })
    const paymentId = randomId()
    const payment = await PortOne.requestPayment({
      storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
      channelKey: "channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5",
      paymentId,
      orderName: name,
      totalAmount: price,
      currency: currency,
      payMethod: "CARD",
      customData: {
        item: id,
      },
    })
    if (payment.code !== undefined) {
      setPaymentStatus({
        status: "FAILED",
        message: payment.message,
      })
      return
    }
    const completeResponse = await fetch("/api/payment/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: payment.paymentId,
      }),
    })
    if (completeResponse.ok) {
      const paymentComplete = await completeResponse.json()
      setPaymentStatus({
        status: paymentComplete.status,
      })
    } else {
      setPaymentStatus({
        status: "FAILED",
        message: await completeResponse.text(),
      })
    }
  }

  const paymentMethodHandler = (index, method) => {
    setPaymentMethod(method);
    setChecked(index);

  }
  return (
    <form className='place-order' >
      <div className="place-order-title">
        <h2 className='title-text'>Order Confirmation</h2>
        <p>Details about the order and payment information</p>
      </div>
      <div className="place-order-left">
        <div className="order-info-contact">
          <p data-aos="fade-right" className='title'>Delivery Information</p>
          <p data-aos="fade-right" data-aos-delay="100" className='text-notice'>Receive the delivery updates.</p>
          <div className="multi-fields">
            <input required data-aos="fade-right" data-aos-delay="200" type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
            <input required data-aos="fade-left" data-aos-delay="200" type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
            <input type="text" required name="address" value={activeAddress} onChange={onChangeHandler} style={{ display: "none" }} />
          </div>

          <input required data-aos="fade-up" data-aos-delay="100" type="phone" name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Phone Number' />
          <input required data-aos="fade-up" data-aos-delay="200" type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email Address' />
          <br />
          <br />
          <div className="active-address-this">
            <h4 data-aos="fade-right">Your default delivery address :</h4>

            {activeAddress
              ? <div data-aos="fade-down" data-aos-delay="100" className='active-address-box'>
                <h4>{activeAddress}</h4>
                <Link className='change-default-address' to="/Profile"><u> change default address </u> </Link>
              </div>
              : <div data-aos="fade-down" data-aos-delay="100" className='active-address-box'>
                <h4>Address not found !</h4>
                <Link className='change-default-address' to="/Profile"><u> click to add address </u> </Link>
              </div>
            }
          </div>
        </div>
        <div className="circle">
          <FontAwesomeIcon icon={faUpDown}></FontAwesomeIcon>
        </div>

        <div className="payment-method-container">
          <br />
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
          <br />
          <div data-aos="fade-right" className="payment-options-container">
            <div onClick={() => paymentMethodHandler(1, "Pay with Kakao Pay")} className={`payment-option-box ${checked === 1 ? "checked" : ""}`}> <div className="img-warper"><img src={assets.kakao_pay} alt="icons" /></div> <p>Pay with Kakao Pay</p> <img className={`checkbox ${checked === 1 ? "checked" : ""}`} src={assets.checkbox} alt="" /></div>
            <div onClick={() => paymentMethodHandler(2, "Pay with credit / debit Card")} className={`payment-option-box ${checked === 2 ? "checked" : ""}`}> <div className="img-warper"><img src={assets.card_pay} alt="icons" /></div><p>Pay with credit / debit Card</p> <img className={`checkbox ${checked === 2 ? "checked" : ""}`} src={assets.checkbox} alt="" /> </div>
            <div onClick={() => paymentMethodHandler(3, "Pay in Cash")} className={`payment-option-box ${checked === 3 ? "checked" : ""}`}> <div className="img-warper"><img src={assets.cash_pay} alt="icons" /></div> <p>Pay in Cash</p> <img className={`checkbox ${checked === 3 ? "checked" : ""}`} src={assets.checkbox} alt="" /> </div>
          </div>

        </div>
      </div>




      <div className="place-order-right">
        <div className="order-final-container">

          <div className="cart-items-quick">
            <h2>Quick Items</h2>
            <p>Your processing items quick view.</p>
            <div className="quick-view-basket">

              {
                food_list.map((item, index) => {

                  if (cartItems[item._id] > 0) {
                    return (
                      <div key={item._id}>
                        <div className="quick-item-check">
                          <img src={item.image} alt="" />
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

          </div>
          <div data-aos="fade-left" data-aos-delay="100" className="cart-total-1">
            <h2>Cart Totals</h2>
            <div>
              <hr />
              <div className="cart-total-details">
                <p className='price-tag-text'>Total Price</p>
                <p className='bill-count'>₩{amountBeforeDiscount}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p className='price-tag-text'>Discount</p>

                <div className='bill-count'>{totalAmount === 0 ? 0 : <DiscountText key={1} price={amountBeforeDiscount} discount={getTotalDiscount()}></DiscountText>}</div>
              </div>
              <hr />
              <div className="cart-total-details">
                <p className='price-tag-text'>Final Price</p>
                <p className='bill-count'>₩{totalAmount}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p className='price-tag-text'>Delivery Fee</p>
                <div className='bill-count'>{deliveryPrice === 0 ? <DiscountText key={2} price={(3000)} discount={3000}></DiscountText> : deliveryPrice}</div>
              </div>
              <hr />
              <div className="cart-total-details">
                <p className='price-tag-text'> Final Price :</p>
                <b className='bill-count total'>₩{totalAmount === 0 ? 0 : totalAmount + deliveryPrice}</b>
              </div>
            </div>
            <div className="cart-order-btns">
              <button type='submit' onClick={()=>placeOrder(event,paymentMethod)}>MAKE PAYMENT</button>

            </div>
          </div>

        </div>
      </div>


    </form>
  )
}

export default PlaceOrder;
