import React, { useState, useEffect } from 'react'
import './Login.css'
import { assets } from '../../src/assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useToast } from '../../context/ToastContext';
import { t } from 'i18next'
import Policies from '../Policies/Policies'

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const { showToast } = useToast();
  const { showPolicies, setShowPolicies } = useContext(StoreContext);
  const [loginMethod, setLoginMethod] = useState("email")

  const [currState, setCurrState] = useState("login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const onLoin = async (event) => {
    console.log(data);

    event.preventDefault();
    let newUrl = url;
    if (currState === "login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      showToast("Logged in successfully.")
    } else {
      alert(response.data.message)
    }
  }


  return (
    <div className='login'>
      <form className="login-container" onSubmit={onLoin}>

        <div className="login-left">
          <div className="image-container">
            <h1>{t("slogan")}</h1>
            <p>{t("s2")}</p>
          </div>
        </div>


        <div className="login-right">
          <div className='close-btn' onClick={() => setShowLogin(false)}  > <p>X</p> </div>
          <div className="login-title">
            <h1>ආයුබෝවන්</h1>
            <br />
          </div>
          <div className="login-inputs">
            <p>{t(currState)} {t("withEmail")} </p>
            {
              currState === "login" ? <> <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder={t("enterYourEmail")} /></> :
                <div>
                  <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder={t("enterYourEmail")} required />
                  <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder={t("enterYourFullName")} required />
                </div>
            }

            {
              currState === "login" ? <>
                <p className='or-text'>{t("or")}</p>
                <p>{t(currState)} {t("withPhone")} </p>
                <input type='number' name="phone" onChange={onChangeHandler} value={data.phone} placeholder={t("enterMobileNumber")} />
              </> : <input type='number' name="phone" onChange={onChangeHandler} value={data.phone} placeholder={t("enterMobileNumber")} required />
            }

            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder={t("enterPassword")} required />
          </div>
          <button type='submit'>{currState === t('signUp') ? t("createAnAccount") : t("loginNow")}</button>

          <p className='policy-view-button' onClick={() => setShowPolicies(true)}>{t("companyPolicyAndAgreement")}</p>

          <div className="login-condition">
            <input type="checkbox" required />
            <p>{t("termsAgreement")}</p>
          </div>
          {currState === 'login'
            ? <p className='join-option'>{t("createNewAccount")} ? <br /> <span onClick={() => setCurrState('signUp')}>{t("registerToday")}</span></p>
            : <p className='join-option'>{t("alreadyHaveAnAccount")} <br /> <span onClick={() => setCurrState('login')}>{t("loginNow")}</span></p>
          }
          <Policies></Policies>
        </div>
      </form>
    </div>
  )
}

export default Login;