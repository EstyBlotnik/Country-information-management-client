const apiUrl = "http://localhost:4000/user";
import axios from "axios";
import { userData, UserResponse, ErrorResponse } from "../types/userTypes";

export const register = async (data: userData) => {
  console.log("Adding data:", data);
  try {
    const response = await axios.post(`${apiUrl}/register`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: response.status >= 200 && response.status < 300,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const login = async ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  console.log("Logging in:", { userName, password });
  try {
    const response = await axios.post(
      `${apiUrl}/login`,
      { userName, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        status: response.status,
        data: response.data,
      };
    } else {
      return {
        success: false,
        status: response.status,
        message: "Invalid credentials",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};