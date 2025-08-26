import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const requestPayment = () => axios.post(`${BASE_URL}/pay`);
export const checkPaymentStatus = (tid) => axios.post(`${BASE_URL}/check`, { tid });
