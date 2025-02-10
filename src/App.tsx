import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Country } from "./components/Country";
import NavBar from "./components/NavBar";
import { ValidationCountryData } from "./components/EditForm";
import { atom, RecoilRoot } from "recoil";
import { CountryData } from "./types/countryTypes";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/Login";
import SignUpForm from "./components/SignUpForm";
import PasswordResetRequest from "./components/RequestPasswordReset";
import PasswordReset from "./components/ResetPasswors";
import EditUserForm from "./components/EditUserForm";
import DynamicPage from "./components/DynamicPage";
import UserProfile from "./components/UserProfile";
import "./App.css";
import HomePage from "./components/HomePage";
import theme from "./style/theme";
import { ThemeProvider } from "@emotion/react";
import { AllUsersPage } from "./components/AllUsersPage";
import AdminPage from "./components/AdminPage";
const queryClient = new QueryClient();

export const countryState = atom<CountryData | null>({
  key: "countryState",
  default: null,
});

export default function App() {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="App">
              <ToastContainer />
              <ThemeProvider theme={theme}>
                <NavBar />
                <div className="body">
                  <Routes>
                    {/* <Route path="/allusers">
                  element=
                  {
                    <AdminRoute
                      children={<AllUsersPage />}
                      path={"/allusers"}
                    />
                  }
                </Route> */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path={"/countries"} element={<Country />} />
                    <Route path={"/register"} element={<SignUpForm />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/home"} element={<HomePage />} />
                    <Route
                      path={"/passwordresetrequest"}
                      element={<PasswordResetRequest />}
                    />
                    <Route
                      path={"/passwordreset/:token"}
                      element={<PasswordReset />}
                    />
                    <Route
                      path={"/editCountry/:id"}
                      element={<ValidationCountryData />}
                    />
                    <Route
                      path={"/addCountry"}
                      element={<ValidationCountryData />}
                    />
                    <Route path={"/profile"} element={<UserProfile />} />
                    <Route
                      path="/editUser/:id"
                      element={<EditUserForm editFor="anOtherUser" />}
                    />
                    <Route
                      path="/editProfile/:id"
                      element={<EditUserForm editFor={"mySelf"} />}
                    />
                    <Route path="allusers" element={<AllUsersPage />} />
                    <Route path="adminPage" element={<AdminPage />} />
                    <Route path="/:setting" element={<DynamicPage />} />
                  </Routes>
                </div>
              </ThemeProvider>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </Router>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
