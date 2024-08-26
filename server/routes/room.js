// routes/chatRoomRouter.js
const express = require('express');
const ChatRoomController = require('../controllers/ChatRoomController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Chat room routes
router.post('/', AuthMiddleware.authenticateToken, ChatRoomController.createRoom);
router.get('/', AuthMiddleware.authenticateToken, ChatRoomController.getRoomsForUser);
router.post('/join', AuthMiddleware.authenticateToken, ChatRoomController.joinRoom);
router.get('/:roomId', AuthMiddleware.authenticateToken, ChatRoomController.getRoomDetails);

module.exports = router;
