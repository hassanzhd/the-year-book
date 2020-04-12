const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

mongoose.connect("mongodb://localhost:27017/mongotest", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

let app = express();
app.use("/", indexRouter);
app.use("/user", userRouter);

module.exports = app;
