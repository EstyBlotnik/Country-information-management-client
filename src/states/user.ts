import axios from "axios";
import { atom, selector } from "recoil";
import API_URL from "../config/apiConfig"; 
import { userData } from "../types/userTypes";

export const userIdState = atom({
  key: "userIdState",
  default: localStorage.getItem("userId"),
});

export const selctedUserState = atom<userData | null>({
  key: "countryState",
  default: null,
});

export const userState = selector({
  key: "userState",
  get: async ({ get }) => {
    const userId = get(userIdState);

    if (!userId) {
      return null;
    }

    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // או להחזיר שגיאה במקרה של בעיה בשרת
    }
  },
});
