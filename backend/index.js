require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const app = express()

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.get('/', function (req, res) {
  res.send('Hello World from Express!')
})

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to the database!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((err) => {
    console.log(err);
});