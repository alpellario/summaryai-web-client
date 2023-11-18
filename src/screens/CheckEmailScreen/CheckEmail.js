import React from "react";
import { Link } from "react-router-dom";
import "./CheckEmail.css";

const CheckEmail = () => {
  return (
    <div className="container">
      <div className="content">
        <span className="checkEmailTitle">Check Email</span>
        <span className="description">
          Please check your email inbox and click on the provided link to reset
          your password.If you don’t receive email,{" "}
          <Link>click here to resend.</Link>
        </span>
      </div>
    </div>
  );
};

export default CheckEmail;
