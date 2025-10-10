const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try{

        // Get the token from the cookies
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error: 'Access denied. No token provided.'});
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.sub };
        next();
    }
    catch (err){
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({error: 'Invalid token'});
        }
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({error: 'Token expired'});
        }
        return res.status(500).json({error: 'Internal server error'}); 
    }
}

module.exports = authenticateToken;