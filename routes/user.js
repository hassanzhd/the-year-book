const express = require("express");
const Router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const userController = require("../controllers/user");

Router.get("/dashboard", ensureAuthenticated, userController.getDashboard);
Router.get("/logout", ensureAuthenticated, userController.logoutUser);

module.exports = Router;
