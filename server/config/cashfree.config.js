import axios from "axios";

const cashfreeAPI = axios.create({
    baseURL: process.env.CASHFREE_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "x-api-version": "2025-01-01",
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
    },
});

export default cashfreeAPI;
