const TypingController = {
    // Notify that a user has started typing in a chat room
    async startTyping(req, res) {
      try {
        const { roomId } = req.params;
        const userId = req.user.id;
  
        // Emit typing event to the room
        const io = req.app.get('io');
        io.to(roomId).emit('typing', { userId, isTyping: true });
  
        res.status(200).json({ message: 'Typing status sent', userId, roomId, isTyping: true });
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    },
  
    // Notify that a user has stopped typing in a chat room
    async stopTyping(req, res) {
      try {
        const { roomId } = req.params;
        const userId = req.user.id;
  
        // Emit typing event to the room
        const io = req.app.get('io');
        io.to(roomId).emit('typing', { userId, isTyping: false });
  
        res.status(200).json({ message: 'Typing status sent', userId, roomId, isTyping: false });
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    }
  };
  
  module.exports = TypingController;
  