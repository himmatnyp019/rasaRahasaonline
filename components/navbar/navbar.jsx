import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from "../../src/assets/assets";
import { Link, Links } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Language from '../Language/Language';


import {
  faCartShopping,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { t } from 'i18next';

const Navbar = ({ setShowLogin }) => {

  const { token, food_list, cartItems } = useContext(StoreContext);

  return (
    <div>
      <div className="navbar" id='top'>

        <Link to="/" className='logo-container'> <img data-aos="fade-down" className="logo-img" src={assets.logoMain} alt="logo image" />  <img data-aos="fade-down" className="logo" src={assets.logo} alt="logo image" /></Link>

        <div className="content-remain">
          <Link to='/notification' className='notification-icon'>
            <img src={assets.notify_bell} height={35}  />
          </Link>
          <Language />

        </div>
        <div className="btn-container flex-row">
          <Link to='/track' className="track-orders">
            <img className='track-order-image' src={assets.trackTruck} alt="track-order" />
            <p>{t("tracking")}</p>
          </Link>
          <Link to='/Cart' className='cart-button' >
           
            <div className="cart-button-left">
            <FontAwesomeIcon data-aos="fade-down" icon={faCartShopping} />
            {t("cart")}

            </div>

            <div className="grid-cart">
              {Array.from({ length: 4 }).map((_, index) => {
                const validItems = food_list.filter(item => cartItems[item._id] > 0);
                const item = validItems[index];

                return (
                  <div key={item ? item._id : index}>
                    <div className="quick-item-cart-button">
                      {item ? (
                        <img src={item.image || ""}  />
                      ) : (
                        <img  />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </Link>

          {token
            ? <Link data-aos="fade-down" className='profile-button' to='/Profile'> <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon></Link>
            : <Link data-aos="fade-down" className='profile-button' onClick={() => { setShowLogin(true) }}> <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon> </Link>}
        </div>

      </div>
<br />
    </div>
  )
}

export default Navbar;












{/* <ul className='navbar-menu'>
          <Link data-aos="fade-down" data-aos-delay="0" to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
          <a data-aos="fade-down" data-aos-delay="50" href='#exploreMenu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
          <a data-aos="fade-down" data-aos-delay="100" href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
          <a data-aos="fade-down" data-aos-delay="150" href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
        </ul> */}
