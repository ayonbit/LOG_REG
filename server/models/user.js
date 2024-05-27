//dependencies
const mongoose = require("mongoose");

//db user Schema
const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "Please Enter an Email "],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Enter a valid Email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please Enter a Password "],
      minlength: [6, "Password not less than 6 character"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
