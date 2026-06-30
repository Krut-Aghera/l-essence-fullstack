import apiClient from "./axios";

export const initiateCheckout = async (checkoutData) => {
    try {
        const response = await apiClient.post("/orders/checkout", checkoutData);

        return response.data;
    } catch (error) {
        console.error("Error @ initiateCheckout || axios :", error.response);
        throw error;
    }
};

export const verifyPayment = async (orderID) => {
    try {
        const response = await apiClient.get(`/orders/verify-payment/${orderID}`);
        return response.data;
    } catch (error) {
        console.error(error);
        console.error(error.response);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await apiClient.get(`/orders`);
        return response.data;
    } catch (error) {
        console.error(error.response);
        throw error;
    }
};

export const fetchCurrentOrder = async (orderID) => {
    try {
        const response = await apiClient.get(`/orders/${orderID}`);
        return response.data;
    } catch (error) {
        console.error("Error @ fetchCurrentOrder || axios :", error.response);
        throw error;
    }
};
