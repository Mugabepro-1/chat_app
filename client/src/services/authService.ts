import { apiRequest } from './api';

interface userData{
    username?: string;
    email?: string;
    password?: string; 
}
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    return apiRequest('/users/register', 'POST', userData);
};

export const loginUser = async (userData: { email: string; password: string }) => {
    return apiRequest('/users/login', 'POST', userData);
};

export const getUserProfile = async (token: string) => {
    return apiRequest('/users/profile', 'GET', null, token);
};

export const updateUserProfile = async (token: string, profileData: userData) => {
    return apiRequest('/users/profile', 'PUT', profileData, token);
};
