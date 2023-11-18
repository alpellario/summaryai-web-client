// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../store";

// const muiInputStyles = {
//   inputLabelProps: {
//     style: {
//       fontSize: "17px",
//       fontFamily: `'Lato', sans-serif`,
//     },
//   },
//   inputProps: {
//     style: {
//       backgroundColor: "#E0F6F8",
//       fontSize: "20px",
//     },
//   },
//   buttonStyle: {
//     backgroundColor: "#90CAFA",
//     color: "#000000",
//     marginBottom: "12px",
//     height: "42px",
//     fontSize: "17px",
//   },
// };

// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const LoginForm = () => {
//   const [login, result] = useLoginMutation();
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "user1@gmail.com",
//       password: "pass1234",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       console.log("Form data", values);
//       setSubmitting(true);

//       login(values)
//         .unwrap()
//         .then((user) => {
//           console.log("User", user);

//           // Here, after successful login:
//           if (user.token) {
//             window.postMessage(
//               {
//                 type: "SET_SUMMARYAI_SECRET_KEY",
//                 token: user.token,
//               },
//               "*"
//             );
//           }

//           navigate("/account");
//         })
//         .catch((error) => {
//           console.log("Error", error);
//         })
//         .finally(() => {
//           setSubmitting(false);
//         });
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="login-container">
//       <div className="input">
//         <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           variant="filled"
//           InputProps={muiInputStyles.inputProps}
//           InputLabelProps={muiInputStyles.inputLabelProps}
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//       </div>
//       <div className="input">
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type="password"
//           variant="filled"
//           InputProps={muiInputStyles.inputProps}
//           InputLabelProps={muiInputStyles.inputLabelProps}
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//       </div>

//       <Button
//         style={muiInputStyles.buttonStyle}
//         // color="primary"
//         variant="contained"
//         fullWidth
//         type="submit"
//         disabled={formik.isSubmitting}
//       >
//         Login
//       </Button>
//     </form>
//   );
// };

// export default LoginForm;
