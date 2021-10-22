const express = require('express');
const router = express.Router();

const { getAllQuizzes,getQuizById,createNewQuestions,createNewQuiz } = require('./../db/quizQueries.js');

const quizRouters = (db) => {



  router.get('/',(req,res) =>{
    getAllQuizzes(db)
    .then((quizzes) =>{
      console.log(quizzes)
      return res.json(quizzes)
    })
  })



  router.get('/new',(req,res) =>{
   res.render("test_new_quiz")


  })

  router.get('/:id',(req,res) =>{
    getQuizById(db,req.params.id)
    .then((quiz) =>{
      return res.json(quiz)
    })
  })

  router.post('/',(req,res) =>{
    // console.log(req.body)
    // res.send("ok");
    const obj={};
   createNewQuiz(db,obj)
   .then((data) =>{
    //loop through user questions and run createnewquestion for every question

   })
   })

return router;

}
module.exports = quizRouters;
