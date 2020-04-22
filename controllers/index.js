const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { smtpTransport, Mail } = require("../config/emailClient");

module.exports.getHome = (req, res) => {
  res.render("index");
};

module.exports.getRegisterPage = (req, res) => {
  res.render("register");
};

module.exports.registerUser = async (req, res) => {
  let { username, password, batch, email, bio } = req.body;
  const image = [...req.file.buffer];

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
      `Verify your account using: <a href="https://localhost:5000/verify/${verificationHash}">click here</a>`
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

module.exports.getDashboard = async (req, res) => {
  let connection = mongoose.connection;
  let batch = await connection.db.collection("batch").find({}).toArray();
  req.user.image = req.user.image.toString("base64");
  res.render("dashboard", { image: req.user.image, batch });
};

module.exports.getBatch = async (req, res) => {
  let connection = mongoose.connection;
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
