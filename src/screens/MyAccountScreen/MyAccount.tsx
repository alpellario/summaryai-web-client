import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "./MyAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import List from "../../components/List/List";
import useLoading from "../../utils/hooks/useLoading";
import ApiManager from "../../api/ApiManager";
import { LoadingButton } from "@mui/lab";
import { setUser } from "../../store/slices/userSlice";

const MyAccount = () => {
  //redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, withLoading } = useLoading();
  const { loading: resetLinkLoading, withLoading: withResetLink } =
    useLoading();

  const { userData } = useSelector((state: RootState) => state.user);

  // state
  const [value, setValue] = React.useState(0);
  const [isSendEmail, setIsSendEmail] = React.useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const onSummaryClick = (summary: UserSummaryHistory) => {
    console.log("summary", summary);
    // navigate("/summarydetails", {
    //   state: { summary },
    // });
    navigate(`/summarydetails/${summary._id}`);
  };

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
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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
    });
  };

  return (
    <div className="container">
      <div className="myAccountContent">
        <div className="userInfo">
          {/* <img
            src={require("../../assets/images/seko.jpeg")}
            alt="User Profile"
            className="userImage"
          /> */}
          <div>
            <span className="userName">
              Hello,{" "}
              <span className="userNameBold">
                {userData?.email.split("@")[0]}.
              </span>
            </span>

            {/* <div className="userInformationRow">
              <span className="userCredits">
                You have{" "}
                <span style={{ fontWeight: 600, color: "#4e617e" }}>200</span>{" "}
                credits
              </span>
              <button className="creditsButton">Get Credits</button>
            </div> */}
          </div>
        </div>
        <Box
          sx={{
            width: "100%",
            height: "450px" /*serkan old 100%*/,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "#A9A9AC" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                style={{
                  fontFamily: "Exo 2",
                }}
                label="Summary History"
                {...a11yProps(0)}
              />
              <Tab label="Settings" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <div className="historyList">
              <List
                data={history?.reverse()}
                loading={loading}
                renderItem={renderHistoryItem}
              />
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
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
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default MyAccount;
