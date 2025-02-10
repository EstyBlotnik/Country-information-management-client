// import * as React from "react";
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import { RequestData } from "../types/authorizationRequest";
// import { useUsers } from "../hooks/useUsers";

// interface PermissionRequestProps {
//   request: RequestData;
//   onApprove: (userId: string) => void;
//   onDeny: (userId: string) => void;
// }

// const PermissionRequestCard: React.FC<PermissionRequestProps> = ({
//   request,
//   onApprove,
//   onDeny,
// }) => {
//   const { requestDate, userId, requestedRole, status } = request;
//   const { getUserById } = useUsers();
//   const user = getUserById(userId);

//   return (
//     <Card
//       sx={{
//         maxWidth: 400,
//         margin: 2,
//         borderRadius: 2,
//         boxShadow: 3,
//         backgroundColor: "#fafafa",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//       }}
//     >
//       <CardContent sx={{ paddingBottom: 1 }}>
//         <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
//           Permission Request
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
//           <strong>Request Date:</strong> {requestDate.toLocaleString()}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
//           <strong>Requested by:</strong> {user?.firstName + " " + user?.lastName}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
//           <strong>Requested Role:</strong> {requestedRole}
//         </Typography>
//         <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
//           <strong>Status:</strong>{" "}
//           <span
//             style={{
//               color:
//                 status === "Approved"
//                   ? "green"
//                   : status === "Denied"
//                   ? "red"
//                   : "orange",
//             }}
//           >
//             {status}
//           </span>
//         </Typography>
//       </CardContent>
//       <Divider />
//       <CardActions sx={{ padding: 1 }}>
//         {status === "Pending" && (
//           <>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => onApprove(userId)}
//               sx={{ mr: 1 }}
//             >
//               Approve
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={() => onDeny(userId)}
//             >
//               Deny
//             </Button>
//           </>
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// export default PermissionRequestCard;
import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Avatar,
  Box,
} from "@mui/material";
import { RequestData } from "../types/authorizationRequest";
import { useUsers } from "../hooks/useUsers";
import API_URL from "../config/apiConfig";

interface PermissionRequestProps {
  request: RequestData;
  onApprove: (userId: string) => void;
  onDeny: (userId: string) => void;
}

const PermissionRequestCard: React.FC<PermissionRequestProps> = ({
  request,
  onApprove,
  onDeny,
}) => {
  const { requestDate, userId, requestedRole, status } = request;
  const { getUserById } = useUsers();
  const user = getUserById(userId);

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "row", // השתמשנו ב-flexbox כדי למקם את התמונה מצד אחד
        alignItems: "center",
      }}
    >
      <Box sx={{ padding: 2, flex: 1 }}>
        <CardContent sx={{ paddingBottom: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
            Permission Request
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>Request Date:</strong> {requestDate.toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>Requested by:</strong>{" "}
            {user?.firstName + " " + user?.lastName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>Requested Role:</strong> {requestedRole}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", marginBottom: 1 }}
          >
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  status === "Approved"
                    ? "green"
                    : status === "Denied"
                      ? "red"
                      : "orange",
              }}
            >
              {status}
            </span>
          </Typography>
        </CardContent>
        <Divider />
        <CardActions sx={{ padding: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onApprove(userId)}
            sx={{ mr: 1, width: "100%" }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => onDeny(userId)}
            sx={{ width: "100%" }}
          >
            Deny
          </Button>
        </CardActions>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Avatar
          alt={`${user?.firstName} ${user?.lastName}`}
          src={
            user
              ? `${API_URL}${user?.profilePicture}` || "/default-avatar.png"
              : "/default-avatar.png"
          }
          sx={{ width: 56, height: 56 }}
        />
      </Box>
    </Card>
  );
};

export default PermissionRequestCard;
