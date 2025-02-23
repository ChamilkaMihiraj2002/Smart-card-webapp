require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

// Routes 
const classRoutes = require('./routes/class.routes.js');
const feeRoutes = require('./routes/fee.routes.js');
const studentRoutes = require('./routes/student.routes.js');
const accountingRoutes = require('./routes/accounting.routes.js');
const userRoutes = require('./routes/user.routes.js');
const attendanceRoutes = require('./routes/attendance.routes.js');

const app = express()

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes configuration
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/accounting', accountingRoutes);
app.use('/api/attendance', attendanceRoutes);


app.get('/', function (req, res) {
  res.send('Hello World from Express!')
})

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to the database!');
    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });
})
.catch(() => {
    console.log("Connection failed");
});
