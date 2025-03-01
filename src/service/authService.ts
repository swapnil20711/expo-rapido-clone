import { tokenStorage } from "@/store/storage";
import { useRiderStore } from "@/store/useRiderStore";
import { useUserStore } from "@/store/useUserStore";
import { resetAndNavigate } from "@/utils/Helpers";

export const logout = async () => {
  const { clearData } = useUserStore();
  const { clearRiderData } = useRiderStore();

  clearData();
  clearRiderData();
  tokenStorage.clearAll();
  resetAndNavigate("/role");
};
