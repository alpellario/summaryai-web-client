import React from "react";
import { Google } from "@mui/icons-material";

import "./GoogleButton.css";
import { LoadingButton } from "@mui/lab";
const GoogleButton = ({ text, customStyle, onClick }: any) => {
  const handleGoogleOAuth = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <LoadingButton
      variant="contained"
      style={styles.button}
      onClick={handleGoogleOAuth}
    >
      <Google style={styles.googleLogo} />
      <div style={styles.text}>Sign in with Google</div>
    </LoadingButton>
  );
};

const styles = {
  button: {
    backgroundColor: "#4285F4",
  },
  googleLogo: {
    width: "30px",
    height: "30px",
    color: "#de5246",
  },
  text: {
    marginLeft: 10,
  },
};

export default GoogleButton;
