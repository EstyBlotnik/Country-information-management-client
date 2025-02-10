import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CountryData, CountryWithoutID } from "../types/countryTypes";
import { toast } from "react-toastify";
import {
  getAllUsers,
  editUser,
  getUser,
  deleteUser,
} from "../services/userService";
import { userData } from "../types/userTypes";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<userData[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUsers();
      if (response && "data" in response) {
        return response.data as userData[];
      } else {
        throw new Error(response.message);
      }
    },
  });

  // Delete a user
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: (_, id) => {
      // Update cache after deletion
      queryClient.setQueryData<userData[]>(
        ["users"],
        (oldData) => oldData?.filter((user) => user._id !== id) || []
      );
    },
    onError: (error) => {
      console.error("Error deleting country:", error);
    },
  });

  // Update a user
  const updateMutation = useMutation<
    userData,
    Error,
    { userId: string; updatedData: userData }
  >({
    mutationFn: async ({ userId, updatedData }) => {
      console.log("updateMutation: ", updatedData);
      const response = await editUser(userId, updatedData);
      console.log("respon: ", response);
      if (response && "data" in response) {
        return response.data as userData;
      } else {
        throw new Error(response.message);
      }
    },
    onSuccess: (updatedUser, { userId, updatedData }) => {
      // Update cache after update
      queryClient.setQueryData<CountryData[]>(
        ["users"],
        (oldData) =>
          oldData?.map((user) =>
            user._id === userId ? { ...user, ...updatedUser } : user
          ) || []
      );
      toast.success("Users updated successfully");
      console.log("Cache updated after users update");
    },
    onError: (error) => {
      toast.error("Error updating the user");
      console.error("Error deleting user:", error);
    },
  });

//   // Add a new country
//   const addMutation = useMutation<CountryData, Error, CountryWithoutID>({
//     mutationFn: (newCountry) => addCountry(newCountry),
//     onSuccess: (newCountry) => {
//       // Update cache after adding a new country
//       queryClient.setQueryData<CountryData[]>(["country"], (oldData) => [
//         ...(oldData || []),
//         newCountry,
//       ]);
//       toast.success("Country added successfully");
//       console.log("Cache updated after adding new country");
//     },
//     onError: (error) => {
//       console.error("Error adding country:", error);
//       toast.error("Error adding the country");
//     },
//   });

  // Get a specific country by its ID from the cache
  const getUserById = (id: string): userData | undefined => {
    return queryClient
      .getQueryData<userData[]>(["users"])
      ?.find((user) => user._id === id);
  };

  return {
    users,
    isLoading,
    error,
    deleteUser: deleteMutation.mutate,
    deleteMutation,
    updateSelectedUser: updateMutation.mutate,
    updateMutation,
    // addCountry: addMutation.mutate,
    // addMutation,
    getUserById,
  };
};
