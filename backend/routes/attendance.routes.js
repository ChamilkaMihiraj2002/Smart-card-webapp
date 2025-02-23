const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

router.get('/', authenticateToken,  attendanceController.getAttendance);
router.get('/:attendanceId', authenticateToken,  attendanceController.getAttendanceById);
router.post('/', authenticateToken,  attendanceController.addAttendance);
router.put('/:attendanceId', authenticateToken,  attendanceController.updateAttendance);
router.delete('/:attendanceId', authenticateToken,  attendanceController.deleteAttendance);

module.exports = router;