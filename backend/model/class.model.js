const { text } = require('express');
const mongoose = require('mongoose');


const classSchema = mongoose.Schema (
    {
        classId:{
            type: String,
            required: [true, "Class ID is required"],
            unique: [true, "Class ID is Already Existing"]
        },

        teacher: {
            type: String,
            required: [true, 'Teacher name is required'],
        },

        time: {
            type: String,
            required: [true, 'Time is required'],
        },

    }
);

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
