import { UserStoreProps } from "@/types/UserStoreProps";
import { create } from "zustand";
import { mmkvStorage } from "./storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { RiderStoreProps } from "@/types/RiderStoreProps";

export const useRiderStore = create<RiderStoreProps>()(
  persist(
    (set) => ({
      user: null,
      location: null,
      onDuty: false,
      setRiderUser: (data: any) => set({ user: data }),
      setLocation: (data: any) => set({ location: data }),
      clearRiderData: () => set({ user: null, location: null }),
      setOnDuty: (data: any) => set({ onDuty: data }),
    }),
    {
      name: "riderStore",
      partialize: (state: any) => ({
        user: state.user,
      }),
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
