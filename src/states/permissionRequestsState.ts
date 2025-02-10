import { atom } from "recoil";
import { RequestData } from "../types/authorizationRequest";

export const permissionRequestsState = atom<RequestData[]>({
  key: "permissionRequestsState",
  default: [],
});
