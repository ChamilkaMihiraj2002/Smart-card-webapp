const Student = require("../model/student.model.js");

const getStudents = async (req, res) => {
    try {
        const student = await Student.find({});
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate student id' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getStudent = async (req, res) => {
    try {
        const { stId } = req.params;
        const student = await Student.findOne({ stId });

        if (!student) {
            return res.status(404).json({ message: `Student not found with id: ${stId}` });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { stId } = req.params;
        const student = await Student.findOneAndUpdate({ stId }, req.body);

        if(!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const updatedStudent = await Student.findOne({ stId});
        res.status(200).json(updatedStudent);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate Student id' });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { stId } = req.params;
        const student = await Student.findOneAndDelete({ stId });

        if(!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: 'Student deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStudents,
    addStudent,
    getStudent,
    updateStudent,
    deleteStudent
};