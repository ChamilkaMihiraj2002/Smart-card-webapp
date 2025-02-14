const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller.js');

router.get('/', studentController.getStudents);
router.get('/:stid', studentController.getStudent);
router.post('/', studentController.addStudent);
router.put('/:stid', studentController.updateStudent);
router.delete('/:stid', studentController.deleteStudent);

module.exports = router;