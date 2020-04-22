const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { smtpTransport, Mail } = require("../config/emailClient");

let connection = mongoose.connection;

module.exports.getHome = (req, res) => {
  res.render("index");
};

module.exports.getRegisterPage = async (req, res) => {
  let batch = await connection.db.collection("batch").find({}).toArray();
  res.render("register", { batch });
};

module.exports.registerUser = async (req, res) => {
  let { username, password, batch, email, bio } = req.body;

  if (!password) {
    return res.json({ msg: "Password Field is empty" });
  }

  const image = [...req.file.buffer];
  let check;
  try {
    check = await User.findOne({ email });
    if (check) {
      throw new Error("User already exists");
    }
  } catch (error) {
    return res.json({ msg: error.message });
  }

  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    password = hash;

    let verificationHash = crypto.randomBytes(20).toString("hex");

    let newUser = new User({
      username,
      password,
      batch,
      bio,
      email,
      image,
      verificationHash,
      verified: false,
    });

    let mail = new Mail(
      email,
      `Verify your account using: <a href="http://localhost:5000/verify/${verificationHash}">click here</a>`
    );
    await newUser.save();
    await smtpTransport.sendMail(mail);
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }

  res.redirect("/");
};

module.exports.getLoginPage = (req, res) => {
  res.render("login");
};

module.exports.loginUser = (req, res, next) => {
  res.redirect("/dashboard");
};

module.exports.verifyUser = async (req, res) => {
  let hash = req.params.hash;
  let user = await User.findOne({ verificationHash: hash });
  if (user) {
    user.verified = true;
    user.save();
  } else {
    res.json({ msg: "error" });
  }
  res.redirect("/dashboard");
};

module.exports.getDashboard = async (req, res) => {
  let batch = await connection.db.collection("batch").find({}).toArray();
  req.user.image = req.user.image.toString("base64");
  res.render("dashboard", { image: req.user.image, batch });
};

module.exports.getBatch = async (req, res) => {
  let batch, entries;
  try {
    batch = await connection.db.collection("batch").findOne({
      name: parseFloat(req.params.name),
    });
    if (!batch) {
      throw new Error("BATCH NOT FOUND");
    }
  } catch (error) {
    return res.json({ msg: error.message });
  }

  if (batch) {
    try {
      entries = await User.find({ batch: batch.name });
    } catch (error) {}
  }
  req.user.image = req.user.image.toString("base64");
  res.render("batch", {
    image: req.user.image,
    batch: req.params.name,
    entries,
  });
};

module.exports.getUser = async (req, res) => {
  let { username } = req.params;
  let user = await User.findOne({ username });
  user.image = user.image.toString("base64");
  res.render("user", user);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect("/login");
};
