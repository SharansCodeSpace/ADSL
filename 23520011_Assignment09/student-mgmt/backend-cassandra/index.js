const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cassandra = require('cassandra-driver');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Cassandra connection setup
const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'student_management'
});

// Connect to Cassandra
client.connect()
    .then(() => console.log('Connected to Cassandra'))
    .catch(err => console.error('Cassandra connection error', err));

app.post('/students', async (req, res) => {
    const { first_name, last_name, age, department } = req.body;
    const student_id = uuidv4();

    const query = 'INSERT INTO students (student_id, first_name, last_name, age, department) VALUES (?, ?, ?, ?, ?)';
    const params = [student_id, first_name, last_name, age, department];

    try {
        await client.execute(query, params, { prepare: true });
        res.status(201).json({ message: 'Student added successfully', student_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add student' });
    }
});

app.get('/students', async (req, res) => {
    const query = 'SELECT * FROM students';

    try {
        const result = await client.execute(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

app.put('/students/:id', async (req, res) => {
    const student_id = req.params.id;
    const { age, department } = req.body;

    const query = 'UPDATE students SET age = ?, department = ? WHERE student_id = ?';
    const params = [age, department, student_id];

    try {
        await client.execute(query, params, { prepare: true });
        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update student' });
    }
});

app.delete('/students/:id', async (req, res) => {
    const student_id = req.params.id;

    const query = 'DELETE FROM students WHERE student_id = ?';
    const params = [student_id];

    try {
        await client.execute(query, params, { prepare: true });
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
