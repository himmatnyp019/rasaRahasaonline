import React from 'react'
import './Settings.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faCog,
  faRightFromBracket,
  faCircleQuestion,
  faTruck,
  faCopy,
  faStar,
  faAngleDown, faBagShopping,
  faAngleRight,
  faShareFromSquare
} from "@fortawesome/free-solid-svg-icons";
import ForgotPassword from '../ResetP/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Settings = () => {

  const { url, loaduserData, setToken } = useContext(StoreContext)
  const { showToast } = useToast()
  const logOut = () => {
    localStorage.removeItem("token");
    setToken('');
    showToast("Log out successfully.")

  }

  return (
    <div className='setting-container'>
      <div className="profile-option-lines">
        <div >

          <FontAwesomeIcon icon={faGlobe} />
          <h3>App Language </h3>
        </div>

        <div>
          <p className="value">English</p>
          <FontAwesomeIcon icon={faAngleDown} />

        </div>
      </div>


      <div className="profile-option-lines">
        <div >

          <FontAwesomeIcon icon={faCircleQuestion} />
          <h3>Help Center</h3>
        </div>

        <div>
          <p className="value"></p>
          <FontAwesomeIcon icon={faAngleRight} />

        </div>
      </div>
      <div className="profile-option-lines">
        <div >

          <FontAwesomeIcon icon={faShareFromSquare} />
          <h3>Share App </h3>
        </div>

        <div>
          <p className="value"></p>
          <FontAwesomeIcon icon={faCopy} />

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
``
          <FontAwesomeIcon icon={faRightFromBracket} />
          <h3>Sign Out </h3>
        </div>

        <div>
          <p className="value"></p>
          <FontAwesomeIcon icon={faAngleRight} />

        </div>
      </div>
    </div>
  )
}

export default Settings
