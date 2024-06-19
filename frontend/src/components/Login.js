import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            if (response.data && response.data.token) {
            
                // Parse the token to get user information
                const payload = JSON.parse(atob(response.data.token.split('.')[1]));
				
                console.log('Login payload:', payload);

                // Set isLoggedIn and role based on payload
                console.log('before setIsloggedin')
                setIsLoggedIn(true);
                console.log('after setIsLoggedin, before setRole')
                setRole(payload.role);
				console.log('after setRole, before setItem')
                // Set token in localStorage
                localStorage.setItem('token', response.data.token);
				console.log('after setItem, before Alert')
                // Navigate to the user profile page (/user)
                alert('Login successfully');
                console.log('after alert, before navigate')
                navigate('/user');
                console.log('after navigation')
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data?.message || 'An error occurred during login');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
