const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    //console.log('Received Token:', token); // Add this line

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
       // console.log('Decoded Payload:', decoded); // Add this line
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error); // Add this line
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
