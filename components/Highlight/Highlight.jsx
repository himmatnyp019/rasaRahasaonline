import React, { useContext, useRef } from 'react'
import './Highlight.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { useTranslation } from 'react-i18next'
import { assets } from '../../src/assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons'

const Highlight = ({ id, name, price, description, image, category }) => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  
  const handleWheel = (e) => {
    const container = e.currentTarget;
    // Prevent vertical scroll
    e.preventDefault();
    // Scroll horizontally based on vertical delta
    container.scrollLeft += e.deltaY * 2;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const { food_list } = useContext(StoreContext);
  const { cartItems, addToCart, removeFromCart, our_product } = useContext(StoreContext);

  // Filter products for "Our product" category
  const highlightProducts = food_list.filter(item => item.category === "Our product");

  return (
    <div className="highlight-wrapper">
      <div className="highlight-container">
        
        {/* Header Section with Image and Title */}
        <div className="highlight-header" data-aos='fade-up'>
          <div className="header-content">
            <div className="title-section">
              <div className="title-container">
                <h1 className='highlight-title'>{t("availableOnly")}</h1>
                <div className="title-decoration">
                  <div className="decoration-line"></div>
                  <FontAwesomeIcon icon={faStar} className="decoration-star" />
                </div>
              </div>
              <p className="highlight-subtitle">Discover our exclusive collection</p>
            </div>
            
            <div className="highlight-image-container">
              <div className="image-wrapper">
                <img src={assets.sdsproduct} alt="Featured Product" className="highlight-image" />
                <div className="image-glow"></div>
                <div className="floating-badge">
                  <span className="badge-text">Special</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Scroll Section */}
        <div className="products-section" data-aos='fade-up' data-aos-delay="200">
          <div className="products-container">
            
            {/* Navigation Buttons */}
            <button className="scroll-btn scroll-btn-left" onClick={scrollLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            
            <button className="scroll-btn scroll-btn-right" onClick={scrollRight}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Products Grid */}
            <div 
              className="products-scroll-container" 
              onWheelCapture={handleWheel}
              ref={scrollContainerRef}
            >
              <div className="products-grid">
                {highlightProducts.map((item, index) => (
                  <div key={index} className="product-item-wrapper">
                    <FoodItem 
                      className="food-item" 
                      id={item._id} 
                      name={item.name} 
                      description={item.description} 
                      price={item.price} 
                      image={item.image} 
                      image2={item.image2} 
                      image3={item.image3} 
                      category={item.category} 
                      discount={item.discount}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
              <div className="indicator-track">
                <div className="indicator-thumb"></div>
              </div>
              <span className="scroll-hint">Scroll to explore more</span>
            </div>
          </div>
        </div>

      </div>
      <br />
      <br />
    </div>
    
  )
}

export default Highlight