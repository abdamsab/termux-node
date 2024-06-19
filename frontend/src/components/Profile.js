import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
           // console.log('token retrive from st',token);
            try {
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
               // console.log(response)
                setUser(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch user details');
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default Profile;
