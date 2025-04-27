const express = require('express');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// MongoDB connection setup
mongoose.connect('mongodb+srv://myAtlasDBUser:root@myatlasclusteredu.krx9aon.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error', err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
    student_id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true }
});

// Create Student Model
const Student = mongoose.model('Student', studentSchema);

// POST: Add a new student
app.post('/students', async (req, res) => {
    const { first_name, last_name, age, department } = req.body;
    const student_id = uuidv4();

    const newStudent = new Student({
        student_id,
        first_name,
        last_name,
        age,
        department
    });

    try {
        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully', student_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// GET: Retrieve all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// PUT: Update a student's information
app.put('/students/:id', async (req, res) => {
    const student_id = req.params.id;
    const { age, department } = req.body;

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { student_id },
            { age, department },
            { new: true }
        );

        if (updatedStudent) {
            res.json({ message: 'Student updated successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update student' });
    }
});

// DELETE: Remove a student
app.delete('/students/:id', async (req, res) => {
    const student_id = req.params.id;

    try {
        const result = await Student.findOneAndDelete({ student_id });

        if (result) {
            res.json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
