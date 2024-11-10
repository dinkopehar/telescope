import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { refreshToken } from "../api";

const checkAuth = (): string | null => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const REFRESH_TOKEN = localStorage.getItem("refreshToken");
  const PUBLIC_ROUTES = ["login", "register"];

  const isPublicPage = PUBLIC_ROUTES.some((route) =>
    window.location.href.includes(route),
  );

  if (REFRESH_TOKEN) {
    refreshToken(REFRESH_TOKEN)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  }

  if (!ACCESS_TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return null;
  } else if (ACCESS_TOKEN) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;

    // Set up Axios interceptors
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Show global loading indicator
        document.body.classList.add("loading-indicator");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // Hide global loading indicator
        document.body.classList.remove("loading-indicator");
        return response;
      },
      (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
      },
    );
  }

  return ACCESS_TOKEN;
};

export default checkAuth;
