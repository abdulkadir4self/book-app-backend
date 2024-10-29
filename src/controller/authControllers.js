const User = require('../models/schemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Promote a user's role
exports.promoteRole = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    if (user.role === 'viewer') {
        user.role = 'editor';
    } else if (user.role === 'editor') {
        user.role = 'admin';
    } else {
        return res.status(400).send('User is already an admin');
    }

    await user.save();
    res.send(`User promoted to ${user.role}`);
};
