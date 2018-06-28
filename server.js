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

function authenticateUser(callback) {
  if (currentUserID === dbfunctions.getUserId(email)) {
    userAuthenticated = true;
  }
}

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
app.get("/poll", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/register');
    return;
  }
  let userPolls = await dbfunctions.getUserPolls(req.session.user_id);
  res.render("poll", {polls: userPolls});
});

// Create Poll page

app.get("/poll/new", (req, res) => {
  res.render("poll-new");
});

// Take Poll page
app.get("/p/:poll_id", async (req, res) => {
  // let poll_id = req.params.poll_id;
  let poll_id = 17;
  let poll_name = await dbfunctions.getPollName(poll_id);
  let poll_description = await dbfunctions.getPollDescription(poll_id);
  let choicesArr = await dbfunctions.getChoicesArr(poll_id);

  console.log(poll_description);

  let templateVars = {poll_name, poll_description, choicesArr}

  res.render("p-pollid", templateVars);
});


// Admin Poll page
app.get("/poll/:id", (req, res) => {
  res.render("poll-pollid");
});

// Login page
app.post("/login", async (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res.status(400);
    return
  }
  if (bcrypt.compareSync(req.body.password, await dbfunctions.getUserPassword(req.body.email))) {
    res.status(200);
    console.log("logged in")
  } else {
    res.status(400);
  }
});

// Registration page
app.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  if (req.body.email === "" || req.body.password === "") {
    res.redirect("/poll");
    return
  } else {
//check if user already exists  -----------------------------async/await
  dbfunctions.insertNewUser(req.body.name, req.body.email, hashedPassword, function()
    {dbfunctions.getUserId(req.body.email).then(userid => {
      req.session.user_id = userid;
      console.log("session.userid", req.session.user_id);
      res.redirect("poll");
    })});
}

});

// Take Poll page
app.post("/poll/:id", (req, res) => {
  res.redirect("/login");
});

// Admin Poll page
app.post("/poll/:id", (req, res) => {
  res.render("p-poll");
});

//logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

console.log(`HASHED PWDS
  hi: ${bcrypt.hashSync('hi', 10)}
  hello: ${bcrypt.hashSync('hello', 10)}
  hey: ${bcrypt.hashSync('hey', 10)}`);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


