import React from "react";
import './MessageList.css'

interface Message{
    id: string;
    sender:string;
    content:string;
}

interface MessageListProps{
    messages: Message[]
}

const MessageList: React.FC<MessageListProps> = ({messages}) =>{
    return (
        <div className="message-list">
            {messages.map((message) => (
                <div key={message.id} className="message-item">
                    <strong>{message.sender}: </strong>
                    <span>{message.content}</span>
                </div>
            ))}
        </div>
    );    
}
export default MessageList