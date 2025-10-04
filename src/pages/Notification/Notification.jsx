import React, { useState, useEffect, useContext } from "react";
import "./Notification.css";
import { StoreContext } from "../../../context/StoreContext"
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Notification = () => {

  const [notifications, setNotifications] = useState([]);
  const { url, userData } = useContext(StoreContext);
  const userId = userData._id;
  const { t } = useTranslation();

  // Function to fetch notifications from backend
  const loadNotifications = async (userId) => {
    if (userId) {
      try {
        console.log(userId, "userID");

      const response = await axios.get(`${url}/api/notifications/get/${userId}`);
        if (response.data.success) {
          setNotifications(response.data.notifications);
          console.log("Notifications loaded:", response.data.notifications);
        } else {
          console.log("No notifications found");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

  }

  // fetch notifications on component mount
  useEffect(() => {
    loadNotifications(userId);
  }, [userId, userData]);


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
        <img src={assets.notify_bell} height={35} alt="" />
        <h2 className="notif-header"> {t("notifications")}</h2>

      </div>
      <br />
      <div className="notif-list">
        {notifications.map((notif, index) => (
          <motion.div
            data-aos="fade-up"
            data-aos-dealy={100 + (index * 10)}
            key={notif._id}
            className="notif-card"
            whileHover={{ scale: 1.03 }}
            onClick={() => handleClick(notif)}
          >
            {notif.image && (
              <img src={notif.image} alt="notif" className="notif-image" />
            )}
            <div className="notif-content">
              <h3 className="notif-title">{t(notif.title)}</h3>
              <p className="notif-desc">{t(notif.description)}</p>
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
                {t("close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
