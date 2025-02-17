const mongoose = require('mongoose');

const accountingSchema = mongoose.Schema({
    transactionType: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const Accounting = mongoose.model("Accounting", accountingSchema);
module.exports = Accounting;
