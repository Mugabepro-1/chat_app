const mongoose = require('mongoose')

const typingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isTyping: { type: Boolean, default: false }
  });

  const TypingModel = mongoose.model('Typing', typingSchema);
export default TypingModel;