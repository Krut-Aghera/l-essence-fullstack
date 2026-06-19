import axiosClient from "./axios"


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const registerBrand = async (brandData) => {
      try {
            const response = await axiosClient.post("/admin/brands", brandData);
            return response.data;
      } catch (error) {
            console.error("Error @ registerBrand || axios :", error);
            throw error;
      }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const registerPerfume = async (perfumeData) => {
      try {
            const response = await axiosClient.post("/admin/perfumes", perfumeData);
            return response.data;
      } catch (error) {
            console.error("Error @ registerPerfume || axios :", error);
            throw error;
      }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const updatePerfume = async (perfumeId, perfumeData) => {
      try {

            const response = await axiosClient.patch(`/admin/perfumes/${perfumeId}`, perfumeData);

            return response.data;
      } catch (error) {
            console.error("Error @ updatePerfume || axios :", error.response);
            throw error;
      }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const removePerfume = async (perfumeId) => {
      try {
            const response = await axiosClient.delete(`/admin/perfumes/${perfumeId}`);
            return response.data;
      } catch (error) {
            console.error("Error @ registerPerfume || axios :", error.response);
            throw error;
      }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchBrands = async () => {
      try {
            const response = await axiosClient.get("/users/perfumes/brands");
            return response.data;
      } catch (error) {
            console.error("Error @ fetchBrands || axios :", error.response);
            throw error;
      }
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchPerfumes = async (filters) => {
      try {
            const response = await axiosClient.get("/users/perfumes", { params: filters });
            return response.data;
      } catch (error) {
            console.error("Error @ fetchPerfumes || axios :", error);
            throw error;
      }
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchPerfumeById = async (perfumeId) => {
      try {
            const response = await axiosClient.get(`/users/perfumes/${perfumeId}`);
            return response.data;
      } catch (error) {
            console.error("Error @ fetchPerfumeById || axios :", error);
            throw error;
      }
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const searchPerfumes = async (query) => {
      try {
            const response = await axiosClient.get("/users/perfumes/search", { params: query });
            return response.data;
      } catch (error) {
            console.error("Error @ searchPerfumes || axios :", error);
            throw error;
      }
};

