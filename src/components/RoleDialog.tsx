import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { userData } from "../types/userTypes";
import { toast } from "react-toastify";
import { changeRoleReqest } from "../services/userService";

type UserRole = "View" | "Edit" | "Add" | "Delete" | "Admin";

const rolePermissions: Record<UserRole, string[]> = {
  View: ["Edit", "Add", "Delete"],
  Edit: ["Add", "Delete"],
  Add: ["Delete"],
  Delete: [],
  Admin: [],
};

type RoleDialogProps = {
  user: userData;
  isOpen: boolean;
  onClose: () => void;
};

export default function RoleDialog({ user, isOpen, onClose }: RoleDialogProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string>();
  const availablePermissions = rolePermissions[user.role] || [];

  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions(permission);
  };

  const handleSubmit = () => {
    if (!selectedPermissions) {
      toast.error("Please select permissions");
    } else {
      console.log(selectedPermissions);
      if (user?._id) {
        changeRoleReqest(user._id, selectedPermissions);
      } else {
        console.error("User ID is undefined");
      }
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Manage Permissions</DialogTitle>
      <DialogContent>
        {availablePermissions.length > 0 ? (
          availablePermissions.map((permission) => (
            <FormControlLabel
              key={permission}
              control={
                <Checkbox
                  checked={selectedPermissions === permission}
                  onChange={() => handlePermissionChange(permission)}
                />
              }
              label={permission}
            />
          ))
        ) : (
          <p style={{ color: "gray" }}>No additional permissions available.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
