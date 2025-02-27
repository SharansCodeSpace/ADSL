-- Create database:
CREATE DATABASE online_mcq;
USE online_mcq;

-- Users table for authentication/roles
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('teacher', 'student', 'ta') NOT NULL
);

-- Question Bank (MCQ) with support for images and math expressions
CREATE TABLE questions (
  question_id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT NOT NULL,
  image_url VARCHAR(255),        -- Optional image URL
  math_expr TEXT,                -- Mathematical expression (e.g. LaTeX)
  created_by INT,
  approved_by INT,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- Options for each question
CREATE TABLE options (
  option_id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  option_text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

-- Tests table for exam creation
CREATE TABLE tests (
  test_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  start_time DATETIME,
  time_limit INT,                 -- in minutes
  created_by INT,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Linking questions to tests
CREATE TABLE test_questions (
  test_id INT,
  question_id INT,
  question_order INT,
  PRIMARY KEY (test_id, question_id),
  FOREIGN KEY (test_id) REFERENCES tests(test_id),
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

-- Test submissions by students
CREATE TABLE test_submissions (
  submission_id INT AUTO_INCREMENT PRIMARY KEY,
  test_id INT,
  student_id INT,
  submission_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  score DECIMAL(5,2),
  status ENUM('ongoing', 'terminated', 'completed') DEFAULT 'ongoing',
  FOREIGN KEY (test_id) REFERENCES tests(test_id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Answers given in each submission
CREATE TABLE answers (
  answer_id INT AUTO_INCREMENT PRIMARY KEY,
  submission_id INT,
  question_id INT,
  selected_option INT,
  is_correct BOOLEAN,
  FOREIGN KEY (submission_id) REFERENCES test_submissions(submission_id),
  FOREIGN KEY (question_id) REFERENCES questions(question_id),
  FOREIGN KEY (selected_option) REFERENCES options(option_id)
);
