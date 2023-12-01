import React from "react";
import "./LandingPage.css";
import LogoImage from "../../assets/images/logo.png";

const LandingPage = () => {
  return (
    <div>
      <div className="left-side">
        <div className="landing-logo-container">
          <img src={LogoImage} alt="Logo" className="logo-landing" />
          <span className="headerTitle">SummaryAI</span>
        </div>
        <div className="left-side-container">
          <h1 className="title-landing">S</h1>
        </div>
      </div>
      <div className="right-side"></div>
    </div>
  );
};

export default LandingPage;
