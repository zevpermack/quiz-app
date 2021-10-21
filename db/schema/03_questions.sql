-- Drop and recreate  questions table
DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_content TEXT NOT NULL,
  choice1 VARCHAR(255) NOT NULL,
  choice2 VARCHAR(255) NOT NULL,
  choice3 VARCHAR(255) NOT NULL,
  choice4 VARCHAR(255) NOT NULL,
  answer  VARCHAR(255) NOT NULL
);
