const express = require('express');
const router = express.Router();
const classController = require('../controller/class.controller.js');

router.get('/', classController.getClasses);
router.get('/:classId', classController.getClass);
router.post('/', classController.addClass);
router.put('/:classId', classController.updateClass);
router.delete('/:classId', classController.deleteClass);

module.exports = router;
