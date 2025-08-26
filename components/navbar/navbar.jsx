import React, { useContext, useState} from 'react'
import './navbar.css'
import { assets } from "../../src/assets/assets";
import { Link, Links } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';

const Navbar = ({setSearchBox,setShowLogin}) => {

    const [menu,setMenu] = useState("home");
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
    const [ totalAmount,amountBeforeDiscount] = getTotalCartAmount();

  
  return (
    <div>
        <div className="navbar" id='top'>
           <Link to="/">   <img data-aos="fade-down" className="logo" src={assets.logo} alt="logo image" /></Link>
          
            <ul className='navbar-menu'>
                <Link  data-aos="fade-down" data-aos-delay="0" to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
                <a  data-aos="fade-down" data-aos-delay="50" href='#exploreMenu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
                <a  data-aos="fade-down"  data-aos-delay="100" href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile App</a>
                <a  data-aos="fade-down" data-aos-delay="150" href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>
            </ul>
            <div className="navbar-right"> 
                <img data-aos="fade-down" onClick={()=>setSearchBox(true)} src={assets.search_icon} alt="search icon" />
                <div className="navbar-search-icon">
                  
                <div className={totalAmount===0?"":"dot"}></div>
                  <Link to='/Cart'>   <img data-aos="fade-down"  src={assets.basket_icon} /></Link>
                </div>
            <div className="track-orders">
              <img className='track-order-image' src={assets.trackTruck} alt="track-order" />
              <p>Track Order</p>
            </div>
            </div>
            {token
            ?<Link data-aos="fade-down" className='profile-button'  to='/Profile'> <p>Profile </p></Link>
            :<Link data-aos="fade-down" className='profile-button' onClick={()=>{setShowLogin(true)}}>  <p>Login </p></Link>}
        </div>
       
    </div>
  )
}

export default Navbar;
