import React, { useEffect, useState } from "react";
import sliderData from "./UniversalData";
import "./Header.css";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false); // Add fade state

  // Change slide automatically
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Change slide with fade animation
  const handleSlideChange = (index) => {
    setFade(false); // Reset fade to trigger re-animation
    setTimeout(() => {
      setCurrentSlide(index);
      setFade(true); // Trigger fade after state update
    }, 50); // Slight delay for the fade to reset
  };

  return (
    <div data-aos="fade-right" className="slider-container">
      <div
        className={`slider-background ${fade ? "fade-in" : ""}`}
        style={{ backgroundImage: `url(${sliderData[currentSlide].image})` }}
      >
        <div className="slider-icons">
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className={`icon-button ${currentSlide === index ? "active" : ""}`}
              onClick={() => handleSlideChange(index)}
            >
              <img src={slide.icon} alt="icon" className="icon-img" />
            </div>
          ))}
        </div>

        <div className="slider-text">
          <h2 data-aos="fade-left">{sliderData[currentSlide].title}</h2>
          <p data-aos="fade-left">{sliderData[currentSlide].description}</p>
          <a
            href={sliderData[currentSlide].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button data-aos="fade-up" data-aos-delay="300" className="view-button">View More</button>
          </a>
        </div>
      </div>

      <hr style={{
        width:'50%',
        margin:"20px auto",
        height:'5px',
        border:"none",
        outline:'none',
        borderRadius:"10px",
        backgroundColor:"#e2e2e295"


      }}/>
    </div>
  );
};

export default Header;
