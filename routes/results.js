const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get('/:id/most_recent', (req, res) => {

    // The userId is used for the navbar login name
    const userId = req.session.user_id;
    console.log("userrrrr",userId)
    // The tesTakerId is taken from the req params and then queried in the database
    // This way any user can see the most recent score from any other user
    const testTakerId = req.params.id;
   // console.log("testttttt",testTakerId)
    const templateVars = {};
    if(userId) {
       db.query("SELECT * FROM users WHERE id = $1", [userId])
      .then((usersName) => {
        templateVars['name'] = usersName.rows[0].name;
      })
    } else {
      templateVars['name'] = undefined;
    }

    const query = `
    SELECT attempts.score, quizzes.title, users.name, attempts.date_attempted FROM attempts
    JOIN quizzes on quizzes.id = attempts.quiz_id
    JOIN users on users.id = attempts.user_id
    WHERE attempts.user_id = $1 ORDER BY date_attempted DESC LIMIT 1 ;`

    console.log("query",query);
    return db.query(query, [testTakerId])
    .then((data) => {
       console.log('all data rows: ', data.rows);
       const quizInfo = data.rows[0];
      templateVars.score = quizInfo.score;
      templateVars.title = quizInfo.title;
      templateVars.quizTakerName = quizInfo.name;
      return res.render("recent-result", templateVars);

    })
    .catch((err) => {
      res.send(`catch block entered ${err.message}`);
    })

  });


  return router;
};
