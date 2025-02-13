import { atom, selector } from "recoil";
import { userData } from "../types/userTypes";

export const userIdState = atom({
  key: "userIdState",
  default: localStorage.getItem("userId"),
});

export const selctedUserState = atom<userData | null>({
  key: "userState",
  default: null,
});

export const isEditingState = atom <boolean>({
  key: "isEditingState",
  default: false,
})
