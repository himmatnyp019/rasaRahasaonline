import React, { useState, useContext } from 'react'
import './Profile.css'
import { StoreContext } from '../../../context/StoreContext'
import { assets } from '../../assets/assets';
import DeliveryAddress from '../../../components/DeliveryAddress/DeliveryAddress';
import History from '../../../components/History/History';
import Login from '../../../components/LoginPopup/Login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGlobe, 
  faCog, 
  faRightFromBracket, 
  faCircleQuestion, 
  faCopy,
  faStar, 
  faAngleDown,
  faAngleRight,
  faShareFromSquare 
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { orderHistory, token, setToken, setShowLogin, userData, loadUserData } = useContext(StoreContext);
  const [showAllHistory, setShowAllHistory] = useState(false);
  let historyLength = orderHistory.length
  const navigate = useNavigate();
  let userInfo = userData;
  
const logOut = ()=>{
  localStorage.removeItem("token");
  setToken('');
  navigate("/")
}

if (!userData) {
  console.log("empty use data");
  const saveduData = localStorage.getItem("userData")
  if (saveduData) {
    userInfo = saveduData;
  }else{
     loadUserData(token)
  }
  
}
console.log(userInfo.address);

  return (

   <div className='profile'> 
      <div className="profile-user-info">
        <div className="water-profile">
          <img src={assets.dommy_profile} alt="Profile" />
        </div>
        <div className="user-info-text">
          <h1>Hi, {userInfo.name}</h1>
          <p className='user-email-text'>{userInfo.email}</p>
          <p className='user-phone-text' >{userInfo.phone}</p>
          <div className="who-can-view-info">
            <img src={assets.help} alt="info" />
            <p>Only you can view this information.</p>
          </div>
        </div>
      </div>
      
      <hr style={{
        margin: "0",
        marginTop: "60px",
        marginBottom: "20px",
        height: "2px",
        backgroundColor: "#e2e2e2",
        border: "none"

      }} />

      <div className="user-shop-info">
        <DeliveryAddress addressData={userInfo.address}></DeliveryAddress>
        <br />
        <br />
        <div className="div">
          <History  count={4}></History>
<br />

          <button className='view-more' onClick={() => setShowAllHistory(true)}>View More</button>

          {showAllHistory && (
            <div className="view-all-history active">
              <p className='close-history' onClick={() => setShowAllHistory(false)}>X</p>
              <div className="all-history-container">
                <History count={historyLength} />
              </div>
            </div>
          )}

        </div>

      </div>

      <hr style={{
        margin: "0",
        marginTop: "60px",
        marginBottom: "20px",
        height: "2px",
        backgroundColor: "#e2e2e2",
        border: "none"

      }} />

     <div className="profile-options">
      <div className="profile-option-lines">
        <div >

        <FontAwesomeIcon icon={faGlobe} />
        <h3>App Language </h3>
        </div>
      
      <div>
        <p className="value">English</p>
        <FontAwesomeIcon icon={faAngleDown}/>

      </div>
      </div>
       <div className="profile-option-lines">
        <div >

        <FontAwesomeIcon icon={faCircleQuestion} />
        <h3>Help Center</h3>
        </div>
      
      <div>
        <p className="value"></p>
        <FontAwesomeIcon icon={faAngleRight}/>

      </div>
      </div>
       <div className="profile-option-lines">
        <div >

        <FontAwesomeIcon icon={faShareFromSquare} />
        <h3>Share App </h3>
        </div>
      
      <div>
        <p className="value"></p>
        <FontAwesomeIcon icon={faCopy}/>

      </div>
      </div>
       <div className="profile-option-lines">
        <div >

        <FontAwesomeIcon icon={faStar} />
        <h3>Rate and Review </h3>
        </div>
      
      <div>

      </div>
      </div>
      <br />
       <div onClick={logOut} className="profile-option-lines">
        <div >

        <FontAwesomeIcon icon={faRightFromBracket} />
        <h3>Sign Out </h3>
        </div>
      
      <div>
        <p className="value"></p>
        <FontAwesomeIcon icon={faAngleRight}/>

      </div>
      </div>
     </div>

    </div>

    



   
  )
}

export default Profile
