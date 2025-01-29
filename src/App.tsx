import React from "react";
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
              <NavBar />
              <Routes>
                <Route path="/" element={<Country />} />
                <Route
                  path={"/editCountry/:id"}
                  element={<ValidationCountryData />}
                />
                <Route
                  path={"/addCountry"}
                  element={<ValidationCountryData />}
                />
              </Routes>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </Router>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
