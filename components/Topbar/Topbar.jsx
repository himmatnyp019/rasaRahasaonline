import React from 'react'
import './Topbar.css'

const Topbar = () => {
  return (
    <div className='topbar-container'>
      <div className="topbar-background-main">
      </div>
      <div className="topbar-buttons-container">
        <div className="right-tbc">
          <ul>
            <li><a href="#">Category</a></li>
            <li><a href="#">Our Mart</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </div>
        <div className="left-tbc">
          <ul>
            <li><a href="../../public/docs/privacypolicy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><a href="../../public/docs/termsofuse.html" target='_blank'>Terms of use</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Topbar;
