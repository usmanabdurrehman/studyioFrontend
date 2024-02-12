import axios from "axios";
import Cookies from "js-cookie";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 403) {
      Cookies.remove("token");
    }
  }
);

export default service;
