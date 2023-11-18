import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updatePassword } from "../store";

const validationSchema = Yup.object({
  passwordCurrent: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

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

const ResetPasswordAccountForm = ({ closeForm }) => {
  const dispath = useDispatch();
  const [result, setResult] = useState("");

  const formik = useFormik({
    initialValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      dispath(updatePassword(values))
        .unwrap()
        .then(() => {
          resetForm();
          setResult("Password updated successfully");
          setTimeout(() => {
            closeForm();
          }, 2000);
        })
        .catch((err) => {
          setResult(err.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  let content = (
    <form className="" onSubmit={formik.handleSubmit}>
      <div className="">
        <TextField
          id="passwordCurrent"
          label="Current Password"
          type="password"
          value={formik.values.passwordCurrent}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordCurrent &&
            Boolean(formik.errors.passwordCurrent)
          }
          variant="filled"
          InputProps={muiInputStyles.inputProps}
          InputLabelProps={muiInputStyles.inputLabelProps}
          style={{ width: "100%" }}
          size="small"
        />
      </div>

      <div className="">
        <TextField
          id="password"
          label="New Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          variant="filled"
          InputProps={muiInputStyles.inputProps}
          InputLabelProps={muiInputStyles.inputLabelProps}
          style={{ width: "100%" }}
          size="small"
        />
      </div>

      <div className="">
        <TextField
          id="passwordConfirm"
          label="New Password Confirm"
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
          style={{ width: "100%" }}
          size="small"
        />
      </div>

      <Button
        style={{
          ...muiInputStyles.buttonStyle,
          backgroundColor: "#B90A01",
          marginTop: "1px",
          width: "100%",
        }}
        type="submit"
        variant="contained"
        disabled={formik.isSubmitting}
      >
        RESET PASWORD
      </Button>
      {result && <div className="update-pass-warning">{result}</div>}
    </form>
  );

  return <div className="">{content}</div>;
};

export default ResetPasswordAccountForm;
