import apiClient from "./axios";

export const fetchDashboardStats = async () => {
      try {
            const response = await apiClient.get("/admin/dashboard")
            return response.data;
      } catch (error) {
            console.error("Error @ fetchDashboardStats || axios :", error.response || error);
            throw error;
      }
};
