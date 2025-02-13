const { text } = require('express');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema (
    {
        stid: {
            type: String,
            required: true,
            unique: true 
        },

        name: {
            type: String,
            required: [true, 'Product name is required']
        },

        age: {
            type: Number,
            required: true,
            default: 0
        },

        class: {
            type: String,
            required: true,
        },

        mobile_number: {
            type: String,
            required: false
        },
        
    },

    {
        timestamp:true
    }

)

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;