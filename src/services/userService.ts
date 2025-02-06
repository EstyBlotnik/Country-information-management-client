const apiUrl = "http://localhost:4000/user";
import axios from "axios";
import { userData, UserResponse, ErrorResponse } from "../types/userTypes";

export const register = async (data: userData) => {
  console.log("Adding data:", data);
  try {
    const response = await axios.post(`${apiUrl}/register`, data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
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
        withCredentials: true,
      }
    );

    console.log(response);
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

export const editUser = async (userId: string, user: userData) => {
  try {
    console.log("id to server:", userId, "data:", user);

    if (user instanceof FormData) {
      for (let pair of user.entries()) {
        console.log(pair[0], pair[1]);
      }
    } else {
      console.log("user is not FormData");
    }

    const response = await axios.put(`${apiUrl}/${userId}`, user, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    if (response.status === 200) {
      return {
        success: true,
        status: response.status,
        data: response.data,
      };
    } else {
      console.log(response);
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

export const getUser = async (userId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${userId}`, {
      withCredentials: true,
    });
    console.log("response: ", response.data.user);
    if (response.status === 200) {
      return {
        success: true,
        status: response.status,
        data: response.data.user,
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
