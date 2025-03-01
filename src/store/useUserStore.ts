import { UserStoreProps } from "@/types/UserStoreProps";
import { create } from "zustand";
import { mmkvStorage } from "./storage";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      user: null,
      location: null,
      outOfRange: false,
      setUser: (data: any) => set({ user: data }),
      setLocation: (data: any) => set({ location: data }),
      setOutOfRange: (data: any) => set({ outOfRange: data }),
      clearData: () => set({ user: null, location: null, outOfRange: false }),
    }),
    {
      name: "userStore",
      partialize: (state: any) => ({
        user: state.user,
      }),
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
