import React from 'react'
import './DiscountText.css'


const DiscountText = ({price, discount }) => {

    let initialPrice = price

    let discounted = 0
    let isDiscount = true;
    discount ? discounted = discount : isDiscount = false
    let finalPrice = initialPrice - discounted


    return (
        <div className='discount-container'>
            {
                isDiscount
                    ? <div  data-aos="fade-up" className='discount-texts'>
                        <div className="cost-area">
                            <h1  data-aos="fade-up" className="final-price">₩{finalPrice}</h1>
                            <h3  data-aos="fade-up" className='initial-price'>₩{initialPrice}</h3>
                        </div>
                        <div className="saved-text-area">
                            <p  data-aos="fade-up" data-aos-delay="200" className='discounted-price-text'>you will save ₩{discounted}</p>
                        </div>
                    </div>
                    : <div  data-aos="fade-up" className='discount-texts'>
                        <div className="cost-area">
                            <h1  data-aos="fade-up" className="final-price">₩{initialPrice}</h1>
                            <h3   data-aos="fade-up" className='initial-price'></h3>
                        </div><br />
                    </div>
            }
        </div>
    )
}

export default DiscountText
