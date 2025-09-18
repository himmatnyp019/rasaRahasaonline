import React, { useState, useContext } from 'react'
import './Profile.css'
import { StoreContext } from '../../../context/StoreContext'
import { assets } from '../../assets/assets';
import DeliveryAddress from '../../../components/DeliveryAddress/DeliveryAddress';
import History from '../../../components/History/History';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Settings from '../../../components/Settings/Settings';
import ProfileUpdate from '../../../components/ProfileUpdate/ProfileUpdate';
import ForgotPassword from '../../../components/ResetP/ForgotPassword';
import ResetViaEmail from '../../../components/ResetP/ResetViaEmail';
import ResetViaPhone from '../../../components/ResetP/ResetViaPhone';

const Profile = () => {
  const { orderHistory, token, setToken, setShowLogin, userData, url, loadUserData } = useContext(StoreContext);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [updateMode, setUpdateMode] = useState("updateProfile");

  let historyLength = orderHistory.length
  const navigate = useNavigate();
  let userInfo = userData;

  if (Object.keys(userInfo).length === 0) {
    const savedData = localStorage.getItem("userInfo");

    if (savedData) {
      userInfo = JSON.parse(savedData);  // parse because it's stored as string

    } else {
      loadUserData(token);
    }
    const LoginExpired = () => {
      navigate("/")
    }
    if (!localStorage.getItem("token")) {
      LoginExpired();
    }
  }

  return (

    <div className='profile'>
      <div className="profile-user-info">
        <div className="water-profile">
          <img src={userInfo.image?userInfo.image:assets.dommy_profile} alt="Profile" />
        </div>
        <div className="user-info-text">
          <h1>Hi, {userInfo.name}</h1>
          <p className='user-email-text'>{userInfo.email}</p>
          <p className='user-phone-text' >{userInfo.phone}</p>
          <div className="who-can-view-info">
            <img src={assets.help} alt="info" />
            <p>Only you can view this information.</p>
          </div>
          <p>
            <u onClick={() => { setShowUpdateProfile(true), setUpdateMode("updateProfile") }}>edit information</u>
          </p>
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
          <History count={4}></History>
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
        <Settings></Settings>
      </div>
      {showUpdateProfile && (
        <div className="profile-update-container active">
          <p className='close-update-profile' onClick={() => setShowUpdateProfile(false)}>X</p>

          {updateMode === "updateProfile" && (<ProfileUpdate setUpdateMode={setUpdateMode}></ProfileUpdate>)}
          {updateMode === "resetPassword" && (<ForgotPassword setUpdateMode={setUpdateMode}></ForgotPassword>)}
          {updateMode === "resetViaEmail" && (<ResetViaEmail setUpdateMode={setUpdateMode}></ResetViaEmail>)}
          {updateMode === "resetViaPhone" && (<ResetViaPhone setUpdateMode={setUpdateMode}></ResetViaPhone>)}

        </div>
      )}
    </div>

  )
}

export default Profile
