// import React, { useEffect, useState } from "react";
// import {
//     useStripe,
//     useElements,
//     CardNumberElement,
//     CardExpiryElement,
//     CardCvcElement,
// } from "@stripe/react-stripe-js";

// import "./PaymentForm.css"; // custom styles

// function PaymentForm() {
//     const stripe = useStripe();
//     const elements = useElements();

//     const [clientSecret, setClientSecret] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         userId: "12345", // demo
//         orderId: "98765", // demo
//     });

//     // Create PaymentIntent
//     useEffect(() => {
//         fetch("http://localhost:5000/api/payment/create-payment-intent", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 amount: 1500,
//                 currency: "usd",
//                 ...formData,
//             }),
//         })
//             .then((res) => res.json())
//             .then((data) => setClientSecret(data.clientSecret));
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         if (!stripe || !elements) return;

//         const { paymentIntent, error } = await stripe.confirmCardPayment(
//             clientSecret,
//             {
//                 payment_method: {
//                     card: elements.getElement(CardNumberElement),
//                     billing_details: {
//                         name: formData.name,
//                         email: formData.email,
//                     },
//                 },
//             }
//         );

//         if (error) {
//             setMessage(error.message);
//         } else if (paymentIntent.status === "succeeded") {
//             setMessage("✅ Payment successful! Receipt sent to your email.");
//         }

//         setLoading(false);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="payment-form">
//             <h2 className="title">Secure Payment</h2>
//             <div className="payer-info">
//                 <input
//                     type="text"
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                 />

//                 <input
//                     type="email"
//                     placeholder="Email Address"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     required
//                 />

//             </div>


//             {/* Card Number */}
//             <div className="input-box">
//                 <label>Card Number</label>
//                 <CardNumberElement
//                     className="stripe-input"
//                     options={{
//                         showIcon: true,
//                         style: {
//                             base: { fontSize: "18px", letterSpacing: "2px" },
//                             invalid: { color: "tomato" },
//                         },
//                     }}
//                 />
//                 {/* <span className="status-msg">💳 Card supported</span> */}
//             </div>

//             {/* Expiry + CVC in row */}
//             <div className="row">
//                 <div className="input-box">
//                     <label>Expiry Date :</label>
//                     <CardExpiryElement className="stripe-input" />
//                 </div>
//                 <div className="input-box">
//                     <label>CVC :</label>
//                     <CardCvcElement className="stripe-input" />
//                 </div>
//             </div>

//             <button
//                 type="submit"
//                 className="pay-btn"
//                 disabled={!stripe || !clientSecret || loading}
//             >
//                 {loading ? "Processing..." : "Pay Now"}
//             </button>

//             {message && <div className="msg">{message}</div>}
//         </form>
//     );
// }

// export default PaymentForm;

import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";

function PaymentForm() {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 15000, // 15000 KRW
        currency: "krw",
        userId: "123",
        orderId: "555",
        name: "홍길동",
        email: "test@example.com",
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleKakaoPay = async () => {
    const { error } = await stripe.confirmPayment({
      clientSecret,
      payment_method: {
        type: "card",
      },
      return_url: "http://localhost:5173/payment-success", // where user is redirected
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Choose a payment method</h2>
      <button onClick={handleKakaoPay} disabled={!stripe || !clientSecret}>
        Pay with KakaoPay
      </button>
      {/* You can add NaverPay, TossPay, Payco in the same way */}
    </div>
  );
}

export default PaymentForm;
