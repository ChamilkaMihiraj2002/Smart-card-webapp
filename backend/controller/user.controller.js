const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userData = { ...req.body, password: hashedPassword };
        const user = await User.create(userData);
        res.status(200).json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate user id' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: `User not found with id: ${userId}` });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOneAndUpdate({ userId }, req.body);

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findOne({ userId });
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate user id' });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOneAndDelete({ userId });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });

        if (user == null) {
            return res.status(400).send('Cannot find user');
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Not Allowed');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { 
    getUsers, 
    addUser, 
    getUser, 
    updateUser, 
    deleteUser,
    login 
};