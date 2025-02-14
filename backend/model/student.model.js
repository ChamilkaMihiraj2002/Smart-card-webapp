const { text } = require('express');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema (
    {
        stid: {
            type: String,
            required: [true, "Student ID is required"],
            unique: [true, "Student ID is Already Existing"]
        },

        name: {
            type: String,
            required: [true, 'student name is required']
        },

        age: {
            type: Number,
            required: true,
            default: 0
        },

        StudentClass: {
            type: String,
            required: true,
        },

        mobile_number: {
            type: String,
            required: false
        },
        
    }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;