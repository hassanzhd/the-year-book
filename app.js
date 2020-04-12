const express = require("express");
const indexRoute = require("./routes/index");
const userRouter = require("./routes/user");

let app = express();
app.use("/", indexRoute);
app.use("/user", userRouter);

module.exports = app;
