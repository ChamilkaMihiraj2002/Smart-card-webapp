const { get } = require('mongoose');
const Fee = require('../model/fee.model.js');

const getFees = async (req, res) => {
    try {
        const fees = await Fee.find({});
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFee = async (req, res) => {
    try {
        const { stId } = req.params;
        const fees = await Fee.find({ stId }); // Use Fee.find to get all fees for the given stId

        if (!fees || fees.length === 0) {
            return res.status(404).json({ message: `No fees found for student with id: ${stId}` });
        }

        res.status(200).json(fees); // Return all fees associated with the stId
    } catch (error) {
        console.error("Error fetching student fees:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const createFee = async (req, res) => {
    try {
        const fee = await Fee.create(req.body);
        res.status(201).json(fee);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate ids' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

const updateFee = async (req, res) => {
    try {
        const { stId, classId, month } = req.params;
        const fee = await Fee.findOneAndUpdate({ stId, classId, month }, req.body);

        if(!fee) {
            return res.status(404).json({ message: 'Fee not found' });
        }
        const updatedFee = await Fee.findOne({ stId, classId, month });
        res.status(200).json(updatedFee);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate id' });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
}

const deleteFee = async (req, res) => {
    try {
        const { stId, classId, month } = req.params;
        const fee = await Fee.findOneAndDelete({ stId, classId, month });

        if(!fee) {
            return res.status(404).json({ message: 'Fee not found' });
        }
        res.status(200).json({ message: 'Fee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getFees,
    getFee,
    createFee,
    updateFee,
    deleteFee
};