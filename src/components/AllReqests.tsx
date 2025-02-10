import React from "react";
import ReqestCard from "./ReqestCard";
import PermissionRequests from "./PermissionRequests";

export const AllReqests = () => {
  return (
    // <ReqestCard
    //   request={{userId: "67a8b5313040c86ac7e4c91a", requestDate: new Date(), requestedRole:"Add", status:"Pending"}}
    //   onApprove={(userId: string) => {
    //     console.log(userId);
    //   }}
    //   onDeny={(userId: string) => {
    //     console.log(userId);
    //   }}
    // />
    <PermissionRequests />
  );
};
