const { text } = require('express');
const mongoose = require('mongoose');

const feeSchema = mongoose.Schema (
    {
        classId:{
            type: String,
            required: [true, 'Class Id name is required'],
        },

        stId: {
            type: String,
            required: [true, 'student Id name is required'],
        },

        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            validate: {
                validator: function (value) {
                    return value >= 800 && value <= 2500; 
                },
                message: 'Amount must be greater than 800 and less than 2500', 
            },
        },

        month: {
            type:String,
            required:[true, 'Month is required'],
        }
    }
);

const Fee = mongoose.model("Fee", feeSchema);
module.exports = Fee;