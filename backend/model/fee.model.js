const { text } = require('express');
const mongoose = require('mongoose');

const feeSchema = mongoose.Schema (
    {
        classId:{
            type: String,
            required: true,
        },

        stid: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        month: {
            type:String,
            required:true,
        }
    }
);

const Fee = mongoose.model("Fee", feeSchema);
module.exports = Fee;