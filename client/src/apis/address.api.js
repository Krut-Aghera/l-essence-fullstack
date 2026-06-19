import axiosClient from "./axios"

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchAddresses = async () => {
      try {
            const response = await axiosClient.get("/users/address")
            return response.data

      } catch (error) {
            console.error("Error @ fetchAddresses || axios :", error.response)
            throw error
      }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const addAddress = async (addressData) => {
      try {
            const response = await axiosClient.post("/users/address", addressData)
            return response.data

      } catch (error) {
            console.error("Error @ addAddress || axios :", error.response);
            throw error
      }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const updateAddress = async (addressID, updatedData) => {
      try {
            const response = await axiosClient.patch(`/users/address/${addressID}`, updatedData)
            return response.data

      } catch (error) {
            console.error("Error @ updateAddress || axios :", error.response)
            throw error
      }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const removeAddress = async (addressID) => {
      try {
            const response = await axiosClient.delete(`/users/address/${addressID}`)
            return response.data

      } catch (error) {
            console.error("Error @ removeAddress || axios :", error.response)
            throw error
      }
}
