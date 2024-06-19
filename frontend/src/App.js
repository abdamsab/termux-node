import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import AdminView from './components/AdminPanel';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

function App() {
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1]));
            setRole(user.role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <Router>
            <div>
                <NavBar handleLogout={handleLogout} role={role} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
                    <Route path="/user" element={<UserDetails />} />
                    <Route path="/admin" element={<AdminView />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
