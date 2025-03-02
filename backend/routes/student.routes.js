const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

router.get('/', authenticateToken, studentController.getStudents);
router.get('/:stId', authenticateToken, studentController.getStudent);
router.post('/', authenticateToken, studentController.addStudent);
router.put('/:stId', authenticateToken, studentController.updateStudent);
router.delete('/:stId', authenticateToken, studentController.deleteStudent);
router.get('/count', authenticateToken, studentController.getStudentCount);

module.exports = router;