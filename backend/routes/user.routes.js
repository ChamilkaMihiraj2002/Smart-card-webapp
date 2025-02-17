const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');   

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);
router.post('/', userController.addUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;