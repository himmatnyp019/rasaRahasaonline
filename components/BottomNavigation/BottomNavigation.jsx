import React, { useState } from 'react'
import './BottomNavigation.css'
import { assets } from '../../src/assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useTranslation } from "react-i18next";

const BottomNavigation = ({ setShowLogin }) => {
  const [active, setActive] = useState("home")
  const { token } = useContext(StoreContext)
    const { t } = useTranslation();

  const handleLoginClick = () => {
    setActive("profile");
    setShowLogin(true)
  }

  return (
    <div className='bottom-nav-background'>

      <div className="bottom-navigation">
        <ul>
          <li> <Link className='Link-class' onClick={() => setActive("home")} to='/' >  <img src={assets.home_tomato} /> <p className={`nav-index-text ${active === "home" ? "active" : ""}`}>{t("home")}</p></Link> </li>
          <li> <Link className='Link-class' onClick={() => setActive("search")} to='/search'>  <img src={assets.search_tomato} alt="" /> <p className={`nav-index-text ${active === "search" ? "active" : ""}`}>{t("search")}</p> </Link>  </li>
          <li>  <Link className='Link-class' to='/Cart' onClick={() => setActive("cart")}> <img src={assets.cart_tomato} /> <p className={`nav-index-text ${active === "cart" ? "active" : ""}`}>{t("cart")}</p></Link> </li>
          <li><Link className='Link-class' to='/track' onClick={() => setActive("track")}> <img src={assets.track_tomato} /> <p className={`nav-index-text ${active === "track" ? "active" : ""}`} >{t("tracking")}</p> </Link></li>
          {token
            ? <li> <Link className='Link-class' to='/Profile' onClick={() => setActive("profile")} > <img src={assets.profile_tomato} /> <p className={`nav-index-text ${active === "profile" ? "active" : ""}`} > {t("profile")}</p>  </Link> </li>
            : <li> <Link className='Link-class' onClick={handleLoginClick} > <img src={assets.profile_tomato} /> <p className={`nav-index-text ${active === "profile" ? "active" : ""}`} > {t("login")}</p>  </Link> </li>
          }
        </ul>
      </div>

    </div>
  )
}

export default BottomNavigation
