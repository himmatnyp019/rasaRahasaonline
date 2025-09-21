import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './PasswordReset.css'
import {toast} from 'react-toastify'
import { t } from "i18next";

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
      <h2 className="title">{t("forgotPassword")}</h2>
      <p className="subtitle">{t("chooseResetMethod")}</p>

      <div className="options">
        <div
          className={`option ${method === "email" ? "active" : ""}`}
          onClick={() => setMethod("email")}>
          <input
            type="radio"
            value="email"
            checked={method === "email"}
            onChange={(e) => setMethod(e.target.value)}
          />
          <span>{t("resetViaEmail")}</span>
        </div>

        <div
          className={`option ${method === "phone" ? "active" : ""}`}
          onClick={() => setMethod("phone")} >
          <input
            type="radio"
            value="phone"
            checked={method === "phone"}
            onChange={(e) => setMethod(e.target.value)}/>
          <span>{t("resetViaPhone")}</span>
        </div>
      </div>

      <button className="continue-btn" onClick={handleContinue}>
        {t("continue")}
      </button>
    </div>
  );
};

export default ForgotPassword;
