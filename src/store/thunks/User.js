import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios";

const confirmEmail = createAsyncThunk("user/confirmEmail", async (token) => {
  const headers = { "Content-Type": "application/json" };
  const response = await axios
    .get(`/auth/confirmEmail/${encodeURIComponent(token)}`, { headers })
    .then((response) => response)
    .catch((error) => Promise.reject(error.response.data.message));

  return response;
});

const resentConfirmEmail = createAsyncThunk(
  "user/resentConfirmEmail",
  async (data) => {
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .post("/auth/resentConfirmEmail", JSON.stringify(data), { headers })
      .then((response) => response)
      .catch((error) => Promise.reject(error.response.data.message));

    return response;
  }
);

const forgotPassword = createAsyncThunk("user/forgotPassword", async (data) => {
  const headers = { "Content-Type": "application/json" };

  const response = await axios
    .post("/auth/forgotPassword", JSON.stringify(data), { headers })
    .then((response) => response)
    .catch((error) => Promise.reject(error.response.data.message));

  return response;
});

const verifyForgotPasswordToken = createAsyncThunk(
  "user/verifyForgotPasswordToken",
  async (token) => {
    const headers = { "Content-Type": "application/json" };

    const response = await axios
      .post(`/auth/verifyForgotPasswordToken/${encodeURIComponent(token)}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => Promise.reject(error.response.data.message));

    return response;
  }
);

const resetPassword = createAsyncThunk("user/resetPassword", async (data) => {
  const headers = { "Content-Type": "application/json" };

  const response = await axios
    .patch(
      `/auth/resetPassword/${encodeURIComponent(data.token)}`,
      JSON.stringify(data.values),
      { headers }
    )
    .then((response) => response)
    .catch((error) => Promise.reject(error.response.data.message));

  return response;
});

const account = createAsyncThunk("user/account", async () => {
  const headers = { "Content-Type": "application/json" };

  const response = await axios
    .get("/users/account", { headers })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response && err.response.status) {
        return Promise.reject({
          status: err.response.status,
          message: err.response.data.message,
        });
      } else {
        return Promise.reject({
          status: 500,
          message: "Internal Server Error",
        });
      }
    });

  return response;
});

const updatePassword = createAsyncThunk("user/updatePassword", async (data) => {
  const headers = { "Content-Type": "application/json" };

  const response = await axios
    .patch("/users/updatePassword", JSON.stringify(data), { headers })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response && err.response.status) {
        return Promise.reject({
          status: err.response.status,
          message: err.response.data.message,
        });
      } else {
        return Promise.reject({
          status: 500,
          message: "Internal Server Error",
        });
      }
    });

  return response;
});

export {
  confirmEmail,
  resentConfirmEmail,
  forgotPassword,
  verifyForgotPasswordToken,
  resetPassword,
  account,
  updatePassword,
};
