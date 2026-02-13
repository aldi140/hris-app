// apiClient.js
import axios from "axios";
import { API_URL } from "../api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Set token otomatis
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Kalau error 401 (Unauthorized) = token invalid/expired
    if (error.response?.status === 401) {
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect ke login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
