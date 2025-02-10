import { useRecoilState } from "recoil";
import { permissionRequestsState } from "../../states/permissionRequestsState";
import { useEffect, useState } from "react";
import {
  changeRoleResponse,
  fetchPermissionRequestsFromServer,
} from "../../services/userService";
import PermissionRequestCard from "./ReqestCard";

const PermissionRequests = () => {
  const [permissionRequests, setPermissionRequests] = useRecoilState(
    permissionRequestsState
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    localStorage.setItem(
      "permissionRequests",
      JSON.stringify(permissionRequests)
    );
  }, [permissionRequests]);

  const onDeny = async (reqId: string) => {
    changeRoleResponse(reqId, false);
    console.log("deny request");
  };
  
  const onApprove = async (reqId: string) => {
    changeRoleResponse(reqId, true);
    console.log("approve request");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {Array.isArray(permissionRequests) &&
        permissionRequests.map((request) => (
          <PermissionRequestCard
            request={request}
            onApprove={onApprove}
            onDeny={onDeny}
          />
        ))}
    </div>
  );
};

export default PermissionRequests;
