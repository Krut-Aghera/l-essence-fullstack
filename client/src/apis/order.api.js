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
            console.log("Full Error:", error);
            console.log("Response:", error.response);
            console.log("Request:", error.request);
            console.log("Message:", error.message);

            throw error;

      }
};