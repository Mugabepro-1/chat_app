import { useState } from "react";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../services/authService';

const useAuth = () =>{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null)

    const register = async(userData:{userName:string, email:string, password:string}) => {
        try {
            const data = await registerUser(userData);
            setToken(data.token);
            setUser(data.user)
        } catch (error) {
            console.log("Error during registration: ", error);
                        
        }
    }
    const login = async(userData:{userName:string, password:string}) =>{
      try {
        const data  = await loginUser(userData);
        setToken(data.token);
        setUser(data.user);        
      } catch (error) {
        console.log("Error in logging in: ", error);
                
      }
    }
    const fetchProfile = async () =>{
        if(token){
        const profile = getUserProfile(token)
        setUser(profile);
        }
    }
    const updateProfile = async (profileData: any) =>{
        if(token){
            const updatedProfile = await updateUserProfile(token, profileData);
            setUser(updatedProfile)
        }
    }
    return { user, token, register, login, fetchProfile, updateProfile };
}
export default useAuth;