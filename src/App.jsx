import React, { useState, useEffect } from 'react'
import Navbar from "../components/navbar/navbar";
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from '../components/Footer/Footer';
import Login from '../components/LoginPopup/Login';
import Details from './pages/Details/Details';
import FloatBox from '../components/FloatBox/FloatBox';
import SearchBox from '../components/SearchBox/SearchBox';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import Profile from './pages/Profile/Profile';
import Bill from '../components/Bill/Bill';
import useAOS from "./hooks/useAOS";
import AOS from "aos";
import "aos/dist/aos.css"; 



const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSearch, setSearchBox] = useState(false)
  const [showBill, setShowBill] = useState(false)
  const [billData, setBillData] = useState(null)
  
 useAOS();
  const location = useLocation();

  useEffect(() => {
    AOS.refresh(); // refresh when route changes
    console.log("Current route:", location.pathname);
  }, [location]);


  return (
    <div className={`app ${location.pathname==="/PlaceOrder" ? "set-back": ""}`}>
      <BottomNavigation setShowLogin={setShowLogin} setSearchBox={setSearchBox}></BottomNavigation>
      {showLogin?<Login setShowLogin={setShowLogin}></Login>:<></>}
      {showSearch?<SearchBox setSearchBox={setSearchBox}></SearchBox> :<></>}
       {showBill && <Bill setShowBill={setShowBill} data={billData} />}
       
      <Navbar setShowLogin={setShowLogin} setSearchBox={setSearchBox} setShowBill={setShowBill}></Navbar>
      <FloatBox/>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
       <Route path="/Cart" element={<Cart setShowBill={setShowBill} setBillData={setBillData} />} />
        <Route path='/PlaceOrder' element={<PlaceOrder/>}></Route>
        <Route path='/Details' element={<Details/>}></Route>
         <Route path='/Profile' element={<Profile></Profile>}></Route>
      </Routes>
      <Footer></Footer>

    </div>
  )
}

export default App
