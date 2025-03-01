import { tokenStorage } from "@/store/storage";
import { useRiderStore } from "@/store/useRiderStore";
import { useUserStore } from "@/store/useUserStore";
import { resetAndNavigate } from "@/utils/Helpers";
import { Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "./config";

export const signin = async (
  payload: {
    role: "customer" | "rider";
    phone: string;
  },
  updateAccessToken: () => void,
  setUser: (user: any) => void,
  setRiderUser: (user: any) => void
) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signin`, payload);
    if (res.data.user.role === "customer") {
      setUser(res.data.user);
    } else {
      setRiderUser(res.data.user);
    }

    tokenStorage.set("access_token", res.data.access_token);
    tokenStorage.set("refresh_token", res.data.refresh_token);
    if (res.data.user.role === "customer") {
      resetAndNavigate("/customer/home");
    } else {
      resetAndNavigate("/captain/home");
    }
    updateAccessToken();
  } catch (error) {
    Alert.alert("Error sign in");
  }
};
export const logout = async (
  clearData: () => void,
  clearRiderData: () => void,
  disconnect?: () => void
) => {
  if (disconnect) {
    disconnect();
  }

  clearData();
  clearRiderData();
  tokenStorage.clearAll();
  resetAndNavigate("/role");
};
