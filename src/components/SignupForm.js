// import React from "react";
// import { TextField, Button } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useSignupMutation } from "../store";

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
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .required("Password is required"),
//   passwordConfirm: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords do not match")
//     .required("Password confirmation is required"),
// });

// const SignupForm = () => {
//   const [signup, result] = useSignupMutation();
//   const formik = useFormik({
//     initialValues: {
//       email: "user1@gmail.com",
//       password: "pass1234",
//       passwordConfirm: "pass1234",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       setSubmitting(true);

//       signup(values)
//         .unwrap()
//         .then((user) => {
//           console.log("User", user);
//         })
//         .catch((error) => {
//           if (error.status === 400) {
//             alert(error.data.message);
//           } else if (error.status === 500) {
//             alert("Internal server error");
//           }
//           console.log("Error", error);
//         })
//         .finally(() => {
//           setSubmitting(false);
//           resetForm();
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
//       <div className="input">
//         <TextField
//           fullWidth
//           id="passwordConfirm"
//           name="passwordConfirm"
//           label="Password"
//           type="password"
//           variant="filled"
//           InputProps={muiInputStyles.inputProps}
//           InputLabelProps={muiInputStyles.inputLabelProps}
//           value={formik.values.passwordConfirm}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.passwordConfirm &&
//             Boolean(formik.errors.passwordConfirm)
//           }
//           helperText={
//             formik.touched.passwordConfirm && formik.errors.passwordConfirm
//           }
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
//         Sign up
//       </Button>
//     </form>
//   );
// };

// export default SignupForm;
