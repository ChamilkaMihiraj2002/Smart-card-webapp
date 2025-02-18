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
            required: [true, 'Password is required']
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