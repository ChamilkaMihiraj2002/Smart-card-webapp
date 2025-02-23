const express = require('express');
const router = express.Router();
const classController = require('../controller/class.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

router.get('/', authenticateToken, classController.getClasses);
router.get('/:classId', authenticateToken, classController.getClass);
router.post('/', authenticateToken, classController.addClass);
router.put('/:classId', authenticateToken, classController.updateClass);
router.delete('/:classId', authenticateToken, classController.deleteClass);

module.exports = router;
