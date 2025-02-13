const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller.js');

router.get('api/class/', classController.getClasses);
router.get('api/class/:id', classController.getClass);
router.post('api/class/', classController.addClass);
router.put('api/class/:id', classController.updateClass);
router.delete('api/class/:id', classController.deleteClass);

module.exports = router;