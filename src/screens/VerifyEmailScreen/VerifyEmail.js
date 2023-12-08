import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiManager from "../../api/ApiManager";
import { useDispatch } from "react-redux";
import useLoading from "../../utils/hooks/useLoading";
import { RiErrorWarningFill, RiCheckboxCircleFill } from "react-icons/ri";

import "./VerifyEmail.css";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, withLoading } = useLoading();
  const [error, setError] = useState("");
  const [result, setResult] = useState(false);
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    if (!token) return;
    withLoading(async () => {
      const verifyEmail = await ApiManager.verifyEmail({
        token,
      });

      if (!verifyEmail.success) return setError(verifyEmail.message);

      if (verifyEmail.success) {
        setResult(true);
        setResultText(verifyEmail.message);
      }
    });
  }, []);

  const renderResult = () => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error)
      return (
        <div>
          <div className="result">
            <RiErrorWarningFill className="result-icon result-icon-error" />
            <div className="result-title-error">ERROR</div>
          </div>
          <div className="verify-result-text">{error}</div>
        </div>
      );
    if (result)
      return (
        <div>
          <div className="result">
            <RiCheckboxCircleFill className="result-icon result-icon-success" />
            <div className="result-title-success">SUCCESS</div>
          </div>
          <div className="verify-result-text">{resultText}</div>
        </div>
      );
  };

  return (
    <div className="container">
      <div className="content contentCheckEmail">
        <span className="checkEmailTitle">Email Verification</span>
        {renderResult()}
      </div>
    </div>
  );
};

export default VerifyEmail;
