const express = require("express");
const Router = express.Router();
const indexController = require("../controllers/index");
const passport = require("passport");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const { isVerified } = require("../config/verified");
const multer = require("multer");

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

Router.get("/", forwardAuthenticated, indexController.getHome);
Router.get("/login", forwardAuthenticated, indexController.getLoginPage);
Router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  indexController.loginUser
);
Router.get("/register", forwardAuthenticated, indexController.getRegisterPage);
Router.post("/register", upload.single("image"), indexController.registerUser);
Router.get("/verify/:hash", indexController.verifyUser);
Router.get(
  "/dashboard",
  ensureAuthenticated,
  isVerified,
  indexController.getDashboard
);
Router.get(
  "/batch/:name",
  ensureAuthenticated,
  isVerified,
  indexController.getBatch
);
Router.get(
  "/user/:username",
  ensureAuthenticated,
  isVerified,
  indexController.getUser
);
Router.get("/logout", indexController.logoutUser);

module.exports = Router;
