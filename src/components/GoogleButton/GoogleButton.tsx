import React from "react";
import { Google } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";

import { useDispatch } from "react-redux";
import { setLastTabId } from "../../store/slices/userSlice";

import "./GoogleButton.css";
import { LoadingButton } from "@mui/lab";
const GoogleButton = ({ text, customStyle, onClick, tabId }: any) => {
  const dispatch = useDispatch();
  const handleGoogleOAuth = () => {
    console.log("GOAUTH", tabId);
    dispatch(setLastTabId({ tabId: tabId ? tabId : "" }));
    window.location.href = `https://summaryai.io/auth/google?tabId=${tabId}`;
  };

  return (
    <LoadingButton
      variant="contained"
      style={styles.button}
      onClick={handleGoogleOAuth}
    >
      <div className="google-logo-container">
        <FcGoogle className="google-logo" />
      </div>

      <div style={styles.text}>Sign in with Google</div>
    </LoadingButton>
  );
};

const styles = {
  button: {
    backgroundColor: "#4285F4",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 6,
    padding: 0,
    height: 40,
    overflow: "hidden",
    marginBottom: 10,
  },

  text: {
    marginLeft: 20,
  },
};

export default GoogleButton;
