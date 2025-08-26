import React, { useState, useRef, useEffect, useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";
import "./Chat.css";
import { FaPaperPlane, FaTrash, FaImage } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";
import axios from 'axios'
import { useToast } from '../../../context/ToastContext'


const Chat = () => {
  const { userData, loadMyMessage, myMessage, url } = useContext(StoreContext);
  const CURRENT_USER_ID = userData._id;
  const [newMsg, setNewMsg] = useState("");
  const [newImage, setNewImage] = useState(null);
  const chatEndRef = useRef();
  const { showToast } = useToast();
  const productId = '';
  const [messages, setMessages] = useState(myMessage);


  const formatDisplayTime = (date) => {
    try {
      // If date is string or nested $date
      const d = date?.$date ? new Date(date.$date) : new Date(date);

      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Seoul",
      }).format(d);
    } catch {
      return date?.toISOString?.() || "";
    }
  };
  const token = localStorage.getItem("token")
  if (!token) {
    showToast("Please Login First");
  }
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(myMessage);
  }, [myMessage]);

  // Send message to backend
  const handleSend = async () => {
    if (!newMsg && !newImage) return;
    try {
      // Prepare form data because image might be included
      const formData = new FormData();
      formData.append("userId", CURRENT_USER_ID);
      if (newMsg) formData.append("message", newMsg);
      if (newImage) formData.append("uploadImage", newImage); // same key as multer.single()
      if (productId) formData.append("productId", productId);
      const res = await axios.post(url +"/api/chat/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token
        },
      });
      if (res.data.success) {
        // full saved object comes from backend
        const savedMsg = res.data.data;
        // Update local UI immediately
        setMessages((prev) => [...prev, savedMsg]);
      }
      // Reset input fields
      setNewMsg("");
      setNewImage(null);
    } catch (error) {
      console.error("Send message failed:", error);
      showToast("Failed to send message.")
    }
  };

  const onDeleteHandler = async (messageId) => {
    setMessages((prev) => prev.filter((m) => m._id !== messageId));
    try {
    

      const token = localStorage.getItem("token"); // adjust if you store token differently

      const res = await axios.delete(url + "/api/chat/delete/" + messageId, { headers: { token }, });

      if (res.data.success) {
        // remove deleted message from local state
        setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      } else {
        alert(res.data.message || "Failed to delete message");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting message");
    } finally {
      
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) setNewImage(e.target.files[0]);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <img alt="profile" src={assets.dommy_profile} className="profile-img" />
        <h3>{userData?.name}</h3>
      </div>

      {/* Messages */}
      <div className="chat-body">
        <AnimatePresence>
          {messages.map((msg) => {
            const isMe = msg.senderType === "admin";
            return (
              <motion.div
                key={msg._id}
                className={`chat-message ${isMe ? "admin" : "me"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300 }} >

                <div className="message-content">
                  <div className="delete-btn">
                    {!isMe &&(
                      
                      <div className="delete-icon" onClick={() => onDeleteHandler(msg._id)} title="Delete message" > <FaTrash /></div>
                    )}

                  </div>
                  {msg.message && <p className="text">{msg.message}</p>}
                  {msg.uploadImage && (
                    <img src={msg.uploadImage} alt="image" className="msg-image" />
                  )}
                  {msg.product && (
                    <div className="product-box">
                      <img
                        src={msg.product.image}
                        alt={msg.product.name}
                        className="product-img"
                      />
                      <div className="product-info">
                        <h4>{msg.product.name}</h4>
                        <p>
                          Price: ${msg.product.price} (-${msg.product.discount})
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="time">{formatDisplayTime(msg.createdAt)}</p>

                </div>

              </motion.div>
            );
          })}
          <div ref={chatEndRef}></div>
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        {newImage && (
          <div className="image-preview">
            <img src={URL.createObjectURL(newImage)} alt="preview" />
            <button onClick={() => setNewImage(null)}>x</button>
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <label className="image-upload">
          <FaImage />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <button onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </div>

    </div>
  );
};

export default Chat;
