import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [params] = useSearchParams();
  const pgToken = params.get("pg_token");

  useEffect(() => {
    if (pgToken) {
      axios
        .post("http://localhost:5000/approve", { pg_token: pgToken })
        .then((res) => {
          alert("Payment successful!");
          console.log("Approval result:", res.data);
        })
        .catch((err) => {
          alert("Payment approval failed.");
          console.error(err);
        });
    }
  }, [pgToken]);

  return (
    <div>
      <h1>Payment Success!</h1>
      <p>Approving payment...</p>
    </div>
  );
};

export default Success;
