import { RiderLocation } from "./RiderLocation";
import { UserStoreProps } from "./UserStoreProps";

export type RiderStoreProps = Pick<UserStoreProps, "user" | "setUser"> & {
  location: RiderLocation | null;
  setLocation: (data: RiderLocation) => void;
  onDuty: boolean;
  setOnDuty: (data: boolean) => void;
  clearRiderData: () => void;
};
