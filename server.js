// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

db.connect();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource

const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const quizRoutes = require("./routes/quizRouters");
const resultsRoutes = require("./routes/results");
//const quizRoutes = require("./routes/quizzes");

const { DataRowMessage } = require("pg-protocol/dist/messages");
// Mount all resource routes

app.use("/api/users", usersRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/quizzes", quizRoutes(db));
app.use("/results", resultsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/", (req, res) => {
//   const userId = req.session.user_id;
//   console.log('REQ.SESSION: ', req.session)
//   console.log('USER ID: ', userId);
//   if(userId) {
//     return db.query("SELECT * FROM users  WHERE users.id = $1 ", [userId])
//     .then((data) => {
//        console.log('data rows: ', data.rows[0].name);
//        const templateVars = {name: data.rows[0].name};
//       res.render("index", templateVars);

//     })
//     .catch((err) => {
//       console.log(err.message);
//     })
//   }
//    res.render("index", {name: undefined} );
// });

app.get("/", (req, res) => {
  const userId = req.session.user_id;
  // console.log('REQ.SESSION: ', req.session)
  // console.log('USER ID: ', userId);
  if(userId) {
    return db.query("SELECT * FROM users  WHERE users.id = $1 ", [userId])
    .then((loginData) => {
      /// /  console.log('data rows: ', data.rows[0].name);
       // const templateVars = {name: data.rows[0].name};
       // res.render("index", templateVars);

        return db.query(`SELECT quizzes.id, quizzes.title,quizzes.date_created,users.name FROM quizzes JOIN  users ON users.id = user_id  WHERE visibility = $1 ORDER BY date_created DESC LIMIT 3`,['public'])
         .then((quizData) => {
           console.log(quizData.rows);
           res.render("index",{ data: quizData.rows, name: loginData.rows[0].name });
         })
    })
    .catch((err) => {
      console.log(err.message);
    })
  }
   res.render("index", {name: undefined} );
});

// app.get("/", (req, res) => {
//   return db.query("SELECT quizzes.title,users.name FROM quizzes JOIN  users ON users.id = user_id LIMIT 3")
//   .then((data) => {

//     // return res.json(data.rows);
//     res.render("index.ejs",{ data:data.rows });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   })
// })



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// module.exports = db
