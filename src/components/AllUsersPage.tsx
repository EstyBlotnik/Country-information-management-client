import { FaSpinner } from "react-icons/fa";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "../style/Country.scss";
import { useMemo } from "react";
import VerificationDialog from "./VerificationDialogue";
import { useUsers } from "../hooks/useUsers";
import { Avatar } from "@mui/material";
import { userData } from "../types/userTypes";
import API_URL from "../config/apiConfig"; 
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selctedUserState } from "../states/user";
export const AllUsersPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const { users, isLoading, error, deleteMutation, getUserById } = useUsers();
  const setSelectedUser = useSetRecoilState(selctedUserState);
  const selectedUser = useRecoilValue(selctedUserState);
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success("User deleted successfully");
    }

    if (deleteMutation.isError) {
      toast.error("Error deleting the user");
    }
  }, [deleteMutation.isSuccess, deleteMutation.isError]);

  const rows: GridRowsProp = useMemo(
    () =>
      users?.map((user) => ({
        id: user._id,
        _id: user._id,
        profilePicture: user.profilePicture,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      })) || [],
    [users]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "profilePicture",
        headerName: "Profile Picture",
        width: 150,
        renderCell: (params) => (
          <Avatar
            src={
              `${API_URL}${params.value}` || "/default-avatar.png"
            }
            alt="user profle"
            sx={{ width: 50, height: 50, mb: 2 }}
          />
        ),
      },

      { field: "name", headerName: "name", width: 150 },
      { field: "email", headerName: "email", width: 150 },
      { field: "phoneNumber", headerName: "phoneNumber", width: 150 },

      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params) => (
          <div>
            <button
              className="button button-edit"
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </button>
            <button
              className="button button-delete"
              onClick={() => handleDeleteConfirmation(params.row.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleEdit = (selectedUser: userData) => {
    console.log(selectedUser);
    const fullSelectedUser = getUserById(selectedUser?._id||"")
    setSelectedUser(fullSelectedUser||selectedUser);
    console.log("selected user set to state", selectedUser);
    navigate(`/editUser/${selectedUser._id}`);
  };

  const handleDeleteConfirmation = (id: string) => {
    setDeleteDialogOpen(true);
    setUserId(id);
  };

  const handleDelete = (id: string) => {
    console.log("Deleting user with id:", id);
    setDeleteDialogOpen(false);
    deleteMutation.mutate(id); // שולח את ה-id למחיקה
  };

  const handleCancel = () => {
    console.log("delete user was canceld");
  };

  if (isLoading) return <FaSpinner className="spinner" />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h1 className="title">users list:</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        className="data-grid"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 25]}
      />
      <button
        className="add-country-button"
        onClick={() => navigate("/addUser")}
      >
        <FaPlus style={{ marginRight: "8px" }} />
        Add a user
      </button>
      <VerificationDialog
        dialogFor="delete"
        open={deleteDialogOpen}
        onClose={() => {
          handleCancel();
          setDeleteDialogOpen(false);
        }}
        onDelete={() => {
          handleDelete(userId);
          setDeleteDialogOpen(false);
        }}
        countryId={userId}
      />
    </div>
  );
};
