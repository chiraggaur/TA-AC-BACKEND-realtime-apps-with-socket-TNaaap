const createError = require("http-errors");
const setupSocket = require("./sevices/socket");
const express = require("express");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// DB Connect

mongoose
  .connect("mongodb://127.0.0.1/chatApp")
  .then(() => {
    {
      console.log("DB Connect Successfully ");
    }
  })
  .catch((err) => {
    console.log("DB Connection Failed!", err);
  });

const app = express();
const server = http.createServer(app);
// const io = require('socket.io')(server);

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware

// custom middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 3rd party middlewares
app.use(logger("dev"));
app.use(cookieParser());

// Set up Socket.io
setupSocket(server);

// routing middlewares

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler - 404 error handling  middleware
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

server.listen("3000", () => {
  console.log("server is live at 3k");
});
