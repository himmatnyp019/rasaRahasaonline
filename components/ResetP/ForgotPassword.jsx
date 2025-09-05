import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './PasswordReset.css'

const ForgotPassword = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (method === "email") {
      navigate("/reset-email");
    } else if (method === "phone") {
      navigate("/reset-phone");
    } else {
      alert("Please choose a method.");
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <p>Choose how you want to reset your password:</p>

      <div className="options">
        <label>
          <input
            type="radio"
            value="email"
            checked={method === "email"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Reset via Email
        </label>
        <label>
          <input
            type="radio"
            value="phone"
            checked={method === "phone"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Reset via Phone (Korean number)
        </label>
      </div>

      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default ForgotPassword;
