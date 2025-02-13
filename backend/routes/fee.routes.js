const express = require('express');
const router = express.Router();
const feeController = require('../controllers/fee.controller.js');

router.get('api/fee/', feeController.getFees);
router.get('api/fee/:id', feeController.getFee);
router.post('api/fee/', feeController.addFee);
router.put('api/fee/:id', feeController.updateFee);
router.delete('api/fee/:id', feeController.deleteFee);

module.exports = router;