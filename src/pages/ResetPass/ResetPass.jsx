import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../components/ResetP/PasswordReset.css";
import { useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";

const ResetPassword = () => {
  const { token } = useParams(); // get token from email link
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {url} = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/auth/reset-password/${token}`, {
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!");
        navigate("/Profile"); // redirect to login page
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
      setLoading(false);
    }
  };

  return (
    <div className="reset-email">
      <h2 className="title">Reset Your Password</h2>
      <p className="subtitle">
        Enter a new password to secure your account. Make sure it is strong and memorable.
      </p>

      <form onSubmit={handleSubmit} className="reset-form">
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

        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>Confirm Password</label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
