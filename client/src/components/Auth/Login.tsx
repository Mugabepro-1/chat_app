import React, {useState, useContext, FormEvent} from "react";
import './Login.css'
import {AuthContext} from '../../context/AuthContext'

const Login: React.FC = () => {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e React: FormEvent) =>{
        e.preventDefault;
        Login({email, password});
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default Login