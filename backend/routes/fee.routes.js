const express = require('express');
const router = express.Router();
const feeController = require('../controller/fee.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

router.get('/', authenticateToken, feeController.getFees);
router.get('/:stId', authenticateToken, feeController.getFee);
router.post('/', authenticateToken, feeController.createFee);
router.put('/:stId/:classId/:month', authenticateToken, feeController.updateFee);
router.delete('/:stId/:classId/:month', authenticateToken, feeController.deleteFee);

module.exports = router;