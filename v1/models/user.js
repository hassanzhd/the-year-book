const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    match: /^(k|K)([0-9]{6})(@nu\.edu\.pk)$/,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  verificationHash: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});

let User = mongoose.model("User", userSchema);
module.exports = User;
