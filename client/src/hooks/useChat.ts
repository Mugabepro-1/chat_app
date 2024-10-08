import { useState } from 'react';
import { fetchChatRooms, sendMessage, fetchChatHistory, fetchOnlineUsers } from '../services/chatService';

export const useChat = (token: string) => {
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);

    const loadChatRooms = async () => {
        try {
            const roomsData = await fetchChatRooms(token);
            setRooms(roomsData);
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    };

    const loadChatHistory = async (roomId: string) => {
        try {
            const messagesData = await fetchChatHistory(token, roomId);
            setMessages(messagesData);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const postMessage = async (roomId: string, message: string) => {
        try {
            await sendMessage(token, roomId, message);
            await loadChatHistory(roomId);  // Refresh chat after sending message
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const getOnlineUsers = async (roomId: string) => {
        try {
            const onlineUsers = await fetchOnlineUsers(token, roomId);
            return onlineUsers;
        } catch (error) {
            console.error('Error fetching online users:', error);
            return [];
        }
    };

    return { rooms, messages, loadChatRooms, loadChatHistory, postMessage, getOnlineUsers };
};
