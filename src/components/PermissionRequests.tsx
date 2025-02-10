import { useRecoilState } from "recoil";
import { permissionRequestsState } from "../states/permissionRequestsState";
import { useEffect, useState } from "react";
import { fetchPermissionRequestsFromServer } from "../services/userService";
import PermissionRequestCard from "./ReqestCard";

const PermissionRequests = () => {
  const [permissionRequests, setPermissionRequests] = useRecoilState(
    permissionRequestsState
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // אם אין מידע ב-Recoil או ב-localStorage, נשלוף מהשרת
    const fetchData = async () => {
      const requestsFromStorage = JSON.parse(
        localStorage.getItem("permissionRequests") || "[]"
      );

      if (requestsFromStorage.length === 0) {
        const requestsFromServer = await fetchPermissionRequestsFromServer();
        console.log("from service:", requestsFromServer);
        setPermissionRequests(requestsFromServer);
      } else {
        setPermissionRequests(requestsFromStorage);
      }

      setLoading(false);
    };

    fetchData();
  }, [setPermissionRequests]);

  useEffect(() => {
    // כל פעם שהמידע משתנה, נשמור אותו ב-localStorage
    localStorage.setItem(
      "permissionRequests",
      JSON.stringify(permissionRequests)
    );
  }, [permissionRequests]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {Array.isArray(permissionRequests) &&
        permissionRequests.map((request) => (
          <PermissionRequestCard
            request={request}
            onApprove={(userId: string) => {
              console.log(userId);
            }}
            onDeny={(userId: string) => {
              console.log(userId);
            }}
          />
        ))}
    </div>
  );
};

export default PermissionRequests;
