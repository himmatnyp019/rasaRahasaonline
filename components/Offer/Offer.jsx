import React from 'react'
import "./Offer.css"
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGift,
  faClock,
  faShippingFast,
  faCoins,
  faCalendarDays,
  faCalendarXmark,
  faTruck,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

const Offer = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div className='offer-container'>

      <div className="offer-grid">

        {/* Point System Card */}
        <div data-aos="fade-up" className="offer-card point-system">
          <div className="card-header">
            <div className="icon-container points-icon">
              <FontAwesomeIcon icon={faGift} className="card-icon" />
            </div>
            <h3 className="card-title">{t("pointSystem")}</h3>
          </div>
          <div className="card-content">

            <div className="offer-item">
              <div className="item-header">
                <FontAwesomeIcon icon={faCoins} className="item-icon" />
                <h4 className="item-title">{t("upto100k")}</h4>
              </div>
              <div className="item-value">
                <span className="price">3,000₩</span>
                <span className="price-label">{t("pointsEarned")}</span>
              </div>
            </div>

            <div className="offer-item highlighted">
              <div className="item-header">
                <FontAwesomeIcon icon={faCoins} className="item-icon" />
                <h4 className="item-title">{t("moreThan100k")}</h4>
              </div>

              <div className="item-value">
                <span className="price cut-price">3,000₩</span>
                <span className="price special">{t("freeDelivery")}</span>
                <div className="bonus-badge">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>{t("bonusPoints")}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Office Time Card */}
        {  status !=="no" &&
          <div data-aos="fade-up" data-aos-delay="100" className={`offer-card office-time ${status === "no" ? 'gone' : ''}`}>
            <div className="card-header">
              <div className="icon-container time-icon">
                <FontAwesomeIcon icon={faClock} className="card-icon" />
              </div>
              <h3 className="card-title">{t("officeTime")}</h3>
            </div>
            <div className="card-content">
              <div className="offer-item">
                <div className="item-header">
                  <FontAwesomeIcon icon={faCalendarDays} className="item-icon" />
                  <h4 className="item-title">{t("weekdays")}</h4>
                </div>
                <div className="time-info">
                  <div className="working-hours">
                    <span className="time-slot">10:00 ~ 17:00</span>
                    <div className="lunch-break">
                      <span className="break-label">{t("lunchBreak")}</span>
                      <span className="break-time">12:00 ~ 13:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="offer-item closed-item">
                <div className="item-header">
                  <FontAwesomeIcon icon={faCalendarXmark} className="item-icon closed-icon" />
                  <h4 className="item-title">{t("closedDays")}</h4>
                </div>
                <div className="closed-info">
                  <span className="closed-days">{t("weekends")}</span>
                  <span className="closed-days">{t("publicHolidays")}</span>
                </div>
              </div>
            </div>
          </div>
        }

        {/* Delivery Charge Card */}
        <div data-aos="fade-up" data-aos-delay="200" className="offer-card delivery-charge">
          <div className="card-header">
            <div className="icon-container delivery-icon">
              <FontAwesomeIcon icon={faShippingFast} className="card-icon" />
            </div>
            <h3 className="card-title">{t("deliveryCharge")}</h3>
          </div>
          <div className="card-content">
            <div className="offer-item">
              <div className="item-header">
                <FontAwesomeIcon icon={faTruck} className="item-icon" />
                <h4 className="item-title">{t("upto100k")}</h4>
              </div>
              <div className="item-value">
                <span className="price">3,000₩</span>
                <span className="price-label">{t("standardDelivery")}</span>
              </div>
            </div>

            <div className="offer-item highlighted">
              <div className="item-header">
                <FontAwesomeIcon icon={faTruck} className="item-icon" />
                <h4 className="item-title">{t("moreThan100k")}</h4>
              </div>
              <div className="item-value">
                <span className="price cut-price">3,000₩</span>
                <span className="price free">{t("freeDelivery")}</span>
                <div className="free-badge">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>{t("freeDelivery")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Offer