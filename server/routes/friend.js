// routes/friendshipRouter.js
const express = require('express');
const FriendshipController = require('../controllers/FriendshipController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Friendship routes
router.post('/request', AuthMiddleware.authenticateToken, FriendshipController.sendFriendRequest);
router.put('/accept/:requestId', AuthMiddleware.authenticateToken, FriendshipController.acceptFriendRequest);
router.delete('/reject/:requestId', AuthMiddleware.authenticateToken, FriendshipController.rejectFriendRequest);
router.delete('/remove/:friendId', AuthMiddleware.authenticateToken, FriendshipController.removeFriend);
router.get('/', AuthMiddleware.authenticateToken, FriendshipController.getFriends);

module.exports = router;
