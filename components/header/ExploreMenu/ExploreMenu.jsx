import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../../src/assets/assets';

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='exploreMenu' id='exploreMenu'>
        <h1  data-aos="fade-up" className='explore-title-text'>Explore what we have ?</h1>
        <p  data-aos="fade-up" className='exploreMenu-text'>
            Organized for your comfort — browse what you need, how you need it. - scroll right for more...
        </p>
        <div className="exploreMenu-List">
            {menu_list.map((item,index)=>{

                return (
                    <a  data-aos="fade-up"data-aos-delay={index * 100} href='#food-display' onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} key={index} className="exploreMenu-List-Item">
                        <img className={category===item.menu_name?"active":" "} src={item.menu_image} alt={`${item.menu_name}-img` }/>
                        <p className={category===item.menu_name?"active2":" "}>{item.menu_name}</p>
                    </a>
                )
            })}
        </div>
      <hr />
    </div>
  )
}

export default ExploreMenu;
