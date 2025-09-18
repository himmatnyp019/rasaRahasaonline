import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProcessingPayment.css"
import axios from 'axios';
import {
    faShield
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';

const ProcessingPayment = ({ orderId }) => {
    const [isProcessing, setIsProcessing] = React.useState(true);
    const [status, setStatus] = React.useState("Validating order Items...");
    const { url, token } = useContext(StoreContext);
    const [checkoutItem, setCheckoutItem] = React.useState(null);

    useEffect(() => {
        const fetchOrderInfo = async () => {
            try {
                // Example: send payload (orderId etc.)
                const res = await axios.post(
                    url + "/api/payment/get/order/" + orderId,
                    {}, 
                    {
                        headers: { token:localStorage.getItem("token")  }
                    }
                );
                if (res.data.success) {
                    // ✅ backend sends checkoutItem inside response
                    setCheckoutItem(res.data.checkoutItem);
                    console.log(res.data.checkoutItem);

                }
            } catch (error) {
                console.error("Failed to fetch order info:", error);
            }
        };

        fetchOrderInfo();
    }, [url]);

    return (
        <div className='processing-payment'>
            <div className='processing-payment-title'>
                <FontAwesomeIcon className='icon-1' icon={faShield} />
                <h3>{status}
                    <br />
                    <span>Payment Processing...</span>
                </h3>
            </div>
        </div>
    )
}

export default ProcessingPayment
