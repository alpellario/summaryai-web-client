import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../store";
import { useDispatch } from "react-redux";

const muiInputStyles = {
  inputLabelProps: {
    style: {
      fontSize: "1.7rem",
      fontFamily: `'Lato', sans-serif`,
    },
  },
  inputProps: {
    style: {
      backgroundColor: "#E0F6F8",
      fontSize: "2rem",
    },
  },
  buttonStyle: {
    backgroundColor: "#90CAFA",
    color: "#000000",
    marginBottom: "1.2rem",
    height: "4.2rem",
    fontSize: "1.7rem",
  },
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPasswordForm = ({ goToLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "user1@gmail.com",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Form data", values);
      setSubmitting(true);

      setSubmitting(true);
      dispatch(forgotPassword(values))
        .unwrap()
        .then((response) => {
          console.log(response);
          alert(
            "Password reset link sent! Please check your email to continue.",
            "info"
          );

          goToLogin();
        })
        .catch((err) => {
          if (!err.data.error.isOperational) {
            alert(
              "Sorry, something went wrong. Please try again later..",
              "warning"
            );
          }
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="login-container">
      <div className="input">
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="filled"
          InputProps={muiInputStyles.inputProps}
          InputLabelProps={muiInputStyles.inputLabelProps}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </div>

      <Button
        style={muiInputStyles.buttonStyle}
        // color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={formik.isSubmitting}
      >
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
