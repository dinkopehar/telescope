import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export const login = async (username: string, password: string) => {
  return await apiClient.post("auth/login/", {
    username,
    password,
  });
};

export const register = async (
  username: string,
  password: string,
  password2: string,
  email: string,
) => {
  return await apiClient.post("auth/register/", {
    username,
    password,
    password2,
    email,
  });
};

export default apiClient;
