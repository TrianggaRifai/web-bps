// src/api/axios.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan Authorization header dari localStorage,
// KECUALI untuk endpoint publik seperti /login dan /register
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Endpoint publik yang tidak butuh Authorization
    const publicEndpoints = ["/login", "/register"];
    const isPublic = publicEndpoints.some((url) =>
      config.url?.includes(url)
    );

    if (token && !isPublic) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
