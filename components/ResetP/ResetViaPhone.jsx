import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './PasswordReset.css'

const ResetViaPhone = ({ url }) => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
      const res = await axios.post(`${url}/api/auth/verify-otp`, {
        phone,
        otp,
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
      <h2>Reset Password via Phone</h2>

      {!otpSent ? (
        <>
          <input
            type="text"
            placeholder="Enter your Korean phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button onClick={verifyOtp}>Verify & Reset</button>
        </>
      )}
    </div>
  );
};

export default ResetViaPhone;
