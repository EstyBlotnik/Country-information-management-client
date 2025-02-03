import axios from "axios";
import { atom, selector } from "recoil";
const apiUrl = "http://localhost:4000";

export const userIdState = atom({
  key: "userIdState",
  default: localStorage.getItem("userId"),
});

export const userState = selector({
  key: "userState",
  get: async ({ get }) => {
    const userId = get(userIdState);

    if (!userId) {
      return null;
    }

    try {
      const response = await axios.get(`${apiUrl}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // או להחזיר שגיאה במקרה של בעיה בשרת
    }
  },
});
