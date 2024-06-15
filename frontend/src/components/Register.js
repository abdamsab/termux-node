import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                firstName,
                lastName,
                email,
                password,
            });
			 if (response.data && response.data.token) {
			    console.log('FTend reg token:',response.data.token)
                localStorage.setItem('token', response.data.token);
                alert('User registered successfully');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
