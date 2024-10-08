import { useState} from 'react';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null);

    const register = async (userData: { username: string; email: string; password: string }) => {
        try {
            const data = await registerUser(userData);
            setToken(data.token);  // Assuming token is returned
            setUser(data.user);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const login = async (userData: { email: string; password: string }) => {
        try {
            const data = await loginUser(userData);
            setToken(data.token);  // Assuming token is returned
            setUser(data.user);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const fetchProfile = async () => {
        if (token) {
            const profile = await getUserProfile(token);
            setUser(profile);
        }
    };

    const updateProfile = async (profileData: any) => {
        if (token) {
            const updatedProfile = await updateUserProfile(token, profileData);
            setUser(updatedProfile);
        }
    };

    return { user, token, register, login, fetchProfile, updateProfile };
};
