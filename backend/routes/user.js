const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/Users');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    //console.log(req);
    try {
        const user = await User.findOne({ userId: req.user.userId }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
