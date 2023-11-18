import React from "react";
import colors from "../../styles/colors";
import LogoImage from "../../assets/images/logo.png";

import "./Header.css";
import fonts from "../../styles/fonts";
import { Link, useNavigate } from "react-router-dom";

import { ExitToApp } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useLoading from "../../utils/hooks/useLoading";
import ApiManager from "../../api/ApiManager";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/slices/userSlice";

const Header = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const { loading, withLoading } = useLoading();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    withLoading(async () => {
      await ApiManager.logout();

      console.log("çıkış yapılıyor");

      window.postMessage(
        {
          type: "DELETE_SUMMARYAI_SECRET_KEY",
        },
        "*"
      );
      dispatch(clearUser());
      navigate("/");
    });
  };

  const onLogoClick = () => {
    navigate(userData ? "/myaccount" : "/");
  };

  return (
    <div className="header">
      <div onClick={onLogoClick} className="headerLink">
        <img src={LogoImage} alt="Logo" className="logo" />
        <span className="headerTitle">SummaryAI</span>
      </div>
      <div className="contactUsRow">
        <Link to="/contactus" className="contactUsText">
          CONTACT US
        </Link>
        <LoadingButton
          loading={loading}
          style={{ width: 50, marginLeft: 10 }}
          onClick={onLogout}
        >
          <ExitToApp color="primary" />
        </LoadingButton>
      </div>
    </div>
  );
};

export default Header;
