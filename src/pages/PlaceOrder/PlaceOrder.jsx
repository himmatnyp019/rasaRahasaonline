import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../../context/StoreContext'
import { Link, Links,useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'
import DiscountText from '../../../components/DiscountText/DiscountText';
import { useToast } from '../../../context/ToastContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentPage from '../../../components/KakaoPay/PaymentPage'

import {
  faUpDown
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import PortOne from "@portone/browser-sdk/v2";
import ProcessingPayment from '../../../components/ProcessingPayment/ProcessingPayment';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [checked, setChecked] = useState(-1);
  const { getTotalCartAmount, token, food_list, activeAddress, cartItems, userData, loadUserData, getTotalDiscount,loadCartData, url } = useContext(StoreContext)
  let mainAddr = ""
  const navigate = useNavigate();
  const [totalAmount, amountBeforeDiscount, deliveryPrice] = getTotalCartAmount();
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { showToast } = useToast();
  const [orderItems, setOrderItems] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState({ status: "IDLE" });
  const [tid, setTid] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });
  const [orderState, setOrderState] = useState("SUBMITTED");

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
  }, [mainAddr]);

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!paymentMethod || JSON.stringify(orderItems).length < 5 || data.name === "" || data.email === "" || data.phone === "" || data.address === "") {
      if (!paymentMethod) {
        toast.error("Please select payment method.");
      }
      if (JSON.stringify(orderItems).length < 5) {
        toast.error("Cannot place empty order.");
      }
      if (data.firstName === "" || data.lastName === "" || data.email === "" || data.phone === "" || data.address === "") {
        toast.error("Please fill all the fields.");
      }
    } else {
  
     
      let orderData = {
        userId: userData._id,
        info: data,
        items: orderItems,
        deliveryCharge: deliveryPrice,
        paymentMethod: paymentMethod,
        amount: totalAmount + deliveryPrice,
        message: paymentMethod==="Pay in Cash"? {Notice:"Cash payment should be done within 3 days of order placed date. If is not paid, order will be automatically cancelled.",status:"normal", paid:"false", verify:"none",verifiedDate:"not verified",verifiedBy:"not verified",vId:"none" } :null
        }
        let response = await axios.post(
          url + "/api/order/place",
          orderData,
          {
            headers: { token: token }
          }
        );
        
        if (response.data.success) {
          setOrderId(response.data.orderId);
          console.log("order ID of recent order :", orderId);
          handlePayment();
          toast.success("Order placed successfully.")
          setOrderState("SUBMITTED");
          loadCartData(token);
          // navigate("/");
          
          
        } else {
          alert("something went wrong.")
          toast.error(response.data.message);
        }
      }
    }
  

  function randomId() {
    return [...crypto.getRandomValues(new Uint32Array(2))]
      .map((word) => word.toString(16).padStart(8, "0"))
      .join("")
  }

  const goPaymentMethod = (event) => {
    console.log(data.firstName, data.lastName, data.email, data.phone, data.address);

    event.preventDefault();

    // ✅ validation checks
    if (
      !paymentMethod ||
      orderItems.length === 0 ||
       data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.address === ""
    ) {
      if (!paymentMethod) toast.error("Please select a payment method.");
      if (orderItems.length === 0) toast.error("Cannot place empty order.");
      if (
        data.firstName === "" ||
        data.lastName === "" ||
        data.email === "" ||
        data.phone === "" ||
        data.address === ""
      ) {
        toast.error("Please fill all the fields.");
      }
      return;
    }

    //kakao payment starting
    const startPayment = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/payment/kakao/init");
        setTid(res.data.tid);
        setPaymentUrl(res.data.redirect_url);
      } catch (err) {
        console.error("Start payment error:", err);
      }
    };


    if (paymentMethod === "Pay with Kakao Pay") {
      //here goes kakao pay
      startPayment()
    }
    if (paymentMethod === "Pay with credit / debit Card") {
      handlePayment(event);
    }
    if (paymentMethod === "Pay in Cash") {
      placeOrder(event)
    }
  }
 

  //paying via credit and debit card
  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      setPaymentStatus({ status: "PENDING" });

      const paymentId = randomId();

      // ✅ request payment from PortOne
      const payment = await PortOne.requestPayment({
        storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
        channelKey: "channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5",
        paymentId,
        orderName: orderItems.map((item) => item.name).join(", "),
        totalAmount: Number(totalAmount) + Number(deliveryPrice),
        currency: "KRW",
        payMethod: "CARD", // dynamic instead of hardcoded "CARD"
        customData: JSON.stringify({
          items: orderItems.map((i) => i.id),
        }),
      });

      // ✅ handle immediate client-side failure (e.g. user cancels)
      if (payment.code !== undefined) {
        setPaymentStatus({
          status: "FAILED",
          message: payment.message,
        });
        toast.error(`Payment failed: ${payment.message}`);
        return;
      }

      // ✅ verify on backend
      const completeResponse = await post("/api/payment/complete", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId: payment.paymentId }),
      });

      if (completeResponse.ok) {
        const paymentComplete = await completeResponse.json();

        if (paymentComplete.status === "PAID") {
          setPaymentStatus({ status: "SUCCESS" });
          toast.success("Payment successful ✅");
        } else {
          setPaymentStatus({ status: "FAILED" });
          toast.error("Payment failed ❌");
        }
      } else {
        const errMsg = await completeResponse.text();
        setPaymentStatus({ status: "FAILED", message: errMsg });
        toast.error("Payment verification failed ❌");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus({ status: "FAILED", message: error.message });
      toast.error("Payment process error ❌");
    }
  };

  useEffect(() => {
    let orderingItems = [];
    food_list.map((item, index) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {};
        itemInfo['quantity'] = cartItems[item._id];
        itemInfo['id'] = food_list[index]._id;
        itemInfo['name'] = item.name
        itemInfo['discount'] = item.discount,
          itemInfo['price'] = item.price
        itemInfo['image'] = item.image
        orderingItems.push(itemInfo);
      }
    });
    setOrderItems(orderingItems);
  }, [cartItems, food_list]);

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
      {/* info gathering */}
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
      
      {/* quick basket */}
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
              <button onClick={() => goPaymentMethod(event)}>MAKE PAYMENT</button>
            </div>
          </div>

        </div>
      </div>
      {orderState === "SUBMITTING" &&
        <div className="payment-progress-card">
          {/* <ProcessingPayment orderId={"68b900bccaf9776751b05495"}></ProcessingPayment> */}
        </div>
      }
      {paymentUrl && (
        <div className="kakao-pay-window">
          <div className="kakao-close-btn" onClick={() => setPaymentUrl('')} >X</div>
          <PaymentPage paymentUrl={paymentUrl} tid={tid} />
        </div>
      )}


    </form>
  )

  }
export default PlaceOrder;
