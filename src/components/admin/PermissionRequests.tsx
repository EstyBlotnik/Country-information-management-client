import { useRecoilState } from "recoil";
import { permissionRequestsState } from "../../states/permissionRequestsState";
import { useEffect, useState } from "react";
import {
  changeRoleResponse,
  fetchPermissionRequestsFromServer,
} from "../../services/userService";
import PermissionRequestCard from "./ReqestCard";
import PermissionRequestsHeader from "./PermissionRequestsHeader";
import { usePermissionRequests } from "../../hooks/usePermissionRequests";
import { useUser } from "../../hooks/useUser";

const PermissionRequests = () => {
  const { user } = useUser();
  const { isLoading, permissionRequests } = usePermissionRequests();
  const [filterdPermissionRequests, setFilterdPermissionRequests] =
    useState(permissionRequests);
  const [filter, setFilter] = useState<
    "All" | "Approved" | "Denied" | "Pending"
  >("All");
  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        if (filter === "All") {
          setFilterdPermissionRequests(permissionRequests);
        } else {
          setFilterdPermissionRequests(
            permissionRequests &&
              permissionRequests.filter((req) => req.status === filter)
          );
        }
      } else {
        const userRequests = [
          ...user.closedRequests,
          ...(user.openRequest ? [user.openRequest] : []),
        ];
        if (filter === "All") {
          setFilterdPermissionRequests(userRequests);
        } else {
          setFilterdPermissionRequests(
            userRequests && userRequests.filter((req) => req.status === filter)
          );
        }
      }
    }
  }, [permissionRequests, filter, user]);
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <PermissionRequestsHeader filter={filter} setFilter={setFilter} />

      {Array.isArray(filterdPermissionRequests) &&
        filterdPermissionRequests.map((request) => (
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
