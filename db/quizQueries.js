
//function to show all public quizzes
const getAllQuizzes = function(db){

  const queryParams =['public'];
  const queryString = `SELECT quizzes.id, quizzes.title,quizzes.date_created, users.name FROM quizzes
                        JOIN users ON users.id = user_id
                        WHERE visibility = $1`;

   return db.query(queryString,queryParams)
   .then((res) =>{
        return res.rows;
   })
   .catch((err) =>{
     console.log(err.message);
   })

}

//function to show a specific quiz
const getQuizById = function(db,id){

  const queryParams =[id];
  const queryString = `SELECT quizzes.title,question_content,choice1,choice2,choice3,choice4 FROM quizzes
                      JOIN questions ON quizzes.id = quiz_id  WHERE quizzes.id = $1 `;
                      console.log('this is the query string:', queryString)
   return db.query(queryString,queryParams)
   .then((res) =>{
        console.log('this is res.rows[0]', res.rows[0]);
        return res.rows;
   })
   .catch((err) =>{
     console.log(err.message);
   })

}

//function to create new quiz
const createNewQuiz = function(db,user_id,quiz_title,visibility){

  const queryParams =[user_id,quiz_title,visibility];
  const queryString = `INSERT INTO quizzes (user_id,title,visibility) VALUES ($1,$2,$3) returning *`;
   return db.query(queryString,queryParams)
   .then((res) =>{
        return res.rows[0];
   })
   .catch((err) =>{
     console.log(err.message);
   });

}

//function to create new questions of a quiz
const createNewQuestions = function(db, question){

  const queryParams =[question.quiz_id,question.question_content,question.choice1,question.choice2,question.choice3,question.choice4, question.answer];
  const queryString = `INSERT INTO questions (quiz_id,question_content,choice1,choice2,choice3,choice4,answer) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *`;
   return db.query(queryString,queryParams)
   .then((res) =>{
        return res.rows[0];
   })
   .catch((err) =>{
     console.log(err.message);
   })

}






module.exports = { getAllQuizzes, getQuizById, createNewQuiz, createNewQuestions} ;
