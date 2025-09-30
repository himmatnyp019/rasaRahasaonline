import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import './Tracking.css'
import { StoreContext } from "../../../context/StoreContext";
import { toast } from 'react-toastify'
import { assets } from "../../assets/assets";
import { useTranslation } from "react-i18next";
import React from 'react';
import './OrderTracking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faBox, 
  faTruck, 
  faCheckCircle,
  faTimesCircle,
  faPhone,
  faMapMarkerAlt,
  faUser,
  faCalendarAlt,
  faCreditCard,
  faInfoCircle,
  faEye
} from '@fortawesome/free-solid-svg-icons';


const Tracking = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { url } = useContext(StoreContext)
  const { t } = useTranslation();

  let token = localStorage.getItem('token')
  // Fetch all my orders (order tracking)
  const loadMyOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(url + "/api/order/my", { headers: { token } });

      if (response.data?.success) {
        setMyOrders(response.data.orders || []);
      } else {
        throw new Error(response.data?.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error loading orders:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyOrders();
  }, []);
  const STATUS_STEPS = [
    t("orderProcessing"),
    t("orderPackaging"),
    t("orderOnDelivery"),
    t("delivered"),
  ];
  const handlePackingUpdate = async (userId, orderId, status) => {
    try {
      const res = await axios.post(`${url}/api/order/update`, {
        orderId: orderId,   // backend expects "orderId"
        userId: userId,
        status: status,
        refundStatus: null
      });
      if (res.data.success) {
        alert("Order cancelled successfully!");
      } else {
        console.log("❌ Cancellation failed at this state:", res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Server error while updating status.");
    }

  };
  const getStatusDescription = (STATUS_STEPS) => {
    switch (STATUS_STEPS) {
      case "Order Processing...":
        return t("orderProcessingDescription");
      case "Order Packaging...":
        return t("orderPackagingDescription");
      case "Order on Delivery":
        return t("orderOnDeliveryStatus");
      case "Delivered":
        return t("deliveredDescription");
      case "Cancelled":
        return t("cancelledDescription")
      case "Refund Done":
        return t("refundCompletedMessage");
      case "Not eligible for refund.":
        return t("refundFailedNoPayment");
      default:
        return t("orderStatusDefaultDescription");
    }
  };

  //all for redesign.........
    const getStatusIcon = (STATUS_STEPS) => {
    switch (STATUS_STEPS) {
      case 'Order Processing...': return faShoppingCart;
      case 'Order Packaging...': return faBox;
      case 'Order on Delivery': return faTruck;
      case 'Delivered': return faCheckCircle;
      case 'Cancelled': return faTimesCircle;
      default: return faShoppingCart;
    }
  };
  const getStatusColor = (STATUS_STEPS) => {
    switch (STATUS_STEPS) {
      case 'Order Processing...': return '#ff6347';
      case 'Order Packaging...': return '#ffa500';
      case 'Order on Delivery': return '#4ecdc4';
      case 'Delivered': return '#2ecc71';
      case 'Cancelled': return '#e74c3c';
      default: return '#ff6347';
    }
  };


  return (
    <div className="orders-container">
      <div className="page-title">
        <h2>📦 {t("orders")}</h2>

        <div className="order-header-extras">
          {/* 1. Total Orders */}
          <div className="extra-box">
            <p>{t("totalOrders")}</p>
            <h3>{myOrders.length}</h3>
          </div>

          {/* 2. Pending */}
          <div className="extra-box">
            <p>{t("pending")}</p>
            <h3>{myOrders.filter(o => o.status === "Order Processing...").length}</h3>
          </div>

          {/* 3. Delivered */}
          <div className="extra-box">
            <p>{t("delivered")}</p>
            <h3>{myOrders.filter(o => o.status === "Delivered").length}</h3>
          </div>

          {/* 4. Processing */}
          <div className="extra-box">
            <p>{t("processing")}</p>
            <h3>{myOrders.filter(o => o.status === "Order Packaging...").length + myOrders.filter(o => o.status === "Order on Delivery").length}</h3>
          </div>

          {/* 5. Cancelled */}
          <div className="extra-box">
            <p>{t("cancelled")}</p>
            <h3>{myOrders.filter(o => o.status === "Cancelled").length}</h3>
          </div>
        </div>

        {/* 6. Moving Truck GIF */}
        <div className="truck-container">
          <div className="delivery-truck">
            <img src="https://static.wixstatic.com/media/cd3dbe_9bb29aa8db0a46c9aabbb2fb64f32f84~mv2.gif" alt="Delivery Truck" />
          </div>
        </div>
      </div>

 {myOrders.map((order, index) => {
        const currentStep = STATUS_STEPS.indexOf(order.status);
        const statusColor = getStatusColor(order.status);

        return (
          <motion.div
            key={order._id || index}
            className={`order-card ${order.status.toLowerCase().replace(/\s+/g, '-')}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Header Section */}
            <div className="order-header">
              <div className="header-left">
                <div className="order-date">
                  <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
                  <h2 className="order-time">{order.time}</h2>
                </div>
                <div className="order-status-info">
                  <div className="status-badge" style={{ backgroundColor: statusColor }}>
                    <FontAwesomeIcon icon={getStatusIcon(order.status)} className="status-icon" />
                    <span className="status-text">
                      {order.status === "Cancelled" ? t(order?.refundStatus?.refundMethod) : t(order.status)}
                    </span>
                  </div>
                  <p className="status-description">{getStatusDescription(order.status)}</p>
                </div>
              </div>
              
              <div className="header-right">
                <div className="order-actions-header">
                  {order.status !== "Delivered" && order.status !== "Cancelled" && order.status !== "Order on Delivery" && order.status !== "Refund Done" && (
                    <button 
                      className="cancel-btn-header" 
                      onClick={() => handlePackingUpdate(order.userId, order._id, "Cancelled")}
                    >
                      {t("cancelOrder")}
                    </button>
                  )}
                  {order.status !== "Cancelled" && (
                    <button className="contact-btn-header">
                      {t("contact")}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Tracking Bar */}
            <div className={`progress-tracking ${order.status === "Cancelled" || order.status === "Refund Done" ? "hidden" : ""}`}>
              <div className="tracking-container">
                {STATUS_STEPS.map((step, i) => (
                  <div key={i} className="tracking-step">
                    <div className="step-connector-line">
                      <div 
                        className={`connector-fill ${i <= currentStep ? "active" : ""}`}
                        style={{ backgroundColor: i <= currentStep ? statusColor : '#e0e0e0' }}
                      />
                    </div>
                    <div 
                      className={`step-circle ${i <= currentStep ? "active" : ""}`}
                      style={{ 
                        backgroundColor: i <= currentStep ? statusColor : '#e0e0e0',
                        borderColor: i <= currentStep ? statusColor : '#e0e0e0'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={getStatusIcon(step)} 
                        className="step-icon"
                      />
                    </div>
                    <p className={`step-label ${i <= currentStep ? "active" : ""}`}>
                      {t(step) || step}
                    </p>
                  </div>
                ))}
                
              </div>
            </div>

            {/* Main Content Section */}
            <div className="order-content">
              
              {/* Left Side - Items */}
              <div className="items-section">
                <div className="section-header">
                  <FontAwesomeIcon icon={faBox} className="section-icon" />
                  <h3 className="section-title">{t("orders")}</h3>
                </div>
                
                <div className="items-grid">
                  {order.items.map((item, idx) => (

                    <div key={idx} className="item-card">
                      <div className="item-image-container">
                        <img src={item.image} alt={item.name} className="item-image" />
                        {item.discount > 0 && (
                          <div className="discount-badge">
                            -{item.discount}₩
                          </div>
                        )}
                      </div>
                      
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-pricing">
                          <span className="item-price">${item.price}</span>
                          <span className="item-quantity">× {item.quantity}</span>
                        </div>
                        {item.discount > 0 && (
                          <div className="item-discount">
                            <span className="discount-label">Discount:</span>
                            <span className="discount-amount">-${item.discount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Customer Info */}
              <div className="customer-section">
                <div className="section-header">
                  <FontAwesomeIcon icon={faUser} className="section-icon" />
                  <h3 className="section-title">{t("orderedBy")}</h3>
                </div>
                
                <div className="customer-card">
                  <div className="customer-avatar">
                    <FontAwesomeIcon icon={faUser} className="avatar-icon" />
                  </div>
                  
                  <div className="customer-details">
                    <div className="customer-name">
                      {order.info?.[0]?.firstName} {order.info?.[0]?.lastName}
                    </div>
                    
                    <div className="contact-info">
                      <div className="contact-item">
                        <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                        <span className="contact-text">{order.info?.[0]?.phone}</span>
                      </div>
                      
                      <div className="contact-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                        <span className="contact-text">{order.info?.[0]?.address}</span>
                      </div>
                      
                      {order.info?.[0]?.fullAdd && (
                        <div className="full-address">
                          <span className="address-label">Full Address:</span>
                          <span className="address-text">{order.info?.[0]?.fullAdd}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section - Payment & Total */}
            <div className="order-footer">
              <div className="payment-summary">
                <div className="summary-item">
                  <FontAwesomeIcon icon={faCreditCard} className="summary-icon" />
                  <div className="summary-details">
                    <span className="summary-label">{t("total")}:</span>
                    <span className="summary-value total-amount">${order.amount}</span>
                  </div>
                </div>
                
                <div className="summary-item">
                  <FontAwesomeIcon icon={faInfoCircle} className="summary-icon" />
                  <div className="summary-details">
                    <span className="summary-label">{t("payment")}:</span>
                    <span className={`summary-value payment-status ${order.payment ? 'paid' : 'unpaid'}`}>
                      {order.payment ? "Paid ✅" : "Unpaid ❌"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cancelled Stamp */}
              {order.status === "Cancelled" && (
                <div className="cancelled-stamp-container">
                  <img 
                    className="cancelled-stamp" 
                    src={assets.cancelled_stamp} 
                    alt="Cancelled" 
                  />
                </div>
              )}
            </div>

            {/* Status Overlay for Visual Enhancement */}
            {/* <div className="status-overlay" style={{ backgroundColor: `${statusColor}10` }}></div> */}
            
          </motion.div>
        );
      })}



    </div>
  );
};




export default Tracking;
