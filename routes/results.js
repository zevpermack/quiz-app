const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get('/:user_id/most_recent', (req, res) => {
    const userId = req.params.user_id;
    const query = `
    SELECT attempts.score, quizzes.title FROM attempts
    JOIN quizzes on quizzes.id = attempts.user_id
    WHERE attempts.user_id = $1 ORDER BY date_attempted DESC;`

    console.log('results route entered');
    console.log(`user_id present ${userId}`);
    return db.query(query, [userId])
    .then((data) => {
      console.log('all data rows: ', data.rows);
      const quizInfo = data.rows[0];
      return res.send(`
      User Score: ${quizInfo.score}
      Test Title: ${quizInfo.title}`
      );
    })
    .catch((err) => {
      res.send(`catch block entered ${err.message}`);
    }
    )

  });

  return router;
};
