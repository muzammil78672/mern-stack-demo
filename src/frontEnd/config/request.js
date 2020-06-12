import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3005/api",
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  }
);

export default instance;
