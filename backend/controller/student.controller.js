const Student = require("../model/student.model.js");

const getStudents = async (req, res) => {
    try {
        const student = await Student.find({});
        res.state(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body);

        if(!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const updatedStudent = await Student.findById(id);
        res.status(200).json(updatedStudent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const student = await Student.findByIdAndDelete(id, req.body);

        if(!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const deletedStudent = await Student.findById(id);
        res.status(200).json(deletedStudent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getStudents,
    addStudent,
    getStudent,
    updateStudent,
    deleteStudent
};