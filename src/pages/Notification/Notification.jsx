import React, { useState,useEffect, useContext } from "react";
import "./Notification.css";
import {StoreContext} from "../../../context/StoreContext"

import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";

const Notification = () => {

  const [notifications, setNotifications] = useState([]);
  const {url, userData} = useContext(StoreContext);
  
  
    // Function to fetch notifications from backend
   const loadNotifications = async (userId) => {
      try {
        console.log(userId,"userID");
        
        const response = await fetch(url+'/api/notifications/'+userId); // Replace USER_ID with actual user ID
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications);
          console.log("Notifications loaded:", data.notifications);
          
        }
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    }

    // fetch notifications on component mount
  useEffect(() => {
    const userId = userData._id;
    loadNotifications(userId);
  }, [userData]);


  // Sample notifications data structure
  

  const [activeNotif, setActiveNotif] = useState(null);

  const handleClick = (notif) => {
    if (notif.type === "html") {
      setActiveNotif(notif);
    } else {
      window.location.href = notif.action;
    }
  };

  const closeModal = () => setActiveNotif(null);

  return (
    <div className="notification-container">
      <div className="notif-title">
        <img src={assets.notify_bell} alt="" />
        <h2 className="notif-header"> Notifications</h2>

      </div>
      <div className="notif-list">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            className="notif-card"
            whileHover={{ scale: 1.03 }}
            onClick={() => handleClick(notif)}
          >
            {notif.image && (
              <img src={notif.image} alt="notif" className="notif-image" />
            )}
            <div className="notif-content">
              <h3 className="notif-title">{notif.title}</h3>
              <p className="notif-desc">{notif.description}</p>
              <span className="notif-date">{notif.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeNotif && (
          <motion.div
            className="notif-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="notif-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{activeNotif.title}</h2>
              <div
                className="notif-html-content"
                dangerouslySetInnerHTML={{ __html: activeNotif.content }}
              />
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
