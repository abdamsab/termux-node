import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Users.css'; // Import the CSS file for styling

Modal.setAppElement('#root'); // Set the app root element for accessibility

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'guest', // Default role for new users
        password: '' // Add password field
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/users/view', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            showAlert('Failed to fetch users');
        }
    };

    const showAlert = (message) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(''), 3000);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            password: '' // Reset password field
        });
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/users/update/${selectedUser.userId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showAlert('User updated successfully');
            setSelectedUser(null);
            setModalIsOpen(false);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error(error);
            showAlert('Failed to update user');
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/users/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            showAlert('User added successfully');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                role: 'guest',
                password: '' // Reset password field
            });
            setModalIsOpen(false);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error(error);
            showAlert('Failed to add user');
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`http://localhost:5000/users/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                showAlert('User deleted successfully');
                fetchUsers(); // Refresh user list
            } catch (error) {
                console.error(error);
                showAlert('Failed to delete user');
            }
        }
    };

    const openAddUserModal = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            role: 'guest',
            password: '' // Reset password field
        });
        setSelectedUser(null);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="users-container">
            <h2>All Users</h2>
            {alertMessage && <div className="alert">{alertMessage}</div>}
            <button className="add-user-btn" onClick={openAddUserModal}>Add User</button>
            <ul className="users-list">
                {users.map((user) => (
                    <li key={user.userId}>
                        <div className="user-info">
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                        </div>
                        <div className="user-actions">
                            <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="User Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <form onSubmit={selectedUser ? handleSubmit : handleAddUser}>
                    <h3>{selectedUser ? 'Edit User' : 'Add User'}</h3>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required={!selectedUser} // Required only when adding a new user
                    />
                    <select name="role" value={formData.role} onChange={handleInputChange}>
                        <option value="guest">Guest</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">{selectedUser ? 'Update User' : 'Add User'}</button>
                    <button type="button" onClick={closeModal}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
};

export default Users;
