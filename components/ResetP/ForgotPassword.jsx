import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './PasswordReset.css'
import {toast} from 'react-toastify'

const ForgotPassword = ({setUpdateMode}) => {
  const [method, setMethod] = useState("");

  const handleContinue = () => {
    if (method === "email") {
      setUpdateMode("resetViaEmail");
    } else if (method === "phone") {
      setUpdateMode("resetViaPhone");
    } else {
      toast.error("Please choose a method.");
    }
  };

  return (
   <div className="forgot-container">
      <h2 className="title">Forgot Password</h2>
      <p className="subtitle">Choose the best method how you want to reset your password:</p>

      <div className="options">
        <div
          className={`option ${method === "email" ? "active" : ""}`}
          onClick={() => setMethod("email")}
        >
          <input
            type="radio"
            value="email"
            checked={method === "email"}
            onChange={(e) => setMethod(e.target.value)}
          />
          <span>Reset via Email</span>
        </div>

        <div
          className={`option ${method === "phone" ? "active" : ""}`}
          onClick={() => setMethod("phone")}
        >
          <input
            type="radio"
            value="phone"
            checked={method === "phone"}
            onChange={(e) => setMethod(e.target.value)}
          />
          <span>Reset via Phone (Korean number)</span>
        </div>
      </div>

      <button className="continue-btn" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default ForgotPassword;
