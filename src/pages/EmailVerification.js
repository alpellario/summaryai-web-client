import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmailVerification.css";
import { confirmEmail } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyResult, setVerifyResult] = useState("");

  useEffect(() => {
    dispatch(confirmEmail(token))
      .unwrap()
      .then((res) => {
        console.log(res);
        setVerifyResult(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setVerifyResult(err.message);
      });
  }, []);

  return (
    <div className="email-verification-container">
      <h1 className="email-verification-title">Email Verification</h1>
      <p className="email-verification-result">{verifyResult}</p>
      <div
        className="email-home-button"
        onClick={() => {
          navigate("/account", { replace: true });
        }}
      >
        Home
      </div>
    </div>
  );
};

export default EmailVerification;
