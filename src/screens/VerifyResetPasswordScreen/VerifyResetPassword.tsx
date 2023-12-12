import React, { useState, useEffect } from "react";
import "./VerifyResetPassword.css";

import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";
import ApiManager from "../../api/ApiManager";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLoading from "../../utils/hooks/useLoading";
import { setUser } from "../../store/slices/userSlice";

const VerifyResetPassword = (props: any) => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, withLoading } = useLoading();
  const { token } = useParams();

  // state
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [isValidToken, setIsValidToken] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;
    withLoading(async () => {
      const verifyToken = await ApiManager.verifyResetPasswordToken({
        token,
      });
      if (!verifyToken.success) return setError(verifyToken.message);

      if (verifyToken.success) setIsValidToken(true);
    });
  }, []);

  const onConfirm = () => {
    if (!token) return;
    withLoading(async () => {
      const resetPassword = await ApiManager.resetPassword({
        password,
        passwordConfirm,
        token,
      });
      if (!resetPassword.success) return setError(resetPassword.message);
      dispatch(setUser(resetPassword));
      navigate("/myaccount");
    });
  };

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
    clearError();
  };

  const onPasswordConfirmChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
    clearError();
  };

  const clearError = () => {
    setError("");
  };

  function renderResetForm() {
    if (isValidToken) {
      return (
        <>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Password"
            type="password"
            onChange={onPasswordChange}
            style={styles.input}
            fullWidth
          />
          <TextField
            id="filled-basic"
            variant="filled"
            label="Password Confirm"
            type="password"
            onChange={onPasswordConfirmChange}
            style={styles.input}
            fullWidth
          />
          <LoadingButton
            variant="contained"
            style={styles.button}
            onClick={onConfirm}
            loading={loading}
          >
            CONFIRM
          </LoadingButton>
        </>
      );
    }
  }

  return (
    <div className="container">
      <div className="content resetPasswordContent">
        <span className="resetPasswordTitle">Reset Password</span>
        {error && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              "& .MuiAlert-icon": {
                fontSize: "2.5rem",
                flexShrink: 0,
              },
              "& .MuiAlert-message": {
                fontSize: "1.6rem",
              },
              "& .MuiAlert-action": {
                "& button": {
                  flexShrink: 0,
                  width: "100%",
                  marginRight: "2rem",
                },
              },
            }}
          >
            {error}
          </Alert>
        )}
        {renderResetForm()}
      </div>
    </div>
  );
};

const styles = {
  button: {
    marginTop: 20,
  },
  input: {
    marginTop: 10,
  },
};

export default VerifyResetPassword;
