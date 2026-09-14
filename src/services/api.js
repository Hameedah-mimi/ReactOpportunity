import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add access token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle expired access tokens
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}token/refresh/`,
            {
              refresh: refreshToken,
            },
          );

          const newAccessToken = response.data.access;

          localStorage.setItem("access", newAccessToken);

          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(error.config);
        } catch (refreshError) {
          console.error("Session expired:", refreshError);
        }
      }

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      alert("Your session has expired. Please log in again.");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
