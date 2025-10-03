import React, { useState, useEffect, useContext } from 'react'
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
import ResetPassword from './pages/ResetPass/ResetPass';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import Profile from './pages/Profile/Profile';
import Chat from './pages/Chat/Chat';
import Bill from '../components/Bill/Bill';
import CatView from './pages/Category/CatView';
import useAOS from "./hooks/useAOS";
import AOS from "aos";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./pages/Notification/Notification.jsx";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import Tracking from './pages/Tracking/Tracking';
import { isTokenExpired  } from "./hooks/auth.js";
import Lang from "./pages/NokMart/Lang/Lang.jsx"
import Topbar from '../components/Topbar/Topbar.jsx';
import HelpCenter from './pages/HelpCenter/HelpCenter.jsx';
import Test from './pages/Test/Test.jsx';
import FoodReels from "./pages/Reels/FoodReels.jsx";
import { StoreContext } from '../context/StoreContext.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState(null);
  const [tid, setTid] = useState("");
  const { showChat } = useContext(StoreContext);
  useAOS();
  const location = useLocation();

  useEffect(() => {
    AOS.refresh(); // refresh when route changes
    console.log(location.pathname);

    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      setShowLogin(true);   // ✅ show login page
    }
  }, [location.pathname]);


  return (
    <div className={`app ${location.pathname === "/PlaceOrder" ? "set-back" : ""}`}>


      <ToastContainer
        position="top-right"   // other: top-left, bottom-right, bottom-left
        autoClose={3000}       // auto close in ms
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"        // light, dark, colored
      />
      {showLogin ? <Login setShowLogin={setShowLogin}></Login> : <></>}

      {showBill && <Bill setShowBill={setShowBill} data={billData} />}
      { showChat ? null :
        <BottomNavigation setShowLogin={setShowLogin}></BottomNavigation>
      }
      <FloatBox />
      <Topbar />
      <Navbar setShowBill={setShowBill}></Navbar>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/Cart" element={<Cart setShowBill={setShowBill} setShowLogin={setShowLogin} setBillData={setBillData} />} />
        <Route path='/PlaceOrder' element={<PlaceOrder setShowLogin={setShowLogin} />}></Route>
        <Route path='/Details' element={<Details />}></Route>
        <Route path='/Profile' element={<Profile></Profile>}></Route>
        <Route path='/catview' element={<CatView></CatView>}></Route>
        <Route path='/Chat' element={<Chat setShowLogin={setShowLogin} ></Chat>}></Route>
        <Route path='/track' element={<Tracking></Tracking>}></Route>
        <Route path="/reset/:token" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="/notification" element={<Notification></Notification>}></Route>
        <Route path='/search' element={<SearchBox />}>  </Route>
        <Route path='/lang' element={<Lang />}></Route>
        <Route path='/helpcenter' element={<HelpCenter />}></Route>
        <Route path='/test' element={<Test />}></Route>
        <Route path='/reel' element={<FoodReels />}></Route>

      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
