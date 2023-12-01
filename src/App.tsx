import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import AccountPage from "./pages/AccountPage";

import Header from "./components/Header";

import LandingPage from "./screens/LandingScreen/LandingPage";
import SignIn from "./screens/SignInScreen/SignIn";
import SignUp from "./screens/SignUpScreen/SignUp";
import ResetPassword from "./screens/ResetPasswordScreen/ResetPassword";
import CheckEmail from "./screens/CheckEmailScreen/CheckEmail";
import MyAccount from "./screens/MyAccountScreen/MyAccount";
import SummaryDetails from "./screens/SummaryDetails/SummaryDetails";
import ContactUs from "./screens/ContactUsScreen/ContactUs";
import VerifyResetPassword from "./screens/VerifyResetPasswordScreen/VerifyResetPassword";
import PrivacyPolicy from "./screens/PrivacyPolicyScreen/PrivacyPolicy";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Stack } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4E617E",
    },
    secondary: {
      main: "#F9F9F9",
    },
  },
  typography: {
    fontFamily: ["Exo 2"].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/resetpassword/:token"
            element={<VerifyResetPassword />}
          />
          <Route path="/checkemail" element={<CheckEmail />} />
          <Route
            path="/summarydetails/:summaryId"
            element={<SummaryDetails />}
          />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
