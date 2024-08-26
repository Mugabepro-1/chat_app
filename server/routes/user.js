const express = require('express');
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

// User routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', AuthMiddleware.authenticateToken, UserController.getUserProfile);
router.put('/profile', AuthMiddleware.authenticateToken, UserController.updateUserProfile);

module.exports = router;
