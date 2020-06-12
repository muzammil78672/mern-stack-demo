import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3005/api",
  baseURL: "https://quiet-crag-62652.herokuapp.com/api",
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
