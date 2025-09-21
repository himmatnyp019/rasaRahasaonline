import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./PasswordReset.css";
import { t } from "i18next";

const ResetViaPhone = ({ url, setUpdateMode }) => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");

  const inputsRef = useRef([]);

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const sendOtp = async () => {
    try {
      const res = await axios.post(`${url}/api/auth/send-otp`, { phone });
      if (res.data.success) {
        toast.success("OTP sent to your phone");
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const otpCode = otp.join("");
      const res = await axios.post(`${url}/api/auth/verify-otp`, {
        phone,
        otp: otpCode,
        newPassword,
      });
      if (res.data.success) {
        toast.success("Password updated successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error verifying OTP");
    }
  };

  return (
    <div className="reset-phone">
      <h2 className="title">{t("resetPasswordPhone")}</h2>
      {!otpSent ? (
        <>
          <p className="subtitle">
          {t("passwordResetInstruction")}
          </p>
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label>{t("enterMobileNumber")}</label>
          </div>
          <button className="submit-btn" onClick={sendOtp}>
           {t("sendOtp")}
          </button>
           <p className="back-link" onClick={() => setUpdateMode("resetPassword")}>
            ← {t("backToOptions")}
          </p>
        </>
      ) : (
        <>
          <p className="subtitle">{t("enterSixDigitCode")}</p>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
              />
            ))}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder=" "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label>{t("newPassword")}</label>
          </div>

          <button className="submit-btn" onClick={verifyOtp}>
            {t("verifyAndReset")}
          </button>
         
        </>
      )}
    </div>
  );
};

export default ResetViaPhone;
