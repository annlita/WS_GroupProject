// Importing third-party packages
let createError = require("http-errors"); // Package for creating HTTP errors
let express = require("express"); // Express.js framework for building web applications
let path = require("path"); // Node.js module for working with file paths
let cookieParser = require("cookie-parser"); // Middleware for parsing cookies
let logger = require("morgan"); // Logging middleware for HTTP requests

let app = express();
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// create a user model instance
let userModel = require('../models/user');
let User = userModel.User;

// Configuring MongoDB
let mongoose = require("mongoose"); // MongoDB ODM (Object-Document Mapper)
let DB = require("./db"); // Custom module for MongoDB URI

// Pointing mongoose to the MongoDB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB");
});

// Set-up Express-Session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));
// initialize flash-connect
app.use(flash());
// implement a user authentication
passport.use(User.createStrategy());
// Serialize and Deserialize user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
// initialize the passport
app.use(passport.initialize());
app.use(passport.session());

// Importing route modules
let indexRouter = require('../routes/index'); // Routes for the root path (localhost:3000)
let usersRouter = require('../routes/users'); // Routes for user-related paths (localhost:3000/users)
let eventRouter = require('../routes/event'); // Routes for course-related paths (localhost:3000/course-list)



// Setting up the view engine
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Middleware setup
app.use(logger("dev")); // Logging HTTP requests in development mode
app.use(express.json()); // Parsing JSON requests
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded requests
app.use(cookieParser()); // Parsing cookies
app.use(express.static(path.join(__dirname, "../../public"))); // Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../../node_modules"))); // Serving static files from the 'node_modules' directory
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes setup
app.use('/', indexRouter); // Handling requests to the root path (localhost:3000)
app.use('/users', usersRouter); // Handling requests to user-related paths (localhost:3000/users)
app.use('/event-list', eventRouter); // Handling requests to course-related paths (localhost:3000/course-list)

// Catching 404 errors and forwarding to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, providing error information in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
  });
});

// Exporting the configured Express application
module.exports = app;
