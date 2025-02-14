const express = require('express');
const router = express.Router();
const feeController = require('../controller/fee.controller.js');

router.get('/', feeController.getFees);
router.get('/:stId', feeController.getFee);
router.post('/', feeController.createFee);
router.put('/:stId/:classId/:month', feeController.updateFee);
router.delete('/:stId/:classId/:month', feeController.deleteFee);

module.exports = router;