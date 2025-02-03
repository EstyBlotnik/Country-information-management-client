export type userData = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  role: "View" | "Edit" | "Add" | "Delete" | "Admin";
  userName: string;
  password: string;
  JoiningDate: Date;
};

export interface UserResponse {
  success?: boolean;
  status?: number;
  message?: string;
  user?: userData;
}

export interface ErrorResponse {
  success: boolean;
  status: number;
  message: string;
}
