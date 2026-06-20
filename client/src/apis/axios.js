import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL

console.log(import.meta.env.MODE);
console.log(API_BASE_URL)

const apiClient = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
});

export default apiClient;