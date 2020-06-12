const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const ErrorHandler = require("../common/errorHandler");

const userSchema = new Schema({
  fullName: { type: String, required: true },
  profileImage: { type: String },
  profileImageMimeType: { type: String },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /\S+@\S+\.\S+/,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new ErrorHandler(400, "Email already exist."));
  } else {
    next(error);
  }
});

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(bcrypt.compareSync(plaintext, this.password));
};

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

module.exports = mongoose.model("user", userSchema);
