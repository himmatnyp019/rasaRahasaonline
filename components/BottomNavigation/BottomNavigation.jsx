import React, { useState} from 'react'
import './BottomNavigation.css'
import { assets } from '../../src/assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const BottomNavigation = ({setSearchBox,setShowLogin}) => {
  const [active, setActive] = useState("home")
  const {token} = useContext(StoreContext)

  const handleLoginClick = ()=>{
    setActive("profile");
    setShowLogin(true)
  }

  return (
     <div className='bottom-nav-background'>

     <div className="bottom-navigation">
          <ul>
            <li> <Link className='Link-class' onClick={()=> setActive("home")} to='/' >  <img src={assets.home_tomato}/> <p className={`nav-index-text ${active==="home"?"active":""}`}>Home</p></Link> </li>
            <li className='Link-class' onClick={()=>{setSearchBox(true); setActive("search")}}> <img  src={assets.search_tomato} alt="" /> <p className={`nav-index-text ${active==="search"?"active":""}`}>Search</p></li>
            <li>  <Link className='Link-class' to='/Cart' onClick={()=> setActive("cart")}> <img src={assets.cart_tomato} /> <p className={`nav-index-text ${active==="cart"?"active":""}`}>Cart</p></Link> </li>
              <li><Link className='Link-class' to='/track' onClick={()=> setActive("track")}> <img src={assets.track_tomato} /> <p className={`nav-index-text ${active==="track"?"active":""}`} >Tracking</p> </Link></li>
            {token
            ?<li> <Link className='Link-class' to='/Profile' onClick={()=> setActive("profile")} > <img src={assets.profile_tomato} /> <p className={`nav-index-text ${active==="profile"?"active":""}`} > Profile</p>  </Link> </li>
            :  <li> <Link className='Link-class'  onClick={handleLoginClick} > <img src={assets.profile_tomato} /> <p className={`nav-index-text ${active==="profile"?"active":""}`} > Login</p>  </Link> </li>
            }
          </ul>
        </div>

        </div>
  )
}

export default BottomNavigation
