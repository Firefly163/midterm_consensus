"use strict";

require("dotenv").config();

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
const morgan      = require("morgan");
const knexLogger  = require("knex-logger");
const secrets     = require("./secrets.js");
const dbfunctions = require("./library/db-functions.js")(knex);
const nodemailer  = require("nodemailer");


const transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
        user: secrets.userEmail,
        pass: secrets.emailPassword
    }
});

function makeRandomString() {
  let randomArray = []
  let choices ="qwertyuioplkjhgfdsazxcvbnm1234567890"
  for (let i = 0; i < 6; i ++) {
    let randomchoice = Math.floor(Math.random() * 37);
    randomArray.push(choices[randomchoice]);
  }
  let randomString = randomArray.join("");
  return randomString;
};

async function authenticate (useridCookie) {
  if (!useridCookie) {
    return "not-logged-in";
  }
  let userIdArr = await dbfunctions.getAllUserIds();
  if (!userIdArr.includes(useridCookie)) {
    return "user-doesnt-exist"
  }
  else {
    return "logged-in"
  }
}


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: "expanded"
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.use(cookieSession({
  name: "session",
  keys: ["secret passwords"],
  maxAge: 24 * 60 * 60 * 1000
}))

//--GET ROUTES--

// Home page
app.get("/", async (req, res) => {
  let navButtons;
  let user;
  let auth = await authenticate(req.session.user_id);
  if (auth !== "logged-in") {
    if (auth === "user-doesnt-exist") {
      req.session = null;
    }
    user = "";
    navButtons = ["login", "register"];
  } else {
    navButtons = ["myPolls", "create", "logout"];
    user = await dbfunctions.getUserName(req.session.user_id);
  }
  let templateVars = {navButtons, user};
  res.render("root", templateVars);
});

// Registration page
app.get("/register", async (req, res) => {
  let auth = await authenticate(req.session.user_id);
  if (auth === "logged-in") {
    if (auth === "user-doesnt-exist") {
      req.session = null;
    }
    res.redirect("/");
    return;
  }
  let navButtons = ["login"];
  let user = "";
  let templateVars = {navButtons, user};
  res.render("register", templateVars);
});

// Login page
app.get("/login", (req, res) => {
  res.redirect("/");
});

// User home page
app.get("/poll", async (req, res) => {
  let auth = await authenticate(req.session.user_id);
  if (auth !== "logged-in") {
    if (auth === "user-doesnt-exist") {
      req.session = null;
    }
    let user = "";
    let navButtons = ["login", "register"];
    res.render("not-logged-in", {navButtons, user});
  }
  let user      = await dbfunctions.getUserName(req.session.user_id);
  let userPolls = await dbfunctions.getUserPolls(req.session.user_id);
  let navButtons = ["create", "logout"];
  let data      = await dbfunctions.getChoicesArrS(userPolls.map(elm => elm.id));
  res.render("poll", {polls: userPolls, data: data, navButtons: navButtons, user: user});
});

//Create poll  page
app.get("/poll/create", async (req, res) => {
  let auth = await authenticate(req.session.user_id)
  if (await authenticate(req.session.user_id) !== "logged-in") {
    if (auth === "user-doesnt-exist") {
      req.session = null;
    }
    let navButtons = ["login", "register"];
    let user = "";
    res.render("not-logged-in", {navButtons, user});
  }
  let user = await dbfunctions.getUserName(req.session.user_id);
  let navButtons = ["myPolls", "logout"];
  res.render("poll-new", {navButtons, user});
});

// Take Poll page
app.get("/p/:friend_link", async (req, res) => {
  let navButtons;
  let user;
  let auth = await authenticate(req.session.user_id);
  if (auth !== "logged-in") {
    if (auth === "user-doesnt-exist") {
      req.session = null;
    }
    user = "";
    navButtons = ["login", "register"];
  } else {
    navButtons = ["myPolls", "create", "logout"];
    user = await dbfunctions.getUserName(req.session.user_id);
  }
  let allFriendLinks = await dbfunctions.getAllFriendLinks();
  let friendLink = req.params.friend_link;
  if (!allFriendLinks.includes(friendLink)) {
    res.render("does-not-exist", {navButtons, user});
  }
  let friendLinkFull = `http://localhost:8080/${friendLink}`;
  let adminLink      = await dbfunctions.getAdminLink(friendLink);
  let adminLinkFull  = `http://localhost:8080/poll/${adminLink}`
  let poll_id        = await dbfunctions.getPollId(friendLink);
  let poll_name      = await dbfunctions.getPollName(poll_id);
  let poll_description = await dbfunctions.getPollDescription(poll_id);
  let choicesArr     = await dbfunctions.getChoicesArr(poll_id);
  let templateVars   = {poll_id, poll_name, poll_description, choicesArr, navButtons, user}
  res.render("p-pollid", templateVars);
});

// Admin Poll page
app.get("/poll/:adminLink", async (req, res) => {
  let auth = await authenticate(req.session.user_id);
  if (await authenticate(req.session.user_id) !== "logged-in") {
    if (auth === "user-doesnt-exist") {
      req.session = null;
    }
    let user = "";
    let navButtons = ["login", "register"];
    res.render("not-logged-in", {navButtons, user});
  }
  let navButtons = ["myPolls", "create", "logout"];
  let user       = await dbfunctions.getUserName(req.session.user_id);
  let adminLink  = req.params.adminLink;
  let allAdminLinks = await dbfunctions.getAllAdminLinks();

  if (!allAdminLinks.includes(adminLink)) {
    res.render("does-not-exist", {navButtons, user});
  }
  let poll       = await dbfunctions.getPollByAdmLink(adminLink);
  let friendLink = await dbfunctions.getFriendLink(adminLink);
  if (req.session.user_id !== poll.user_id) {
    res.render("not-yours", {navButtons, user});
  }
  let choices = await dbfunctions.getChoicesArr(poll.id);
  let links   = {friendLink: `http://localhost:8080/p/${friendLink}`, adminLink: `http://localhost:8080/poll/${adminLink}`}
  res.render("poll-pollid", {poll, choices, navButtons, links, user});
});

//--POST ROUTES--

// Login page
app.post("/login", async (req, res) => {
  let allUsers  = await dbfunctions.getUsers();
  let allEmails = [];
  allUsers.forEach(user => allEmails.push(user.email));
  let result = {};
  if (!allEmails.includes(req.body.email)) {
    result.error = "email";
  } else if (!bcrypt.compareSync(req.body.password, await dbfunctions.getUserPassword(req.body.email))) {
    result.error = "password"
  } else {
    req.session.user_id = await dbfunctions.getUserId(req.body.email);
    result.error = "none"
  }
  res.json(result)
});

// Registration page
app.post("/register", async (req, res) => {
  let allUsers = await dbfunctions.getUsers();
  let allEmails = [];
  allUsers.forEach(user => allEmails.push(user.email));
  let result = {};
  if (allEmails.includes(req.body.email)) {
    result.error = "email";
  } else {
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await dbfunctions.insertNewUser(req.body.name, req.body.email, hashedPassword);
    let userID = await dbfunctions.getUserId(req.body.email);
    req.session.user_id = userID;
    result.error = "none";
  }
  res.json(result);
});

// Create Poll page
app.post("/poll/create", async (req, res) => {
  const choiceArray = req.body.choice.map(elm => [elm]);
  for(let i = 0; i < choiceArray.length; i++) {
    choiceArray[i].push(req.body.desc[i]);
  }
  try {
  const adminLink        = makeRandomString();
  const adminLinkFull    = `http://localhost:8080/poll/${adminLink}`;
  const friendLink       = makeRandomString();
  const friendLinkFull   = `http://localhost:8080/${friendLink}`;
  const pollInsertResult = await knex("polls").insert({
    user_id:     req.session.user_id,
    poll_name:   req.body.title,
    description: req.body.description,
    admin_link:  adminLink,
    friend_link: friendLink
  });
  const pollId = await dbfunctions.getPollId(friendLink);
  await Promise.all(choiceArray.map(currentChoice => {
    if (currentChoice) {
      const choiceData = {
        poll_id:     pollId,
        choice:      currentChoice[0],
        description: currentChoice[1],
        points:      0
      }
      return knex("choices").insert(choiceData);
    }
      return Promise.resolve();
  }));

    // Send email to creator with admin and friend links
   const creatorEmail = await dbfunctions.getCreatorEmail(pollId);
   const mailOptions = {
    from:    secrets.userEmail,
    to:      creatorEmail,
    subject: "You have created a poll!",
    html:    `Congratulations on creating a poll. Click
              <a href="${adminLinkFull}">here</a> to manage your poll and see results (when  you get some).
              Here is a link you can send to your friends: <br> ${friendLinkFull}`
  };
  await transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err);
   else
     console.log("Sent confirmation email to creator");
  });
    res.json({adminLink: adminLink});
    } catch (err) {
      console.log(err);
      res.status(404);
    }
});

// Take Poll page
app.post("/poll/:poll_id/answers", async (req, res) => {
  let newPointsObj = req.body;
  let poll_id      = req.params.poll_id;
  let previousPointsObj = await dbfunctions.getCurrentPoints(poll_id);
  for(let i = 0; i < previousPointsObj.length; i ++) {
    let choice_id = previousPointsObj[i].id;
    let updatedPoints = previousPointsObj[i].points + Number(newPointsObj[choice_id]);
    await dbfunctions.updatePoints(choice_id, updatedPoints);
  }
  let previousResponses = await dbfunctions.getCurrentResponses(poll_id);
  let newResponses      = previousResponses + 1;
  await dbfunctions.updateResponses(poll_id, newResponses);
 //Send email to creator when someone answers the poll
   const creatorEmail  = await dbfunctions.getCreatorEmail(poll_id);
   const adminLink     =  await dbfunctions.getAdminLinkFromId(poll_id);
   const adminLinkFull = `http://localhost:8080/poll/${adminLink}`;
   const mailOptions   = {
    from:    secrets.userEmail,
    to:      creatorEmail,
    subject: "Someone took your poll!",
    html:    `One of your friends answered your poll. Log in to Consensus or click
             <a href="${adminLinkFull}">here</a> to see the results!`
  };
  await transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err);
   else
     console.log("Confirmation  email sent to creator");
  })
});

//Delete Poll
app.post("/poll/:adminLink/delete", async (req, res) => {
  let adminLink = req.params.adminLink;
  let poll      = await dbfunctions.getPollByAdmLink(adminLink);
  await dbfunctions.deletePoll(poll.id);
  res.json({});
});

//logout
app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


