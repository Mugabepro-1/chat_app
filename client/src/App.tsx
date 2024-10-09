import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
cd cdimport { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChatRoom from './components/ChatRoom/ChatRoom';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/chatroom" element={<ChatRoom />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;

//Coded useAuth hook and it is done the job left is for tomorrow and in that i did not debug the any paramenter and the userData and profile bugs
