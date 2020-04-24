const express = require("express");
const mongoose = require("mongoose");
const ehbs = require("express-handlebars");
const helpers = require("./helpers/handlebars");
const middleware = require("./middleware");
const session = require("express-session");
const indexRouter = require("./routes/index");
const passport = require("passport");
require("dotenv").config();

let app = express();
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: "the_year_book",
});
require("./config/passport")(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.engine(
  "handlebars",
  ehbs({
    helpers,
  })
);
app.set("view engine", "handlebars");

app.use("/", indexRouter);
app.use(middleware.notFound);
app.use(middleware.onError);

module.exports = app;
