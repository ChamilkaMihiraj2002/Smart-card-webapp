const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller.js');

router.get('api/student/', studentController.getStudents);
router.get('api/student/:id', studentController.getStudent);
router.post('api/student/', studentController.addStudent);
router.put('api/student/:id', studentController.updateStudent);
router.delete('api/student/:id', studentController.deleteStudent);

module.exports = router;