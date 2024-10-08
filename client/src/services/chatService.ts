import { apiRequest } from './api';

export const fetchChatRooms = async (token: string) => {
    return apiRequest('/rooms', 'GET', null, token);
};

export const sendMessage = async (token: string, roomId: string, message: string) => {
    const data = { message };
    return apiRequest(`/rooms/${roomId}/messages`, 'POST', data, token);
};

export const fetchChatHistory = async (token: string, roomId: string) => {
    return apiRequest(`/rooms/${roomId}/messages`, 'GET', null, token);
};

export const createRoom = async (token: string, roomData: { name: string; description?: string }) => {
    return apiRequest('/rooms', 'POST', roomData, token);
};

export const joinRoom = async (token: string, roomId: string) => {
    return apiRequest(`/rooms/${roomId}/join`, 'POST', null, token);
};

export const leaveRoom = async (token: string, roomId: string) => {
    return apiRequest(`/rooms/${roomId}/leave`, 'POST', null, token);
};
