const express = require("express");
const Router = express.Router();
const indexController = require("../controllers/index");
const multer = require("multer");

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

Router.get("/", indexController.getHome);
Router.get("/register", indexController.getRegisterPage);
Router.post("/register", upload.single("image"), indexController.registerUser);

module.exports = Router;
