import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = config.headers ?? {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("token")
    // const isAuthRoute =
    //   error.config?.url?.includes("/auth/login") ||
    //   error.config?.url?.includes("/auth/register");

    const isAuthRequest = error.config?.url?.includes("/auth");

    if (error.response?.status === 401 && token && !isAuthRequest) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
