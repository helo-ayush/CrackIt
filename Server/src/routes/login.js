const express = require('express');
const User = require('../models/User')
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/',async (req,res)=>{
    try {
        const data = req.body;
        const user = await User.findOne({email: data.email})
        
        if(!user){
            return res.status(404).json({error:'User Not Found'})
        }

        const isPasswordMatch = await user.comparePassword(data.password);
        if(!isPasswordMatch){
            return res.status(500).json({ error: 'Either Username or Password is incorrect'});
        }

        // Minimal JWT payload: only subject (user id)
        const payload = {
            sub: user._id.toString()
        };

        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET){
            return res.status(500).json({ error: 'Server misconfigured: missing JWT_SECRET' });
        }

        // Sign the token with the payload, secret key, and expiration time
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        // Set the token in http only cookie
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send user data
        return res.status(200).json({
            message: 'Login successful'
        });
    }
    catch (err) {
        console.log('Error Adding User:', err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

module.exports = router;