// Description: This file contains all the endpoints for the API
// You can use this rule to name an endpoint: [HTTP METHOD]_[ACTION]
// [HTTP METHOD] can be GET, POST, PUT, DELETE
// [ACTION] can be the action that the endpoint does
// Example: GET_ALL_APPOINTMENTS, POST_OFFER

const ENDPOINTS = {
  // Auth
  GET_VERIFY_EMAIL: (token: string) => `/auth/verifyEmail/${token}`,
  POST_RESENT_VERIFY_EMAIL: () => "/auth/resentVerifyEmail",
  POST_LOGIN: () => "/auth/login",
  POST_SIGUP: () => "/auth/signup",
  POST_LOGOUT: () => "/auth/logout",
  POST_FORGOT_PASSWORD: () => "/auth/forgotPassword",
  POST_VERIFY_FORGOT_PASSWORD_TOKEN: (token: string) => `/auth/verifyForgotPasswordToken/${token}`,	
  POST_RESET_PASSWORD: (token: string) => `/auth/resetPassword/${token}`,

  // User
  GET_USER_HISTORY: () => "/users/history",
  GET_HISTORY_BY_ID: (historyId: string) => `/users/getHistoryById/${historyId}`,
  GET_USER_ACCOUNT: () => "/users/account",
  POST_USER_CONTACT: () => "/users/contact",
};

export default ENDPOINTS;
