import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { main_section } from '../../assets/assets';
import './CatView.css'

const CatView = () => {
  const location = useLocation();
  const { category } = location.state || {};

  const [title, setTitle] = useState("Title not Found");
  const [catImg, setCatImg] = useState();
  const [desc, setDesc] = useState("Description not found");

  useEffect(() => {
    if (category) {
      const catData = main_section.find(item => item.category === category);
      if (catData) {
        setTitle(catData.title);
        setDesc(catData.description);
        setCatImg(catData.image);
      }
    }
  }, [category]);

  return (
    <div className='catview-container'>
      <div className="top-title-design">
        <div className="image-content">
         <img src={catImg}/>

        </div>
         <div className="texts">
          <h1>{title}</h1>
         <p>{desc}</p>
         </div>
      </div>
      <div className="middle-design">
        <br />
        <br />
        <br />
        <br />
      </div>

    </div>
  );
};

export default CatView;
