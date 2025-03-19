const Class = require('../model/class.model.js');

const getClasses = async (req, res) => {
    try {
        const classes = await Class.find({});
        res.status(200).json(classes);
    } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).json({ message: error.message });
    }
}

const addClass = async (req, res) => {
    try {
        const classes = await Class.create(req.body);
        res.status(200).json(classes);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate class id' });
        } else {
            console.error("Error adding class:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

const getClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const classes = await Class.findOne({ classId });

        if (!classes) {
            return res.status(404).json({ message: `Class not found with id: ${classId}` });
        }

        res.status(200).json(classes);
    } catch (error) {
        console.error("Error fetching class:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getClassWeekday = async (req, res) => {
    try {
        const { weekday } = req.params;
        const classes = await Class.find({ weekday });

        if (classes.length === 0) {
            return res.status(404).json({ message: `Classes not found with weekday: ${weekday}` });
        }

        res.status(200).json(classes);
    } catch (error) {
        console.error("Error fetching classes by weekday:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const classes = await Class.findOneAndUpdate({ classId }, req.body, { runValidators: true });

        if(!classes) {
            return res.status(404).json({ message: "Class not found" });
        }
        const updatedClass = await Class.findOne({ classId });
        res.status(200).json(updatedClass);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate Class id' });
        } else {
            console.error("Error updating class:", error);
            return res.status(500).json({ message: error.message });
        }
    }
}

const deleteClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const classes = await Class.findOneAndDelete({ classId } );

        if(!classes) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getClassCount = async (req, res) => {
    try {
        const count = await Class.countDocuments({});
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getClassIds = async (req, res) => {
    try {
      const classes = await Class.find({}, 'classId');
      const ids = classes.map(cls => cls.classId);
      res.json(ids);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching class IDs' });
    }
};

const searchClasses = async (req, res) => {
    try {
      const { query } = req.query;
      const classes = await Class.find({ 
        classId: { $regex: query, $options: 'i' }
      }, 'classId').limit(10);
      res.json(classes.map(cls => ({ id: cls.classId })));
    } catch (error) {
      res.status(500).json({ message: 'Error searching classes' });
    }
};

module.exports = {
    getClasses,
    addClass,
    getClass,
    updateClass,
    deleteClass,
    getClassCount,
    getClassWeekday,
    getClassIds,
    searchClasses
};