import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { countryState } from "../App";

export default function NavBar() {
  const country = useRecoilValue(countryState);
  return (
    <Box
      sx={{ flexGrow: 1, position: "fixed", top: 0, left: 0, width: "100%" }}
    >
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {country ? country.name : "Countries managment"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
