const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');   
const { authenticateToken } = require('../middleware/auth.middleware.js');

router.post('/login', userController.login);

router.get('/', authenticateToken, userController.getUsers);
router.get('/:userId', authenticateToken, userController.getUser);
router.post('/', authenticateToken, userController.addUser);
router.put('/:userId', authenticateToken, userController.updateUser);
router.delete('/:userId', authenticateToken, userController.deleteUser);


module.exports = router;