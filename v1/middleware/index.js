module.exports.notFound = (req, res, next) => {
  let error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports.onError = (error, req, res, next) => {
  if (res.statusCode === 404) {
    res.render("404");
  } else {
    console.log(error);
    if (error.message) {
      return res.render("msg", { msg: error.message });
    } else {
      return res.render("msg", {
        msg:
          "Some error occured while processing your request. Sorry for inconvenience",
      });
    }
  }
};
