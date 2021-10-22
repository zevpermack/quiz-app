const express = require('express');
const router = express.Router();

const { getAllQuizzes,getQuizById } = require('./../db/quizQueries.js');

const quizRouters = (db) => {



  router.get('/',(req,res) =>{
    getAllQuizzes(db)
    .then((quizzes) =>{
      return res.json(quizzes)
    })
  })

  router.get('/:id',(req,res) =>{
    getQuizById(db,req.params.id)
    .then((quiz) =>{
      return res.json(quiz)
    })
  })
return router;

}
module.exports = quizRouters;
