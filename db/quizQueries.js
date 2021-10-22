
//function to show all public quizzes
const getAllQuizzes = function(db){

  const queryParams =['public'];
  const queryString = `SELECT * FROM quizzes WHERE visibility = $1 `;
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
