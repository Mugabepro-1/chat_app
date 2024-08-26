const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    isAdmin: {
      type: Boolean
    },
    status: {
         type: String,
          default: 'offline' },
  },
  { timestamps: true }
);


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel