import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './PasswordReset.css'

const ResetViaEmail = ({ url }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/auth/reset-email`, { email });
      if (res.data.success) {
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="reset-email">
      <h2>Reset Password via Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ResetViaEmail;
