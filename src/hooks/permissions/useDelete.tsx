import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../useUser";

const useDeleteAuth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (!user || !["Admin", "Add", "Edit", "Delete"].includes(user.role))) {
      navigate("/home");
    }
  }, [user, isLoading, navigate]);
};

export default useDeleteAuth;
