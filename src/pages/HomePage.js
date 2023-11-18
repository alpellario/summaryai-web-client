// import React, { useState } from "react";
// import * as Yup from "yup";
// import "./HomePage.css";
// import LoginForm from "../components/LoginForm";
// import SignupForm from "../components/SignupForm";

// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const HomePage = () => {
//   const [panel, setPanel] = useState("login"); // ["login", "signup"

//   const sendUserKey = () => {
//     /* global chrome */
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDFiNmVkZjQ5MDdmZTlkZjExODNjOCIsImlhdCI6MTY5ODgxMjM3OSwiZXhwIjoxNzA2NTg4Mzc5fQ.u8s3qk8JnQAAzFgY6xhooUIaaZNus8ldRet1t3zM_14";
//     /* global chrome */
//     if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
//       chrome.runtime.sendMessage({
//         type: "SET_TOKEN",
//         token,
//       });
//     } else {
//       alert("Chrome runtime is not available.");
//     }
//   };

//   const panelContent = () => {
//     if (panel === "login") {
//       return <LoginForm />;
//     } else if (panel === "signup") {
//       return <SignupForm />;
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="auth-container">
//         <div className="auth-btn login" onClick={() => setPanel("login")}>
//           Login
//         </div>
//         <div className="auth-btn signup" onClick={() => setPanel("signup")}>
//           Sign up
//         </div>
//       </div>

//       {panelContent()}
//     </div>
//   );
// };

// export default HomePage;
