const User = require("../models/user");
const { smtpTransport, Mail } = require("../config/emailClient");

module.exports.getHome = (req, res) => {
  res.render("index");
};

module.exports.getRegisterPage = (req, res) => {
  res.render("register");
};

module.exports.registerUser = async (req, res) => {
  const { username, batch, email, bio } = req.body;
  const image = [...req.file.buffer];

  try {
    let newUser = new User({ name: username, batch, bio, email, image });
    let mail = new Mail(email, "<b>HELLO</b>");
    await newUser.save();
    await smtpTransport.sendMail(mail);
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
};
