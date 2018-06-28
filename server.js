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
const morgan      = require("morgan");
const knexLogger  = require("knex-logger");
const dbfunctions = require("./library/db-functions.js")(knex);



const currentUserID = "";
const userAuthenticated = false;

function authenticateUser(callback) {
  if (currentUserID === dbfunctions.getUserId(email)) {
    userAuthenticated = true;
  }
}

 function makeRandomString() {
  let randomArray = []
  let choices ="qwertyuioplkjhgfdsazxcvbnm1234567890"
  for (let i = 0; i < 6; i ++) {
    let randomchoice = Math.floor(Math.random() * 37);
    randomArray.push(choices[randomchoice]);
  }
  let randomString = randomArray.join("");
  return randomString;
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
  let navButtons;
  if (!req.session.user_id) {
    navButtons = ["login", "register"];
    console.log("logged out")
  } else {
    navButtons = ["myPolls", "create", "logout"];
    console.log("logged in")
  }
  let templateVars = {navButtons};
  res.render("root", templateVars);
});

// Registration page
app.get("/register", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/");
    return;
  }
  let navButtons = ["login"];
  let templateVars = {navButtons};
  res.render("register", templateVars);
});

// Login page
app.get("/login", (req, res) => {
  res.redirect("/");
});

// User home page
app.get("/poll", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/register');
    return;
  }
  let userPolls = await dbfunctions.getUserPolls(req.session.user_id);
  let navButtons = ["create", "logout"];
  res.render("poll", {polls: userPolls, navButtons: navButtons});
});

app.get("/poll/new", (req, res) => {
  if (!req.session.userid) {
    res.redirect("/")
  }
  let navButtons = ["myPolls", "logout"];
  res.render("poll-new", {navButtons});
});

// Take Poll page
app.get("/p/:friend_link", async (req, res) => {
  let navButtons;
  if (!req.session.user_id) {
    navButtons = ["login", "register"];
  } else {
    navButtons = ["myPolls", "create", "logout"]
  }
  let friend_link = req.params.friend_link;
  let poll_id = await dbfunctions.getPollId(friend_link);
  let poll_name = await dbfunctions.getPollName(poll_id);
  let poll_description = await dbfunctions.getPollDescription(poll_id);
  let choicesArr = await dbfunctions.getChoicesArr(poll_id);

  let templateVars = {poll_id, poll_name, poll_description, choicesArr, navButtons}

  res.render("p-pollid", templateVars);
});


// Admin Poll page
app.get("/poll/:adminLink", async (req, res) => {
  let navButtons = ["home", "create", "logout"];
  let adminLink = req.params.adminLink;
  let poll = await dbfunctions.getPollByAdmLink(adminLink);
  let choices = await dbfunctions.getChoicesArr(poll.id);
  res.render('poll-pollid', {poll, choices, navButtons});
});

//Delete Poll
app.post("/poll/:adminLink", async (req, res) => {
  let adminLink = req.params.adminLink;
  let poll = await dbfunctions.getPollByAdmLink(adminLink);
  await dbfunctions.deletePoll(poll.id);
  res.redirect('/poll');
});

// Login page
app.post("/login", async (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res.status(400);
    return
  }
  if (bcrypt.compareSync(req.body.password,
    await dbfunctions.getUserPassword(req.body.email))) {
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
  dbfunctions.insertNewUser (req.body.name, req.body.email, hashedPassword, function()
    {dbfunctions.getUserId(req.body.email).then(userid => {
      req.session.user_id = userid;
      console.log("session.userid", req.session.user_id);
      res.redirect("poll");
    })});
}
});

// Create Poll page
app.post("/poll/new", async (req, res) => {
  let choiceNum = "";
  const choiceArray = [req.body.choice1, req.body.choice2, req.body.choice3, req.body.choice4, req.body.choice5, req.body.choice6]
    try {
    const adminLink = makeRandomString();
    const friendLink =  makeRandomString();
    const pollInsertResult = await knex("polls").insert({
      user_id: req.session.user_id,
      poll_name: req.body.title,
      description: req.body.description,
      admin_link: adminLink,
      friend_link: friendLink
    });
    const pollId = await dbfunctions.getPollId(req.body.title);
    await Promise.all(choiceArray.map( currentChoice => {
      if (currentChoice) {
        const choiceData = {
          poll_id: pollId,
          choice: currentChoice,
          rank: 0
        }
        return knex("choices").insert(choiceData);
      }
        return Promise.resolve()
    }));
    res.render("poll-new");
    } catch (err) {
      console.error(err)
      res.status(404);
    }
  })

// Take Poll page
app.post("/poll/:poll_id/answers", async (req, res) => {
  let newPointsObj = req.body;
  let poll_id = req.params.poll_id;
  let previousPointsObj = await dbfunctions.getCurrentPoints(poll_id);
  for(let i = 0; i < previousPointsObj.length; i ++) {
    let choice_id = previousPointsObj[i].id;
    let updatedPoints = previousPointsObj[i].points + Number(newPointsObj[choice_id]);
    await dbfunctions.updatePoints(choice_id, updatedPoints);
  }
  let previousResponses = await dbfunctions.getCurrentResponses(poll_id);
  let newResponses = previousResponses + 1;
  await dbfunctions.updateResponses(poll_id, newResponses);

});


//logout
app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


