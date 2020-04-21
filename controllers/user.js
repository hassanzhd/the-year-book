const mongoose = require("mongoose");

module.exports.getDashboard = async (req, res) => {
  req.user.image = req.user.image.toString("base64");
  let connection = mongoose.connection;
  let batch = await connection.db.collection("batch").find({}).toArray();
  res.render("dashboard", { image: req.user.image, batch });
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect("/login");
};
