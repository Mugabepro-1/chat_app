import React, {useState, useEffect, useContext} from React;
import './ChatRoom.css'
import {ChatContext} from '../../context/ChatContext'
import MessageList from './MessageList'

const ChatRoom: React.FC = () =>{
    const [messages, sendMessage] = useContext()
    const [message, setMessage] =useState('')

    const handleSendMessage = () =>{
        sendMessage(message);
        setMessage('')
    }
    return (
        <div className="chatroom-container">
            <MessageList messages={messages} />
            <div className="message-input">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}
export default ChatRoom