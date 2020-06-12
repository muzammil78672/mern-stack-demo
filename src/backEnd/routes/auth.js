const authController = require("../controller/authController");

module.exports = (router) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
};
