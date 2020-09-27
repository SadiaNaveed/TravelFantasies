var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var ToursRouter = require("./routes/api/Tours");
var hotelsRouter = require("./routes/api/Hotels");
var hotelBookingRouter = require("./routes/api/hotelBooking");
var tourCategoryRouter = require("./routes/api/tourCategory");
var placesRouter = require("./routes/api/place");
// var bodyParser = require("body-parser");
// var fs = require("fs");
// var path = require("path");
//
// require("dotenv/config");
var config = require("config");
var app = express();

// var upload = multer({ storage: storage });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/tours", ToursRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/hotelBookings", hotelBookingRouter);
app.use("/api/tourCategory", tourCategoryRouter);
app.use("/api/places", placesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));
module.exports = app;
