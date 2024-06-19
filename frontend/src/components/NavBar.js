import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ handleLogout, role }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!role && (
                    <>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                {role && (
                    <>
                        <li>
                            <Link to="/profile">User Profile</Link>
                        </li>
                        {role === 'admin' && (
                            <li>
                                <Link to="/users">View Users</Link>
                            </li>
                        )}
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
