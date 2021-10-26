const express = require('express');
const router = express.Router();

const { getAllQuizzes, getQuizById, createNewQuestions, createNewQuiz } = require('./../db/quizQueries.js');

const quizRouters = (db) => {


  router.get('/', (req, res) => {
    const userId = req.session.user_id;

    if (userId) {
      return db.query("SELECT * FROM users  WHERE users.id = $1 ", [userId])
        .then((loginData) => {
          getAllQuizzes(db)
            .then((quizzes) => {
              console.log(quizzes)
              res.render("quizzes", { data: quizzes, name: loginData.rows[0].name })
            })
        }).catch((err) => {
          console.log(err.message);
        })
    }
  })


  router.get('/new', (req, res) => {
    const userId = req.session.user_id;

    if (userId) {
      return db.query("SELECT * FROM users  WHERE users.id = $1 ", [userId])
        .then((loginData) => {
          res.render("create", { name: loginData.rows[0].name });
        }).catch((err) => {
          console.log(err.message);
        })
    }
  })

  //

  router.get('/:id', (req, res) => {
    const userId = req.session.user_id
    if(userId) {
      return db.query("SELECT * FROM users WHERE id = $1", [userId])
      .then((data) => {
        console.log('data rows: ', data.rows[0].name);
        const templateVars = {name: data.rows[0].name};
        res.render("take-quiz", templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      })
    } else {
      res.send("you must be logged in to create a page");
    }
  });


  router.post('/', (req, res) => {
    const { quizTitle, isPrivate, questions } = req.body;
    const userId = req.session.user_id;
    if (userId) {
      db.query("SELECT * FROM users WHERE users.id = $1 ", [userId])
        .then(async (loginData) => {
          //res.render("create", { name: loginData.rows[0].name });
          createNewQuiz(db, userId, quizTitle, isPrivate).then((quiz) => {
            const { id } = quiz;

            questions.forEach((question) => {
              createNewQuestions(db, { quiz_id: id, ...question })
            });
          });
        });
        // Return response to ajax with 201 statuscode;
       res.redirect("/");
       // return res.send({ true: true });
      }

  })




  router.post('/:id', (req, res) => {

  })

  return router;

}
module.exports = quizRouters;
