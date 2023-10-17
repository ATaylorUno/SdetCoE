import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json"
  }
});

const getLocalStorage = () => {
  const auth = localStorage.getItem("user");
  if (!auth) return null;

  return JSON.parse(auth);
};

instance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage()?.accessToken;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
