import apiClient from "./axios";

export const updateUserDetail = async (id, name, email, phone) => {
      console.log(id)
      try {
            const response = await apiClient.patch(`/users/${id}`, { name, email, phone })
            return response.data
      } catch (error) {
            console.error("Error @ updateUserDetail || axios :", error.response)
            throw error
      }
}