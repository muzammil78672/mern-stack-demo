const User = require("../models/user");
const { registrationRequest, loginRequest } = require("../common/validations");
const ErrorHandler = require("../common/errorHandler");
const { parseBase64 } = require("../common/helper");

module.exports = {
  register: async (req, res, next) => {
    try {
      const reqBody = req.body;
      if (reqBody.dob) {
        reqBody.dob = new Date(reqBody.dob);
      }

      if (reqBody.profileImage) {
        let { data, mimeType } = parseBase64(reqBody.profileImage);
        reqBody.profileImage = data;
        reqBody.profileImageMimeType = mimeType;
      }

      const { value, error } = registrationRequest(reqBody);

      if (error) {
        next(new ErrorHandler(400, error.details[0].message));
      }

      const user = await User.create(value);

      if (user) {
        res.status(200).send({ data: user });
      } else {
        console.log(user);
      }
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { value, error } = loginRequest(req.body);

      if (error) {
        next(new ErrorHandler(400, error.details[0].message));
      }
      const user = await User.findOne({
        email: value.email,
      }).exec();
      if (!user) {
        next(new ErrorHandler(400, "Invalid credentials"));
      }
      user.comparePassword(value.password, (match) => {
        if (!match) {
          next(new ErrorHandler(400, "Invalid credentials"));
        } else {
          res.status(200).send({ data: user });
        }
      });
    } catch (error) {
      next(error);
    }
  },
};
