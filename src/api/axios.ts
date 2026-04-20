import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Important: enables sending cookies
});

// Remove manual token header addition - cookies are sent automatically
api.interceptors.request.use((config) => {
    return config;
});

export default api;