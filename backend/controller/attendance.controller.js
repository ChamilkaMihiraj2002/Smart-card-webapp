const Attendance = require('../model/attendance.model.js');

const getAttendance = async (req, res) => {
    try {
        const attendance =  await Attendance.find({});
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.status(200).json(attendance);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate attendance id' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getAttendanceById = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const attendance = await Attendance.findOne({ attendanceId });

        if (!attendance) {
            return res.status(404).json({ message: `Attendance not found with id: ${attendanceId}` });
        }

        res.status(200).json(attendance);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const attendance = await Attendance.findOneAndUpdate({ attendanceId }, req.body);

        if(!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        const updatedAttendance = await Attendance.findOne({ attendanceId });
        res.status(200).json(updatedAttendance);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate attendance id' });
        } else {
            res.status(500).json({ message: error.message });
        }
    } 
};

const deleteAttendance = async (req, res) => {
    try {
        const { attendanceId } = req.params;
        const attendance = await Attendance.findOneAndDelete({ attendanceId }); 

        if(!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }
        res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getAttendance, 
    addAttendance, 
    getAttendanceById, 
    updateAttendance,
    deleteAttendance
};