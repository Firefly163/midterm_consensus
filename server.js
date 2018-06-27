"use strict";

require('dotenv').config();


const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt      = require("bcrypt");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const dbfunctions = require('./library/db-functions.js')(knex);

const currentUserID = "";
const userAuthenticated = false;

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.use(cookieSession({
  name: "session",
  keys: ["secret passwords"],
  maxAge: 24 * 60 * 60 * 1000
}))

// Home page
app.get("/", (req, res) => {
  res.render("root");
});

// Registration page
app.get("/register", (req, res) => {
  res.render("register");
});

// Login page
app.get("/login", (req, res) => {
  res.render("root");
});

// User home page
app.get("/poll", (req, res) => {
  res.render("poll");
});

// Create Poll page

app.get("/poll/new", (req, res) => {
  res.render("poll-new");
});

// Take Poll page
app.get("/p/poll/:id", (req, res) => {
  res.render("poll-pollid");
});


// Admin Poll page
app.get("/poll/:id", (req, res) => {
  res.render("p-pollid");
});

// Login page
app.post("/login", (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
      res.status(400);
      return
  } else if (bcrypt.compareSync(req.body.password, user.password)) {
    res.redirect("poll");
  }
});

// Registration page
app.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  if (req.body.email === "" || req.body.password === "") {
    res.status(400);
    return
  } else {
//check if user already exists
  dbfunctions.insertNewUser(req.body.name, req.body.email, hashedPassword, function()
    {dbfunctions.getUserId(req.body.email).then(userid => {
      req.session.user_id = userid;
      console.log("session.userid", req.session.user_id)
    })});
  res.redirect("poll");
  }
});

// Take Poll page
app.post("/poll/:id", (req, res) => {
  res.redirect("login");
});

// Admin Poll page
app.post("/poll/:id", (req, res) => {
  res.render("poll_id");
});

//logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

function authenticateUser(callback) {
  if (currentUserID === dbfunctions.getUserId(email)) {
    userAuthenticated = true;
  }
}
