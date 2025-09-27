import React, { useContext, useState } from 'react'
import "./FloatBox.css"
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import Chat from '../../src/pages/Chat/Chat'
import { FaCartPlus, FaComments, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
const FloatBox = () => {
  const { food_list, cartItems, url, getTotalCartAmount, setShowChat, showChat } = useContext(StoreContext);
  const [totalAmount] = getTotalCartAmount();
  const { t } = useTranslation();
  return (
    <div className='float-box-container'>
      <div className="layering">
        <div className="floating-btn-section">
          <Link className='float-box' to="/Cart">
            <div className="icon"><FaCartPlus></FaCartPlus> </div>
            <h4 className='float-box-title' >{t("viewCart")}</h4>
          </Link>
          {
            !showChat && (
              <Link className="float-box" onClick={() => setShowChat(true)}>
                <div className="icon"><FaComments /></div>
                <h4 className='float-box-title' >{t("message")}</h4>
              </Link>
            )
          }
          {showChat && (
            <Link className="float-box" onClick={() => setShowChat(false)}>
              <div className="icon"><FaTimes /></div>
              <h4 className='float-box-title' >{t("closeChat")}</h4>
            </Link>
          )
          }
          <Link to='/helpcenter' className="float-box">
            <div className="icon"><FaQuestionCircle /></div>
            <h4 className='float-box-title' >{t("helpCenter")}</h4>
          </Link>
        </div>


        {/* --------------- cart items ------------ */}
        {
          totalAmount === 0 ? <></> :
            <div className="cart-items-quick float">
              {/* <FontAwesomeIcon className='fa-cart-btn' icon={faCartShopping}/> */}
              <div className="quick-view-basket quick-view-basket2">
                {
                  food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                      return (
                        <div key={item._id}>
                          <div className="quick-item-check">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
        }
      </div>


      {/* ---------------- chat box----------------- */}
      {
        showChat && (
          <div className="chat-view-area">
            <Chat></Chat>
          </div>
        )
      }
    </div>
  )
}

export default FloatBox
