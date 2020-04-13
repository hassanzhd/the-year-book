let User = require("../models/user");

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
    await newUser.save();
  } catch (error) {
    console.log(error);
  }

  res.redirect("/");
};
