import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import "./style.css"; // ✅ Import CSS

const PaymentPage = ({ paymentUrl, tid }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 min
  const [status, setStatus] = useState("🕓 Waiting for payment...");

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timeout checker
  useEffect(() => {
    if (timeLeft <= 0) {
      setStatus("❌ Payment Timeout");
    }
  }, [timeLeft]);

  // Poll for status every 5s
  useEffect(() => {
    const poll = setInterval(() => {
      axios
        .post("http://localhost:5000/api/payment/kakao/approve", { tid })
        .then((res) => {
          if (res.data.status === "PAID") {
            setStatus("✅ Payment Success!");
            clearInterval(poll);
          } else if (
            res.data.status === "CANCEL" ||
            res.data.status === "FAIL"
          ) {
            setStatus("❌ Payment Failed or Canceled");
            clearInterval(poll);
          }
        })
        .catch((err) => {
          console.error("Poll error", err.message);
        });
    }, 5000);

    return () => clearInterval(poll);
  }, [tid]);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="black-bar-design"></div>
        <h2 className="payment-title">Scan QR to Pay</h2>
        <div className="qr-box">
          <QRCode value={paymentUrl} size={200} />
        </div>
        <p className="payment-status">{status}</p>
        <p className="payment-timer">
          ⏳ Time left:{" "}
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
