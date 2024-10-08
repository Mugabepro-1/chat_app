import { apiRequest } from './api';

// Register a new user
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    return apiRequest('/users/register', 'POST', userData);
};

// Login a user
export const loginUser = async (userData: { email: string; password: string }) => {
    return apiRequest('/users/login', 'POST', userData);
};

// Get user profile
export const getUserProfile = async (token: string) => {
    return apiRequest('/users/profile', 'GET', null, token);
};

// Update user profile
export const updateUserProfile = async (token: string, profileData: any) => {
    return apiRequest('/users/profile', 'PUT', profileData, token);
};
