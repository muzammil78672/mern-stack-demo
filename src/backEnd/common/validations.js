const Joi = require("@hapi/joi");

module.exports = {
  registrationRequest: (userObj) => {
    const schema = Joi.object().keys({
      email: Joi.string().trim().required().email(),
      password: Joi.string().min(3).required(),
      fullName: Joi.string().trim().required(),
      dob: Joi.date().less("now").required(),
      profileImage: Joi.string().base64().allow(null, ""),
      profileImageMimeType: Joi.string().allow(null, ""),
    });
    return schema.validate(userObj);
  },
  loginRequest: (userObj) => {
    const schema = Joi.object().keys({
      email: Joi.string().trim().required().email(),
      password: Joi.string().min(3).required(),
    });
    return schema.validate(userObj);
  },
};
