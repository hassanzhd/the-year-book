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

module.exports.registerUser = async (req, res, next) => {
  let { username, password, batch, email, bio } = req.body;

  if (!password) {
    next(new Error("Password Field is empty"));
  }

  const image = [...req.file.buffer];
  let check;
  try {
    check = await User.findOne({ email });
    if (check) {
      throw new Error("User already exists with provided email");
    }
  } catch (error) {
    return next(error);
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
    return next(error);
  }

  res.redirect("/");
};

module.exports.getLoginPage = (req, res) => {
  res.render("login");
};

module.exports.loginUser = (req, res, next) => {
  res.redirect("/dashboard");
};

module.exports.verifyUser = async (req, res, next) => {
  let hash = req.params.hash;
  let user = await User.findOne({ verificationHash: hash });
  if (user) {
    user.verified = true;
    user.save();
  } else {
    let error = new Error();
    return next(error);
  }
  res.redirect("/dashboard");
};

module.exports.getDashboard = async (req, res) => {
  let batch = await connection.db.collection("batch").find({}).toArray();
  req.user.image = req.user.image.toString("base64");
  res.render("dashboard", { image: req.user.image, batch });
};

module.exports.getBatch = async (req, res, next) => {
  let batch, entries;
  try {
    batch = await connection.db.collection("batch").findOne({
      name: parseFloat(req.params.name),
    });
    if (!batch) {
      throw new Error("Batch not found. You will be redirected.");
    }
  } catch (error) {
    return next(error);
  }

  if (batch) {
    try {
      entries = await User.find({ batch: batch.name });
    } catch (error) {
      return next(error);
    }
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
  req.user.image = req.user.image.toString("base64");
  res.render("user", {
    username: user.username,
    bio: user.bio,
    batch: user.batch,
    email: user.email,
    image: user.image,
    profileImage: req.user.image,
  });
};

module.exports.getSettingPage = (req, res) => {
  res.render("settings", { image: req.user.image.toString("base64") });
};

module.exports.getDeletePage = (req, res) => {
  res.render("delete", {
    id: req.user.id,
    image: req.user.image.toString("base64"),
  });
};

module.exports.deleteAccount = async (req, res, next) => {
  let id = req.params.id;
  let password = req.body.password;

  try {
    let user = await User.findById(id);
    let flag = await bcrypt.compare(password, user.password);
    if (flag) {
      await user.remove();
      req.logout();
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    return next(error);
  }

  res.render("msg", { msg: "Thank you for using The Year Book." });
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect("/login");
};
