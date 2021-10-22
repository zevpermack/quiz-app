const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get('/new', (req, res) => {
    console.log('route enteeered');
    const userId = req.session.user_id
    if(userId) {
      return db.query("SELECT * FROM users WHERE id = $1", [userId])
      .then((data) => {
        console.log('data rows: ', data.rows[0].name);
        const templateVars = {name: data.rows[0].name};
        res.render("create", templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      })
    } else {
      res.send("you must be logged in to create a page");
    }

  });

  return router;
};
