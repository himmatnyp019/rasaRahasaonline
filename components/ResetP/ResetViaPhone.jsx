import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./PasswordReset.css";

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
      <h2 className="title">Reset Password via Phone</h2>
      {!otpSent ? (
        <>
          <p className="subtitle">
            Enter your Korean phone number, and we’ll send you a one-time code.
          </p>
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label>Phone Number</label>
          </div>
          <button className="submit-btn" onClick={sendOtp}>
            Send OTP
          </button>
           <p className="back-link" onClick={() => setUpdateMode("resetPassword")}>
            ← Back to Options
          </p>
        </>
      ) : (
        <>
          <p className="subtitle">Enter the 6-digit code sent to your phone:</p>
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
            <label>New Password</label>
          </div>

          <button className="submit-btn" onClick={verifyOtp}>
            Verify & Reset
          </button>
         
        </>
      )}
    </div>
  );
};

export default ResetViaPhone;
