const express = require("express");
const Router = express.Router();
const indexController = require("../controllers/index");

Router.get("/", indexController.getHome);

module.exports = Router;
