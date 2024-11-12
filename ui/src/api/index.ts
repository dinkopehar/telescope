import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  timeout: 5000,
});

// AUTH RELATED API CALLS

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
  return await axios.post(`${API_URL}auth/register/`, {
    username,
    password,
    password2,
    email,
  });
};

export const refreshToken = async (refreshToken: string) => {
  return await apiClient.post("auth/refresh/", {
    refresh: refreshToken,
  });
};

export const dashboard = async () => {
  return await apiClient.get("api/dashboard");
};

// PORTFOLIO RELATED API CALLS

export const getPortfolios = async () => {
  return await apiClient.get("api/portfolios/");
};

export const createPortfolio = async (name: string) => {
  return await apiClient.post("api/portfolios/", {
    name: name,
  });
};

export const deletePortfolio = async (id: number) => {
  return await apiClient.delete(`api/portfolios/${id}/`);
};

export const updatePortfolio = async (id: number, name: string) => {
  return await apiClient.patch(`api/portfolios/${id}/`, {
    name: name,
  });
};

// PROPERTY RELATED API CALLS

export const getProperties = async () => {
  return await apiClient.get("api/properties/");
};

export const createProperty = async (propertyObj: any) => {
  return await apiClient.post("api/properties/", {
    portfolio: propertyObj.portfolio,
    address: {
      latitude: propertyObj.latitude,
      longitude: propertyObj.longitude,
    },
    estimated_value: propertyObj.estimatedValue,
    construction_year: propertyObj.constructionYear,
    square_footage: propertyObj.squareFootage,
  });
};

export const deleteProperty = async (id: number) => {
  return await apiClient.delete(`api/properties/${id}/`);
};

export default apiClient;
