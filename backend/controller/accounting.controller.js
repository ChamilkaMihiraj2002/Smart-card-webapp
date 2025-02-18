const Accounting = require('../model/accounting.model.js');
const Fee = require('../model/fee.model.js');

const accountingController = {
    // Add new transaction
    addTransaction: async (req, res) => {
        try {
            const newTransaction = new Accounting(req.body);
            const savedTransaction = await newTransaction.save();
            res.status(201).json(savedTransaction);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    
    // Get yearly summary from fees
    getYearlyIncome: async (req, res) => {
        try {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
            
            const yearlyFees = await Fee.aggregate([
                {
                    $group: {
                        _id: "$month",
                        monthlyTotal: { $sum: "$amount" },
                        studentCount: { $sum: 1 }
                    }
                },
                {
                    $sort: { 
                        _id: 1
                    }
                }
            ]);

            // Format the response with month names
            const formattedResults = yearlyFees.map(item => ({
                month: item._id,
                totalIncome: item.monthlyTotal,
                studentCount: item.studentCount
            }));

            res.json(formattedResults);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get total income summary
    getTotalIncome: async (req, res) => {
        try {
            const totalIncome = await Fee.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" },
                        feeCount: { $sum: 1 }
                    }
                }
            ]);

            res.json(totalIncome[0] || { total: 0, feeCount: 0 });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = accountingController;
