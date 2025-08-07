import React, { useState, useEffect } from 'react'
import './Login.css'
import { assets } from '../../src/assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useToast } from '../../context/ToastContext';

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const {showToast} = useToast();
  const [currState, setCurrState] = useState("Log In")
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
    event.preventDefault();
    let newUrl = url;
    if (currState === "Log In") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
 const response = await axios.post(newUrl,data);
 if (response.data.success) {
  setToken(response.data.token);
  localStorage.setItem("token", response.data.token);
  setShowLogin(false);
  showToast("Logged in successfully.")
 }else{
  alert(response.data.message)
 }
  }


  return (
    <div className='login'>
      <form className="login-container" onSubmit={onLoin}>
        <div className="login-title">
          <h2>{currState} </h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {
            currState === "Log In" ? <></> :
              <div>
                <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your Full Name' required />

                <input type='number' name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Enter Mobile Number' required />
              </div>
          }
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Enter your Email Address' required />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Password' required />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? "Create an Account" : "Log In"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & Privacy Policy.</p>
        </div>
        {currState === 'Log In'
          ? <p className='join-option'>Create a New Account ? <br /> <span onClick={() => setCurrState('Sign Up')}>Register today</span></p>
          : <p className='join-option'>Already have an Account ? <br /> <span onClick={() => setCurrState('Log In')}>Login now</span></p>
        }

      </form>
    </div>
  )
}

export default Login
