import React, { useState } from 'react'
import './Home.css'
import Header from '../../../components/header/Header'
import ExploreMenu from '../../../components/header/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../../components/FoodDisplay/FoodDisplay'
import Highlight from '../../../components/Highlight/Highlight'
import Address from '../../../components/Location/Address'
import AppDownload from '../../../components/AppDownload/AppDownload'
import Offer from '../../../components/Offer/Offer'
import RotatingSlider from '../../../components/RotateSlide/RotatingSlide'
import SearchOnly from '../../../components/OnlySearch/searchOnly.jsx'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className='main-home'>
      <div className="padded-layout">

     <Header></Header>
     <br />
     <br />
     <Offer></Offer>
     <br />
     <br />
     <SearchOnly></SearchOnly>
     <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>
     <RotatingSlider></RotatingSlider>
     <Highlight></Highlight>
     <FoodDisplay category={category}></FoodDisplay>
     <AppDownload></AppDownload>
      </div>
     <Address></Address>
    </div>
  )
}

export default Home;
