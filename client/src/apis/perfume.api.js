import apiClient from "./axios";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const registerPerfume = async (perfumeData) => {
    try {
        const response = await apiClient.post("/admin/perfumes", perfumeData);
        return response.data;
    } catch (error) {
        console.error("Error @ registerPerfume || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const updatePerfume = async (perfumeId, perfumeData) => {
    try {
        const response = await apiClient.patch(`/admin/perfumes/${perfumeId}`, perfumeData);

        return response.data;
    } catch (error) {
        console.error("Error @ updatePerfume || axios :", error.response);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const removePerfume = async (perfumeId) => {
    try {
        const response = await apiClient.delete(`/admin/perfumes/${perfumeId}`);
        return response.data;
    } catch (error) {
        console.error("Error @ registerPerfume || axios :", error.response);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchBrands = async () => {
    try {
        const response = await apiClient.get("/users/perfumes/brands");
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
        const response = await apiClient.get("/users/perfumes", { params: filters });
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
        const response = await apiClient.get(`/users/perfumes/${perfumeId}`);
        return response.data;
    } catch (error) {
        console.error("Error @ fetchPerfumeById || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const fetchFilterData = async () => {
    try {
        console.log("working...");
        const response = await apiClient.get("/perfumes/filter-meta");
        return response.data;
    } catch (error) {
        console.error("Error @ fetchFilterData || axios :", error);
        throw error;
    }
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export const searchPerfumes = async (query) => {
    try {
        const response = await apiClient.get("/users/perfumes/search", { params: query });
        return response.data;
    } catch (error) {
        console.error("Error @ searchPerfumes || axios :", error);
        throw error;
    }
};
