import { LoadingButton } from "@mui/lab";
import { Alert, Button, TextField } from "@mui/material";
import ApiManager from "../../api/ApiManager";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RootState } from "store";
import useLoading from "../../utils/hooks/useLoading";
import "./SignIn.css";
import { setUser } from "../../store/slices/userSlice";
import GoogleButton from "../../components/GoogleButton/GoogleButton";

const SingIn = () => {
  const location = useLocation();
  const [extensionPath, setExtensionPath] = useState<string>(
    location.state?.extensionPath || ""
  );

  console.log(extensionPath, "extensionPath");
  // redux
  const { userData, token } = useSelector((state: RootState) => state.user);
  // hooks
  const { loading, withLoading } = useLoading();
  const { loading: screenLoading, withLoading: withScreenLoading } =
    useLoading();
  // const [isExtensionRequest, setIsExtensionRequest] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const extensionRequest = params.get("extensionRequest");
  //   if(extensionRequest){
  //     setIsExtensionRequest(true);
  //   }
  // }, []);

  useEffect(() => {
    getUserAccount();
  }, []);

  const getUserAccount = async () => {
    withScreenLoading(async () => {
      const account = await ApiManager.getUserAccount();
      if (account.success) {
        navigate("/myaccount", {
          state: { extensionPath: extensionPath || "", isAutoLogin: true },
        });
      }
    });
  };

  const onSignIn = () => {
    withLoading(async () => {
      const login = await ApiManager.login({
        email,
        password,
      });

      if (!login.success) {
        return setError(login.message);
      }

      console.log("FE :", extensionPath);
      window.postMessage(
        {
          type: "SET_SUMMARYAI_SECRET_KEY",
          token: login.token,
          lastTabId: extensionPath,
        },
        "*"
      );

      dispatch(setUser(login));

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

  const clearError = () => {
    setError("");
  };

  const onForgotPasswordClick = () => {
    navigate("/resetPassword");
  };

  return (
    <div className="container">
      <div className="content">
        {screenLoading ? null : (
          <>
            <GoogleButton tabId />
            <div style={{ marginTop: 10, marginBottom: 10 }}>OR</div>
            {error && (
              <Alert severity="error" style={{ width: "100%" }}>
                {error}
              </Alert>
            )}
            <TextField
              variant="filled"
              label="Email"
              type="email"
              onChange={onEmailChange}
              style={styles.input}
              fullWidth
            />
            <TextField
              variant="filled"
              label="Password"
              type="password"
              onChange={onPasswordChange}
              style={styles.input}
              fullWidth
            />
            <Button variant="text" onClick={onForgotPasswordClick}>
              Forgot Password
            </Button>
            {/* <div className="forgotPassword">
              <Link to="/resetPassword">Forgot Password</Link>
            </div> */}
            <LoadingButton
              variant="contained"
              style={styles.button}
              onClick={onSignIn}
              loading={loading}
            >
              SIGN IN
            </LoadingButton>
            <div className="signUpPrompt">
              Don't you have account? <Link to="/signup">Sign Up</Link>
            </div>
          </>
        )}
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
  forgotPassword: {},
};

export default SingIn;
