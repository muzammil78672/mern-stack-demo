import Request from "../config/request";
import { setItem, clear } from "../common/helper";

const register = async (data) => {
  try {
    const response = await Request({
      method: "POST",
      url: "/register",
      data,
    });
    return response;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

const login = async (data) => {
  try {
    const response = await Request({
      method: "POST",
      url: "/login",
      data,
    });
    setItem("user", response.data);
    return response;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

const logout = async (data) => {
  try {
    clear();
    return true;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

export { register, login, logout };
