const User = require('../models/User'); // Assuming User model is in models/User.js
const Friendship = require('../models/Friendship'); // Assuming Friendship model is in models/Friendship.js

const FriendshipController = {
  // Send a friend request
  async sendFriendRequest(req, res) {
    try {
      const { recipientId } = req.body;
      const senderId = req.user.id;

      // Validate input
      if (!recipientId) {
        return res.status(400).json({ message: 'Recipient ID is required' });
      }

      // Check if the recipient exists
      const recipient = await User.findById(recipientId);
      if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

      // Check if a friendship or request already exists
      const existingFriendship = await Friendship.findOne({
        $or: [
          { sender: senderId, recipient: recipientId },
          { sender: recipientId, recipient: senderId },
        ],
      });

      if (existingFriendship) {
        return res.status(400).json({ message: 'Friendship or request already exists' });
      }

      // Create a new friend request
      const newFriendRequest = new Friendship({
        sender: senderId,
        recipient: recipientId,
        status: 'pending',
      });

      await newFriendRequest.save();

      res.status(201).json({ message: 'Friend request sent successfully', request: newFriendRequest });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Accept a friend request
  async acceptFriendRequest(req, res) {
    try {
      const { requestId } = req.params;
      const userId = req.user.id;

      // Find the friend request
      const request = await Friendship.findById(requestId);
      if (!request) return res.status(404).json({ message: 'Friend request not found' });

      // Check if the user is the recipient
      if (request.recipient.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to accept this request' });
      }

      // Update the friendship status
      request.status = 'accepted';
      await request.save();

      res.json({ message: 'Friend request accepted', friendship: request });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Reject a friend request
  async rejectFriendRequest(req, res) {
    try {
      const { requestId } = req.params;
      const userId = req.user.id;

      // Find the friend request
      const request = await Friendship.findById(requestId);
      if (!request) return res.status(404).json({ message: 'Friend request not found' });

      // Check if the user is the recipient
      if (request.recipient.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to reject this request' });
      }

      // Delete the request
      await Friendship.findByIdAndDelete(requestId);

      res.json({ message: 'Friend request rejected' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Remove a friend
  async removeFriend(req, res) {
    try {
      const { friendId } = req.params;
      const userId = req.user.id;

      // Find the friendship
      const friendship = await Friendship.findOneAndDelete({
        $or: [
          { sender: userId, recipient: friendId, status: 'accepted' },
          { sender: friendId, recipient: userId, status: 'accepted' },
        ],
      });

      if (!friendship) {
        return res.status(404).json({ message: 'Friendship not found' });
      }

      res.json({ message: 'Friend removed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get all friends of a user
  async getFriends(req, res) {
    try {
      const userId = req.user.id;

      // Find all accepted friendships where the user is either the sender or the recipient
      const friendships = await Friendship.find({
        $or: [
          { sender: userId, status: 'accepted' },
          { recipient: userId, status: 'accepted' },
        ],
      }).populate('sender recipient', 'username');

      // Extract the friend details
      const friends = friendships.map(friendship => {
        return friendship.sender._id.toString() === userId
          ? friendship.recipient
          : friendship.sender;
      });

      res.json(friends);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
};

module.exports = FriendshipController;
