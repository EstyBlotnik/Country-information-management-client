import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userData } from "../types/userTypes";
import { toast } from "react-toastify";
import { register, login } from "../services/userService";
import { useNavigate } from "react-router-dom";
export const useUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Fetch the currently logged-in user
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<userData | null, Error>({
    queryKey: ["user"],
    queryFn: async () => queryClient.getQueryData(["user"]) ?? null,
    enabled: false,
  });

  // Register a new user
  const registerMutation = useMutation<userData, Error, userData>({
    mutationFn: async (newUser) => {
      const response = await register(newUser);
      if (response && "data" in response) {
        console.log("user: ",response.data.newUser)
        return response.data.newUser as userData;
      } else {
        throw new Error(response.message);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<userData>(["user"], data);
      toast.success("User registered successfully");
      console.log("Cache updated after user registration");
      navigate("/country");
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      toast.error(error.message);
    },
  });

  // Login user
  const loginMutation = useMutation<
    userData,
    Error,
    { userName: string; password: string }
  >({
    mutationFn: async ({ userName, password }) => {
      console.log("loginMutation")
      const response = await login({ userName, password });
      console.log("respon: ",response)
      if (response && "data" in response) {
        return response.data.user as userData;
      } else {
        throw new Error(response.message);
      }
    },
    onSuccess: (data) => {
      // Update cache after login
      queryClient.setQueryData<userData>(["user"], data);
      toast.success("User logged in successfully");
      console.log("Cache updated after user login");
      navigate("/country");
    },
    onError: (error) => {
      console.error("Error logging in user:", error);
      toast.error("Error logging in the user");
    },
  });

  // Logout user
  const logoutMutation = useMutation<void, Error>({
    onSuccess: () => {
      queryClient.setQueryData<userData>(["user"], undefined);
      toast.success("User logged out successfully");
      console.log("Cache cleared after user logout");
    },
    onError: (error) => {
      console.error("Error logging out user:", error);
      toast.error("Error logging out the user");
    },
  });

  // // Update user information
  // const updateUserMutation = useMutation<
  //   void,
  //   Error,
  //   { userId: string; updatedData: userData }
  // >({
  //   mutationFn: ({ userId, updatedData }) => updateUser(userId, updatedData),
  //   onSuccess: (_, { userId, updatedData }) => {
  //     // Update cache after update
  //     queryClient.setQueryData<userData>(["user"], (oldData) => ({
  //       ...oldData,
  //       ...updatedData,
  //     }));
  //     toast.success("User updated successfully");
  //     console.log("Cache updated after user update");
  //   },
  //   onError: (error) => {
  //     toast.error("Error updating the user");
  //     console.error("Error updating user:", error);
  //   },
  // });

  return {
    user,
    isLoading,
    error,
    registerUser: registerMutation.mutate,
    loginUser: loginMutation.mutate,
    logoutUser: logoutMutation.mutate,
    // updateUser: updateUserMutation.mutate,
    registerMutation,
    loginMutation,
    logoutMutation,
    // updateUserMutation,
  };
};
