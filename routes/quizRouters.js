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

  router.get('/:id', (req, res) => {
    getQuizById(db, req.params.id)
      .then((quiz) => {
        return res.json(quiz)
      })
  })

  router.post('/', (req, res) => {
    console.log(req.body);
  })

  router.post('/:id', (req, res) => {

  })

  return router;

}
module.exports = quizRouters;
