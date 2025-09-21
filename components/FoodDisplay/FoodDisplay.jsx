import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';
import MainItems from '../MainItems/MainItems';
import { useTranslation } from 'react-i18next';



const FoodDisplay = ({category}) => {
    const {t} = useTranslation();
    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <hr style={{
          margin: "0",
          marginTop:"20px",
          marginBottom:"20px",
          height: "2px",
          backgroundColor: "#e2e2e2",
          border: "none"

        }} />
        <MainItems></MainItems>
        <h2 className='food-display-title'>{t("topItems")}</h2>
      <div className="food-display-list">
        {food_list.map((item, index)=>{
          if (category==="All" || category===item.category) {
            
            return( <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} image3={item.image3} image2={item.image2} category={item.category} discount={item.discount}>
             
            </FoodItem>) 
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay;
