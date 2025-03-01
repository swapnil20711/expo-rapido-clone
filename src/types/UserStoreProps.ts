import { CustomLocation } from "./CustomLocation";

export type UserStoreProps = {
  user: any;
  location: CustomLocation;
  outOfRange: boolean;
  setUser: (data: any) => void;
  setOutOfRange: (data: boolean) => void;
  setLocation: (location: CustomLocation) => void;
  clearData: () => void;
};
