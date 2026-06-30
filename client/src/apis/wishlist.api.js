import axiosClient from "./axios";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchWishlist = async () => {
    try {
        const response = await axiosClient.get("/users/wishlist");
        return response.data;
    } catch (error) {
        console.error("Error @ fetchWishlist || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const addToWishlist = async (perfumeId) => {
    try {
        const response = await axiosClient.post(`/users/wishlist/${perfumeId}`);
        return response.data;
    } catch (error) {
        console.error("Error @ addToWishlist || axios :", error.response);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const removeFromWishlist = async (perfumeId) => {
    try {
        const response = await axiosClient.delete(`/users/wishlist/${perfumeId}`);
        return response.data;
    } catch (error) {
        console.error("Error @ removeFromWishlist || axios :", error.response);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const clearWishlist = async () => {
    try {
        const response = await axiosClient.delete("/users/wishlist");
        return response.data;
    } catch (error) {
        console.error("Error @ clearWishlist || axios :", error);
        throw error;
    }
};
