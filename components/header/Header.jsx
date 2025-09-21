import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // import axios
import "./Header.css";
import { StoreContext } from "../../context/StoreContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [sliderData, setSliderData] = useState([]); // state to store slider data
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);
  const {t}=useTranslation();
  const { url }  = useContext(StoreContext);

  // Fetch slider data from backend
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get(url + "/api/sliders/all"); // your GET endpoint
        if (response.data.success) {
          setSliderData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch slider data:", error);
      }
    };

    fetchSliderData();
  }, []);

  // Change slide automatically
  useEffect(() => {
    if (sliderData.length === 0) return; // don't start timer if data not loaded

    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % sliderData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide, sliderData]);

  const handleSlideChange = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setFade(true);
    }, 50);
  };

  if (sliderData.length === 0) {
    return <div className="slider-container">Loading...</div> // simple loading state
  }

  return (
    <div data-aos="fade-right" className="slider-container">
      <div
        className={`slider-background ${fade ? "fade-in" : ""}`}
        style={{ backgroundImage: `url(${sliderData[currentSlide].image})` }}>
        <div className="slider-icons">
          {sliderData.map((slide, index) => (
            <div
              key={slide._id} // changed to _id from database
              className={`icon-button ${currentSlide === index ? "active" : ""}`}
              onClick={() => handleSlideChange(index)} >
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
            <button data-aos="fade-up" data-aos-delay="300" className="view-button">{t("viewMore")}</button>
          </a>
        </div>
      </div>

      <hr
        style={{
          width: "50%",
          margin: "20px auto",
          height: "5px",
          border: "none",
          outline: "none",
          borderRadius: "10px",
          backgroundColor: "#e2e2e295",
        }}
      />
    </div>
  );
};

export default Header;
