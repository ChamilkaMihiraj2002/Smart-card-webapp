const mongoose = require('mongoose');   

const attendanceSchema = mongoose.Schema({
    attendanceId: {
        type: String,
        required: [true, "Attendance ID is required"],
        unique: [true, "Attendance ID is Already Existing"]
    },
    
    stId: {
        type: String,
        required: [true, "Student ID is required"],
    },

    classId:{
        type: String,
        required: [true, "Class ID is required"],
    },

    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;