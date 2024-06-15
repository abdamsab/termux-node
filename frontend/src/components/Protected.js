import React, {  useState } from 'react';
import axios from 'axios';

const Protected = () => {
    const [msg, setMsg] = useState(" ");
    const handleAccessProtectedRoute = async () => {
        const token = localStorage.getItem('token');
        console.log('token retrieve from st in protected route:',token)
        try {
            const response = await axios.get('http://localhost:5000/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

          setMsg(response.data);
        } catch (error) {
            alert('Access denied');
        }
    };

    return (
        <div>
            <h2>Protected Route</h2>
            <h3>{msg.message} </h3>
            <button onClick={handleAccessProtectedRoute}>Access Protected Route</button>
        </div>
    );
};

export default Protected;
