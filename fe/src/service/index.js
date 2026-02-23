// apiClient.js
import axios from "axios";
import { API_URL } from "./api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
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
    // jika jaringan error
    console.log("error", error);
    if (!error.response) {
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "Jaringan bermasalah, coba lagi!",
      });
    }

    if (error.response?.status === 401 && error.response?.data?.message) {
      // tampung error nya
      return Promise.reject({
        type: "INVALID_CREDENTIALS",
        message: error.response.data?.message || "Unauthorized",
      });
    }

    // Kalau error 401 (Unauthorized) = token invalid/expired
    if (error.response?.status === 401 && !error.response?.data?.message) {
      // tampung error nya
      return Promise.reject({
        type: "SESSION_EXPIRED",
        message: "Session habis, silakan login ulang",
      });
    }

    return Promise.reject(error);
  },
);

export default api;
