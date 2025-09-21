import React from 'react'
import "./Offer.css"
import { useTranslation } from 'react-i18next'

const Offer = ({ status }) => {
   const {t} = useTranslation();
  return (
    <div className='offer-container'>
      <div data-aos="fade-up" className="delivery-system">
        <h1>{t("pointSystem")}</h1>
        <ul>
          <li>
            <h3>{t("upto100k")}</h3>
            <div><p>= 3,000₩</p></div>
          </li>
          <li>
            <h3>{t("moreThan100k")}</h3>
            <div><p className='cut-price'> = 3,000₩</p>
              <p>{t("freeDelivery")}</p></div>
          </li>
        </ul>
      </div>

      <div data-aos="fade-up" data-aos-delay="100" className={`delivery-system ${status === "no" ? 'gone' : ''}`}>
        <h1>{t("officeTime")}</h1>
        <ul>
          <li>
            <h3>{t("weekdays")}</h3>
            <div><p>10:00 ~ 17:00 <br />(Lunch: 12:00 ~ 13:00)</p></div>
          </li>
          <li>
            <h3>{t("closedDays")}</h3>
            <p className='closed-days'>{t("weekends")}, <br /> {t("publicHolidays")}</p>
          </li>
        </ul>
      </div>

      <div data-aos="fade-up" data-aos-delay="200" className="delivery-system">
        <h1>{t("deliveryCharge")}</h1>
        <ul>
          <li>
            <h3>{t("upto100k")}</h3>
            <div><p>= 3,000₩</p></div>
          </li>
          <li>
            <h3>{t("moreThan100k")}</h3>
            <div><p className='cut-price'> = 3,000₩</p>
              <p>{t("freeDelivery")}</p></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Offer
