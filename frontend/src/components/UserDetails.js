import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            console.log('token retrive from st',token);
            try {
                const response = await axios.get('http://localhost:5000/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response)
                setUser(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch user details');
            }
        };

        fetchUserDetails();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-details">
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserDetails;
