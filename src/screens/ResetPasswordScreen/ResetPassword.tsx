import { Alert, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

import useLoading from "../../utils/hooks/useLoading";
import ApiManager from "../../api/ApiManager";
import { LoadingButton } from "@mui/lab";

const ResetPassword = () => {
  // hooks
  const navigate = useNavigate();
  const { loading, withLoading } = useLoading();

  // state
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSend = () => {
    withLoading(async () => {
      const forgotPassword = await ApiManager.forgotPassword({ email });
      if (!forgotPassword.success) {
        return setError(forgotPassword.message);
      }

      navigate("/checkemail");
    });
  };

  const onEmailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(e.target.value);
    clearError();
  };

  const clearError = () => {
    setError("");
  };

  return (
    <div className="container">
      <div className="content resetPasswordContent">
        <span className="resetPasswordTitle">Reset Password</span>
        {error && (
          <Alert severity="error" style={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <TextField
          id="filled-basic"
          variant="filled"
          label="Email"
          type="email"
          onChange={onEmailChange}
          style={styles.input}
          fullWidth
        />
        <LoadingButton
          variant="contained"
          style={styles.button}
          onClick={onSend}
          loading={loading}
        >
          SEND RESET LINK
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

export default ResetPassword;
