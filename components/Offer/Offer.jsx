import React from 'react'
import "./Offer.css"

const Offer = ({ status }) => {
  
  return (
    <div className='offer-container'>
      <div data-aos="fade-up" className="delivery-system">
        <h1>Point System</h1>
        <ul>
            <li>
                <h3>upto 100,000₩</h3>
                <div><p>= 3,000₩</p></div>
            </li>
            <li>
                <h3>more than 100,000₩</h3>
                <div><p className='cut-price'> = 3,000₩</p>
                <p>free delivery</p></div>
            </li>
        </ul>
      </div>

           <div data-aos="fade-up" data-aos-delay="100" className={`delivery-system ${status==="no" ? 'gone' : ''}`}>
        <h1>Office Time</h1>
        <ul>
            <li>
                <h3>Weekdays</h3>
                <div><p>10:00 ~ 17:00 <br />(Lunch: 12:00 ~ 13:00)</p></div>
            </li>
            <li>
                <h3>Closed days</h3>
                <p className='closed-days'>weekends, public holidays</p>
            </li>
        </ul>
      </div>
      
      <div data-aos="fade-up" data-aos-delay="200" className="delivery-system">
        <h1>Delivery Charge</h1>
        <ul>
            <li>
                <h3>upto 100,000₩</h3>
                <div><p>= 3,000₩</p></div>
            </li>
            <li>
                <h3>more than 100,000₩</h3>
                <div><p className='cut-price'> = 3,000₩</p>
                <p>free delivery</p></div>
            </li>
        </ul>
      </div>
      
      
    </div>
  )
}

export default Offer
