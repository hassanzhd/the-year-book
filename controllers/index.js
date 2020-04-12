let User = require("../models/user");

module.exports.getHome = (req, res) => {
  res.send("HELLO WORLD");
};
