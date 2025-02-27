const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'online_mcq',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Confirm database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connection successful.');
    connection.release();
  }
});

// Helper function: Run queries with promises
const query = (sql, params) =>
  new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

/* ============================================
   USER MANAGEMENT ENDPOINTS
============================================ */

// Register a new user
app.post('/api/users', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    await query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (dummy authentication; implement hashing in production)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (users.length > 0) {
      res.json({ message: 'Login successful', user: users[0] });
    } else { 
      res.json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================
   QUESTION BANK ENDPOINTS
============================================ */

// Add a new question
app.post('/api/questions', async (req, res) => {
  const { question_text, image_url, math_expr, created_by } = req.body;
  try {
    const result = await query(
      'INSERT INTO questions (question_text, image_url, math_expr, created_by) VALUES (?, ?, ?, ?)',
      [question_text, image_url, math_expr, created_by]
    );
    res.json({ message: 'Question added', question_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await query('SELECT * FROM questions');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================
   TEST MANAGEMENT ENDPOINTS
============================================ */

// Get all tests
app.get('/api/tests', async (req, res) => {
  try {
    const tests = await query('SELECT * FROM tests');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new test
app.post('/api/tests', async (req, res) => {
  const { title, description, start_time, time_limit, created_by } = req.body;
  try {
    const result = await query(
      'INSERT INTO tests (title, description, start_time, time_limit, created_by) VALUES (?, ?, ?, ?, ?)',
      [title, description, start_time, time_limit, created_by]
    );
    res.json({ message: 'Test created', test_id: result.insertId });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

// Add a question to a test
app.post('/api/tests/:testId/questions', async (req, res) => {
  const { testId } = req.params;
  const { question_id, question_order } = req.body;
  try {
    await query(
      'INSERT INTO test_questions (test_id, question_id, question_order) VALUES (?, ?, ?)',
      [testId, question_id, question_order]
    );
    res.json({ message: 'Question added to test' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit test answers
app.post('/api/test-submissions', async (req, res) => {
  const { test_id, student_id, answers } = req.body; // answers: array of { question_id, selected_option, is_correct }
  try {
    const result = await query(
      'INSERT INTO test_submissions (test_id, student_id, status) VALUES (?, ?, ?)',
      [test_id, student_id, 'completed']
    );
    const submission_id = result.insertId;
    for (let ans of answers) {
      await query(
        'INSERT INTO answers (submission_id, question_id, selected_option, is_correct) VALUES (?, ?, ?, ?)',
        [submission_id, ans.question_id, ans.selected_option, ans.is_correct || false]
      );
    }
    res.json({ message: 'Test submitted', submission_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ============================================
   DASHBOARD AND REPORT ENDPOINTS
============================================ */

// Dashboard: Get overall stats
app.get('/api/dashboard', async (req, res) => {
  try {
    const totalStudents = (await query('SELECT COUNT(*) AS count FROM users WHERE role = "student"'))[0].count;
    const testSubmissions = await query('SELECT status, COUNT(*) AS count FROM test_submissions GROUP BY status');
    res.json({ totalStudents, testSubmissions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generic report: return data from any table (validate table names in production)
app.get('/api/reports/:table', async (req, res) => {
  const { table } = req.params;
  try {
    const data = await query('SELECT * FROM ??', [table]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
