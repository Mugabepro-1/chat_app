const ChatRoom = require('../models/ChatRoom'); // Assuming ChatRoom model is in models/ChatRoom.js
const User = require('../models/User'); // Assuming User model is in models/User.js

const ChatRoomController = {
  // Create a new chat room
  async createRoom(req, res) {
    try {
      const { name, type } = req.body;
      const creatorId = req.user.id;

      // Validate input
      if (!name) {
        return res.status(400).json({ message: 'Room name is required' });
      }

      // Create new chat room
      const newRoom = new ChatRoom({
        name,
        type,
        creator: creatorId,
        members: [creatorId], // Add the creator as the first member
      });

      await newRoom.save();

      res.status(201).json({ message: 'Chat room created successfully', room: newRoom });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get all rooms for a user
  async getRoomsForUser(req, res) {
    try {
      const userId = req.user.id;

      // Find rooms where the user is a member
      const rooms = await ChatRoom.find({ members: userId });

      res.json(rooms);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Join a chat room
  async joinRoom(req, res) {
    try {
      const { roomId } = req.body;
      const userId = req.user.id;

      // Validate input
      if (!roomId) {
        return res.status(400).json({ message: 'Room ID is required' });
      }

      // Find the room
      const room = await ChatRoom.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });

      // Check if the user is already a member
      if (room.members.includes(userId)) {
        return res.status(400).json({ message: 'User is already a member of this room' });
      }

      // Add the user to the room's members
      room.members.push(userId);
      await room.save();

      res.json({ message: 'User joined the room successfully', room });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get details of a specific chat room
  async getRoomDetails(req, res) {
    try {
      const roomId = req.params.roomId;

      // Find the room
      const room = await ChatRoom.findById(roomId).populate('creator', 'username');
      if (!room) return res.status(404).json({ message: 'Room not found' });

      res.json(room);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
};

module.exports = ChatRoomController;
