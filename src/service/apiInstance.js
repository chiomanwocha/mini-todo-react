import axios from "axios";
import Cookie from "js-cookie";

const apiInstance = axios.create({
  baseURL: "https://todo-api-12iv.onrender.com/",
});

apiInstance?.interceptors?.request?.use((config) => {
  const auth = Cookie.get("token");
  if (auth) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${auth}`;
  }

  return config;
});

apiInstance?.interceptors?.response?.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiInstance;
