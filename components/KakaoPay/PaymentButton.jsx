// src/components/PaymentButton.js
import React from 'react';
import axios from 'axios';

const PaymentButton = () => {
    
  const handleKakaoPay = async () => {
    try {
      const response = await axios.post('http://localhost:5001/pay', {
        item_name: 'Coffee',
        quantity: 1,
        total_amount: 1000,
      });

      // Redirect to KakaoPay payment page
      window.location.href = response.data.next_redirect_pc_url;
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Coffee ☕ – ₩1,000</h2>
      <button onClick={handleKakaoPay} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}>
        Pay with KakaoPay
      </button>
    </div>
  );
};

export default PaymentButton;
