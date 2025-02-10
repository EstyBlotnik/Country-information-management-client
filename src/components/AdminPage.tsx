import { createTheme } from "@mui/material/styles";
import MailLockIcon from "@mui/icons-material/MailLock";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { AllUsersPage } from "./AllUsersPage";
import { AllReqests } from "./AllReqests";

const NAVIGATION: Navigation = [
  {
    segment: "allUsers",
    title: "All users",
    icon: <PeopleAltIcon />,
  },
  {
    segment: "permissionRequests",
    title: "Permission requests",
    icon: <MailLockIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  window?: () => Window;
}

export default function AdminPage(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter("/allUsers");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout disableCollapsibleSidebar>
        {router.pathname === "/allUsers" && <AllUsersPage />}
        {router.pathname === "/permissionRequests" && <AllReqests />}
      </DashboardLayout>
    </AppProvider>
  );
}
