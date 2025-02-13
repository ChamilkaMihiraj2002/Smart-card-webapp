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
        const fee = await Fee.findById(req.params.id);
        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createFee = async (req, res) => {
    try {
        const fee = await Fee.create(req.body);
        res.status(201).json(fee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateFee = async (req, res) => {
    try {
        const {id} = req.params;
        const fee = await Fee.findByIdAndUpdate(id, req.body);

        if(!fee) {
            return res.status(404).json({ message: 'Fee not found' });
        }
        const updatedFee = await Fee.findById(id);
        res.status(200).json(updatedFee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteFee = async (req, res) => {
    try {
        const {id} = req.params;
        const fee = await Fee.findByIdAndDelete(id);

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