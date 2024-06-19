import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/users/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data)
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/users/users/${selectedUser._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('User updated successfully');
            setSelectedUser(null);
            // Refresh user list
            const response = await axios.get('http://localhost:5000/users/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to update user');
        }
    };

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.firstName} {user.lastName} - {user.email} ({user.role})
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                    </li>
                ))}
            </ul>

            {selectedUser && (
                <form onSubmit={handleSubmit}>
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <select name="role" value={formData.role} onChange={handleInputChange}>
                        <option value="guest">Guest</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
};

export default Users;
