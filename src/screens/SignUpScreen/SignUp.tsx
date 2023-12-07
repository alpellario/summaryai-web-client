import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./SignUp.css";

import { TextField, Button, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ApiManager from "../../api/ApiManager";
import useLoading from "../../utils/hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUser } from "../../store/slices/userSlice";

const SignUp = () => {
  const location = useLocation();
  const [extensionPath, setExtensionPath] = useState<string>(
    location.state?.extensionPath || ""
  );

  // redux
  const { userData, token } = useSelector((state: RootState) => state.user);

  // hooks
  const { loading, withLoading } = useLoading();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSignUp = () => {
    withLoading(async () => {
      const signup = await ApiManager.signup({
        email,
        password,
        passwordConfirm,
      });

      if (!signup.success) {
        return setError(signup.message);
      }

      dispatch(setUser(signup));
      navigate("/myaccount", {
        state: { extensionPath: extensionPath || "", isAutoLogin: false },
      });
    });
  };

  const onEmailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(e.target.value);
    clearError();
  };

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
    clearError();
  };

  const onRetypePasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
    clearError();
  };

  const clearError = () => {
    setError("");
  };

  const isButtonDisabled = () => {
    return !email || !password || !passwordConfirm;
  };

  return (
    <div className="container">
      <div className="content">
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
          fullWidth
        />
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
          label="Confirm Password"
          type="password"
          onChange={onRetypePasswordChange}
          style={styles.input}
          fullWidth
        />
        <LoadingButton
          variant="contained"
          style={styles.button}
          //disabled={isButtonDisabled()}
          onClick={onSignUp}
          loading={loading}
        >
          CREATE ACCOUNT
        </LoadingButton>
        <div className="privacyPolicyAccount">
          By creating your account, you agree to our
          <br />
          <Link to="/privacypolicy">Privacy Policy</Link>.
          <div className="signUpPrompt">
            Already have an account? <Link to="/">Sign In</Link>
          </div>
        </div>
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

export default SignUp;
