import React, { useState, useEffect } from 'react'
import Navbar from "../components/navbar/navbar";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import Chat from './pages/Chat/Chat';
import Bill from '../components/Bill/Bill';
import CatView from './pages/Category/CatView';
import useAOS from "./hooks/useAOS";
import AOS from "aos";
import "aos/dist/aos.css";
import Tracking from './pages/Tracking/Tracking';
import { isTokenExpired } from "./hooks/auth.js";

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSearch, setSearchBox] = useState(false)
  const [showBill, setShowBill] = useState(false)
  const [billData, setBillData] = useState(null)

  useAOS();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.refresh(); // refresh when route changes
    console.log(location.pathname);
    if (location.pathname === "/Chat") {
    }
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      setShowLogin(true);   // ✅ show login page
    }

  }, [location.pathname]);
  return (
    <div className={`app ${location.pathname === "/PlaceOrder" ? "set-back" : ""}`}>
      {showLogin ? <Login setShowLogin={setShowLogin}></Login> : <></>}
      {showSearch ? <SearchBox setSearchBox={setSearchBox}></SearchBox> : <></>}
      {showBill && <Bill setShowBill={setShowBill} data={billData} />}
      <BottomNavigation setShowLogin={setShowLogin} setSearchBox={setSearchBox}></BottomNavigation>
      <FloatBox />
      <Navbar setShowLogin={setShowLogin} setSearchBox={setSearchBox} setShowBill={setShowBill}></Navbar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/Cart" element={<Cart setShowBill={setShowBill} setShowLogin={setShowLogin} setBillData={setBillData} />} />
        <Route path='/PlaceOrder' element={<PlaceOrder setShowLogin={setShowLogin} />}></Route>
        <Route path='/Details' element={<Details />}></Route>
        <Route path='/Profile' element={<Profile></Profile>}></Route>
        <Route path='/catview' element={<CatView></CatView>}></Route>
        <Route path='/Chat' element={<Chat setShowLogin={setShowLogin} ></Chat>}></Route>
        <Route path='/track' element={<Tracking></Tracking>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
