import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import useLoading from "../../utils/hooks/useLoading";
import { RootState } from "store";

import "./ContactUs.css";
import { Alert, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ApiManager from "../../api/ApiManager";

import { setUser } from "../../store/slices/userSlice";

const ContactUs = () => {
  const dispatch = useDispatch();
  // redux
  const { userData, token } = useSelector((state: RootState) => state.user);

  //hooks
  const { loading, withLoading } = useLoading();

  const [email, setEmail] = useState(userData?.email || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  console.log("userData", userData);

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
  }, []);

  const getUserData = () => {
    withLoading(async () => {
      const userData = await ApiManager.getUserAccount();

      if (userData.success) {
        dispatch(setUser(userData));
      }
    });
  };

  const onSubmit = () => {
    console.log(email, message);
    withLoading(async () => {
      const contactUs = await ApiManager.contactUs({
        email: email,
        contactType: userData ? "authorized" : "unauthorized",
        message,
      });

      if (!contactUs.success) {
        return setError(contactUs.message);
      }

      if (contactUs.success) {
        setSuccess("Thank you for contact us!");
      }
    });
  };

  return (
    <div className="container">
      <div className="content contentContactUs">
        <span className="contactUsTitle">Contact Us</span>
        {error && (
          <Alert severity="error" style={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" style={{ width: "100%" }}>
            {success}
          </Alert>
        )}
        {!userData && (
          <TextField
            variant="filled"
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            fullWidth
          />
        )}
        <TextField
          variant="filled"
          label="We are glad to hear your opinions"
          id="filled-textarea"
          multiline
          rows={8} // The actual number of rows may vary to achieve 100px height
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...styles.input }} // This sets the outer container height
          fullWidth
        />
        <LoadingButton
          variant="contained"
          style={styles.button}
          onClick={onSubmit}
          loading={loading}
        >
          SUBMIT
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

export default ContactUs;
