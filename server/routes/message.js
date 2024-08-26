const express = require('express');
const MessageController = require('../controllers/MessageController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Message routes
router.post('/', AuthMiddleware.authenticateToken, MessageController.sendMessage);
router.get('/:roomId', AuthMiddleware.authenticateToken, MessageController.getMessagesForRoom);
router.delete('/:messageId', AuthMiddleware.authenticateToken, MessageController.deleteMessage);
router.post('/:messageId/read', AuthMiddleware.authenticateToken, MessageController.markMessageAsRead);

module.exports = router;
