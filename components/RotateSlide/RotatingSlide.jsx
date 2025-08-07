import React from 'react'
import "./RotatingSlide.css"
import { assets } from '../../src/assets/assets'

const RotatingSlide = () => {
  return (
    <div className='rotator-slide-container'>
 <div className="slide-contents">

  <div data-aos='fade-up' className="rs-slide">
    <div className="top-image">
      <img src={assets.vegetable} alt="" />
      
    </div>
    <div className="bottom-contents">
      <h1>Vegetables & Fruits</h1>
      <p>All fresh vegetables and fruits <br /> from motherland.</p>
    </div>
  </div>

  <div data-aos='fade-up' data-aos-delay="300" className="rs-slide">
    <div className="top-image">
      <img src={assets.species} alt="" />
     
    </div>
    <div className="bottom-contents">
      <h1>Species, Masala</h1>
      <p>masala, turmeric, oils, sauces <br /> kitchen things</p>
    </div>
  </div>


  <div data-aos='fade-up' data-aos-delay="600" className="rs-slide">
    <div className="top-image">
      <img src={assets.meat} alt="" />
      
    </div>
    <div className="bottom-contents">
      <h1>Meat and Fish</h1>
      <p>All fresh meats & fishes<br /> delivery with safety</p>

    </div>
  </div>


  <div data-aos='fade-up' data-aos-delay='900' className="rs-slide">
    <div className="top-image">
      <img src={assets.vegetable} alt="" />
      
    </div>
    <div className="bottom-contents">
      <h1>Vegetables & Fruits</h1>
      <p>All fresh vegetables and fruits <br /> from motherland.</p>
    </div>
  </div>


 </div>
  
      
    </div>
  )
}

export default RotatingSlide
''