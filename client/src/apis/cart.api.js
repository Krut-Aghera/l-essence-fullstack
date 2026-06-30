import axiosClient from "./axios";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const applyCoupon = async (couponCode) => {
    try {
        const response = await axiosClient.post("users/cart/apply-coupon", { code: couponCode });
        return response.data;
    } catch (error) {
        console.error("Error @ applyCoupon || axios :", error.response);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const getCoupons = async () => {
    try {
        const response = await axiosClient.get("/users/cart/coupons");
        return response.data;
    } catch (error) {
        console.error("Get Coupons Error:", error.response);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchCart = async () => {
    try {
        const response = await axiosClient.get("/users/cart");
        return response.data;
    } catch (error) {
        console.error("Error @ fetchCart || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const addToCart = async (perfumeID, quantity = 1) => {
    try {
        const response = await axiosClient.post(`/users/cart/${perfumeID}`, { quantity });
        return response.data;
    } catch (error) {
        console.error("Error @ addToCart || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const updateCartItemQuantity = async (perfumeID, quantity) => {
    try {
        const response = await axiosClient.patch(`/users/cart/${perfumeID}`, { quantity });
        return response.data;
    } catch (error) {
        console.error("Error @ updateCartItemQuantity || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const removeFromCart = async (perfumeID) => {
    try {
        const response = await axiosClient.delete(`/users/cart/${perfumeID}`);
        return response.data;
    } catch (error) {
        console.error("Error @ removeFromCart || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const clearCart = async () => {
    try {
        const response = await axiosClient.delete("/users/cart");
        return response.data;
    } catch (error) {
        console.error("Error @ clearCart || axios :", error);
        throw error;
    }
};
