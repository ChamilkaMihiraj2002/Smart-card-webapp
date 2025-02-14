const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller.js');

router.get('/', studentController.getStudents);
router.get('/:stId', studentController.getStudent);
router.post('/', studentController.addStudent);
router.put('/:stId', studentController.updateStudent);
router.delete('/:stId', studentController.deleteStudent);

module.exports = router;