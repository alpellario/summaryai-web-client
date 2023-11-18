import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ResetPasswordPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { verifyForgotPasswordToken, resetPassword } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const muiInputStyles = {
  inputLabelProps: {
    style: {
      fontSize: "17px",
      fontFamily: `'Lato', sans-serif`,
    },
  },
  inputProps: {
    style: {
      backgroundColor: "#E0F6F8",
      fontSize: "20px",
    },
  },
  buttonStyle: {
    backgroundColor: "#90CAFA",
    color: "#000000",
    marginBottom: "12px",
    height: "42px",
    fontSize: "17px",
  },
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyResult, setVerifyResult] = useState("");
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    dispatch(verifyForgotPasswordToken(token))
      .unwrap()
      .then((result) => {
        console.log("Result", result);
        setVerifyResult("Token is valid. Please enter a new password.");
        setTokenIsValid(true);
      })
      .catch((err) => {
        console.log("Error", err);
        setVerifyResult(err.message);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      dispatch(resetPassword({ token, values }))
        .unwrap()
        .then((result) => {
          console.log("Result", result);
          setVerifyResult("Password reset successfully. Redirecting...");
          setTokenIsValid(false);
          setTimeout(() => {
            navigate("/account", { replace: true });
          }, 2000);
        })
        .catch((err) => {
          console.log("Error", err);
          setVerifyResult(err.message);
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    },
  });

  let content = (
    <form className="reset-container" onSubmit={formik.handleSubmit}>
      <div className="input">
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          variant="filled"
          InputProps={muiInputStyles.inputProps}
          InputLabelProps={muiInputStyles.inputLabelProps}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>

      <div className="input">
        <TextField
          fullWidth
          id="passwordConfirm"
          label="Password Confirm"
          type="password"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          variant="filled"
          InputProps={muiInputStyles.inputProps}
          InputLabelProps={muiInputStyles.inputLabelProps}
          helperText={
            formik.touched.passwordConfirm && formik.errors.passwordConfirm
          }
        />
      </div>

      <Button
        style={{ ...muiInputStyles.buttonStyle, width: "100%" }}
        type="submit"
        variant="contained"
        disabled={formik.isSubmitting}
      >
        RESET PASWORD
      </Button>
    </form>
  );

  return (
    <div className="reset-pass-container">
      <h1 className="reset-pass-title">Password Reset</h1>
      <p className="reset-pass-result">{verifyResult}</p>
      {tokenIsValid ? content : null}
      <div
        className="reset-pass-home-button"
        onClick={() => {
          navigate("/account", { replace: true });
        }}
      >
        Home
      </div>
    </div>
  );
};

export default ResetPasswordPage;
