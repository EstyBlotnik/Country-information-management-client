import React, { useState } from "react";
import EditUserForm from "../user/EditUserForm";
import { AllUsersPage } from "./AllUsersPage";
import { useRecoilValue } from "recoil";
import { isEditingState } from "../../states/user";

export const UsersPage = () => {
  const isEditing = useRecoilValue(isEditingState);
  if (isEditing) return <EditUserForm editFor="anOtherUser" />;
  else return <AllUsersPage />;
};
