const express = require('express');
const router = express.Router();
const { getAllQuizzes, getQuizById, createNewQuestions, createNewQuiz, getAnswerForQuestion, CreateAttempts } = require('./../db/quizQueries.js');
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
    const userId = req.session.user_id;
    const quizId = req.params.id;
    const templateVars = {};
    if (userId) {
      db.query("SELECT * FROM users WHERE id = $1", [userId])
        .then((data) => {
          console.log('data rows: ', data.rows[0].name);
          templateVars.name = data.rows[0].name;
        })
        .catch((err) => {
          console.log(err.message);
        })
    } else {
      res.send("you must be logged in to create a page");
    }
    getQuizById(db, quizId)
      .then((quizQuestions) => {
        console.log("Quiz Questions", quizQuestions);
        const questions = { question: quizQuestions }
        questions.name = templateVars.name;
        res.render("take-quiz", questions);
      })
  });


  router.post('/', (req, res) => {
    const { quizTitle, isPrivate, questions } = req.body;
    const userId = req.session.user_id;
    if (userId) {
      db.query("SELECT * FROM users WHERE users.id = $1 ", [userId])
        .then(async (loginData) => {
          createNewQuiz(db, userId, quizTitle, isPrivate).then((quiz) => {
            const { id } = quiz;

            questions.forEach((question) => {
              createNewQuestions(db, { quiz_id: id, ...question })
            });
          });
        });

      // Return response to ajax with 201 statuscode;
      return res.send({ true: true });
    }

  })


  router.post('/:id', (req, res) => {
    const userId = req.session.user_id;
    const { userAnswers, value } = req.body;
    const quiz_id = req.params.id;
    console.log("idddd", quiz_id)
    let score = 0;
    getAnswerForQuestion(db, quiz_id)
      .then((quizAnswers) => {
        console.log("quize questions", quizAnswers)
        for (let i = 0; i < quizAnswers.length; i++) {
          console.log("+++++++", quizAnswers[i], userAnswers[i])
          if (quizAnswers[i].answer === userAnswers[i]) {
            score += parseInt(value);
          }
        }
        console.log("score", score);
      })

      .then(() => {
        CreateAttempts(db, quiz_id, userId, score)
          .then((attempts) => {
            //get the userid and return it back to the frontend for ajax to load the post page(results)
            res.send({ userId: attempts.user_id })
          })
      })


  })

  return router;

}
module.exports = quizRouters;
