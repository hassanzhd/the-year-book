const User = require("../models/user");
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
      `Verify your account using: <a href="https://localhost:5000/verify/${verificationHash}"></a>`
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
  res.redirect("/user/dashboard");
};
