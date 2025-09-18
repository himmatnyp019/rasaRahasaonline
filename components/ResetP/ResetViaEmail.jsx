import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './PasswordReset.css'
import { StoreContext } from "../../context/StoreContext";

const ResetViaEmail = ({setUpdateMode }) => {
  const [email, setEmail] = useState("");
  const {url} = useContext(StoreContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/forgot-password`, { email });
      if (res.data.success) {
        toast.success("Password reset link sent to your email!");
        setUpdateMode("");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
   <div className="reset-email">
      <h2 className="title">Reset Password via Email</h2>
      <p className="subtitle">
        Enter your registered email address and we’ll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="reset-form">
        <div className="input-group">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email Address</label>
        </div>

        <button type="submit" className="submit-btn">
          Send Reset Link
        </button> 
      </form>

      <p className="back-link" onClick={() => setUpdateMode("resetPassword")}>
        ← Back to Options
      </p>
    </div>
  );
};

export default ResetViaEmail;
