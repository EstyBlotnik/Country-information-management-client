import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../useUser";

const useAdminAuth = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser(); // קבלת נתוני המשתמש מ-useUser

  useEffect(() => {
    if (!isLoading && (!user || !(user.role==="Admin"))) {
      navigate("/home");
    }
  }, [user, isLoading, navigate]);
};

export default useAdminAuth;
