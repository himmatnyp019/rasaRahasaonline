import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import "../../src/i18n.js";
import "./Language.css";
import { StoreContext } from "../../context/StoreContext.jsx";

const Language = () => {
  const { t, i18n } = useTranslation();
  const { activeLang, setActiveLang, changeLanguage } = useContext(StoreContext)
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ko", label: "Korean", flag: "🇰🇷" },
    { code: "si", label: "Sinhala", flag: "🇱🇰" },
    { code: "np", label: "नेपाली", flag: "🇳🇵" },
  ];

  const langChangehandler = (lng) => {
    setIsOpen(false)
    changeLanguage(lng)
  }
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lan-container" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flag">
          {languages.find((l) => l.code === activeLang)?.flag}
        </span>
        <span className="label">
          {languages.find((l) => l.code === activeLang)?.label}
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-btn ${activeLang === lang.code ? "active" : ""
                }`}
              onClick={() => langChangehandler(lang.code)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="label">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Language;
