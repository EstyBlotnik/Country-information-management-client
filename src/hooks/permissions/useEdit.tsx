import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../useUser";

const useEditAuth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (!user || !["Admin", "Edit", "Delete"].includes(user.role))) {
      navigate("/home");
    }
  }, [user, isLoading, navigate]);
};

export default useEditAuth;
