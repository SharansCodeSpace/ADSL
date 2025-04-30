const db = require('../db');
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, email, hashedPassword, role || 'customer'], (err, result) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, users) => {
    if (err || users.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, role: user.role } });
  });
};
