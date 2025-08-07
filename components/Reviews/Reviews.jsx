import React from 'react'
import "./Reviews.css"
import { assets } from '../../src/assets/assets'
const Reviews = () => {
  return (
    <div className='reviews-container'>
     <div className="reviews-title">
        <h2>Customer Reviews</h2>
     </div>
     <div className="reviews-star">
        <h1 className="total-rating">4.5</h1>
        <img src={assets.rating_starts} alt="" />
        <p>reviews by authentic purchase</p>
     </div>
    </div>
  )
}

export default Reviews
