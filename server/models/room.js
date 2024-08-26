const mongoose = require('mongoose')
const { default: mongoose } = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    members:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        type: {
              type: String,
              Enumerator: ['private', 'public']       
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
});

const ChatRoomModel = mongoose.model('ChatRoom', chatRoomSchema)
export default ChatRoomModel;