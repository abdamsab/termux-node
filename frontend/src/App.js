import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';
import UserDetails from './components/UserDetails'; // Add this line

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/protected">Protected</Link>
                        </li>
                        <li>
                            <Link to="/user">User Details</Link> {/* Add this line */}
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/protected" element={<Protected />} />
                    <Route path="/user" element={<UserDetails />} /> {/* Add this line */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
