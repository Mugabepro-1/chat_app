const Message = require('../models/Message'); // Assuming Message model is in models/Message.js
const ChatRoom = require('../models/ChatRoom'); // Assuming ChatRoom model is in models/ChatRoom.js
const User = require('../models/User'); // Assuming User model is in models/User.js

const MessageController = {
  // Send a message
  async sendMessage(req, res) {
    try {
      const { roomId, content } = req.body;
      const senderId = req.user.id;

      // Validate input
      if (!roomId || !content) {
        return res.status(400).json({ message: 'Room ID and content are required' });
      }

      // Check if the room exists
      const room = await ChatRoom.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });

      // Create new message
      const newMessage = new Message({
        sender: senderId,
        room: roomId,
        content,
        readBy: [],
      });

      await newMessage.save();

      // Optionally: update the room's timestamp or last message info
      room.updatedAt = new Date();
      await room.save();

      res.status(201).json({ message: 'Message sent successfully', message: newMessage });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get all messages for a room
  async getMessagesForRoom(req, res) {
    try {
      const roomId = req.params.roomId;

      // Check if the room exists
      const room = await ChatRoom.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });

      // Fetch messages for the room
      const messages = await Message.find({ room: roomId }).populate('sender', 'username').sort({ timestamp: 1 });

      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Delete a message
  async deleteMessage(req, res) {
    try {
      const messageId = req.params.messageId;
      const userId = req.user.id;

      // Find the message
      const message = await Message.findById(messageId);
      if (!message) return res.status(404).json({ message: 'Message not found' });

      // Check if the user is the sender or an admin (if applicable)
      if (message.sender.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to delete this message' });
      }

      // Delete the message
      await Message.findByIdAndDelete(messageId);

      res.json({ message: 'Message deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Mark a message as read
  async markMessageAsRead(req, res) {
    try {
      const { messageId } = req.body;
      const userId = req.user.id;

      // Find the message
      const message = await Message.findById(messageId);
      if (!message) return res.status(404).json({ message: 'Message not found' });

      // Check if the message is already marked as read by this user
      if (message.readBy.includes(userId)) {
        return res.status(400).json({ message: 'Message is already marked as read' });
      }

      // Mark message as read
      message.readBy.push(userId);
      await message.save();

      res.json({ message: 'Message marked as read', message });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
};

module.exports = MessageController;
