import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PropTypes from "prop-types";

import "./MyAccount.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import List from "../../components/List/List";
import useLoading from "../../utils/hooks/useLoading";
import ApiManager from "../../api/ApiManager";
import { LoadingButton } from "@mui/lab";
import { setUser } from "../../store/slices/userSlice";
import { PiCheckFatFill } from "react-icons/pi";

import { Alert } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const BottomAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MyAccount = () => {
  //redux
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, withLoading } = useLoading();
  const { loading: resetLinkLoading, withLoading: withResetLink } =
    useLoading();

  const { userData } = useSelector((state: RootState) => state.user);

  const [value, setValue] = React.useState(0);
  const [isSendEmail, setIsSendEmail] = React.useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [extensionPath, setExtensionPath] = useState<string>(
    location.state?.extensionPath || ""
  );
  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(
    !!location.state?.isAutoLogin
  );

  const [snackOpen, setSnackOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [snackType, setSnackType] = useState<"success" | "error">("success");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(true);
  const [isMailSended, setIsMailSended] = useState<boolean>(false);

  const onSummaryClick = (summary: UserSummaryHistory) => {
    console.log("summary", summary);

    navigate(`/summarydetails/${summary._id}`);
  };

  useEffect(() => {
    if (extensionPath && !isAutoLogin) {
      window.postMessage(
        {
          type: "SUMMARYAI_AUTHENTICATED",
          lastTabId: extensionPath,
        },
        "*"
      );
    }
  }, []);

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
    getUserHistory();
  }, []);

  const getUserData = () => {
    withLoading(async () => {
      const userData = await ApiManager.getUserAccount();

      if (userData.success) {
        dispatch(setUser(userData));
      }

      console.log("flag1");

      let isGoogleAuthTabId = false;
      const queryParams = new URLSearchParams(window.location.search);
      const extensionPathParam = queryParams.get("tabId");
      console.log("extensionPathParam", extensionPathParam);
      if (extensionPathParam) {
        isGoogleAuthTabId = true;
      }

      if (userData?.user?.token && (isAutoLogin || isGoogleAuthTabId)) {
        console.log(userData.user.token);
        window.postMessage(
          {
            type: "SET_SUMMARYAI_SECRET_KEY",
            token: userData?.user?.token,
            lastTabId: isGoogleAuthTabId ? extensionPathParam : extensionPath,
          },
          "*"
        );
      }

      console.log(userData);
      if (!userData?.user?.emailVerified) {
        setIsEmailVerified(false);
      }
    });
  };

  const getUserHistory = () => {
    withLoading(async () => {
      const userHistory = await ApiManager.getUserHistory();
      setHistory(userHistory.history);
    });
  };

  function CustomTabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        // id={`simple-tabpanel-${index}`}
        className="tabPanelContainer"
        // aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const renderHistoryItem = (item: UserSummaryHistory) => {
    return (
      <div className="summaryHistoryItem" onClick={() => onSummaryClick(item)}>
        <span className="summaryHistoryTitle">{item.title}</span>
        <span className="summaryDate">{formatDate(item.date)}</span>
      </div>
    );
  };

  const onSendResetLink = () => {
    if (!userData?.email) return;
    withResetLink(async () => {
      const forgotPassword = await ApiManager.forgotPassword({
        email: userData?.email,
      });
      if (forgotPassword.success) {
        setIsSendEmail(true);
      }

      if (forgotPassword.error) {
        setError(forgotPassword.message);
        setSnackType("error");
        setSnackOpen(true);
      }
    });
  };

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        // id={`full-width-tabpanel-${index}`}
        // aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <div className="history-list">{children}</div>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const handleSnackClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handlerResentConfirmEmail = (email: string) => {
    withLoading(async () => {
      const resentVerifyEmail = await ApiManager.resentVerifyEmail({
        email: email,
      });

      if (resentVerifyEmail.success) {
        setIsMailSended(true);
      }
    });
  };

  const checkEmailVerification = () => {
    if (isMailSended) return true;
    else
      return (
        <div
          className={`email-verify-warning ${
            isEmailVerified ? "email-verify-hide" : "email-verify-show"
          } `}
        >
          <Alert severity="error" style={{ width: "100%" }}>
            Please verify your email address.{" "}
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                if (userData?.email) {
                  handlerResentConfirmEmail(userData.email);
                }
              }}
            >
              Click here
            </Link>{" "}
            to resend verification email.
          </Alert>
        </div>
      );
  };

  return (
    <div className="container myAccountContainer">
      {checkEmailVerification()}
      <div className="myAccountContent">
        <div className="userInfo">
          {/* <img
            src={require("../../assets/images/seko.jpeg")}
            alt="User Profile"
            className="userImage"
          /> */}

          <div className="userName">
            Hello,
            <div className="userNameBold">{userData?.email.split("@")[0]}.</div>
          </div>

          {/* <div className="userInformationRow">
              <span className="userCredits">
                You have{" "}
                <span style={{ fontWeight: 600, color: "#4e617e" }}>200</span>{" "}
                credits
              </span>
              <button className="creditsButton">Get Credits</button>
            </div> */}
        </div>
        <div className="tabLayoutContainer">
          <div className="tabsContainer">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab
                style={{
                  fontFamily: "Exo 2",
                }}
                label="Summary History"
                {...a11yProps(0)}
              />
              <Tab label="Settings" {...a11yProps(1)} />
            </Tabs>
          </div>

          <TabPanel value={value} index={0}>
            {/* <div className="historyList"> */}
            <List
              data={history?.reverse()}
              loading={loading}
              renderItem={renderHistoryItem}
            />

            {/* </div> */}
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="settingsItem">
              <div className="settingsItemTitleContainer">
                <span className="settingsItemTitle">Change Password</span>
                <span className="settingsItemDescription">
                  We'll send you an email with a link to change your password
                </span>
              </div>
              {isSendEmail ? (
                <span className="settingsItemActionDescription">
                  Reset link was sent, Please check your e-mail.
                </span>
              ) : (
                <LoadingButton
                  variant="contained"
                  style={{
                    width: "200px",
                    fontSize: "12px",
                    height: "40px",
                    marginTop: 0,
                  }}
                  loading={resetLinkLoading}
                  onClick={onSendResetLink}
                >
                  SEND RESET LINK
                </LoadingButton>
              )}
            </div>
          </TabPanel>
        </div>
      </div>
      <div></div>
      {extensionPath ? (
        <div className="auth-overlay">
          <div className="auth_success_container">
            <div className="auth_header_container">
              <PiCheckFatFill className="auth_icon" />
              <div className="auth_header">Authorization successful</div>
            </div>
            <div className="auth_content">
              You can start using SummaryAI by clicking on the icon that appears
              after any text you select on a web page, or by selecting it from
              the context menu that opens with a right-click on your mouse.
            </div>
            <div className="auth_images_container">
              <img
                alt="hint-1"
                src={require("../../assets/images/hint-1.png")}
              />
              <img
                alt="hint-2"
                src={require("../../assets/images/hint-2.png")}
              />
            </div>
            <div
              className="auth_button"
              onClick={() => {
                setExtensionPath("");
              }}
            >
              ALRIGHT
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClick}
      >
        <BottomAlert
          onClose={handleSnackClose}
          severity={snackType}
          sx={{
            width: "40%",
            "& .MuiAlert-icon": {
              fontSize: "25px",
              flexShrink: 0,
            },
            "& .MuiAlert-message": {
              fontSize: "16px",
            },
            "& .MuiAlert-action": {
              "& button": {
                flexShrink: 0,
                width: "100%",
                marginRight: "20px",
              },
            },
          }}
        >
          {error ? error : "message"}
        </BottomAlert>
      </Snackbar>
    </div>
  );
};

export default MyAccount;
