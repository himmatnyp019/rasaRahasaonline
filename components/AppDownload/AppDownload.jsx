import React from 'react'
import './AppDownload.css'
import { assets } from '../../src/assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p data-aos="fade-up" >For Better Experience Download <br />Rasa Rahasa App </p>
        <div className="app-download-platforms">
            <img data-aos="fade-up" src={assets.play_store} alt="" />
            <img data-aos="fade-up" data-aos-delay="100" src={assets.app_store} alt="" />
        </div>
        

      
    </div>
  )
}

export default AppDownload
