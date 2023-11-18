import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";
import ApiManager from "../../api/ApiManager";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLoading from "../../utils/hooks/useLoading";
import { useDispatch } from "react-redux";
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

  return (
    <div className="container">
      <div className="content">
        <span className="resetPasswordTitle">Reset Password</span>
        {error && (
          <Alert severity="error" style={{ width: "100%" }}>
            {error}
          </Alert>
        )}
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
