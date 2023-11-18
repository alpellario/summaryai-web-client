// Description: This file contains all the endpoints for the API
// You can use this rule to name an endpoint: [HTTP METHOD]_[ACTION]
// [HTTP METHOD] can be GET, POST, PUT, DELETE
// [ACTION] can be the action that the endpoint does
// Example: GET_ALL_APPOINTMENTS, POST_OFFER

const ENDPOINTS = {
  // Auth
  POST_LOGIN: () => "/auth/login",
  POST_SIGUP: () => "/auth/signup",
  POST_LOGOUT: () => "/auth/logout",
  POST_FORGOT_PASSWORD: () => "/auth/forgotPassword",
  POST_RESET_PASSWORD: (token: string) => `/auth/resetPassword/${token}`,

  // User
  GET_USER_HISTORY: () => "/users/history",
  GET_HISTORY_BY_ID: (historyId: string) => `/users/getHistoryById/${historyId}`,
  GET_USER_ACCOUNT: () => "/users/account",
};

export default ENDPOINTS;
