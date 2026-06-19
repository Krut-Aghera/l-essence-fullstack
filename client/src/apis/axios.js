import axios from 'axios';

const API_BASE_URL = "https://l-essence-fullstack.onrender.com/api/v1";

const apiClient = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
});

export default apiClient;