const express = require('express');
const router = express.Router();
const accountingController = require('../controller/accounting.controller');
const { authenticateToken } = require('../middleware/auth.middleware.js');


// Get yearly income summary from fees
router.get('/yearly-income', authenticateToken,  accountingController.getYearlyIncome);

// Get total income summary
router.get('/total-income', authenticateToken,  accountingController.getTotalIncome);

module.exports = router;
