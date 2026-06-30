import apiClient from "./axios";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const loginUser = async (identifier, password) => {
      try {
            const response = await apiClient.post("/auth/login", { identifier, password });
            return response.data;
      } catch (error) {
            console.error("Error @ login || axios :", error.response);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const registerUser = async (name, email, phone, password) => {
      try {
            const response = await apiClient.post("/auth/register", { name, email, phone, password });
            return response.data;
      } catch (error) {
            console.error("Error @ register || axios :", error.response);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const getCurrentUser = async () => {
      try {
            const response = await apiClient.get("/auth/me");
            return response.data;
      } catch (error) {
            console.error("Error @ getCurrentUser || axios :", error.response);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const logoutUser = async () => {
      try {
            const response = await apiClient.post("/auth/logout");
            return response.data;
      } catch (error) {
            console.error("Error @ logout || axios :", error);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const refreshToken = async () => {
      try {
            const response = await apiClient.post("/auth/refresh-token");
            return response.data;
      } catch (error) {
            console.error("Error @ refreshToken || axios :", error.response);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const requestPasswordReset = async (email) => {
      try {
            const response = await apiClient.post("/auth/reset-password", { email });
            return response.data;
      } catch (error) {
            console.error("Error @ requestPasswordReset || axios :", error.response);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const resetPassword = async (token, newPassword, confirmPassword ) => {
      try {
            const response = await apiClient.post(`/auth/reset-password/${token}`, { newPassword, confirmPassword });
            return response.data;
      } catch (error) {
            console.error("Error @ resetPassword || axios :", error);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const verifyEmail = async (token) => {
      try {
            const response = await apiClient.post(`/auth/verify-email/${token}`);
            return response.data;
      } catch (error) {
            console.error("Error @ verifyEmail || axios :", error);
            throw error;
      }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const changePassword = async (currentPassword, newPassword) => {
      try {
            const response = await apiClient.post("/auth/change-password", {
                  currentPassword,
                  newPassword,
            });
            return response.data;
      } catch (error) {
            console.error("Error @ changePassword || axios :", error);
            throw error;
      }
};
