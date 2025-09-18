import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import './Tracking.css'
import { StoreContext } from "../../../context/StoreContext";
import { toast } from 'react-toastify'
import { assets } from "../../assets/assets";

const Tracking = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { url } = useContext(StoreContext)

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
    "Order Processing...",
    "Order Packaging...",
    "Order on Delivery",
    "Delivered"
  ];
  const handlePackingUpdate = async (userId,orderId, status) => {
    try {
      const res = await axios.post(`${url}/api/order/update`, {
        orderId: orderId,   // backend expects "orderId"
        userId:userId,
        status: status,
        refundStatus:null
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
        return "We’ve received your order after payment. It’s now stored in our system and being prepared.";
      case "Order Packaging...":
        return "Your items are being carefully packed and prepared for shipment.";
      case "Order on Delivery":
        return "Your package is on the way! The courier is delivering it to your address.";
      case "Delivered":
        return "Your order has been successfully delivered. Thank you for shopping with us!";
      case "Cancelled":
        return "Payment has been cancelled. Refund process will initialized after checking payment status."
      default:
        return "Order status is being updated. Please check back soon.If you feel something happening wrong, leave us a message.";
    }
  };


  return (
    <div className="orders-container">
      <div className="page-title">
        <h2>📦 Orders</h2>

        <div className="order-header-extras">
          {/* 1. Total Orders */}
          <div className="extra-box">
            <p>Total Orders</p>
            <h3>{myOrders.length}</h3>
          </div>

          {/* 2. Pending */}
          <div className="extra-box">
            <p>Pending</p>
            <h3>{myOrders.filter(o => o.status === "Order Processing...").length}</h3>
          </div>

          {/* 3. Delivered */}
          <div className="extra-box">
            <p>Delivered</p>
            <h3>{myOrders.filter(o => o.status === "Delivered").length}</h3>
          </div>

          {/* 4. Processing */}
          <div className="extra-box">
            <p>Processing</p>
            <h3>{myOrders.filter(o => o.status === "Order Packaging...").length + myOrders.filter(o => o.status === "Order on Delivery").length}</h3>
          </div>

          {/* 5. Cancelled */}
          <div className="extra-box">
            <p>Cancelled</p>
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

        return (
          <motion.div
            key={order._id || index}
            className="order-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }} >
            {/* --- Tracking Status Bar --- */}
            <div className="status-bar">
              {STATUS_STEPS.map((step, i) => (
                <div key={i} className="status-step">
                  <div
                    className={`circle ${i <= currentStep ? "active" : ""}`}
                  />
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className={`line ${i < currentStep ? "active" : ""}`}
                    />
                  )}
                  <p className={`status-label ${i <= currentStep ? "active" : ""}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* --- Order Details --- */}
            <div className="order-info">
              <h2> {order.time}   </h2>
              <p><strong>Status</strong> {order.status==="Cancelled"?order?.refundStatus?.refundMethod:order.status}
              </p>
              <h4 className="status-description-text">{getStatusDescription(order.status)}</h4>
            </div>

            {/* --- Items --- */}
            {/* --- Items Grid --- */}
            <div className="middle-part">

              <div className="items-container">
                {order.items.map((item, idx) => (
                  <div key={idx} className="item-card">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p className="item-details">
                      ${item.price} × {item.quantity}
                    </p>
                    {item.discount > 0 && (
                      <p className="item-discount">- ${item.discount}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* --- User Info Semi-circle --- */}
              <div className="user-info-semicircle">
                <p>Ordered By :</p>
                <p className="user-name">
                  {order.info?.[0]?.firstName} {order.info?.[0]?.lastName}
                </p>
                <p className="user-address">{order.info?.[0]?.fullAdd}</p>
                <p className="user-phone">📞 {order.info?.[0]?.phone}</p>
                <p className="user-address"> {order.info?.[0]?.address}</p>
              </div>
            </div>


            {/* --- Amount & Payment --- */}
            <div className="payment-info">
              <p><strong>Total Price:</strong> ${order.amount}</p>
              <p><strong>Payment:</strong> {order.payment ? "Paid ✅" : "Unpaid ❌"}</p>
              {order.status === "Cancelled" && (
                <img className="cancelled-stamp" width={240} src={assets.cancelled_stamp} alt="" />
              )}
            </div>

            {/* --- Action Buttons --- */}
            <div className="actions">
              {order.status !== "Delivered" && order.status !== "Cancelled" && order.status !== "Order on Delivery" && (
                <button className="cancel-btn" onClick={() => handlePackingUpdate(order.userId, order._id, "Cancelled")}>Cancel Order</button>
              )}
              {order.status !== "Cancelled" && <button className="contact-btn">Contact</button>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};






export default Tracking;
