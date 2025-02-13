const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller.js');

router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudent);
router.post('/', studentController.addStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;