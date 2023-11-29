import ApiMethods from "./ApiMethods";
import ENDPOINTS from "./Endpoints";

// ApiManager is a class that contains all the API calls
// It is a singleton class
// It is used to call the API methods
// You can use this rule to name an api: [HTTP_METHOD][API_NAME]
// [HTTP_METHOD] can be: get, post, put, delete or purpose of the api
// [API_NAME] can be: getAllAppointments, getPatientGetInformation, sendInvitation
// Example: getAllAppointments, getPatientGetInformation, sendInvitation

class ApiManager {
  //Auth
  static login = ({ email, password }: { email: string; password: string }) => {
    const url = ENDPOINTS.POST_LOGIN();
    return ApiMethods.post(url, { email, password });
  };

  static logout = () => {
    const url = ENDPOINTS.POST_LOGOUT();
    return ApiMethods.post(url);
  };

  static signup = ({
    email,
    password,
    passwordConfirm,
  }: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const url = ENDPOINTS.POST_SIGUP();
    return ApiMethods.post(url, { email, password, passwordConfirm });
  };

  static forgotPassword = ({ email }: { email: string }) => {
    const url = ENDPOINTS.POST_FORGOT_PASSWORD();
    return ApiMethods.post(url, { email });
  };
  static resetPassword = ({
    password,
    passwordConfirm,
    token,
  }: {
    password: string;
    passwordConfirm: string;
    token: string;
  }) => {
    const url = ENDPOINTS.POST_RESET_PASSWORD(token);
    return ApiMethods.patch(url, { password, passwordConfirm });
  };

  // User
  static getUserHistory = () => {
    const url = ENDPOINTS.GET_USER_HISTORY();
    return ApiMethods.get(url);
  };
  static getUserAccount = () => {
    const url = ENDPOINTS.GET_USER_ACCOUNT();
    return ApiMethods.get(url);
  };
  static getHistoryById = (historyId: string) => {
    const url = ENDPOINTS.GET_HISTORY_BY_ID(historyId);
    return ApiMethods.get(url);
  };


}

export default ApiManager;
