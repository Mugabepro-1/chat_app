// routes/typingRouter.js
const express = require('express');
const TypingController = require('../controllers/TypingController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Typing routes
router.post('/:roomId/start', AuthMiddleware.authenticateToken, TypingController.startTyping);
router.post('/:roomId/stop', AuthMiddleware.authenticateToken, TypingController.stopTyping);

module.exports = router;
