import React from 'react'
import "./FloatBox.css"
import { assets } from '../../src/assets/assets'
import { Link } from 'react-router-dom'
const FloatBox = () => {
  return (
    <div className='float-box-container'>
      
        <Link className='float-box' to="/Cart">
        <img src={assets.add_icon_white} alt="" />
        <h4 className='float-box-title' > View Cart</h4>
        </Link>
     
      
        <Link className="float-box">
        <img src={assets.chat} alt="" />
        <h4 className='float-box-title' >Message/Inquiry</h4>
        </Link>
     

        <Link className="float-box">
        <img src={assets.help} alt="" />
        <h4 className='float-box-title' >Help Center</h4>
        </Link>
   
    </div>
  )
}

export default FloatBox
