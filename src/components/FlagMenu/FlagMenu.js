import React, { useState, useEffect } from "react";
import "./FlagMenu.css";
import "../ExtensionReview/ExtensionReview.css";

import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    zIndex: "99999",
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 120,
    borderRadius: "15px",
    backgroundColor:
      theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.98);",
    color:
      theme.palette.mode === "dark"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0 0",
    },
    "& .MuiMenuItem-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "10px 10px",
      paddingLeft: "15px",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
      "&:hover": {
        backgroundColor: alpha("#e7e7e7", 0.1),
        transition: "all 0.2s ease-in-out",
      },
    },
  },
}));

const FlagMenu = ({
  targetLanguage,
  handleTranslate,
  page,
  endAnimation,
  isScaled,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = async (language) => {
    if (page === "text" && endAnimation) {
      handleTranslate(language);
    }
  };

  const renderLanguage = () => {
    if (targetLanguage)
      return (
        <img
          className={`language-img ${isScaled ? "scale" : ""}`}
          alt="Language"
          src={require(`../../assets/images/flags/${targetLanguage}.png`)}
        />
      );
  };

  return (
    <div className="flag-selection">
      <Tooltip
        TransitionComponent={Zoom}
        title={`Translate ${
          !endAnimation ? "(Wait for animation to finish)" : ""
        }`}
        placement="top"
        arrow
      >
        <div className={`flag-container`} onClick={handleClick}>
          {renderLanguage()}
        </div>
      </Tooltip>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("en");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/en.png")}
            alt="English"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">English</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("zh");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/zh.png")}
            alt="China"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">Chinese</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("de");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/de.png")}
            alt="Germany"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">German</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("fr");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/fr.png")}
            alt="France"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">French</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("es");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/es.png")}
            alt="Spain"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">Spanish</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("tr");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/tr.png")}
            alt="Turkey"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">Turkish</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("ja");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/ja.png")}
            alt="Japan"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">Japanese</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("ko");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/ko.png")}
            alt="Korea"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">Korean</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelectLanguage("pl");
            handleClose();
          }}
        >
          <img
            src={require("../../assets/images/flags/pl.png")}
            alt="Poland"
            className="flag-icon"
          />
          <div className="flag-menu-lang-name">Polish</div>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default FlagMenu;
