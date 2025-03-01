import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@/store/storage";
import { logout } from "./authService";

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

export const refreshTokens = async () => {
  try {
    const refreshToken = tokenStorage.getString("refresh_token");
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;
    tokenStorage.set("access_token", newAccessToken);
    tokenStorage.set("refresh_token", newRefreshToken);
    return newAccessToken;
  } catch (error) {
    console.log("Error refreshing token");
    tokenStorage.clearAll();
    logout();
  }
};

appAxios.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getString("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.request.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshTokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log(error);
        console.log("Error refreshing token");
      }
      return Promise.reject(error);
    }
  }
);
