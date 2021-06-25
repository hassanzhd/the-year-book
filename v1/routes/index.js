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
  "/user/:id",
  ensureAuthenticated,
  isVerified,
  indexController.getUser
);
Router.get(
  "/settings",
  ensureAuthenticated,
  isVerified,
  indexController.getSettingPage
);
Router.get(
  "/delete",
  ensureAuthenticated,
  isVerified,
  indexController.getDeletePage
);
Router.delete(
  "/delete/:id",
  ensureAuthenticated,
  isVerified,
  indexController.deleteAccount
);
Router.get("/update", ensureAuthenticated, indexController.getUpdatePage);
Router.get(
  "/changePassword",
  ensureAuthenticated,
  isVerified,
  indexController.getChangePasswordPage
);
Router.put(
  "/changePassword/:id",
  ensureAuthenticated,
  isVerified,
  indexController.changePassword
);
Router.get(
  "/updateInfo",
  ensureAuthenticated,
  isVerified,
  indexController.getUpdateUserPage
);
Router.put(
  "/updateInfo/:id",
  ensureAuthenticated,
  isVerified,
  upload.single("image"),
  indexController.updateUser
);

Router.get("/logout", indexController.logoutUser);

module.exports = Router;
