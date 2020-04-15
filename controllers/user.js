module.exports.getDashboard = (req, res) => {
  res.render("dashboard", req.user);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect("/login");
};
