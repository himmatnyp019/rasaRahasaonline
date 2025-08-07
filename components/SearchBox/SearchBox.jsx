import React from 'react'
import './SearchBox.css'
import { assets } from '../../src/assets/assets'

const SearchBox = ({setSearchBox}) => {
  return (
    <div className='search-container'>
      <div className="search-box">
        <p onClick={()=>setSearchBox(false)}> X</p>
        <form action="search">

            <div className="search">
                <input type="text" placeholder='Search here...' required />
                <div className="button"> <img src={assets.search} alt="" /></div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBox
