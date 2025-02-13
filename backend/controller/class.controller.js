const Class = require('../model/class.model.js');

const getClasses = async (req, res) => {
    try {
        const classes = await Class.find({});
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addClass = async (req, res) => {
    try {
        const classes = await Class.create(req.body);
        res.status(200).json(getClasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getClass = async (req, res) => {
    try {
        const classes = await Class.findById(req.params.id);
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateClass = async (req, res) => {
    try {
        const {id} = req.params;
        const classes = await Class.findByIdAndUpdate(id, req.body);

        if(!classes) {
            return res.status(404).json({ message: "Class not found" });
        }
        const updatedClass = await Class.findById(id);
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteClass = async (req, res) => {
    try {
        const {id} = req.params;
        const classes = await Class.findByIdAndDelete(id);

        if(!classes) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getClasses,
    addClass,
    getClass,
    updateClass,
    deleteClass
};