const { text } = require('express');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema (
    {
        stId: {
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
            required: [true, 'student age is required'],
            default: 0,
            validate:{
                validator: function(value) {
                    return value < 22;
                },
                message: 'Age must be less than 22'
            }
        },

        StudentClass: {
            type: String,
            required: [true, 'student Class is required'],
        },

        mobile_number: {
            type: String,
            required: false
        },
        
    }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;