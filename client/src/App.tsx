import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

//I was just on the services folder for front and back integration and on the api.ts page to handle requests
