import { CustomLocation } from "./CustomLocation";

export type RiderLocation = CustomLocation & {
  heading: number;
};
