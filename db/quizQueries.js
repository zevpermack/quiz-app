
//function to show all public quizzes
const getAllQuizzes = function(db){

  const queryParams =['public'];
  const queryString = `SELECT quizzes.title, users.name FROM quizzes
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
                      console.log(queryString)
   return db.query(queryString,queryParams)
   .then((res) =>{
        return res.rows[0];
   })
   .catch((err) =>{
     console.log(err.message);
   })

}

//function to create new quiz
const createNewQuiz = function(db,quiz){

  const queryParams =[id];
  const queryString = `SELECT * FROM quizzes WHERE id = $1 `;
   return db.query(queryString,queryParams)
   .then((res) =>{
        return res.rows[0];
   })
   .catch((err) =>{
     console.log(err.message);
   })

}



module.exports = { getAllQuizzes, getQuizById } ;
