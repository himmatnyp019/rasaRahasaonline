import React from 'react';
import './Toast.css';
import { assets } from '../../src/assets/assets';

const Toast = ({ message }) => {
  return (
    <div className="toast">
      <img src={assets.tick} alt="Tick" className="toast-icon" />
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
