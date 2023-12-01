import React, { useState, useEffect, useRef } from "react";
import "./LandingScreen.css";
import { useNavigate } from "react-router-dom";

import Divider from "@mui/material/Divider";
import { IoExtensionPuzzle } from "react-icons/io5";

import ExtensionReview from "../../components/ExtensionReview/ExtensionReview";

const LandingScreen = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showExtensionReview, setShowExtensionReview] = useState(false);
  const [applyClickEffect, setApplyClickEffect] = useState(false);

  useEffect(() => {
    const handleAnimationEnd = (event) => {
      if (event.animationName === "highlightAnimation") {
        setShowLogo(true);

        setTimeout(() => {
          setApplyClickEffect(true);
          setTimeout(() => {
            setShowLogo(false);

            const headerElement = document.querySelector(
              ".landing-right-header"
            );
            headerElement.classList.add("landing-right-header-fade-out");

            setShowExtensionReview(true);
          }, 450);
        }, 1000);
      }
    };

    const headerElement = headerRef.current;
    headerElement.addEventListener("animationend", handleAnimationEnd);

    return () => {
      if (headerElement) {
        headerElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-left">
        <div className="landing-right-content">
          <h1 className="landing-right-header" ref={headerRef}>
            The best AI extension ever made
            {/* <span className="free-text"> - free</span> */}
            {showLogo && (
              <div
                className={`text-logo ${
                  applyClickEffect ? "text-logo-click-effect" : ""
                }`}
              >
                <img
                  src={require("../../assets/images/128x128.png")}
                  alt="Text Logo"
                  className="text-logo-img"
                />
              </div>
            )}
          </h1>

          {showExtensionReview && <ExtensionReview />}
        </div>
      </div>
      <div className="landing-right">
        <div className="right-panel-header">GET STARTED</div>

        <div className="download-extension-button">
          <IoExtensionPuzzle className="download-extension-icon" />
          <span>Get Extension</span>
        </div>

        <div className="divider">
          <div className="divider-line-left"></div>
          <div className="divider-text">AND</div>
          <div className="divider-line-right"></div>
        </div>

        <div className="auth-button-container">
          <div
            className="auth-button auth-button-login"
            onClick={() => navigate("/")}
          >
            <span className="auth-button-text">Login</span>
          </div>
          <div
            className="auth-button auth-button-signup"
            onClick={() => navigate("/signup")}
          >
            <span className="auth-button-text">Signup</span>
          </div>
        </div>

        <div className="footer">
          <div className="footer-logo">
            <img
              src={require("../../assets/images/logo-white.png")}
              alt="SummaryAI Logo"
            />
          </div>
          <div className="footer-links">
            <a href="/terms">Terms of use</a> |{" "}
            <a href="/privacy">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
