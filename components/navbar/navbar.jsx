import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from "../../src/assets/assets";
import { Link, Links } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [totalAmount, amountBeforeDiscount] = getTotalCartAmount();
  return (
    <div>
      <div className="navbar" id='top'>
        <Link to="/" className='logo-container'> <img data-aos="fade-down" className="logo-img" src={assets.logoMain} alt="logo image" />  <img data-aos="fade-down" className="logo" src={assets.logo} alt="logo image" /></Link>
        <Link to='/notification' className='notification-icon2'>
            <img src={assets.notify_bell} height={70} alt="" />
          </Link>
        {/* <ul className='navbar-menu'>
          <Link data-aos="fade-down" data-aos-delay="0" to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
          <a data-aos="fade-down" data-aos-delay="50" href='#exploreMenu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
          <a data-aos="fade-down" data-aos-delay="100" href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
          <a data-aos="fade-down" data-aos-delay="150" href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
        </ul> */}


        <div className="btn-container flex-row">
          <Link to='/search'> 
            <lord-icon
              src="https://cdn.lordicon.com/vayiyuqd.json"
              trigger="hover"
              colors="primary:#ff6347" >
            </lord-icon></Link>
          <Link to='/notification' className='notification-icon'>
            <img src={assets.notify_bell} height={70} alt="" />
          </Link>
          <Link to='/track' className="track-orders">
            <img className='track-order-image' src={assets.trackTruck} alt="track-order" />
            <p>Track Order</p>
          </Link>
          <Link to='/Cart' className='cart-button' >
            <div className={totalAmount === 0 ? "" : "dot"}></div>
            <FontAwesomeIcon data-aos="fade-down" icon={faShoppingBasket} /> View Cart
          </Link>
          {token
            ? <Link data-aos="fade-down" className='profile-button' to='/Profile'> <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon> <p>Profile </p></Link>
            : <Link data-aos="fade-down" className='profile-button' onClick={() => { setShowLogin(true) }}>  <p>Login </p></Link>}
        </div>

      </div>

    </div>
  )
}

export default Navbar;
