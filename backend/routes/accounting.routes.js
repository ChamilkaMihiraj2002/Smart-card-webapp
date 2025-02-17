const express = require('express');
const router = express.Router();
const accountingController = require('../controller/accounting.controller');


// Get yearly income summary from fees
router.get('/yearly-income', accountingController.getYearlyIncome);

// Get total income summary
router.get('/total-income', accountingController.getTotalIncome);

module.exports = router;
