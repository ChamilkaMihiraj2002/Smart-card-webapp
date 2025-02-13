const { text } = require('express');
const mongoose = require('mongoose');


const classSchema = mongoose.Schema (
    {
        classId:{
            type: String,
            required: true,
            unique: true
        },

        teacher: {
            type: String,
            required: true,
        },

        time: {
            type: time,
            required: true,
        },

    },

    {
        timestamp:true
    }
)

const Class = mongoose.model("Class", classSchema);
module.exports = Class;