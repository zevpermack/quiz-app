-- Drop and recreate  quizzes table

DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  visibility VARCHAR(255) DEFAULT 'public',
  date_created DATE DEFAULT CURRENT_DATE
);
