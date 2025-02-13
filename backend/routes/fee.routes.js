const express = require('express');
const router = express.Router();
const feeController = require('../controller/fee.controller.js');

router.get('/', feeController.getFees);
router.get('/:id', feeController.getFee);
router.post('/', feeController.createFee);
router.put('/:id', feeController.updateFee);
router.delete('/:id', feeController.deleteFee);

module.exports = router;