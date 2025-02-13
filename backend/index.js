require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const classRoutes = require('./routes/class.routes.js');
const feeRoutes = require('./routes/fee.routes.js');
const studentRoutes = require('./routes/student.routes.js');
const app = express()

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes configuration
app.use('/api/classes', classRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/students', studentRoutes);


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
.catch(() => {
    console.log("Connection failed");
});