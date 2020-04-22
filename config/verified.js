module.exports.isVerified = (req, res, next) => {
  if (req.user.verified) {
    next();
  } else {
    req.logout();
    res.render("unverified");
  }
};
