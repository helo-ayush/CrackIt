const express = require('express');
const User = require('../models/User'); // Assuming this is your Mongoose User model
const router = express.Router();

// Define routes on the router object
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);

        const response = await newUser.save();
        console.log('User Added successfully');
        res.status(201).json({ Response: response });

    } catch (err) {
        console.log('Error Adding User:', err);

        // Check for the specific duplicate key error from MongoDB
        if (err.code === 11000) {
            // Check which field caused the error
            if (err.keyPattern.username) {
                return res.status(409).json({ error: 'Username already exists.' });
            }
            if (err.keyPattern.email) {
                return res.status(409).json({ error: 'Email already used.' });
            }
        }
        
        // For any other errors, send a generic internal server error
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;