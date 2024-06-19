const express = require('express');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
const User = require('../models/Users');

const router = express.Router();

// Get all users - only accessible by admin
router.get('/users', auth, checkRole('admin'), async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user information - only accessible by admin
router.put('/users/:id', auth, checkRole('admin'), async (req, res) => {
    const { firstName, lastName, email, role } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user information
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
