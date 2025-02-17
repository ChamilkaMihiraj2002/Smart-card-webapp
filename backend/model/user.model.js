const { text } = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
    {
        userId: {
            type: String,
            required: [true, "User ID is required"],
            unique: [true, "User ID is Already Existing"]
        },

        username: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username is Already Existing"]
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: {
                validator: function(value) {
                    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
                },
                message: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.'
            }
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is Already Existing']
        },
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;