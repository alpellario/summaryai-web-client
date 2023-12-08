import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "../store";
import { clearUser } from "../store/slices/userSlice";


const baseURL = process.env.REACT_APP_ENV === 'production' ? "https://summaryai.io" : 'http://localhost:3001';


// header
const headers = {
  "Content-type": "application/json",
  Accept: "application/json",
};

class ApiMethods {
  static createInstance(config: AxiosRequestConfig): AxiosInstance {
    // create instance
    const instance = axios.create(config);
    // interceptor
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }

  static errorHandling = (error: any): ErrorObject => {
    const { data, config } = error.response;
    const { error: serviceError, message, stack, status } = data;
    const { url, method } = config;

    const errorDetails = {
      url,
      method,
      status,
      timestamp: new Date().toISOString(),
      message,
      error: serviceError,
      success: false,
    };

    // it means jwt token is expired
    if (status === 403) {
      // redirect to login page
      window.location.href = "/";
      // clear user data
      store.dispatch(clearUser());
    }

    return errorDetails;
  };

  static apiRequest = (
    method: AxiosRequestConfig["method"],
    url: AxiosRequestConfig["url"],
    data?: AxiosRequestConfig["data"]
  ) => {
    // config for axios
    const config: AxiosRequestConfig = {
      url,
      method,
      headers,
      baseURL,
      data,
      timeout: 7000,
      withCredentials: true,
    };

    // create instance
    const instance = ApiMethods.createInstance(config);
    const request = instance.request(config);

    return request
      .then((res) => ({ ...res.data, success: true }))
      .catch((err) => this.errorHandling(err));
  };

  static get(url: AxiosRequestConfig["url"]) {
    return this.apiRequest("get", url);
  }

  static post = (
    url: AxiosRequestConfig["url"],
    data?: AxiosRequestConfig["data"]
  ) => {
    return this.apiRequest("post", url, data);
  };

  static patch = (
    url: AxiosRequestConfig["url"],
    data?: AxiosRequestConfig["data"]
  ) => {
    return this.apiRequest("patch", url, data);
  };

  static put = (
    url: AxiosRequestConfig["url"],
    data?: AxiosRequestConfig["data"]
  ) => {
    return this.apiRequest("put", url, data);
  };

  static delete = (
    url: AxiosRequestConfig["url"],
    data?: AxiosRequestConfig["data"]
  ) => {
    return this.apiRequest("delete", url, data);
  };
}

export default ApiMethods;
