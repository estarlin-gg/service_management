import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("credentials");
    if (token) {
      const parsedToken = JSON.parse(token!);
      config.headers["Authorization"] = `Bearer ${parsedToken.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
