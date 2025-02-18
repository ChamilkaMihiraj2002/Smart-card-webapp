const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller.js');

router.get('/', attendanceController.getAttendance);
router.get('/:attendanceId', attendanceController.getAttendanceById);
router.post('/', attendanceController.addAttendance);
router.put('/:attendanceId', attendanceController.updateAttendance);
router.delete('/:attendanceId', attendanceController.deleteAttendance);

module.exports = router;